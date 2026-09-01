from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, func, Text
from app.database import Base

class Prediction(Base):
    __tablename__ = "predictions"
    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, ForeignKey("farms.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    image_path = Column(String)
    crop = Column(String)
    disease = Column(String)
    confidence = Column(Float)
    risk_level = Column(String)
    disease_risk = Column(Float)
    pest_risk = Column(Float)
    explanation = Column(Text, nullable=True)
    sensor_data_json = Column(Text, nullable=True)
    weather_data_json = Column(Text, nullable=True)
    is_demo = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
