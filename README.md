# AquaCop · Satellite Waterbody Sentinel & Encroachment Response System

> **Government of Tamil Nadu Strategic Solution**  
> Near real-time satellite surveillance, automated threat classification, and statutory Section 133 CrPC eviction enforcement for Tamil Nadu waterbodies.

---

## 📌 Problem Statement (Official Government Brief)
> *"Tamil Nadu is losing its waterbodies at an alarming rate. Encroachments (illegal constructions, land filling, sand mining and waste dumping) go undetected for months because: (1) traditional systems rely on public complaints, which are often unreported or unnoticed; (2) manual inspection is slow, costly and geographically limited; (3) by the time authorities act, the damage is irreversible. Consequences: flooding during heavy rains, reduced groundwater recharge, and permanent loss of water sources for future generations."*

---

## 🚀 Key Features

### 1. Multi-Spectral Satellite Sentinel (Near Real-Time Revisit)
- Scans every monitored lake and marshland automatically every ~5 days using **ESA Copernicus Sentinel-2 MSI** (10m resolution) and **Copernicus 30m DEM**.
- Historical 38-year water spread baseline from the **European Commission Joint Research Centre (JRC 1984–2021)**.

### 2. Four Monitored Threat Change Classes
With honest, scientifically grounded confidence tags:
1. **Illegal Construction**: NDBI increase + MNDWI negative transition + OpenStreetMap building footprint polygons — *High Confidence*.
2. **Land Filling & Debris Infill**: Water spread to bare soil (MNDWI >0.30 to <-0.10 across 2 passes) — *High Confidence*.
3. **Sand Mining**: River/lake bed excavation pits via Sentinel-2 Bare Soil Index (BSI) + Sentinel-1 SAR surface roughness — *Medium Confidence (Requires Field Check)*.
4. **Waste Dumping**: Perimeter discoloration & riparian edge gradient anomalies (Band 04 / Band 08 ratio) — *Candidate, Verify (Best confirmed by citizen reports)*.

### 3. Detection Delay Metric (Audit Trail)
- **Centrepiece Audit**: Tracks when change first appeared in satellite imagery vs when AquaCop flagged it vs when officers acted vs when citizen grievances arrived.
- **Average Satellite Flag Lag**: ~1.75 days from orbit pass.
- **Average Citizen Grievance Lag**: ~64.3 days after physical structures have already been erected.
- **Enforcement Lead Time**: ~62.5 days saved.
- *"A complaint-based system finds problems after they are visible to residents; satellite monitoring finds them when the first change appears."*

### 4. Officer Enforcement Console
- Role-based authentication (`Officer` / `Analyst` / `Citizen`).
- Real-time intrusion triggers ranked by **Disaster Risk Score** (0–100) linked to downstream low-lying buildings in flood zones.
- Automated generation of court-ready **Section 133 CrPC Statutory Eviction Notices** and PDF legal dossier packs.

### 5. Citizen Water Guardians Portal
- Full-screen complaint filing with GPS triangulation, photo evidence uploads, and cadastral survey numbers.
- Automated satellite cross-checking against orbit passes.
- Public tracking of complaint resolution status.

### 6. Dual Platform Architecture
- **FastAPI + Jinja2/HTMX + Leaflet**: Dedicated Problem & Solution strategic executive briefing with English / தமிழ் bilingual toggle.
- **Next.js 16 (App Router) + React + Tailwind CSS**: Interactive mission control GIS console, flood simulator, and analytics dashboard.

---

## 🛠️ System Architecture

```
DS-AquaCop/
├── backend/
│   ├── main.py                  # FastAPI application & REST endpoints
│   ├── templates/
│   │   └── problem_solution.html# Jinja2 + HTMX + Leaflet bilingual strategic view
│   ├── geo/
│   │   ├── threats.py           # 4 threat classes, detection delay audit & TN stats
│   │   ├── jrc_water.py         # EC JRC historical surface water processor
│   │   ├── weather.py           # Meteorological & flood risk correlation
│   │   └── tiles.py             # Satellite map tile proxy
│   ├── reports/
│   │   └── pdf_generator.py     # Section 133 CrPC legal PDF dossier generator
│   └── scripts/
│       └── seed_db.py           # SQLite database seeding
└── frontend/
    ├── src/
    │   ├── app/                 # Next.js App Router (page.tsx)
    │   └── components/
    │       ├── ProblemSolutionView.tsx # Executive problem-solution interface
    │       ├── OfficerPortal.tsx       # Enforcement command & threat filters
    │       ├── CitizenPortal.tsx       # Citizen grievance intake & tracking
    │       ├── EncroachmentHeatmap.tsx # Satellite GIS Leaflet viewer
    │       ├── FloodSimulator.tsx      # Monsoon runoff simulation
    │       └── AnalyticsDashboard.tsx  # Basin statistics & telemetry
```

