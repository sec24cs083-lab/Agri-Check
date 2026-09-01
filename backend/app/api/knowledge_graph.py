from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.schemas import KnowledgeGraphOut
from app.models.farm import Farm
from app.models.user import User
from app.models.prediction import Prediction
from app.auth import get_db, get_current_user
from app.services.knowledge_graph_service import kg_service

router = APIRouter(tags=["knowledge_graph"])

@router.get("/api/knowledge-graph/{farm_id}", response_model=KnowledgeGraphOut)
def get_knowledge_graph(farm_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    farm = db.query(Farm).filter(Farm.id == farm_id, Farm.user_id == current_user.id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="Farm not found")
        
    graph_data = kg_service.get_graph_data(farm_id)
    return graph_data

@router.get("/api/similar-cases/{prediction_id}")
def get_similar_cases(prediction_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    pred = db.query(Prediction).filter(Prediction.id == prediction_id, Prediction.user_id == current_user.id).first()
    if not pred:
        raise HTTPException(status_code=404, detail="Prediction not found")
        
    cases = kg_service.find_similar_cases(disease=pred.disease, crop=pred.crop)
    return {"similar_cases": cases}
