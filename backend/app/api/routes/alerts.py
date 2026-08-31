from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.alert_service import alert_service
from typing import List, Dict

router = APIRouter()

@router.get("/", response_model=List[Dict])
async def get_alerts(db: Session = Depends(get_db)):
    """
    Generate and retrieve all active alerts.
    """
    return alert_service.generate_alerts(db)
