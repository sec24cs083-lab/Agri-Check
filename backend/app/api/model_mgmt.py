from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.database import SessionLocal
from app.schemas import ModelVersionOut
from app.models.model_version import ModelVersion
from app.auth import get_db
from app.services.continual_learning_service import cl_service

router = APIRouter(prefix="/api/model", tags=["model"])

@router.get("/versions", response_model=List[ModelVersionOut])
def list_model_versions(db: Session = Depends(get_db)):
    versions = db.query(ModelVersion).order_by(ModelVersion.created_at.desc()).all()
    return versions

@router.get("/evaluation")
def get_evaluation(db: Session = Depends(get_db)):
    active_version = db.query(ModelVersion).filter(ModelVersion.is_active == True).first()
    if not active_version:
        active_version = db.query(ModelVersion).order_by(ModelVersion.created_at.desc()).first()
    
    if not active_version:
        raise HTTPException(status_code=404, detail="No model versions found")
        
    return {
        "version": active_version.version_string,
        "metrics": {
            "accuracy": active_version.accuracy,
            "precision": active_version.precision,
            "recall": active_version.recall,
            "f1_score": active_version.f1_score
        },
        "training_samples": active_version.training_samples,
        "cl_status": cl_service.get_cl_status(db)
    }

@router.post("/update")
def trigger_update(db: Session = Depends(get_db)):
    if not cl_service.check_update_criteria(db):
        return {"status": "skipped", "message": "Not enough new confirmed samples to trigger update"}
        
    new_version = cl_service.trigger_model_update(db)
    return {"status": "success", "message": f"Model update triggered. New version: {new_version.version_string}"}
