from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.db.models.models import VehicleTracking, RoadSegment, IncidentReport
from typing import List, Dict
from pydantic import BaseModel

class AlertService:
    def __init__(self):
        pass

    def generate_alerts(self, db: Session) -> List[Dict]:
        """
        Analyze current incidents, road statuses, and vehicle status
        to generate alerts.
        """
        alerts = []

        # 1. Detect Blocked Roads
        blocked_roads = db.query(RoadSegment).filter(RoadSegment.is_blocked == True).all()
        for road in blocked_roads:
            alerts.append({
                "type": "ROAD_BLOCKED",
                "message": f"Road segment {road.name} in {road.district} is currently blocked.",
                "severity": "CRITICAL",
                "timestamp": datetime.now(timezone.utc)
            })

        # 2. Detect High-Risk Corridors
        high_risk_roads = db.query(RoadSegment).filter(RoadSegment.risk_level == "High").all()
        for road in high_risk_roads:
            alerts.append({
                "type": "HIGH_RISK_CORRIDOR",
                "message": f"Road segment {road.name} in {road.district} is marked as high risk.",
                "severity": "HIGH",
                "timestamp": datetime.now(timezone.utc)
            })

        # 3. Detect Delayed Deliveries
        delayed_vehicles = db.query(VehicleTracking).filter(VehicleTracking.status == "Delayed").all()
        for vehicle in delayed_vehicles:
            alerts.append({
                "type": "DELAYED_DELIVERY",
                "message": f"Vehicle {vehicle.vehicle_number} (Cargo: {vehicle.cargo_type}) is delayed.",
                "severity": "MEDIUM",
                "timestamp": datetime.now(timezone.utc)
            })

        return alerts

alert_service = AlertService()
