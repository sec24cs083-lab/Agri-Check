# AgriCheck – AI‑Powered Smart Farming Assistant

![AgriCheck Logo](file:///C:/Users/DELL/OneDrive/Desktop/AGRICHECK%20SYSTEMS/agricheck-pwa/assets/logo_placeholder.png)

**AgriCheck** is a Progressive Web App (PWA) built for the **Smart India Hackathon 2026**. It showcases an end‑to‑end AI‑driven workflow for Indian farmers, including:
- AI disease detection (MobileNetV3 mock model)
- Real‑time sensor dashboard (ESP32 demo data)
- Weather advisory (mock Open‑Meteo data)
- Knowledge‑graph visualisation
- Continual‑learning feedback loop
- Bilingual UI (English & Tamil)
- Offline‑first PWA support

---

## Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Installation & Development](#installation--development)
5. [Environment Variables](#environment-variables)
6. [Running Tests](#running-tests)
7. [Project Structure](#project-structure)
8. [Sample Data](#sample-data)
9. [License](#license)

---

## Features
- **Crop Scan** – Upload a leaf image and receive a disease prediction with confidence score.
- **AI Analysis** – View detailed AI reasoning and management recommendations.
- **Risk Dashboard** – Real‑time disease & pest risk assessment.
- **Knowledge Graph** – Visual relationship view between farms, crops, predictions, and feedback.
- **Continual Learning** – Submit farmer feedback to improve the model.
- **Sensor Dashboard** – Simulated ESP32 sensor data (temperature, humidity, soil moisture, pH).
- **Weather Advisory** – Mock weather forecast with AI‑generated farming tips.
- **Mandi Prices (demo)** – Placeholder for market price integration.
- **Government Schemes** – Static list of Indian agriculture schemes.
- **Multilingual** – English ↔ Tamil toggle.
- **PWA** – Offline support, installable on mobile/desktop.

---

## Tech Stack
| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, TypeScript 5.8, Vite 6, Tailwind CSS 4, Framer Motion, Lucide‑React |
| **PWA** | `vite-plugin-pwa` (auto‑generates manifest & service worker) |
| **State Management** | React `useState` & context (language toggle) |
| **Backend** | FastAPI 0.111, Python 3.11, SQLite (SQLAlchemy), JWT auth |
| **AI** | Gemini SDK placeholder, MobileNetV3 mock model |
| **IoT** | ESP32 firmware (demo) |
| **Testing** | Vitest + React Testing Library (frontend), pytest (backend) |

---

## Prerequisites
- **Node.js** ≥ 20 (recommended LTS) and npm ≥ 9
- **Python** ≥ 3.11 and pip
- (Optional) **Docker** if you prefer containerised development

---

## Installation & Development
```bash
# Clone the repository
git clone https://github.com/siddharthvaradhaajan/Agri-Check.git
cd AgriCheck/agricheck-pwa

# Front‑end setup
npm install
npm run dev      # Starts Vite dev server at http://localhost:5173

# Backend setup (in a separate terminal)
cd ../backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload  # FastAPI server at http://127.0.0.1:8000
```

Open `http://localhost:5173` in your browser. The app works in **demo mode** – no external API keys are required for the UI.

---

## Environment Variables
Create a copy of the example file and fill in the required values:
```bash
cp .env.example .env
```
| Variable | Description |
|----------|-------------|
| `VITE_GEMINI_API_KEY` | Gemini AI key – used only when the UI is switched from demo to live mode. |
| `APP_URL` | Base URL of the deployment (used by AI Studio). |
| `VITE_FIREBASE_API_KEY` … | (Currently unused – kept for future expansion). |
| `VITE_DATA_GOV_API_KEY` | (Placeholder for mandi price API). |

---

## Running Tests
```bash
# Front‑end unit tests
npm run test

# Backend tests
cd ../backend
pytest -v
```
The frontend test suite uses **Vitest** and Jest‑style globals.

---

## Project Structure
```
agricheck-pwa/
├─ src/
│  ├─ App.tsx                # Root component, screen navigation
│  ├─ components/
│  │   └─ screens/           # 17+ UI screens (Dashboard, Scan, AIAnalysis, …)
│  ├─ data/                  # Mock data & translations
│  ├─ types/                 # TypeScript interfaces
│  └─ __tests__/            # Front‑end Vitest test files (added)
├─ public/                   # Public assets (logo, icons)
├─ docs/                     # Architecture & design docs (added)
├─ sample-data/              # JSON extracts for external developers (added)
├─ vite.config.ts            # Vite + PWA configuration (test block added)
├─ package.json
├─ tsconfig.json
├─ LICENSE
└─ README.md                # This file
```

---

## Sample Data
The `sample-data/` folder contains JSON files that emulate API responses for:
- crop advisory input
- soil‑health parameters
- weather forecast
- mandi price response
- disease‑identification results

These files are useful for writing integration tests or building custom demos.

---

## License
This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---

*Note: Placeholder images (e.g., logo, screenshots) are stored in `assets/` and can be replaced with real graphics later.*
