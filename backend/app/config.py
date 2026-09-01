from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str = "your-secret-key-here-change-in-production"
    DATABASE_URL: str = "sqlite:///./agricheck.db"
    WEATHER_API_KEY: str = ""
    WEATHER_API_BASE: str = "https://api.openweathermap.org/data/2.5"
    DEMO_MODE: bool = True
    MODEL_PATH: str = "./ml/models/agricheck_model_v1.pkl"

    class Config:
        env_file = ".env"

settings = Settings()
