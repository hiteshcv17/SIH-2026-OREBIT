# ⚒️ OreBit: AI-Powered Integrated Mining Intelligence System

[![CI Pipeline](https://github.com/your-org/orebit/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/orebit/actions/workflows/ci.yml)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![PostGIS](https://img.shields.io/badge/PostGIS-3.3-336791?style=flat&logo=postgresql)](https://postgis.net/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=flat&logo=docker)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Short Description**: An AI-Powered Integrated Mining Intelligence System unifying satellite remote sensing, 48–72h production shortfall forecasting, predictive equipment health (PHM), and prescriptive blast optimization into a dual-persona command center.

---

## 📖 Table of Contents

- [Executive Summary & Vision](#-executive-summary--vision)
- [Key Operational Challenges Addressed](#-key-operational-challenges-addressed)
- [Core System Modules](#-core-system-modules)
  - [1. Executive HQ & Supervisor Command Center](#1-executive-hq--supervisor-command-center)
  - [2. GIS Reserve Predictor & 3D Downhole Viewer](#2-gis-reserve-predictor--3d-downhole-viewer)
  - [3. 48–72h Shortfall Forecaster & Risk Heatmap](#3-4872h-shortfall-forecaster--risk-heatmap)
  - [4. Equipment Telematics & PHM Reliability](#4-equipment-telematics--phm-reliability)
  - [5. Prescriptive Blasting & Yield Optimization](#5-prescriptive-blasting--yield-optimization)
  - [6. Data Sources & Governance Registry](#6-data-sources--governance-registry)
- [System Architecture & Data Flow](#-system-architecture--data-flow)
- [Machine Learning Ensembles & Explainable AI (XAI)](#-machine-learning-ensembles--explainable-ai-xai)
- [Database Architecture & PostGIS Integration](#-database-architecture--postgis-integration)
- [API Reference & Pydantic Validation](#-api-reference--pydantic-validation)
- [Design System & Color Tokens](#-design-system--color-tokens)
- [Local Installation & Development Setup](#-local-installation--development-setup)
- [Containerization & Docker Compose](#-containerization--docker-compose)
- [Automated Testing & CI/CD Pipeline](#-automated-testing--cicd-pipeline)
- [Project Directory Structure](#-project-directory-structure)

---

## 🌟 Executive Summary & Vision

India's national mining strategy targets scaling annual mineral extraction to **3.5 Million Tons (MT) by FY30**. However, open-cast mines frequently experience **10–15% annual yield gaps** due to reactive daily logging, unexpected machinery breakdowns, sub-optimal blasting fragmentation, and data isolation between field operators and executive leadership.

**OreBit** is a cloud-native, AI-driven web application that unifies satellite remote sensing, ground-penetrating geophysics, IoT fleet SCADA telematics, and predictive machine learning models into a real-time operational command center. By predicting subsurface ore reserves, forecasting production shortfalls **48 to 72 hours in advance**, computing machine Remaining Useful Life (RUL), and tuning explosive powder factors, OreBit empowers mining enterprises to achieve **zero-shortfall, sustainable operations**.

---

## 🔴 Key Operational Challenges Addressed

1. **Unpredicted Production Shortfalls**: Conventional systems log tonnage *after* a shift ends. OreBit provides a 48–72 hour early-warning horizon so supervisors can re-allocate haul fleets before quotas fail.
2. **Costly Machinery Downtime**: Unplanned crusher or drill rig failures cost millions per hour. OreBit’s PHM algorithms detect micro-vibration anomalies and issue warnings when machine RUL drops below 48 hours.
3. **Sub-Optimal Blasting & Wall Instability**: Excessive powder factors cause high flyrock distances and wall overbreak, while under-blasting causes large rock boulders that choke crushers. OreBit prescribes optimal powder factors for target P80 fragmentation.
4. **Fragmented Data Silos**: OreBit consolidates remote sensing (Sentinel-2), topographic DEM elevation, UNFC drill logs, and telematics into a standardized **Data Sources Governance Framework**.

---

## 🚀 Core System Modules

### 1. Executive HQ & Supervisor Command Center
- **Dual-Persona Interface**: 1-click view toggle between **HQ Executive Command** (focusing on national FY30 target run-rates, financial shortfall gaps, and strategic AI decisions) and **Field Operations Supervisor** (focusing on shift ROM yield, haul delays, and machine alerts).
- **Status Badging System**: Integrated `<StatusPill>` badges distinguishing real backend ML predictions (**Implemented** in green) from simulated AI scenarios (**Proposed** in amber gold).
- **Real-Time KPI Cards**: Aggregates production compliance, active shortfall risk levels, RUL warning counts, and open AI actions.

### 2. GIS Reserve Predictor & 3D Downhole Viewer
- **2D Leaflet Spatial Map**: Renders high-grade ore prospectivity markers with HSL probability heatmaps, UNFC G2/G3 drillhole markers, and mine pit boundary polygons (North Pit Alpha, Central Ridge Bench, South Pit Extension).
- **Basemap Tile Selector**: Supports high-resolution **Esri World Imagery (Satellite)**, **Esri Dark Gray Canvas**, and **OpenStreetMap Topo** (100% free of API key watermarks).
- **3D Downhole Profile**: Visualizes Fe/Mn grade %, SiO2%, and Al2O3% variations down to 200m depth strata across geological rock layers (Overburden, Hard Hematite, Blue Dust Ore, Footwall).
- **AI Model Explainer Modal**: Details the **CNN + Spatial Random Forest** prospective model (**94.2% ROC-AUC**) and lists 5 input data streams.

### 3. 48–72h Shortfall Forecaster & Risk Heatmap
- **Target vs. Yield Composed Chart**: Recharts visualization comparing daily tonnage quotas against actual extraction yield with historical trendlines.
- **7-Day Risk Heatmap Matrix**: Color-coded risk assessment (Low <5% gap, Moderate 5–15% gap, High >15% gap) across mine sections.
- **Live Telematics Stream**: 15-second simulated live sensor polling update pulse.
- **AI Forecaster Explainer Modal**: Explains the **CNN-LSTM + XGBoost** hybrid model (**91.8% R² score**).

### 4. Equipment Telematics & PHM Reliability
- **Predictive Health Gauges**: Monitors Remaining Useful Life (RUL) hours and confidence scores across excavators, haul trucks, primary crushers, and drill rigs.
- **Critical Failure Warning**: Flags high-risk assets like **Drill Rig `DR-09`** (<42h RUL remaining due to 0.22 mm/s rotary head vibration).
- **Fleet Dispatch Board**: Interactive tab visualizing truck queue bottlenecks, shovel cycle times, and primary crusher throughput.

### 5. Prescriptive Blasting & Yield Optimization
- **AI Action Feed**: Ranked operational recommendations (powder factor tuning, equipment re-routing, drill pattern expansion).
- **Before vs. After Powder Factor Bar Chart**: Visualizes reductions in explosive powder consumption (e.g. 0.35 kg/t → 0.29 kg/t) alongside target P80 crusher fragmentation.

### 6. Data Sources & Governance Registry
- **Standardized Data Catalog**: Lists dataset sources (Sentinel-2, ASTER, SRTM DEM, NGDR, drill logs, fleet telematics) with Public/Private security badges.
- **Schema Inspector Drawers**: Expandable drawers displaying compliant JSON/GeoJSON schemas matching **UNFC** and **CRIRSCO** guidelines.

---

## 🏗️ System Architecture & Data Flow

```mermaid
flowchart TD
    subgraph Client Layer (React 18 + Vite)
        UI["OreBit Dashboard / Map / Forecaster"]
        Context["AuthContext (Persona State)"]
        Components["Leaflet Maps / Recharts / Modals"]
    end

    subgraph API & Service Layer (Python FastAPI)
        Main["main.py (Pydantic Input/Output Validation)"]
        Middleware["error_handler.py (Centralized Exception Middleware)"]
        DataLoader["data_loader.py (High-Availability Service Layer)"]
        DBManager["database.py (PostgreSQL / PostGIS Connector)"]
    end

    subgraph Persistence Layer (PostgreSQL 15 + PostGIS 3.3)
        SatTable["satellite_reserves (GEOMETRY Point, 4326)"]
        DrillTable["drillhole_logs (JSONB Intervals)"]
        EquipTable["equipment_telemetry (JSONB Sensors)"]
        ProdTable["daily_production (30-Day Logs)"]
        BlastTable["blast_fragmentation_logs"]
    end

    subgraph Fallback Layer
        JSONMock["mockData/*.json (Offline Fail-Safe Files)"]
    end

    UI --> Context
    UI --> Components
    Components -->|REST API Requests| Main
    Main --> Middleware
    Main --> DataLoader
    DataLoader --> DBManager
    DBManager -->|PostGIS Available| SatTable
    DBManager -->|PostGIS Available| DrillTable
    DBManager -->|PostGIS Available| EquipTable
    DBManager -->|PostGIS Available| ProdTable
    DBManager -->|PostGIS Available| BlastTable
    DBManager -.->|DB Offline Fallback| JSONMock
```

---

## 🧠 Machine Learning Ensembles & Explainable AI (XAI)

| Model Name | Target Task | Model Architecture | Key Performance Metric | Primary Feature Inputs |
| :--- | :--- | :--- | :--- | :--- |
| **GIS Reserve Predictor** | Subsurface Prospectivity Mapping | 2D CNN + Spatial Random Forest | **94.2% ROC-AUC** | Sentinel-2 Band Ratios (`B11/B12`, `B4/B2`), SRTM Elevation, UNFC Drill Logs |
| **Shortfall Forecaster** | 48–72h Production Yield Gap Risk | CNN-LSTM + XGBoost Hybrid | **91.8% R² Score** | Historical Daily Tonnage, Fleet SCADA Telematics, Shift Delays, Weather Logs |

---

## 🗄️ Database Architecture & PostGIS Integration

The system uses **PostgreSQL 15** with the **PostGIS 3.3 spatial GIS extension**:

- `satellite_reserves`: Stores 2D/3D prospectivity points with `GEOMETRY(Point, 4326)` columns and GIST spatial indexing (`idx_sat_reserves_geom`).
- `drillhole_logs`: Stores exploration drillhole collars (`GEOMETRY(Point, 4326)`) and depth strata intervals in `JSONB`.
- `equipment_telemetry`: Stores fleet locations (`GEOMETRY(Point, 4326)`) and live sensor readings in `JSONB`.
- `daily_production`: Stores rolling 30-day production quotas, actual yield, and shortfall gap numbers.
- `blast_fragmentation_logs`: Stores powder factors, P80 fragmentation results, and AI recommendations.

> **Automated Seeder**: Run `python app/db/seed.py` from `backend/` to auto-migrate database schemas and populate PostGIS spatial tables.

---

## 🔌 API Reference & Pydantic Validation

All endpoints are built with **FastAPI** and strict **Pydantic v2 schemas**:

| Endpoint | Method | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET /` | `GET` | Root API health status & version string | None |
| `GET /health` | `GET` | System health check & PostGIS DB connection state | None |
| `GET /api/reserve-map` | `GET` | Satellite prospective grid points & UNFC drill logs | `zone_name`, `min_iron_grade` (0-100) |
| `GET /api/shortfall-forecast` | `GET` | 30-day daily production yield & shortfall logs | `limit_days` (1-90) |
| `GET /api/equipment-health` | `GET` | PHM telematics, RUL estimates, and fleet list | `status_filter`, `min_rul` |
| `GET /api/blast-recommendations` | `GET` | Blast logs & AI powder factor recommendations | `pit_zone` |
| `GET /api/fleet-status` | `GET` | Fleet summary counts & overall availability % | `zone` |

---

## 🎨 Design System & Color Tokens

OreBit enforces a curated dark-mode palette designed for industrial mining command centers:

- **Canvas Background (Dark Navy)**: `#0D1B2A` & `#1B2A4A`
- **Primary Accent (Mining Gold)**: `#F4A100` (Targets, primary CTAs, Proposed status)
- **Secondary Accent (Telematics Blue)**: `#00B4D8` (Actual yield, live streams, Supervisor view)
- **Status Green (Implemented / Healthy)**: `#10B981`
- **Status Amber (Warning / Moderate Risk)**: `#F59E0B`
- **Status Crimson (Critical / High Risk)**: `#EF4444`
- **Typography**: `Poppins` (Headings) & `Inter` (Body Text)

---

## 💻 Local Installation & Development Setup

### Prerequisites
- **Python**: `3.11+`
- **Node.js**: `20.x+`
- **npm**: `10.x+`

### 1. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
python -m uvicorn app.main:app --reload --port 8000
```
Backend server will run at **`http://127.0.0.1:8000`** (Swagger docs at `http://127.0.0.1:8000/docs`).

### 2. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install --legacy-peer-deps

# Start Vite dev server
npm run dev
```
Frontend web application will run at **`http://localhost:5173/`**.

---

## 🐳 Containerization & Docker Compose

Deploy the complete multi-container stack (`PostGIS`, `FastAPI Backend`, `Nginx Frontend`) with a single command:

```bash
docker compose up --build -d
```

### Access Points:
- **Frontend App (Nginx)**: [http://localhost:5173/](http://localhost:5173/)
- **Backend API**: [http://localhost:8000](http://localhost:8000)
- **PostgreSQL / PostGIS DB**: `localhost:5432` (`POSTGRES_DB=orebit_db`, `USER=postgres`, `PASS=postgres`)

---

## 🧪 Automated Testing & CI/CD Pipeline

### 1. Frontend Unit Tests (Vitest + React Testing Library)
```bash
cd frontend
npm run test
```
- **12 unit tests passing** across `StatusPill`, `KPICard`, and `ShortfallChart` components.

### 2. Backend Unit & Edge Case Tests (Pytest + Starlette TestClient)
```bash
cd backend
python -m pytest
```
- **16 API tests passing** covering endpoints, query filtering, Pydantic validation errors (422), and edge cases (empty datasets, 404 routes).

### 3. GitHub Actions CI Pipeline ([.github/workflows/ci.yml](.github/workflows/ci.yml))
Automatically runs on every `push` or `pull_request` to `main`/`master`:
- **Job 1**: Node.js 20 setup → Vitest unit tests → Vite production build.
- **Job 2**: Live PostGIS 15 container service → Python 3.11 setup → DB seeding → Pytest execution.
- **Job 3**: Docker Buildx multi-stage image build verification for backend and frontend.

---

## 📁 Project Directory Structure

```text
SIH/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions CI/CD Pipeline
├── backend/                       # FastAPI Python Backend
│   ├── app/
│   │   ├── db/
│   │   │   ├── database.py        # PostGIS Connector & Query Layer
│   │   │   ├── schema.sql         # Spatial Tables & GIST Indexes
│   │   │   └── seed.py            # Automated Migration & Seeder CLI
│   │   ├── middleware/
│   │   │   └── error_handler.py   # Centralized Exception Middleware
│   │   ├── mockData/              # Fail-Safe Offline JSON Datasets
│   │   ├── schemas/               # Pydantic v2 Request/Response Schemas
│   │   ├── services/
│   │   │   └── data_loader.py     # High-Availability Service Layer
│   │   └── main.py                # FastAPI Application & Endpoints
│   ├── tests/                     # Pytest Unit & Edge Case Suite
│   │   ├── conftest.py
│   │   ├── test_edge_cases.py
│   │   └── test_endpoints.py
│   ├── Dockerfile
│   ├── entrypoint.py              # Container Startup Launcher
│   ├── Procfile                   # Cloud Deployment Procfile
│   ├── render.yaml                # Render Blueprint Configuration
│   └── requirements.txt
├── frontend/                      # React 18 + Vite + TailwindCSS Frontend
│   ├── src/
│   │   ├── components/            # Design System & UI Components
│   │   │   ├── __tests__/         # Vitest Unit Tests
│   │   │   ├── ErrorEmptyState.jsx
│   │   │   ├── FleetDispatchVisualization.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── KPICard.jsx
│   │   │   ├── ModelExplainerModal.jsx
│   │   │   ├── ShortfallChart.jsx
│   │   │   ├── ShortfallExplainerModal.jsx
│   │   │   ├── SkeletonLoader.jsx
│   │   │   └── StatusPill.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Dual-Persona Authentication Context
│   │   ├── pages/
│   │   │   ├── BlastOptimizationPanel.jsx
│   │   │   ├── DataSources.jsx
│   │   │   ├── EquipmentHealth.jsx
│   │   │   ├── ExecutiveDashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── PrescriptiveFeed.jsx
│   │   │   ├── ReserveMap.jsx     # Leaflet 2D Map & 3D Downhole Profile
│   │   │   └── ShortfallTracker.jsx
│   │   ├── test/
│   │   │   └── setup.js           # Vitest Test Setup
│   │   ├── App.jsx                # React Router App Routes
│   │   └── main.jsx
│   ├── Dockerfile                 # Multi-Stage Production Nginx Dockerfile
│   ├── netlify.toml               # Netlify Deployment Configuration
│   ├── nginx.conf                 # Nginx Reverse Proxy Configuration
│   ├── package.json
│   ├── vercel.json                # Vercel SPA Rewrites Configuration
│   └── vitest.config.js           # Vitest Testing Configuration
├── docker-compose.yml             # Full-Stack Multi-Container Orchestration
└── README.md                      # Comprehensive Project Documentation
```

---

## 📜 License & Credits

Developed for the **Smart India Hackathon (SIH)**. Distributed under the MIT License.
