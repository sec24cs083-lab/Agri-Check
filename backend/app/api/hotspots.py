from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import SessionLocal
from app.schemas import HotspotPoint
from app.models.disease_case import DiseaseCase
from app.auth import get_db

router = APIRouter(prefix="/api/hotspots", tags=["hotspots"])

@router.get("", response_model=List[HotspotPoint])
def get_hotspots(db: Session = Depends(get_db)):
    cases = db.query(DiseaseCase).filter(DiseaseCase.confirmed == True).all()
    points = []
    for c in cases:
        points.append(
            HotspotPoint(
                latitude=c.latitude,
                longitude=c.longitude,
                disease=c.disease,
                severity=c.severity,
                crop=c.crop
            )
        )
    return points
