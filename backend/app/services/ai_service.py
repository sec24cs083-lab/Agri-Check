import os
import hashlib
import random
from typing import Dict, Any

class DemoPredictor:
    def __init__(self):
        pass

    def predict(self, image_bytes: bytes, crop: str) -> Dict[str, Any]:
        h = int(hashlib.md5(image_bytes).hexdigest(), 16)
        choice = h % 3
        if choice == 0:
            disease = "Early Blight"
            confidence = 0.85 + (h % 10) / 100.0
        elif choice == 1:
            disease = "Late Blight"
            confidence = 0.75 + (h % 15) / 100.0
        else:
            disease = "Healthy"
            confidence = 0.90 + (h % 8) / 100.0

        return {
            "crop": crop,
            "disease": disease,
            "confidence": confidence,
            "is_demo": True
        }

class AIService:
    def __init__(self):
        self.model = None
        self.load_model()

    def load_model(self):
        # Try to load a real model, fallback to DemoPredictor
        try:
            # Here we would load a real scikit-learn/PyTorch model
            # For now, we simulate missing model to trigger demo fallback
            if os.environ.get("DEMO_MODE") != "false":
                raise Exception("Demo mode active")
            self.model = DemoPredictor() # Placeholder for real model
        except Exception:
            self.model = DemoPredictor()

    def predict(self, image_bytes: bytes, crop: str) -> Dict[str, Any]:
        if hasattr(self.model, 'predict'):
            # In a real model, we would preprocess the image bytes
            return self.model.predict(image_bytes, crop)
        return {"crop": crop, "disease": "Unknown", "confidence": 0.0, "is_demo": True}

ai_service = AIService()
