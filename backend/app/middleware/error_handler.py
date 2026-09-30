import logging
from datetime import datetime
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError, HTTPException

from app.schemas.common import OreBitAPIException, APIErrorResponse, APIErrorDetail

logger = logging.getLogger("orebit.error_handler")

def register_exception_handlers(app: FastAPI) -> None:
    """Registers centralized exception handlers for structured error responses."""

    @app.exception_handler(OreBitAPIException)
    async def orebit_api_exception_handler(request: Request, exc: OreBitAPIException):
        logger.warning(f"OreBit API Exception [{exc.code}] on {request.url.path}: {exc.message}")
        error_response = APIErrorResponse(
            status="error",
            error=APIErrorDetail(
                code=exc.code,
                message=exc.message,
                details=exc.details
            ),
            timestamp=datetime.now().isoformat()
        )
        return JSONResponse(
            status_code=exc.status_code,
            content=error_response.model_dump()
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        logger.warning(f"Request Validation Error on {request.url.path}: {exc.errors()}")
        formatted_errors = []
        for err in exc.errors():
            loc = " -> ".join(str(l) for l in err.get("loc", []))
            formatted_errors.append({
                "field": loc,
                "msg": err.get("msg"),
                "type": err.get("type")
            })

        error_response = APIErrorResponse(
            status="error",
            error=APIErrorDetail(
                code="VALIDATION_ERROR",
                message="Input validation failed for query parameters or request body",
                details=formatted_errors
            ),
            timestamp=datetime.now().isoformat()
        )
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content=error_response.model_dump()
        )

    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException):
        logger.warning(f"HTTP Exception [{exc.status_code}] on {request.url.path}: {exc.detail}")
        error_response = APIErrorResponse(
            status="error",
            error=APIErrorDetail(
                code=f"HTTP_{exc.status_code}",
                message=str(exc.detail)
            ),
            timestamp=datetime.now().isoformat()
        )
        return JSONResponse(
            status_code=exc.status_code,
            content=error_response.model_dump()
        )

    @app.exception_handler(404)
    async def custom_404_handler(request: Request, exc: Exception):
        logger.warning(f"Route Not Found: {request.url.path}")
        error_response = APIErrorResponse(
            status="error",
            error=APIErrorDetail(
                code="NOT_FOUND",
                message=f"The requested API route '{request.url.path}' was not found on OreBit server."
            ),
            timestamp=datetime.now().isoformat()
        )
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content=error_response.model_dump()
        )

    @app.exception_handler(Exception)
    async def generic_exception_handler(request: Request, exc: Exception):
        logger.error(f"Unhandled Exception on {request.url.path}: {exc}", exc_info=True)
        error_response = APIErrorResponse(
            status="error",
            error=APIErrorDetail(
                code="INTERNAL_SERVER_ERROR",
                message="An unexpected server error occurred while processing your request.",
                details={"path": str(request.url.path)}
            ),
            timestamp=datetime.now().isoformat()
        )
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=error_response.model_dump()
        )
