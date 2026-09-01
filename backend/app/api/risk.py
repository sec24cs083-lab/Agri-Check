from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas import RiskOut
from app.models.farm import Farm
from app.models.user import User
from app.models.prediction import Prediction
from app.auth import get_db, get_current_user
from app.services.risk_engine import risk_engine
from app.services.weather_service import weather_service

router = APIRouter(prefix="/api/risk", tags=["risk"])

@router.get("/{farm_id}", response_model=RiskOut)
def get_farm_risk(farm_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    farm = db.query(Farm).filter(Farm.id == farm_id, Farm.user_id == current_user.id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="Farm not found")
        
    weather_data = weather_service.get_weather(farm.latitude, farm.longitude)
    
    # Get latest prediction confidence if any
    latest_pred = db.query(Prediction).filter(Prediction.farm_id == farm_id).order_by(Prediction.created_at.desc()).first()
    disease_conf = latest_pred.confidence if latest_pred else 0.0
    
    risk_data = risk_engine.calculate_risk(
        disease_confidence=disease_conf,
        temperature=weather_data.get("temperature", 25.0),
        humidity=weather_data.get("humidity", 60.0),
        rainfall_prob=weather_data.get("rainfall_prob", 0.0),
        crop=farm.crop
    )
    return risk_data
