import os
import json
import logging
from typing import Dict, Any, List, Optional
import psycopg
from psycopg.rows import dict_row

logger = logging.getLogger("orebit.db")

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/orebit_db")

def get_db_connection():
    """Attempts to establish connection to PostgreSQL + PostGIS database."""
    try:
        conn = psycopg.connect(DATABASE_URL, row_factory=dict_row, connect_timeout=3)
        return conn
    except Exception as e:
        logger.debug(f"PostgreSQL connection offline or unavailable: {e}")
        return None

def check_db_health() -> Dict[str, Any]:
    """Checks DB connectivity, PostGIS extension status, and record counts."""
    conn = get_db_connection()
    if not conn:
        return {
            "db_connected": False,
            "engine": "PostgreSQL + PostGIS",
            "status": "offline_fallback_to_json",
            "message": "PostgreSQL database offline or unconfigured; active fallback: JSON Mock Services"
        }
    
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT version();")
            pg_version = cur.fetchone()["version"]
            
            postgis_ver = "Not Installed"
            try:
                cur.execute("SELECT PostGIS_Full_Version();")
                postgis_ver = cur.fetchone()["postgis_full_version"]
            except Exception:
                pass
            
            # Count records in tables
            tables = ["satellite_reserves", "drillhole_logs", "daily_production", "equipment_telemetry", "blast_fragmentation_logs"]
            table_counts = {}
            for tbl in tables:
                try:
                    cur.execute(f"SELECT COUNT(*) FROM {tbl};")
                    table_counts[tbl] = cur.fetchone()["count"]
                except Exception:
                    table_counts[tbl] = "table_missing"
                    
        conn.close()
        return {
            "db_connected": True,
            "engine": "PostgreSQL + PostGIS",
            "status": "online",
            "pg_version": pg_version,
            "postgis_version": postgis_ver,
            "record_counts": table_counts
        }
    except Exception as e:
        conn.close()
        return {
            "db_connected": False,
            "engine": "PostgreSQL + PostGIS",
            "status": "error",
            "error": str(e)
        }

