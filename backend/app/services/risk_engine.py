from typing import Dict, Any

class RiskEngine:
    def calculate_risk(
        self, disease_confidence: float, temperature: float, humidity: float,
        rainfall_prob: float, crop: str, history: Any = None
    ) -> Dict[str, Any]:
        """
        Calculates disease and pest risks based on environmental factors.
        disease_risk = weighted(disease_conf * 0.5 + humidity_factor * 0.25 + temp_factor * 0.15 + rain_factor * 0.10)
        pest_risk = weighted(humidity_factor * 0.4 + temp_factor * 0.3 + rain_factor * 0.3)
        """
        # Normalize factors (example logic)
        humidity_factor = min(humidity / 100.0, 1.0)
        temp_factor = min(max((temperature - 10) / 30.0, 0.0), 1.0) # Assume 10-40C range
        rain_factor = min(rainfall_prob, 1.0)

        disease_risk = (disease_confidence * 0.5) + (humidity_factor * 0.25) + (temp_factor * 0.15) + (rain_factor * 0.10)
        pest_risk = (humidity_factor * 0.4) + (temp_factor * 0.3) + (rain_factor * 0.3)

        max_risk = max(disease_risk, pest_risk)
        if max_risk > 0.75:
            risk_level = "HIGH"
        elif max_risk > 0.50:
            risk_level = "MEDIUM"
        else:
            risk_level = "LOW"

        return {
            "disease_risk": disease_risk,
            "pest_risk": pest_risk,
            "risk_level": risk_level,
            "factors": {
                "humidity_factor": humidity_factor,
                "temp_factor": temp_factor,
                "rain_factor": rain_factor
            }
        }

risk_engine = RiskEngine()
