import json
import logging
from pathlib import Path
from typing import Dict, Any

from app.db.database import (
    db_get_satellite_reserves,
    db_get_drillhole_logs,
    db_get_daily_production,
    db_get_equipment_telemetry,
    db_get_blast_fragmentation_logs,
    init_and_seed_db,
)

logger = logging.getLogger("orebit.data_loader")
MOCK_DATA_DIR = Path(__file__).parent.parent / "mockData"

def load_json_file(file_name: str) -> Dict[str, Any]:
    file_path = MOCK_DATA_DIR / file_name
    if not file_path.exists():
        raise FileNotFoundError(f"Mock dataset file not found: {file_path}")
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

def get_satellite_reserves() -> Dict[str, Any]:
    db_data = db_get_satellite_reserves()
    if db_data:
        return db_data
    return load_json_file("satellite_reserves.json")

def get_drillhole_logs() -> Dict[str, Any]:
    db_data = db_get_drillhole_logs()
    if db_data:
        return db_data
    return load_json_file("drillhole_logs.json")

def get_equipment_telemetry() -> Dict[str, Any]:
    db_data = db_get_equipment_telemetry()
    if db_data:
        return db_data
    return load_json_file("equipment_telemetry.json")

def get_blast_fragmentation_logs() -> Dict[str, Any]:
    db_data = db_get_blast_fragmentation_logs()
    if db_data:
        return db_data
    return load_json_file("blast_fragmentation_logs.json")

def get_daily_production() -> Dict[str, Any]:
    db_data = db_get_daily_production()
    if db_data:
        return db_data
    return load_json_file("daily_production.json")

# Attempt DB initialization and seeding on startup
try:
    init_and_seed_db(load_json_file)
except Exception as e:
    logger.debug(f"DB auto-seed check bypassed: {e}")
