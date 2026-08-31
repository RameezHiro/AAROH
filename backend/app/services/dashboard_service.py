from sqlalchemy.orm import Session
from app.db.models.models import RoadSegment, IncidentReport, VehicleTracking
from app.services.alert_service import alert_service
from app.schemas.schemas import DashboardResponse, DashboardAlert, DashboardIncident, DashboardVehicle, DashboardRoadSegment
from typing import List, Dict

class DashboardService:
    def __init__(self):
        pass

    def get_dashboard_data(self, db: Session) -> DashboardResponse:
        """
        Aggregate all relevant data for the dashboard.
        """
        # Get alerts
        alerts = alert_service.generate_alerts(db)
        dashboard_alerts = [
            DashboardAlert(
                type=alert['type'],
                message=alert['message'],
                severity=alert['severity'],
                timestamp=alert['timestamp']
            )
            for alert in alerts
        ]

        # Get incidents
        incidents = db.query(IncidentReport).all()
        dashboard_incidents = [
            DashboardIncident(
                id=incident.id,
                road_segment_id=incident.road_segment_id,
                reported_by=incident.reported_by,
                incident_type=incident.incident_type,
                description=incident.description,
                latitude=incident.latitude,
                longitude=incident.longitude,
                image_url=incident.image_url,
                severity=incident.severity,
                created_at=incident.created_at
            )
            for incident in incidents
        ]

        # Get vehicles
        vehicles = db.query(VehicleTracking).all()
        dashboard_vehicles = [
            DashboardVehicle(
                id=vehicle.id,
                vehicle_number=vehicle.vehicle_number,
                driver_name=vehicle.driver_name,
                cargo_type=vehicle.cargo_type,
                current_lat=vehicle.current_lat,
                current_lon=vehicle.current_lon,
                destination=vehicle.destination,
                status=vehicle.status,
                last_updated=vehicle.last_updated
            )
            for vehicle in vehicles
        ]

        # Get roads
        roads = db.query(RoadSegment).all()
        dashboard_roads = [
            DashboardRoadSegment(
                id=road.id,
                name=road.name,
                district=road.district,
                state=road.state,
                risk_level=road.risk_level,
                condition_score=road.condition_score,
                is_blocked=road.is_blocked,
                updated_at=road.updated_at
            )
            for road in roads
        ]

        return DashboardResponse(
            alerts=dashboard_alerts,
            incidents=dashboard_incidents,
            vehicles=dashboard_vehicles,
            roads=dashboard_roads,
            active_alerts_count=len(alerts),
            active_incidents_count=len(incidents),
            active_vehicles_count=len(vehicles)
        )

dashboard_service = DashboardService()
