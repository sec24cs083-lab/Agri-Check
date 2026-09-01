from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, func
from app.database import Base

class Farm(Base):
    __tablename__ = "farms"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String)
    location = Column(String)
    crop = Column(String)
    area_acres = Column(Float)
    latitude = Column(Float)
    longitude = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