def init_and_seed_db(mock_data_getter) -> bool:
    """Initializes tables using schema.sql and seeds mock datasets if database is empty."""
    conn = get_db_connection()
    if not conn:
        logger.info("Skipping database initialization: PostgreSQL not reachable.")
        return False

    try:
        schema_path = os.path.join(os.path.dirname(__file__), "schema.sql")
        if os.path.exists(schema_path):
            with open(schema_path, "r", encoding="utf-8") as f:
                schema_sql = f.read()
            with conn.cursor() as cur:
                cur.execute(schema_sql)
            conn.commit()

        with conn.cursor() as cur:
            # 1. Seed Satellite Reserves
            cur.execute("SELECT COUNT(*) FROM satellite_reserves;")
            if cur.fetchone()["count"] == 0:
                sat_json = mock_data_getter("satellite_reserves.json")
                for item in sat_json.get("grid_points", []):
                    cur.execute("""
                        INSERT INTO satellite_reserves (
                            id, lat, lng, geom, elevation_m, iron_grade_pct, reserve_probability, band_ratio_val, zone_name, rock_formation
                        ) VALUES (
                            %s, %s, %s, ST_SetSRID(ST_MakePoint(%s, %s), 4326), %s, %s, %s, %s, %s, %s
                        ) ON CONFLICT (id) DO NOTHING;
                    """, (
                        item["id"], item["lat"], item["lng"], item["lng"], item["lat"],
                        item["elevation_m"], item["iron_grade_pct"], item["reserve_probability"],
                        item["band_ratio_val"], item["zone_name"], item["rock_formation"]
                    ))

            # 2. Seed Drillhole Logs
            cur.execute("SELECT COUNT(*) FROM drillhole_logs;")
            if cur.fetchone()["count"] == 0:
                dh_json = mock_data_getter("drillhole_logs.json")
                for item in dh_json.get("drillholes", []):
                    cur.execute("""
                        INSERT INTO drillhole_logs (
                            hole_id, stage, pit_zone, lat, lng, geom, collar_elevation_m, total_depth_m, azimuth, dip, drilled_date, intervals
                        ) VALUES (
                            %s, %s, %s, %s, %s, ST_SetSRID(ST_MakePoint(%s, %s), 4326), %s, %s, %s, %s, %s, %s
                        ) ON CONFLICT (hole_id) DO NOTHING;
                    """, (
                        item["hole_id"], item["stage"], item["pit_zone"], item["lat"], item["lng"],
                        item["lng"], item["lat"], item["collar_elevation_m"], item["total_depth_m"],
                        item["azimuth"], item["dip"], item["drilled_date"], json.dumps(item["intervals"])
                    ))

            # 3. Seed Daily Production
            cur.execute("SELECT COUNT(*) FROM daily_production;")
            if cur.fetchone()["count"] == 0:
                prod_json = mock_data_getter("daily_production.json")
                for item in prod_json.get("records", []):
                    cur.execute("""
                        INSERT INTO daily_production (
                            date, target_tons, actual_tons, shortfall_tons, grade_fe_pct, primary_delay_reason, pit_section
                        ) VALUES (
                            %s, %s, %s, %s, %s, %s, %s
                        ) ON CONFLICT (date) DO NOTHING;
                    """, (
                        item["date"], item["target_tons"], item["actual_tons"], item["shortfall_tons"],
                        item["grade_fe_pct"], item["primary_delay_reason"], item["pit_section"]
                    ))

            # 4. Seed Equipment Telemetry
            cur.execute("SELECT COUNT(*) FROM equipment_telemetry;")
            if cur.fetchone()["count"] == 0:
                eq_json = mock_data_getter("equipment_telemetry.json")
                for item in eq_json.get("fleet", []):
                    cur.execute("""
                        INSERT INTO equipment_telemetry (
                            equipment_id, type, model, status, location_lat, location_lng, geom, zone, rul_hours, rul_confidence, availability_pct, telemetry
                        ) VALUES (
                            %s, %s, %s, %s, %s, %s, ST_SetSRID(ST_MakePoint(%s, %s), 4326), %s, %s, %s, %s, %s
                        ) ON CONFLICT (equipment_id) DO NOTHING;
                    """, (
                        item["equipment_id"], item["type"], item["model"], item["status"],
                        item["location_lat"], item["location_lng"], item["location_lng"], item["location_lat"],
                        item["zone"], item["rul_hours"], item["rul_confidence"], item["availability_pct"],
                        json.dumps(item["telemetry"])
                    ))

            # 5. Seed Blast Fragmentation Logs
            cur.execute("SELECT COUNT(*) FROM blast_fragmentation_logs;")
            if cur.fetchone()["count"] == 0:
                blast_json = mock_data_getter("blast_fragmentation_logs.json")
                for item in blast_json.get("recent_blasts", []):
                    cur.execute("""
                        INSERT INTO blast_fragmentation_logs (
                            blast_id, pit_zone, blast_date, powder_factor_kg_ton, target_powder_factor, p80_fragmentation_cm, target_p80_cm, overbreak_pct, flyrock_distance_m, status, ai_recommendation
                        ) VALUES (
                            %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
                        ) ON CONFLICT (blast_id) DO NOTHING;
                    """, (
                        item["blast_id"], item["pit_zone"], item["blast_date"],
                        item["powder_factor_kg_ton"], item["target_powder_factor"],
                        item["p80_fragmentation_cm"], item["target_p80_cm"],
                        item["overbreak_pct"], item["flyrock_distance_m"], item["status"],
                        item["ai_recommendation"]
                    ))

        conn.commit()
        conn.close()
        logger.info("PostgreSQL database populated successfully.")
        return True
    except Exception as e:
        if conn:
            conn.close()
        logger.error(f"Failed to seed PostgreSQL database: {e}")
        return False

# Database Query Functions
def db_get_satellite_reserves() -> Optional[Dict[str, Any]]:
    conn = get_db_connection()
    if not conn:
        return None
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT id, lat, lng, ST_AsGeoJSON(geom) as geojson, elevation_m, iron_grade_pct, reserve_probability, band_ratio_val, zone_name, rock_formation
                FROM satellite_reserves ORDER BY id;
            """)
            rows = cur.fetchall()
        conn.close()

        if not rows:
            return None

        grid_points = []
        for r in rows:
            grid_points.append({
                "id": r["id"],
                "lat": r["lat"],
                "lng": r["lng"],
                "elevation_m": r["elevation_m"],
                "iron_grade_pct": r["iron_grade_pct"],
                "reserve_probability": r["reserve_probability"],
                "band_ratio_val": r["band_ratio_val"],
                "zone_name": r["zone_name"],
                "rock_formation": r["rock_formation"]
            })

        return {
            "dataset": "satellite_band_ratio_reserves",
            "source": "PostgreSQL + PostGIS Database",
            "sensor": "Sentinel-2 & Landsat-9 OLI Multispectral",
            "band_ratios": ["B11/B12 (Ferrous Oxide)", "B4/B2 (Hematite Index)", "B8A/B11 (Alteration Zone)"],
            "bounding_box": {
                "min_lat": 20.4500,
                "max_lat": 20.5200,
                "min_lng": 85.3000,
                "max_lng": 85.3800
            },
            "grid_points": grid_points
        }
    except Exception as e:
        logger.error(f"Error reading satellite_reserves from DB: {e}")
        conn.close()
        return None

def db_get_drillhole_logs() -> Optional[Dict[str, Any]]:
    conn = get_db_connection()
    if not conn:
        return None
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT hole_id, stage, pit_zone, lat, lng, ST_AsGeoJSON(geom) as geojson, collar_elevation_m, total_depth_m, azimuth, dip, TO_CHAR(drilled_date, 'YYYY-MM-DD') as drilled_date, intervals
                FROM drillhole_logs ORDER BY hole_id;
            """)
            rows = cur.fetchall()
        conn.close()

        if not rows:
            return None

        drillholes = []
        for r in rows:
            intervals = r["intervals"] if isinstance(r["intervals"], list) else json.loads(r["intervals"])
            drillholes.append({
                "hole_id": r["hole_id"],
                "stage": r["stage"],
                "pit_zone": r["pit_zone"],
                "lat": r["lat"],
                "lng": r["lng"],
                "collar_elevation_m": r["collar_elevation_m"],
                "total_depth_m": r["total_depth_m"],
                "azimuth": r["azimuth"],
                "dip": r["dip"],
                "drilled_date": r["drilled_date"],
                "intervals": intervals
            })

        return {
            "dataset": "drillhole_exploration_logs",
            "source": "PostgreSQL + PostGIS Database",
            "standards": "UNFC / CRIRSCO Compliant",
            "drillholes": drillholes
        }
    except Exception as e:
        logger.error(f"Error reading drillhole_logs from DB: {e}")
        conn.close()
        return None

