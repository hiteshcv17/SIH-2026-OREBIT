from pydantic import BaseModel, Field
from typing import List, Optional

class GridPoint(BaseModel):
    id: str = Field(..., description="Unique satellite grid point identifier")
    lat: float = Field(..., description="Latitude coordinate")
    lng: float = Field(..., description="Longitude coordinate")
    elevation_m: float = Field(..., description="Surface elevation in meters")
    iron_grade_pct: float = Field(..., ge=0, le=100, description="Estimated iron ore grade percentage")
    reserve_probability: float = Field(..., ge=0, le=1.0, description="Prospectivity confidence score (0-1)")
    band_ratio_val: float = Field(..., description="Multispectral band ratio index value")
    zone_name: str = Field(..., description="Pit section or exploration zone name")
    rock_formation: str = Field(..., description="Geological rock formation class")

class BoundingBox(BaseModel):
    min_lat: float
    max_lat: float
    min_lng: float
    max_lng: float

class SatelliteReservesPayload(BaseModel):
    dataset: str
    sensor: str
    band_ratios: List[str]
    bounding_box: BoundingBox
    grid_points: List[GridPoint]
    source: Optional[str] = None

class DrillholeInterval(BaseModel):
    from_m: float
    to_m: float
    lithology: str
    fe_pct: float
    sio2_pct: float
    al2o3_pct: float

class DrillholeLog(BaseModel):
    hole_id: str
    stage: str
    pit_zone: str
    lat: float
    lng: float
    collar_elevation_m: float
    total_depth_m: float
    azimuth: float
    dip: float
    drilled_date: str
    intervals: List[DrillholeInterval]

class DrillholeLogsPayload(BaseModel):
    dataset: str
    standards: str
    drillholes: List[DrillholeLog]
    source: Optional[str] = None

class ReserveMapResponse(BaseModel):
    status: str = "success"
    data_source: str
    timestamp: str
    satellite_reserves: SatelliteReservesPayload
    drillhole_logs: DrillholeLogsPayload
