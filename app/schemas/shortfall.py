from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ShiftShortfallModel(BaseModel):
    shift_a: Optional[int] = 0
    shift_b: Optional[int] = 0
    shift_c: Optional[int] = 0

class ProductionRecord(BaseModel):
    date: str = Field(..., description="Date of production log (YYYY-MM-DD)")
    target_tons: int = Field(..., ge=0, description="Target tonnage quota")
    actual_tons: int = Field(..., ge=0, description="Actual tonnage extracted")
    shortfall_tons: int = Field(..., description="Shortfall tonnage (Target - Actual)")
    compliance_pct: Optional[float] = None
    target_grade_pct: Optional[float] = None
    actual_grade_pct: Optional[float] = None
    shift_shortfall: Optional[ShiftShortfallModel] = None
    grade_fe_pct: Optional[float] = 62.5
    primary_delay_reason: Optional[str] = "None"
    pit_section: Optional[str] = "North Pit"

class DailyProductionPayload(BaseModel):
    dataset: str
    period: str
    unit: Optional[str] = None
    summary: Optional[Dict[str, Any]] = None
    target_total_tons: Optional[int] = None
    actual_total_tons: Optional[int] = None
    cum_shortfall_tons: Optional[int] = None
    records: List[ProductionRecord]
    source: Optional[str] = None

class ShortfallForecastResponse(BaseModel):
    status: str = "success"
    data_source: str
    timestamp: str
    production_forecast: DailyProductionPayload
