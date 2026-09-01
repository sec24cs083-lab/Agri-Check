from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas import WeatherOut
from app.models.farm import Farm
from app.models.user import User
from app.auth import get_db, get_current_user
from app.services.weather_service import weather_service

router = APIRouter(prefix="/api/weather", tags=["weather"])

@router.get("/{farm_id}", response_model=WeatherOut)
def get_farm_weather(farm_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    farm = db.query(Farm).filter(Farm.id == farm_id, Farm.user_id == current_user.id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="Farm not found")
        
    weather_data = weather_service.get_weather(farm.latitude, farm.longitude)
    return weather_data
