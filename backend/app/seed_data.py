from sqlalchemy.orm import Session
from app.models.user import User
from app.models.farm import Farm
from app.models.prediction import Prediction
from app.models.sensor_reading import SensorReading
from app.models.feedback import Feedback
from app.models.disease_case import DiseaseCase
from app.models.model_version import ModelVersion
from app.auth import hash_password
import random

def seed_database(db: Session):
    if db.query(User).count() > 0:
        return
        
    print("Seeding demo data...")
    
    # 1. Demo User
    demo_user = User(
        username="farmer1",
        email="farmer1@example.com",
        full_name="Demo Farmer",
        hashed_password=hash_password("agricheck123")
    )
    db.add(demo_user)
    db.commit()
    db.refresh(demo_user)
    
    # 2. Demo Farm
    demo_farm = Farm(
        user_id=demo_user.id,
        name="My Tomato Farm",
        location="Tamil Nadu",
        crop="Tomato",
        area_acres=2.5,
        latitude=11.0,
        longitude=77.0
    )
    db.add(demo_farm)
    db.commit()
    db.refresh(demo_farm)
    
    # 3. 5 Historical Predictions
    diseases = ["Early Blight", "Late Blight", "Healthy", "Early Blight", "Late Blight"]
    for d in diseases:
        pred = Prediction(
            farm_id=demo_farm.id,
            user_id=demo_user.id,
            image_path="demo.jpg",
            crop="Tomato",
            disease=d,
            confidence=random.uniform(0.7, 0.98),
            risk_level="HIGH" if d != "Healthy" else "LOW",
            disease_risk=random.uniform(0.7, 0.9) if d != "Healthy" else random.uniform(0.1, 0.3),
            pest_risk=random.uniform(0.2, 0.5),
            is_demo=True
        )
        db.add(pred)
    db.commit()
    
    # 4. Sensor Readings
    for _ in range(10):
        sr = SensorReading(
            farm_id=demo_farm.id,
            device_id="DEMO_ESP32_01",
            soil_moisture=random.uniform(30, 60),
            temperature=random.uniform(25, 35),
            humidity=random.uniform(50, 80),
            is_demo=True
        )
        db.add(sr)
    db.commit()
    
    # 5. Feedback
    pred = db.query(Prediction).filter(Prediction.disease == "Early Blight").first()
    if pred:
        fb = Feedback(
            prediction_id=pred.id,
            farm_id=demo_farm.id,
            user_id=demo_user.id,
            feedback_type="confirmed",
            notes="Looked exactly like the app said."
        )
        db.add(fb)
    db.commit()
    
    # 6. Model Versions
    versions = ["v1.0", "v1.1", "v1.2"]
    acc = 0.85
    for i, v in enumerate(versions):
        mv = ModelVersion(
            version_string=v,
            accuracy=acc,
            precision=acc - 0.02,
            recall=acc + 0.01,
            f1_score=acc,
            training_samples=1000 + i*500,
            notes=f"Initial release" if i == 0 else f"Update {i}",
            is_active=(i == len(versions)-1)
        )
        db.add(mv)
        acc += 0.03
    db.commit()
    
    # 7. Hotspot locations
    for _ in range(8):
        dc = DiseaseCase(
            farm_id=demo_farm.id,
            user_id=demo_user.id,
            crop="Tomato",
            disease=random.choice(["Early Blight", "Late Blight"]),
            confidence=random.uniform(0.8, 0.99),
            latitude=11.0 + random.uniform(-1, 1),
            longitude=77.0 + random.uniform(-1, 1),
            severity=random.choice(["Medium", "High"]),
            confirmed=True
        )
        db.add(dc)
    db.commit()
