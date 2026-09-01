# AGRICHECK 🌿
## AI-Powered Crop Disease & Pest Intelligence System
### Smart India Hackathon 2026 Prototype

---

## 🎯 Project Overview

**AGRICHECK** is an intelligent agriculture decision-support system that combines:
- **AI disease detection** (MobileNetV3 transfer learning)
- **IoT sensor integration** (ESP32 + DHT22 + Capacitive Moisture)
- **Weather intelligence** (real API or demo mode)
- **Knowledge Graph** (NetworkX-based farm intelligence network)
- **Continual Learning** (farmer-feedback-driven model improvement pipeline)
- **Multilingual UI** (English + Tamil)

---

## 🚀 Quick Start

### Frontend (React)
```bash
cd "AGRICHECK SYSTEMS"
npm install
npm run dev -- --port 3001
# Opens at http://localhost:3001
```
Use demo login: `farmer1` / `agricheck123`

### Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

---

## 🏗️ Architecture

```
AGRICHECK Frontend (React + TypeScript)
            │
            ▼
    FastAPI Backend (Python)
            │
    ┌───────┴───────┐
    │               │
AI Model       Knowledge Graph
(MobileNetV3)  (NetworkX)
    │               │
    └───────┬───────┘
            │
   Continual Learning Engine
            │
    Farmer Feedback Loop
```

---

## 📱 Screens

| Screen | Description |
|--------|-------------|
| Splash | Animated launch screen |
| Login/Register | Auth with demo login |
| Dashboard | Disease-first dashboard with sensor + risk |
| Crop Scan | Image upload/camera for AI inference |
| AI Analysis | Prediction result with confidence |
| Explanation (XAI) | Why this prediction was made |
| Disease Risk | Risk scores with transparent formula |
| Farmer Feedback | Confirm/Incorrect/Unsure |
| Knowledge Graph | SVG visualization of farm intelligence |
| Continual Learning | CL workflow + model versions |
| Farm History | Past scans with trends |
| Hotspot Map | Disease outbreak map (Tamil Nadu) |
| Add Farm | Register new farm |
| Sensor Dashboard | ESP32 data with DEMO mode |
| Weather | Forecast + AI advisories |
| Admin/Research | System-wide analytics |
| SIH Demo | One-click complete workflow demo |

---

## 🤖 AI Model

- Architecture: MobileNetV3 (transfer learning)
- Classes: Tomato Early Blight, Tomato Late Blight, Healthy
- Training: `ml/training/train.py`
- Evaluation: `ml/training/evaluate.py`
- **Demo mode**: Realistic predictions labelled `[DEMO]` until real model installed

To replace with trained model:
```bash
# Place your model at:
ml/models/agricheck_model_v1.pt
# Update MODEL_PATH in .env
```

---

## 📡 IoT (ESP32)

Firmware: `iot/esp32/firmware.ino`

Sensors:
- DHT22 — Temperature + Humidity
- Capacitive Soil Moisture Sensor
- LED status indicator

Configuration in firmware:
```cpp
const char* WIFI_SSID = "YourWiFi";
const char* WIFI_PASSWORD = "YourPassword";
const char* BACKEND_URL = "http://your-server:8000";
```

**Demo Sensor Mode**: Works without ESP32 — toggle in app.

---

## 🕸️ Knowledge Graph

- Built with NetworkX
- Entities: Farmer, Farm, Crop, Disease, Weather, Prediction, Feedback, Location
- Relationships: owns, grows, has_prediction, detects, confirms, associated_with
- Persisted to JSON file between restarts
- Structured for Neo4j migration later

---

## 🔄 Continual Learning

The CL workflow is NOT automatic model retraining:

```
Prediction → Farmer Feedback → Quality Check → Replay Buffer
    → Criteria Met (≥10 confirmed) → Trigger Evaluation
    → New Model Version Created → A/B Comparison → Deploy
```

- Does NOT silently retrain on each click
- Creates new model versions only after evaluation
- Shows metrics comparison between versions

---

## 📊 API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login (returns JWT) |
| POST | `/api/farms` | Create farm |
| GET | `/api/farms` | List farms |
| POST | `/api/predict` | Upload image → prediction |
| GET | `/api/predictions/{farm_id}` | Farm predictions |
| POST | `/api/sensor-data` | ESP32 data push |
| GET | `/api/sensor-data/{farm_id}` | Sensor history |
| GET | `/api/weather/{farm_id}` | Weather |
| GET | `/api/risk/{farm_id}` | Risk scores |
| POST | `/api/feedback` | Farmer feedback |
| GET | `/api/knowledge-graph/{farm_id}` | KG data |
| GET | `/api/similar-cases/{prediction_id}` | Similar cases |
| GET | `/api/hotspots` | Disease hotspot map |
| GET | `/api/model/versions` | Model version history |
| GET | `/api/model/evaluation` | Model metrics |
| POST | `/api/model/update` | Trigger CL update |

---

## 🌐 Environment Variables

```env
# Backend .env
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///./agricheck.db
WEATHER_API_KEY=             # Leave blank for demo mode
DEMO_MODE=true
MODEL_PATH=./ml/models/agricheck_model_v1.pt
```

---

## ⚠️ Limitations

1. AI model in demo mode returns simulated predictions — not scientifically validated
2. Risk scores are heuristic formulas — not agronomically certified
3. Hotspot locations are synthetic demo data
4. Weather uses demo mode without API key
5. Continual learning creates model version records but does not execute actual GPU training in demo mode
6. XAI explanations are contextual — not from a certified agricultural diagnosis system

---

## 🔮 Future Improvements

1. Train on full PlantVillage dataset (50,000+ images)
2. Integrate actual Neo4j for scalable Knowledge Graph
3. Add more crop classes (Cotton, Groundnut, Millet)
4. Real GPS integration for hotspot mapping
5. Voice interface for low-literacy farmers
6. Integrate with government advisory APIs
7. Add pest prediction model (separate from disease)
8. Deploy to cloud with farmer mobile app

---

## 🏆 SIH Demo Flow

1. Open app → Splash → Login (farmer1/agricheck123)
2. Click `🚀 START SIH DEMO`
3. Watch 16-step automated demo
4. Or navigate manually through all screens

Expected demo time: ~2-3 minutes

---

## 🧪 Testing

```bash
cd backend
pytest tests/ -v
```

Tests cover: auth, farms, prediction, feedback, KG, hotspots, model versions

---

*Built for Smart India Hackathon 2026 | AI + IoT + Knowledge Graph + Continual Learning*
