import random

class DisruptionPredictor:
    def __init__(self):
        # In a production environment, load trained scikit-learn/tensorflow model here
        pass

    def predict_risk(self, rainfall_mm: float, terrain_slope: float, historical_landslides: int) -> dict:
        """
        Simulate AI model prediction based on rainfall, slope, and history.
        Returns risk level and disruption probability.
        """
        # Simple heuristic rule simulating ML probability calculation
        score = (rainfall_mm * 0.05) + (terrain_slope * 0.03) + (historical_landslides * 0.2)

        if score > 8.0:
            risk_level = "High"
            probability = 0.85 + (random.random() * 0.1)
        elif score > 4.0:
            risk_level = "Medium"
            probability = 0.50 + (random.random() * 0.2)
        else:
            risk_level = "Low"
            probability = 0.10 + (random.random() * 0.2)

        return {
            "risk_level": risk_level,
            "disruption_probability": round(probability, 2),
            "estimated_delay_hours": round(probability * 12, 1)
        }

predictor = DisruptionPredictor()
