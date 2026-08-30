from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.prediction_service import predictor

router = APIRouter(prefix="/api/predictions", tags=["Predictions"])

class PredictionRequest(BaseModel):
    rainfall_mm: float
    terrain_slope: float
    historical_landslides: int

class PredictionResponse(BaseModel):
    risk_level: str
    disruption_probability: float
    estimated_delay_hours: float

@router.post("/evaluate-road", response_model=PredictionResponse)
def evaluate_road_risk(data: PredictionRequest):
    try:
        result = predictor.predict_risk(
            rainfall_mm=data.rainfall_mm,
            terrain_slope=data.terrain_slope,
            historical_landslides=data.historical_landslides
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
