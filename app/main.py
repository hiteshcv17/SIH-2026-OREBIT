from fastapi import FastAPI, Query, status
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import random
from typing import Optional, List, Dict, Any

from app.services.data_loader import (
    get_satellite_reserves,
    get_drillhole_logs,
    get_equipment_telemetry,
    get_blast_fragmentation_logs,
    get_daily_production,
)
from app.db.database import check_db_health
from app.middleware.error_handler import register_exception_handlers
from app.schemas.common import RootResponse, HealthResponse, ResourceNotFoundException, InvalidFilterException
from app.schemas.reserve import ReserveMapResponse, SatelliteReservesPayload, DrillholeLogsPayload
from app.schemas.shortfall import ShortfallForecastResponse, DailyProductionPayload
from app.schemas.equipment import EquipmentHealthResponse, FleetStatusResponse, EquipmentPayload, FleetSummary
from app.schemas.blast import BlastRecommendationsResponse, BlastAnalysisPayload

app = FastAPI(
    title="OreBit Backend API",
    description="FastAPI service serving intelligent mining telemetry & spatial data with Pydantic input/output validation, PostGIS integration, and centralized error handling.",
    version="1.2.0"
)

# Register centralized error handler middleware
register_exception_handlers(app)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get(
    "/",
    response_model=RootResponse,
    status_code=status.HTTP_200_OK,
    summary="Root API Welcome",
    tags=["Core"]
)
def read_root():
    db_status = check_db_health()
    return RootResponse(
        message="Welcome to OreBit Intelligent Mining API",
        status="online",
        service="OreBit Core Spatial API",
        version="1.2.0",
        database=db_status.get("engine"),
        database_connected=db_status.get("db_connected"),
        timestamp=datetime.now().isoformat()
    )

@app.get(
    "/health",
    response_model=HealthResponse,
    status_code=status.HTTP_200_OK,
    summary="System Health Check",
    tags=["Core"]
)
def health_check():
    db_status = check_db_health()
    return HealthResponse(
        status="healthy",
        uptime="normal",
        timestamp=datetime.now().isoformat(),
        database=db_status
    )

@app.get(
    "/api/reserve-map",
    response_model=ReserveMapResponse,
    status_code=status.HTTP_200_OK,
    summary="Satellite Reserves & Drillhole Exploration Map Data",
    tags=["Spatial Analytics"]
)
def get_reserve_map(
    zone_name: Optional[str] = Query(None, description="Filter grid points by pit zone (e.g. 'North Pit Alpha')"),
    min_iron_grade: Optional[float] = Query(None, ge=0, le=100, description="Filter minimum iron ore grade percentage")
):
    satellite_data = get_satellite_reserves()
    drillhole_data = get_drillhole_logs()

    # Apply query filtering if provided
    if satellite_data and "grid_points" in satellite_data:
        points = satellite_data["grid_points"]
        if zone_name:
            points = [p for p in points if zone_name.lower() in p.get("zone_name", "").lower()]
        if min_iron_grade is not None:
            points = [p for p in points if p.get("iron_grade_pct", 0) >= min_iron_grade]
        satellite_data["grid_points"] = points

    return ReserveMapResponse(
        status="success",
        data_source=satellite_data.get("source", "Static JSON Mock"),
        timestamp=datetime.now().isoformat(),
        satellite_reserves=SatelliteReservesPayload(**satellite_data),
        drillhole_logs=DrillholeLogsPayload(**drillhole_data),
    )

@app.get(
    "/api/shortfall-forecast",
    response_model=ShortfallForecastResponse,
    status_code=status.HTTP_200_OK,
    summary="30-Day Production Forecast & Shortfall Heatmap Data",
    tags=["Production & Shortfall"]
)
def get_shortfall_forecast(
    limit_days: Optional[int] = Query(None, ge=1, le=90, description="Limit historical record count")
):
    """Returns 30-day production forecast with simulated live tonnage jitter"""
    production_data = get_daily_production()
    records = production_data.get("records", [])

    # Apply small live variation to recent records
    if records:
        for idx in range(max(0, len(records) - 3), len(records)):
            jitter = random.randint(-120, 120)
            records[idx]["actual_tons"] = max(10000, records[idx]["actual_tons"] + jitter)
            records[idx]["shortfall_tons"] = records[idx]["target_tons"] - records[idx]["actual_tons"]

    if limit_days and records:
        records = records[-limit_days:]
        production_data["records"] = records
        production_data["target_total_tons"] = sum(r["target_tons"] for r in records)
        production_data["actual_total_tons"] = sum(r["actual_tons"] for r in records)
        production_data["cum_shortfall_tons"] = production_data["target_total_tons"] - production_data["actual_total_tons"]

    return ShortfallForecastResponse(
        status="success",
        data_source=production_data.get("source", "Static JSON Mock"),
        timestamp=datetime.now().isoformat(),
        production_forecast=DailyProductionPayload(**production_data),
    )

