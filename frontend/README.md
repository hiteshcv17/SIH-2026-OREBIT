# ⚒️ OreBit: AI-Powered Mining Intelligence Command Center (Frontend)

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=flat&logo=leaflet)](https://leafletjs.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.12-22B5BF?style=flat)](https://recharts.org/)
[![Vitest](https://img.shields.io/badge/Vitest-1.6-6E9F18?style=flat&logo=vitest)](https://vitest.dev/)

> **OreBit Frontend Web Application** built for the **Smart India Hackathon (SIH 2026)**. Unifies 2D Leaflet spatial prospectivity mapping, 3D subsurface depth strata profiling, 48–72h production shortfall forecasting charts, equipment telematics health gauges, and prescriptive blasting feeds into an industrial dark-mode dual-persona command center.

---

## 🌟 Key Features & Modules

### 1. Dual-Persona Command Center
- **Executive HQ View**: Focuses on national target run-rates, overall compliance %, and strategic financial shortfall risks.
- **Supervisor Field View**: Focuses on shift ROM yield, haul truck queue delays, and immediate machine alerts.
- **Verification Badging**: `<StatusPill>` badges distinguishing backend ML models (**Implemented** in green) from optimization scenarios (**Proposed** in gold).

### 2. GIS Reserve Map & 3D Downhole Viewer
- **2D Leaflet GIS Map**: High-resolution spatial mapping with **Esri World Imagery (Satellite)** and **Esri Dark Gray Canvas** basemaps (100% free of API key watermarks).
- **3D Downhole Profile**: Vertical depth strata visualization showing Fe/Mn grade %, SiO2%, and Al2O3% down to 200m depth across overburden, hematite, blue dust, and footwall layers.
- **Explainable AI (XAI)**: Modal detailing the **CNN + Spatial Random Forest** prospectivity model (**94.2% ROC-AUC score**).

### 3. 48–72h Production Shortfall Tracker
- **Target vs. Yield Composed Chart**: Interactive Recharts visualization comparing daily production quotas against actual tonnage yield with historical trendlines.
- **7-Day Risk Heatmap**: Section-by-section shortfall risk matrix.
- **Shortfall XAI Modal**: Details the **CNN-LSTM + XGBoost** hybrid model (**91.8% R² score**).

### 4. Equipment Telematics & PHM Health
- **Remaining Useful Life (RUL) Gauges**: Real-time asset health monitoring for excavators, haul trucks, crushers, and drill rigs.
- **Failure Alarms**: Flagging assets with critical maintenance needs (e.g. **Drill Rig `DR-09`** <42h RUL).
- **Fleet Dispatch Board**: Shovel cycle times and primary crusher queue tracking.

### 5. Prescriptive Blasting Feed
- AI-driven explosive powder factor optimization (e.g., 0.35 kg/t reduced to 0.29 kg/t) maintaining target **P80 crusher rock fragmentation**.

---

## 💻 Local Installation & Setup

### Prerequisites
- **Node.js**: `20.x+`
- **npm**: `10.x+`

### Quick Start
```bash
# Install dependencies
npm install --legacy-peer-deps

# Start Vite dev server
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

---

## 🧪 Testing & Verification

```bash
# Run Vitest unit tests
npm run test

# Run production build
npm run build
```

---

## 📜 License
Developed for the **Smart India Hackathon (SIH 2026)** under the MIT License.