---

## ⚡ Quick Start

### 1. Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 2. Backend Setup (FastAPI)
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python scripts/seed_db.py
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
- Problem & Solution Executive Brief: `http://localhost:8000/problem-solution`
- API Swagger Docs: `http://localhost:8000/docs`

### 3. Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```
- Next.js Mission Control: `http://localhost:3000`
---

## 🐳 Cloud-Native & DevOps Architecture (Docker, Nginx & CI/CD)

AquaCop includes an enterprise-grade, locally deployable container architecture that requires **zero cloud costs or paid third-party infrastructure**.

### 1. Prerequisites
- **Windows 11** with PowerShell
- **Docker Desktop** (with WSL 2 enabled)
- For native development without Docker: Python 3.12+ and Node.js 20+

### 2. Environment Configuration
Copy the safe template to configure your local environment:
```powershell
Copy-Item .env.example .env
```
*(The `.env` file is excluded from git tracking to prevent secret leaks.)*

### 3. Running with Docker Compose (Recommended)

1. **Start Docker Desktop** on Windows 11 and ensure Docker Engine is running.
2. In PowerShell, from the project root directory:

```powershell
# Build and run all services in detached mode
docker compose up -d --build

# Inspect the status and health of all containers
docker compose ps

# View live application and reverse-proxy logs
docker compose logs -f

# Safe shutdown (preserves your SQLite database and satellite cache)
docker compose down
```

### 4. Verified Service Endpoints & Health Probes

| Service | Local URL | Health Check Probe | Container Routing |
| :--- | :--- | :--- | :--- |
| **Nginx Reverse Proxy** | `http://localhost` | `http://localhost/nginx-health` | Port 80 -> Frontend & Backend |
| **Next.js Frontend** | `http://localhost:3000` | Native HTTP 200 Probe | Direct port 3000 |
| **FastAPI Backend** | `http://localhost:8000` | `http://localhost:8000/api/health` | Direct port 8000 |
| **Executive Briefing** | `http://localhost/problem-solution` | Template Response Probe | Reverse proxied via Nginx |
| **Interactive API Docs**| `http://localhost:8000/docs` | OpenAPI Schema Probe | FastAPI Swagger |

### 5. Persistent Storage & Database Backups
All SQLite records (`aquacop.db`) and satellite GeoTIFF analytical masks are stored in named Docker volumes, ensuring data survives container restarts and upgrades:
- Database Volume: `aquacop-backend-data` (`/app/data`)
- Cache Volume: `aquacop-backend-cache` (`/app/cache`)

To create a quick manual backup of your database:
```powershell
docker compose cp backend:/app/data/aquacop.db ./backend/aquacop_backup.db
```

### 6. Automated Testing & CI/CD Pipeline
AquaCop is equipped with GitHub Actions (`.github/workflows/ci.yml`) triggering on pushes and pull requests:
- **Backend Tests**: `python -m unittest discover -s tests -p "test_*.py"` (health, threats, telemetry, and waterbody endpoints).
- **Frontend Tests**: `npm test` & `npx tsc --noEmit` & `npm run build`.
- **Container Verification**: Multi-stage image builds for `aquacop-backend`, `aquacop-frontend`, and `aquacop-proxy`.

Run tests locally anytime:
```powershell
# Run backend test suite
cd backend; python -m unittest discover -s tests -p "test_*.py"; cd ..

# Run frontend test suite
cd frontend; npm test; cd ..
```


## 📜 Scientific & Data Integrity Disclosure
- **Satellite Revisit Frequency**: Sentinel-2 MSI constellation provides imagery every ~5 days.
- **Indicative Boundaries**: Waterbody boundaries are indicative until official Revenue Department FMB records are loaded.
- **Mandatory Field Verification**: All satellite detections are flagged as *likely* and require field inspection before statutory eviction.
- **Zero Invented Numbers**: Strictly sourced from Copernicus, JRC Global Surface Water, OpenStreetMap, and Tamil Nadu Water Resources Department.

---

## ⚖️ License
GovTech Innovation Initiative · Built for the Department of Water Resources and Revenue Administration, Government of Tamil Nadu.
