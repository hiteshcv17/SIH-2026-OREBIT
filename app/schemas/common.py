from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from datetime import datetime

class APIErrorDetail(BaseModel):
    code: str
    message: str
    details: Optional[Any] = None

class APIErrorResponse(BaseModel):
    status: str = "error"
    error: APIErrorDetail
    timestamp: str

class RootResponse(BaseModel):
    message: str
    status: str
    service: str
    version: str
    database: Optional[str] = None
    database_connected: Optional[bool] = None
    timestamp: str

class HealthResponse(BaseModel):
    status: str
    uptime: str
    timestamp: str
    database: Dict[str, Any]

# Custom Exception Hierarchy
class OreBitAPIException(Exception):
    def __init__(self, message: str, status_code: int = 400, code: str = "BAD_REQUEST", details: Optional[Any] = None):
        self.message = message
        self.status_code = status_code
        self.code = code
        self.details = details
        super().__init__(message)

class ResourceNotFoundException(OreBitAPIException):
    def __init__(self, message: str = "Requested resource not found", details: Optional[Any] = None):
        super().__init__(message=message, status_code=404, code="NOT_FOUND", details=details)

class InvalidFilterException(OreBitAPIException):
    def __init__(self, message: str = "Invalid query filter parameters", details: Optional[Any] = None):
        super().__init__(message=message, status_code=422, code="INVALID_FILTER", details=details)
