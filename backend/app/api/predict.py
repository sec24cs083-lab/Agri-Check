from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form
from sqlalchemy.orm import Session
from typing import List
import json
import os
from app.database import SessionLocal
from app.schemas import PredictionOut
from app.models.prediction import Prediction
from app.models.farm import Farm
from app.models.user import User
from app.auth import get_db, get_current_user
from app.services.ai_service import ai_service
from app.services.risk_engine import risk_engine
from app.services.weather_service import weather_service
from app.services.knowledge_graph_service import kg_service

router = APIRouter(tags=["predict"])

@router.post("/api/predict", response_model=PredictionOut)
async def predict_disease(
    farm_id: int = Form(...),
    crop: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        raise HTTPException(status_code=400, detail="Invalid file type. Only JPG and PNG are allowed.")
    
    contents = await file.read()
    if len(contents) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large. Max size is 10MB.")

    farm = db.query(Farm).filter(Farm.id == farm_id, Farm.user_id == current_user.id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="Farm not found")

    # Call AI Service
    ai_result = ai_service.predict(contents, crop)
    
    # Get Context Data
    weather_data = weather_service.get_weather(farm.latitude, farm.longitude)
    
    # Calculate Risk
    risk_result = risk_engine.calculate_risk(
        disease_confidence=ai_result["confidence"],
        temperature=weather_data.get("temperature", 25.0),
        humidity=weather_data.get("humidity", 60.0),
        rainfall_prob=weather_data.get("rainfall_prob", 0.0),
        crop=crop
    )
    
    # Save image (dummy save for now)
    os.makedirs(f"uploads/{farm_id}", exist_ok=True)
    image_path = f"uploads/{farm_id}/{file.filename}"
    with open(image_path, "wb") as f:
        f.write(contents)

    # Save Prediction to DB
    prediction = Prediction(
        farm_id=farm_id,
        user_id=current_user.id,
        image_path=image_path,
        crop=crop,
        disease=ai_result["disease"],
        confidence=ai_result["confidence"],
        risk_level=risk_result["risk_level"],
        disease_risk=risk_result["disease_risk"],
        pest_risk=risk_result["pest_risk"],
        weather_data_json=json.dumps(weather_data),
        is_demo=ai_result["is_demo"]
    )
    db.add(prediction)
    db.commit()
    db.refresh(prediction)

    # Update Knowledge Graph
    kg_service.add_prediction_to_graph(prediction)
    
    return prediction

@router.get("/api/predictions/{farm_id}", response_model=List[PredictionOut])
def list_predictions(farm_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Verify farm ownership
    farm = db.query(Farm).filter(Farm.id == farm_id, Farm.user_id == current_user.id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="Farm not found")
        
    predictions = db.query(Prediction).filter(Prediction.farm_id == farm_id).all()
    return predictions
