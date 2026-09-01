from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func, Text
from app.database import Base

class Feedback(Base):
    __tablename__ = "feedbacks"
    id = Column(Integer, primary_key=True, index=True)
    prediction_id = Column(Integer, ForeignKey("predictions.id"))
    farm_id = Column(Integer, ForeignKey("farms.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    feedback_type = Column(String) # confirmed, incorrect, unsure
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
