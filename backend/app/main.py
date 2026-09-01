from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base, SessionLocal
from app.api import auth, farms, predict, sensor, weather, risk, feedback, knowledge_graph, hotspots, model_mgmt
from app.seed_data import seed_database
import os

# Create DB Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AGRICHECK API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router)
app.include_router(farms.router)
app.include_router(predict.router)
app.include_router(sensor.router)
app.include_router(weather.router)
app.include_router(risk.router)
app.include_router(feedback.router)
app.include_router(knowledge_graph.router)
app.include_router(hotspots.router)
app.include_router(model_mgmt.router)

@app.on_event("startup")
def on_startup():
    db = SessionLocal()
    seed_database(db)
    db.close()

@app.get("/")
def health_check():
    return {"status": "ok", "message": "AGRICHECK API is running"}
