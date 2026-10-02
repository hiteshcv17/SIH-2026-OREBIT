from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any

class BlastLog(BaseModel):
    model_config = ConfigDict(extra="allow")

    blast_id: str = Field(..., description="Unique blast pattern identifier")
    pit_zone: Optional[str] = None
    bench_location: Optional[str] = None
    blast_date: Optional[str] = None
    timestamp: Optional[str] = None
    powder_factor_kg_ton: Optional[float] = None
    powder_factor_kg_t: Optional[float] = None
    target_powder_factor: Optional[float] = 0.30
    p80_fragmentation_cm: Optional[float] = None
    target_p80_cm: Optional[float] = 25.0
    overbreak_pct: Optional[float] = 4.2
    flyrock_distance_m: Optional[float] = None
    status: str = Field(..., description="Fragmentation outcome classification")
    ai_recommendation: Optional[str] = "Maintain current powder factor baseline."
    fragmentation_results: Optional[Dict[str, Any]] = None

class BlastAnalysisPayload(BaseModel):
    model_config = ConfigDict(extra="allow")

    dataset: str
    measurement_type: Optional[str] = None
    recent_blasts: Optional[List[BlastLog]] = None
    blast_records: Optional[List[BlastLog]] = None
    source: Optional[str] = None

class BlastRecommendationsResponse(BaseModel):
    status: str = "success"
    data_source: str
    timestamp: str
    blast_analysis: BlastAnalysisPayload
