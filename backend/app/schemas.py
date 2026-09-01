from pydantic import BaseModel
from typing import List, Optional, Any, Dict
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserOut(UserBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class FarmBase(BaseModel):
    name: str
    location: str
    crop: str
    area_acres: float
    latitude: float
    longitude: float

class FarmCreate(FarmBase):
    pass

class FarmOut(FarmBase):
    id: int
    user_id: int
    created_at: datetime
    class Config:
        from_attributes = True

class PredictionOut(BaseModel):
    id: int
    farm_id: int
    user_id: int
    image_path: str
    crop: str
    disease: str
    confidence: float
    risk_level: str
    disease_risk: float
    pest_risk: float
    explanation: Optional[str]
    sensor_data_json: Optional[str]
    weather_data_json: Optional[str]
    is_demo: bool
    created_at: datetime
    class Config:
        from_attributes = True

class SensorDataIn(BaseModel):
    device_id: str
    soil_moisture: float
    temperature: float
    humidity: float

class SensorDataOut(BaseModel):
    id: int
    farm_id: int
    device_id: str
    soil_moisture: float
    temperature: float
    humidity: float
    is_demo: bool
    timestamp: datetime
    class Config:
        from_attributes = True

class FeedbackIn(BaseModel):
    prediction_id: int
    feedback_type: str
    notes: Optional[str] = None

class FeedbackOut(BaseModel):
    id: int
    prediction_id: int
    farm_id: int
    user_id: int
    feedback_type: str
    notes: Optional[str]
    created_at: datetime
    class Config:
        from_attributes = True

class HotspotPoint(BaseModel):
    latitude: float
    longitude: float
    disease: str
    severity: str
    crop: str

class ModelVersionOut(BaseModel):
    id: int
    version_string: str
    accuracy: float
    precision: float
    recall: float
    f1_score: float
    training_samples: int
    notes: Optional[str]
    created_at: datetime
    is_active: bool
    class Config:
        from_attributes = True

class KnowledgeGraphNode(BaseModel):
    id: str
    label: str
    properties: Dict[str, Any]

class KnowledgeGraphEdge(BaseModel):
    source: str
    target: str
    relationship: str

class KnowledgeGraphOut(BaseModel):
    nodes: List[KnowledgeGraphNode]
    edges: List[KnowledgeGraphEdge]

class RiskOut(BaseModel):
    disease_risk: float
    pest_risk: float
    risk_level: str
    factors: Dict[str, float]

class WeatherOut(BaseModel):
    temperature: float
    humidity: float
    rainfall_prob: float
    description: str
