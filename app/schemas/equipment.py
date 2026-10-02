from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any

class EquipmentMachine(BaseModel):
    model_config = ConfigDict(extra="allow")

    machine_id: Optional[str] = None
    equipment_id: Optional[str] = None
    name: Optional[str] = None
    category: Optional[str] = None
    type: Optional[str] = None
    model: Optional[str] = None
    status: str = Field(..., description="Operational status: Operational, Warning, Critical")
    assigned_zone: Optional[str] = None
    zone: Optional[str] = None
    health_score: Optional[int] = None
    availability_pct: float = Field(..., ge=0, le=100)
    location_lat: Optional[float] = None
    location_lng: Optional[float] = None
    rul_hours: Optional[int] = 350
    rul_confidence: Optional[float] = 0.92
    telemetry: Dict[str, Any] = {}
    maintenance: Optional[Dict[str, Any]] = None

class EquipmentPayload(BaseModel):
    model_config = ConfigDict(extra="allow")

    dataset: str
    total_fleet_units: Optional[int] = None
    fleet: List[EquipmentMachine]
    source: Optional[str] = None

class EquipmentHealthResponse(BaseModel):
    status: str = "success"
    data_source: str
    timestamp: str
    equipment: EquipmentPayload

class FleetSummary(BaseModel):
    total_machines: int
    operational: int
    warning: int
    critical: int
    overall_availability_pct: float

class FleetStatusResponse(BaseModel):
    status: str = "success"
    data_source: str
    timestamp: str
    summary: FleetSummary
    machines: List[EquipmentMachine]
