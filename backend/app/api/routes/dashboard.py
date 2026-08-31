from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.dashboard_service import dashboard_service
from app.schemas.schemas import DashboardResponse

router = APIRouter()

@router.get("/", response_model=DashboardResponse)
async def get_dashboard_data(db: Session = Depends(get_db)):
    """
    Retrieve aggregated data for the dashboard.
    """
    return dashboard_service.get_dashboard_data(db)
