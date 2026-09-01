from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import random
from app.database import SessionLocal
from app.schemas import SensorDataIn, SensorDataOut
from app.models.sensor_reading import SensorReading
from app.models.farm import Farm
from app.auth import get_db, get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/sensor-data", tags=["sensor"])

@router.post("", response_model=SensorDataOut)
def receive_sensor_data(data: SensorDataIn, db: Session = Depends(get_db)):
    # In a real app, we'd verify the device_id belongs to a specific farm
    # For this prototype, we'll assign it to farm 1 if it exists
    farm = db.query(Farm).first()
    farm_id = farm.id if farm else 1

    reading = SensorReading(
        farm_id=farm_id,
        device_id=data.device_id,
        soil_moisture=data.soil_moisture,
        temperature=data.temperature,
        humidity=data.humidity,
        is_demo=False
    )
    db.add(reading)
    db.commit()
    db.refresh(reading)
    return reading

@router.get("/demo", response_model=SensorDataOut)
def get_demo_sensor_data(db: Session = Depends(get_db)):
    farm = db.query(Farm).first()
    farm_id = farm.id if farm else 1
    
    reading = SensorReading(
        farm_id=farm_id,
        device_id="DEMO_ESP32_01",
        soil_moisture=random.uniform(30.0, 60.0),
        temperature=random.uniform(20.0, 35.0),
        humidity=random.uniform(40.0, 80.0),
        is_demo=True
    )
    return reading

@router.get("/{farm_id}", response_model=List[SensorDataOut])
def get_sensor_data(farm_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    farm = db.query(Farm).filter(Farm.id == farm_id, Farm.user_id == current_user.id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="Farm not found")
        
    readings = db.query(SensorReading).filter(SensorReading.farm_id == farm_id).order_by(SensorReading.timestamp.desc()).limit(100).all()
    return readings
