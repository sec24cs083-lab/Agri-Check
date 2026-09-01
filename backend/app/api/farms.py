from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import SessionLocal
from app.schemas import FarmCreate, FarmOut
from app.models.farm import Farm
from app.models.user import User
from app.auth import get_db, get_current_user

router = APIRouter(prefix="/api/farms", tags=["farms"])

@router.post("", response_model=FarmOut)
def create_farm(farm: FarmCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_farm = Farm(**farm.model_dump(), user_id=current_user.id)
    db.add(db_farm)
    db.commit()
    db.refresh(db_farm)
    return db_farm

@router.get("", response_model=List[FarmOut])
def list_farms(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    farms = db.query(Farm).filter(Farm.user_id == current_user.id).all()
    return farms

@router.get("/{farm_id}", response_model=FarmOut)
def get_farm(farm_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    farm = db.query(Farm).filter(Farm.id == farm_id, Farm.user_id == current_user.id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="Farm not found")
    return farm