def db_get_daily_production() -> Optional[Dict[str, Any]]:
    conn = get_db_connection()
    if not conn:
        return None
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT TO_CHAR(date, 'YYYY-MM-DD') as date, target_tons, actual_tons, shortfall_tons, grade_fe_pct, primary_delay_reason, pit_section
                FROM daily_production ORDER BY date ASC;
            """)
            rows = cur.fetchall()
        conn.close()

        if not rows:
            return None

        records = [dict(r) for r in rows]
        target_total = sum(r["target_tons"] for r in records)
        actual_total = sum(r["actual_tons"] for r in records)

        return {
            "dataset": "daily_mine_production_and_shortfall_forecast",
            "source": "PostgreSQL + PostGIS Database",
            "period": "30-Day Rolling Log",
            "target_total_tons": target_total,
            "actual_total_tons": actual_total,
            "cum_shortfall_tons": target_total - actual_total,
            "records": records
        }
    except Exception as e:
        logger.error(f"Error reading daily_production from DB: {e}")
        conn.close()
        return None

def db_get_equipment_telemetry() -> Optional[Dict[str, Any]]:
    conn = get_db_connection()
    if not conn:
        return None
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT equipment_id, type, model, status, location_lat, location_lng, ST_AsGeoJSON(geom) as geojson, zone, rul_hours, rul_confidence, availability_pct, telemetry
                FROM equipment_telemetry ORDER BY equipment_id;
            """)
            rows = cur.fetchall()
        conn.close()

        if not rows:
            return None

        fleet = []
        for r in rows:
            telemetry = r["telemetry"] if isinstance(r["telemetry"], dict) else json.loads(r["telemetry"])
            fleet.append({
                "equipment_id": r["equipment_id"],
                "type": r["type"],
                "model": r["model"],
                "status": r["status"],
                "location_lat": r["location_lat"],
                "location_lng": r["location_lng"],
                "zone": r["zone"],
                "rul_hours": r["rul_hours"],
                "rul_confidence": r["rul_confidence"],
                "availability_pct": r["availability_pct"],
                "telemetry": telemetry
            })

        return {
            "dataset": "equipment_telemetry_phm",
            "source": "PostgreSQL + PostGIS Database",
            "total_fleet_units": len(fleet),
            "fleet": fleet
        }
    except Exception as e:
        logger.error(f"Error reading equipment_telemetry from DB: {e}")
        conn.close()
        return None

def db_get_blast_fragmentation_logs() -> Optional[Dict[str, Any]]:
    conn = get_db_connection()
    if not conn:
        return None
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT blast_id, pit_zone, TO_CHAR(blast_date, 'YYYY-MM-DD') as blast_date, powder_factor_kg_ton, target_powder_factor, p80_fragmentation_cm, target_p80_cm, overbreak_pct, flyrock_distance_m, status, ai_recommendation
                FROM blast_fragmentation_logs ORDER BY blast_date DESC;
            """)
            rows = cur.fetchall()
        conn.close()

        if not rows:
            return None

        recent_blasts = [dict(r) for r in rows]

        return {
            "dataset": "blast_fragmentation_optimization_logs",
            "source": "PostgreSQL + PostGIS Database",
            "recent_blasts": recent_blasts
        }
    except Exception as e:
        logger.error(f"Error reading blast_fragmentation_logs from DB: {e}")
        conn.close()
        return None
