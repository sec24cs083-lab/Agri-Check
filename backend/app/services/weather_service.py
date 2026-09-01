from typing import Dict, Any
from app.config import settings
import requests
import math

class WeatherService:
    def get_weather(self, lat: float, lon: float) -> Dict[str, Any]:
        if settings.WEATHER_API_KEY:
            try:
                url = f"{settings.WEATHER_API_BASE}/weather?lat={lat}&lon={lon}&appid={settings.WEATHER_API_KEY}&units=metric"
                response = requests.get(url)
                if response.status_code == 200:
                    data = response.json()
                    return {
                        "temperature": data["main"]["temp"],
                        "humidity": data["main"]["humidity"],
                        "rainfall_prob": 0.5, # OpenWeatherMap doesn't always provide this in free tier
                        "description": data["weather"][0]["description"],
                        "is_demo": False
                    }
            except Exception:
                pass
        return self.get_demo_weather(lat, lon)

    def get_demo_weather(self, lat: float, lon: float) -> Dict[str, Any]:
        # Deterministic demo weather based on coordinates
        base_temp = 25.0 + math.sin(lat) * 5
        base_hum = 60.0 + math.cos(lon) * 20
        return {
            "temperature": round(base_temp, 1),
            "humidity": round(base_hum, 1),
            "rainfall_prob": 0.3,
            "description": "Partly cloudy",
            "is_demo": True
        }

weather_service = WeatherService()
