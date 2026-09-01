from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey
from app.database import Base

class DiseaseCase(Base):
    __tablename__ = "disease_cases"
    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, ForeignKey("farms.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    crop = Column(String)
    disease = Column(String)
    confidence = Column(Float)
    latitude = Column(Float)
    longitude = Column(Float)
    severity = Column(String)
    confirmed = Column(Boolean, default=False)
    date = Column(DateTime(timezone=True))
