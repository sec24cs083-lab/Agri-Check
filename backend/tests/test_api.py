import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.database import Base, get_db
import os

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield

def test_register_and_login():
    res = client.post("/api/auth/register", json={
        "username": "testuser", "password": "testpassword", "email": "test@example.com"
    })
    assert res.status_code == 200
    
    res = client.post("/api/auth/login", json={
        "username": "testuser", "password": "testpassword"
    })
    assert res.status_code == 200
    assert "access_token" in res.json()

def test_e2e_flow():
    # Register & Login
    client.post("/api/auth/register", json={"username": "user2", "password": "pw"})
    login_res = client.post("/api/auth/login", json={"username": "user2", "password": "pw"})
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # Create farm
    farm_res = client.post("/api/farms", json={
        "name": "Test Farm", "location": "Test Loc", "crop": "Tomato",
        "area_acres": 1.0, "latitude": 10.0, "longitude": 20.0
    }, headers=headers)
    assert farm_res.status_code == 200
    farm_id = farm_res.json()["id"]
    
    # Predict
    with open("test.png", "wb") as f:
        f.write(b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\x0cIDATx\x9cc\xf8\xff\xff?\x00\x05\xfe\x02\xfe\r\xef\xcaG\x00\x00\x00\x00IEND\xaeB`\x82')
    
    with open("test.png", "rb") as f:
        pred_res = client.post("/api/predict", data={"farm_id": farm_id, "crop": "Tomato"}, files={"file": ("test.png", f, "image/png")}, headers=headers)
    assert pred_res.status_code == 200
    pred_id = pred_res.json()["id"]
    os.remove("test.png")
    
    # Feedback
    fb_res = client.post("/api/feedback", json={
        "prediction_id": pred_id, "feedback_type": "confirmed", "notes": "test"
    }, headers=headers)
    assert fb_res.status_code == 200
    
    # KG
    kg_res = client.get(f"/api/knowledge-graph/{farm_id}", headers=headers)
    assert kg_res.status_code == 200
    
    # Hotspots
    hs_res = client.get("/api/hotspots")
    assert hs_res.status_code == 200
    
    # Model versions
    mv_res = client.get("/api/model/versions")
    assert mv_res.status_code == 200
