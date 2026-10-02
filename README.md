# ⚙️ OreBit: AI-Powered Mining Intelligence System (Backend API)

[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat&logo=python)](https://www.python.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![PostGIS](https://img.shields.io/badge/PostGIS-3.3-336791?style=flat&logo=postgresql)](https://postgis.net/)
[![Pytest](https://img.shields.io/badge/Pytest-8.0-0A9EDC?style=flat&logo=pytest)](https://docs.pytest.org/)
[![Pydantic](https://img.shields.io/badge/Pydantic-v2-E92063?style=flat&logo=pydantic)](https://docs.pydantic.dev/)

> **OreBit FastAPI Backend Service** built for the **Smart India Hackathon (SIH 2026)**. Provides RESTful API endpoints for spatial prospectivity queries, 48–72h production shortfall prediction models, equipment SCADA telematics & PHM Remaining Useful Life (RUL) calculations, prescriptive blast powder factor optimization, and automated PostGIS spatial database migrations with fail-safe offline fallback.

---

## 🚀 Key Modules & Capabilities

### 1. GIS Spatial Prospectivity & PostGIS Database
- **PostGIS Spatial Points**: Indexed coordinates using `GEOMETRY(Point, 4326)` and GIST spatial indexes (`idx_sat_reserves_geom`).
- **UNFC Drillhole Strata**: Exploration drillhole logs with JSONB depth strata intervals down to 200m depth.

### 2. Pydantic v2 Schemas & Data Validation
- Strict request/response validation for Reserve Points, Shortfall Forecasts, Equipment Telematics, and Blast Recommendations in `app/schemas/`.

### 3. Centralized Exception Handling Middleware
- Starlette middleware (`app/middleware/error_handler.py`) providing standard error responses (422, 500, 404) with correlation tracking.

### 4. High-Availability DataLoader Service
- Dual-mode data loader (`app/services/data_loader.py`): Queries live **PostgreSQL / PostGIS** database when online, and automatically falls back to offline **JSON mock datasets** if database connection is unavailable.

---

## 🔌 API Endpoints Summary

| Endpoint | Method | Description | Parameters |
| :--- | :--- | :--- | :--- |
| `GET /` | `GET` | Root API health status & version string | None |
| `GET /health` | `GET` | System health check & PostGIS DB connection status | None |
| `GET /api/reserve-map` | `GET` | Satellite prospective grid points & UNFC drill logs | `zone_name`, `min_iron_grade` (0-100) |
| `GET /api/shortfall-forecast` | `GET` | Daily production yield & shortfall risk logs | `limit_days` (1-90) |
| `GET /api/equipment-health` | `GET` | PHM telematics, RUL estimates, and fleet list | `status_filter`, `min_rul` |
| `GET /api/blast-recommendations` | `GET` | Blast logs & AI powder factor recommendations | `pit_zone` |
| `GET /api/fleet-status` | `GET` | Fleet summary counts & overall availability % | `zone` |

---

## 💻 Local Setup & Execution

### Prerequisites
- **Python**: `3.11+`

### 1. Environment Setup
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Start FastAPI Server
```bash
python -m uvicorn app.main:app --reload --port 8000
```
Server runs at **`http://127.0.0.1:8000`** (Swagger docs at `http://127.0.0.1:8000/docs`).

### 3. Database Migration & Seeding (Optional PostGIS)
```bash
python app/db/seed.py
```

---

## 🧪 Automated Testing

```bash
# Run Pytest suite (16 tests passing)
pytest
```

---

## 📜 License
Developed for the **Smart India Hackathon (SIH 2026)** under the MIT License.
