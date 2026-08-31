import joblib
import os
import pandas as pd
import numpy as np

class DisruptionPredictor:
    def __init__(self):
        self.model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../models/artifacts/model.pkl"))
        self.model = joblib.load(self.model_path)
        self.risk_mapping = {0: "Low", 1: "Medium", 2: "High"}

    def predict_risk(self, rainfall_mm: float, terrain_slope: float, historical_landslides: int) -> dict:
        """
        Load trained scikit-learn model and predict disruption risk.
        Returns risk level, disruption probability, confidence, and explanation.
        """
        features = pd.DataFrame([[rainfall_mm, terrain_slope, historical_landslides]],
                                columns=['rainfall_mm', 'terrain_slope', 'historical_landslides'])

        # Get probability distribution
        proba = self.model.predict_proba(features)[0]
        prediction = self.model.predict(features)[0]

        risk_level = self.risk_mapping[prediction]
        disruption_probability = float(proba[prediction])

        # Confidence is the probability of the predicted class
        confidence = float(np.max(proba))

        explanation = f"Based on {rainfall_mm}mm rainfall, {terrain_slope}° slope, and {historical_landslides} historical incidents."

        return {
            "risk_level": risk_level,
            "disruption_probability": round(disruption_probability, 2),
            "model_confidence": round(confidence, 2),
            "explanation": explanation
        }

predictor = DisruptionPredictor()
