from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.schemas import IncidentCreate, IncidentResponse
from app.db.models.models import IncidentReport as IncidentModel
from app.services.integration_service import integration_service

router = APIRouter()

@router.post("/", response_model=IncidentResponse)
async def create_incident(incident: IncidentCreate, db: Session = Depends(get_db)):
    """
    Create a new incident report and trigger the integration pipeline.

    The pipeline includes:
    1. Disruption risk prediction
    2. Route recalculation
    3. Vehicle impact analysis
    """
    db_incident = IncidentModel(**incident.dict())
    db.add(db_incident)
    db.commit()
    db.refresh(db_incident)

    # Trigger integration service
    try:
        integration_result = integration_service.process_incident(
            road_segment_id=incident.road_segment_id,
            incident_data=incident.dict()
        )

        # Return the incident with integration results
        return {
            **db_incident.__dict__,
            "integration_result": integration_result,
            "id": db_incident.id
        }
    except Exception as e:
        # Log the error and return the incident without integration results
        # In a production environment, you would want to log this error properly
        raise HTTPException(
            status_code=500,
            detail=f"Integration pipeline failed: {str(e)}"
        )

@router.get("/", response_model=list[IncidentResponse])
async def read_incidents(db: Session = Depends(get_db)):
    """
    Retrieve all incident reports.
    """
    incidents = db.query(IncidentModel).all()
    return incidents