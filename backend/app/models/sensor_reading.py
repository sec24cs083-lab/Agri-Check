from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, func
from app.database import Base

class SensorReading(Base):
    __tablename__ = "sensor_readings"
    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, ForeignKey("farms.id"))
    device_id = Column(String)
    soil_moisture = Column(Float)
    temperature = Column(Float)
    humidity = Column(Float)
    is_demo = Column(Boolean, default=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
