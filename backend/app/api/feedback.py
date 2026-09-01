from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import SessionLocal
from app.schemas import FeedbackIn, FeedbackOut
from app.models.feedback import Feedback
from app.models.prediction import Prediction
from app.models.disease_case import DiseaseCase
from app.models.user import User
from app.auth import get_db, get_current_user
from app.services.knowledge_graph_service import kg_service
from app.services.continual_learning_service import cl_service

router = APIRouter(prefix="/api/feedback", tags=["feedback"])

@router.post("", response_model=FeedbackOut)
def submit_feedback(feedback: FeedbackIn, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    prediction = db.query(Prediction).filter(Prediction.id == feedback.prediction_id, Prediction.user_id == current_user.id).first()
    if not prediction:
        raise HTTPException(status_code=404, detail="Prediction not found")
        
    db_feedback = Feedback(
        prediction_id=prediction.id,
        farm_id=prediction.farm_id,
        user_id=current_user.id,
        feedback_type=feedback.feedback_type,
        notes=feedback.notes
    )
    db.add(db_feedback)
    
    if feedback.feedback_type == "confirmed":
        # Create a confirmed disease case for hotspots
        farm = prediction.farm
        if farm:
            case = DiseaseCase(
                farm_id=farm.id,
                user_id=current_user.id,
                crop=prediction.crop,
                disease=prediction.disease,
                confidence=prediction.confidence,
                latitude=farm.latitude,
                longitude=farm.longitude,
                severity="High" if prediction.disease_risk > 0.7 else "Medium",
                confirmed=True,
                date=prediction.created_at
            )
            db.add(case)
            
        # Add to continual learning buffer
        cl_service.add_to_replay_buffer(prediction, db_feedback)
        
    db.commit()
    db.refresh(db_feedback)
    
    # Update Knowledge Graph
    kg_service.add_feedback_to_graph(db_feedback)
    
    return db_feedback

@router.get("/{farm_id}", response_model=List[FeedbackOut])
def get_feedback(farm_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    feedbacks = db.query(Feedback).filter(Feedback.farm_id == farm_id, Feedback.user_id == current_user.id).all()
    return feedbacks
