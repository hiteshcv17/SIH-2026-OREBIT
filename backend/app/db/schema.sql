-- OreBit PostgreSQL + PostGIS Spatial Schema

-- 1. Enable PostGIS Extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. Satellite Reserves (Spatial Point Table)
CREATE TABLE IF NOT EXISTS satellite_reserves (
    id VARCHAR(50) PRIMARY KEY,
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    geom GEOMETRY(Point, 4326),
    elevation_m FLOAT NOT NULL,
    iron_grade_pct FLOAT NOT NULL,
    reserve_probability FLOAT NOT NULL,
    band_ratio_val FLOAT NOT NULL,
    zone_name VARCHAR(100) NOT NULL,
    rock_formation VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sat_reserves_geom ON satellite_reserves USING GIST (geom);

-- 3. Drillhole Exploration Logs (Spatial Point Table with JSONB Intervals)
CREATE TABLE IF NOT EXISTS drillhole_logs (
    hole_id VARCHAR(50) PRIMARY KEY,
    stage VARCHAR(20) NOT NULL,
    pit_zone VARCHAR(100) NOT NULL,
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    geom GEOMETRY(Point, 4326),
    collar_elevation_m FLOAT NOT NULL,
    total_depth_m FLOAT NOT NULL,
    azimuth FLOAT NOT NULL,
    dip FLOAT NOT NULL,
    drilled_date DATE NOT NULL,
    intervals JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_drillhole_geom ON drillhole_logs USING GIST (geom);

-- 4. Daily Production & Shortfall Forecast Records
CREATE TABLE IF NOT EXISTS daily_production (
    date DATE PRIMARY KEY,
    target_tons INT NOT NULL,
    actual_tons INT NOT NULL,
    shortfall_tons INT NOT NULL,
    grade_fe_pct FLOAT NOT NULL,
    primary_delay_reason VARCHAR(255) NOT NULL,
    pit_section VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Equipment Telemetry & Fleet Status (Spatial Point Table with JSONB Telemetry)
CREATE TABLE IF NOT EXISTS equipment_telemetry (
    equipment_id VARCHAR(50) PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    location_lat DOUBLE PRECISION NOT NULL,
    location_lng DOUBLE PRECISION NOT NULL,
    geom GEOMETRY(Point, 4326),
    zone VARCHAR(100) NOT NULL,
    rul_hours INT NOT NULL,
    rul_confidence FLOAT NOT NULL,
    availability_pct FLOAT NOT NULL,
    telemetry JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_equipment_geom ON equipment_telemetry USING GIST (geom);

-- 6. Blast Fragmentation & Optimization Logs
CREATE TABLE IF NOT EXISTS blast_fragmentation_logs (
    blast_id VARCHAR(50) PRIMARY KEY,
    pit_zone VARCHAR(100) NOT NULL,
    blast_date DATE NOT NULL,
    powder_factor_kg_ton FLOAT NOT NULL,
    target_powder_factor FLOAT NOT NULL,
    p80_fragmentation_cm FLOAT NOT NULL,
    target_p80_cm FLOAT NOT NULL,
    overbreak_pct FLOAT NOT NULL,
    flyrock_distance_m FLOAT NOT NULL,
    status VARCHAR(50) NOT NULL,
    ai_recommendation TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