@app.get(
    "/api/equipment-health",
    response_model=EquipmentHealthResponse,
    status_code=status.HTTP_200_OK,
    summary="Equipment Health Telematics & RUL Predictive Analytics",
    tags=["Fleet Telematics"]
)
def get_equipment_health(
    status_filter: Optional[str] = Query(None, description="Filter fleet by status: 'Operational', 'Warning', 'Critical'"),
    min_rul: Optional[int] = Query(None, ge=0, description="Filter minimum Remaining Useful Life in hours")
):
    """Returns equipment telematics with live sensor variations (temperature, vibration)"""
    telemetry_data = get_equipment_telemetry()
    fleet = telemetry_data.get("fleet", [])

    # Apply live sensor noise
    for machine in fleet:
        tele = machine.get("telemetry", {})
        if "hydraulic_temp_c" in tele:
            tele["hydraulic_temp_c"] = round(tele["hydraulic_temp_c"] + random.uniform(-1.2, 1.2), 1)
        if "bearing_temp_c" in tele:
            tele["bearing_temp_c"] = round(tele["bearing_temp_c"] + random.uniform(-1.0, 1.0), 1)
        if "vibration_mm_s" in tele:
            tele["vibration_mm_s"] = max(0.01, round(tele["vibration_mm_s"] + random.uniform(-0.01, 0.01), 2))

    # Apply query filtering
    if status_filter:
        fleet = [m for m in fleet if m.get("status", "").lower() == status_filter.lower()]
    if min_rul is not None:
        fleet = [m for m in fleet if m.get("rul_hours", 0) >= min_rul]

    telemetry_data["fleet"] = fleet
    telemetry_data["total_fleet_units"] = len(fleet)

    return EquipmentHealthResponse(
        status="success",
        data_source=telemetry_data.get("source", "Static JSON Mock"),
        timestamp=datetime.now().isoformat(),
        equipment=EquipmentPayload(**telemetry_data),
    )

@app.get(
    "/api/blast-recommendations",
    response_model=BlastRecommendationsResponse,
    status_code=status.HTTP_200_OK,
    summary="Blast Fragmentation Logs & AI Prescriptive Optimizations",
    tags=["Blast Optimization"]
)
def get_blast_recommendations(
    pit_zone: Optional[str] = Query(None, description="Filter blast logs by pit zone (e.g. 'North Pit Alpha')")
):
    blast_data = get_blast_fragmentation_logs()
    records = blast_data.get("recent_blasts") or blast_data.get("blast_records") or []

    if pit_zone:
        records = [b for b in records if pit_zone.lower() in (b.get("pit_zone") or b.get("bench_location") or "").lower()]
        if "recent_blasts" in blast_data:
            blast_data["recent_blasts"] = records
        else:
            blast_data["blast_records"] = records

    return BlastRecommendationsResponse(
        status="success",
        data_source=blast_data.get("source", "Static JSON Mock"),
        timestamp=datetime.now().isoformat(),
        blast_analysis=BlastAnalysisPayload(**blast_data),
    )

@app.get(
    "/api/fleet-status",
    response_model=FleetStatusResponse,
    status_code=status.HTTP_200_OK,
    summary="Fleet Operational Summary & Readiness Metrics",
    tags=["Fleet Telematics"]
)
def get_fleet_status(
    zone: Optional[str] = Query(None, description="Filter summary by zone (e.g. 'North Pit')")
):
    telemetry_data = get_equipment_telemetry()
    fleet = telemetry_data.get("fleet", [])

    if zone:
        fleet = [m for m in fleet if zone.lower() in (m.get("zone") or m.get("assigned_zone") or "").lower()]

    operational_count = sum(1 for m in fleet if m.get("status") == "Operational")
    warning_count = sum(1 for m in fleet if m.get("status") == "Warning")
    critical_count = sum(1 for m in fleet if m.get("status") == "Critical")

    availability_avg = (
        round(sum(m.get("availability_pct", 0) for m in fleet) / len(fleet), 1)
        if fleet else 0.0
    )

    return FleetStatusResponse(
        status="success",
        data_source=telemetry_data.get("source", "Static JSON Mock"),
        timestamp=datetime.now().isoformat(),
        summary=FleetSummary(
            total_machines=len(fleet),
            operational=operational_count,
            warning=warning_count,
            critical=critical_count,
            overall_availability_pct=availability_avg,
        ),
        machines=fleet,
    )
