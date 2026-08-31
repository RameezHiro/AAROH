from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models.models import VehicleTracking, RoadSegment
from typing import List, Dict

class VehicleService:
    def __init__(self):
        pass

    def check_impact(self, road_segment_id: int) -> Dict:
        """
        Check which vehicles are on or heading toward a risky/blocked road segment.

        Args:
            road_segment_id: ID of the road segment to check for impact

        Returns:
            Dictionary containing:
            - vehicles_affected: List of vehicle IDs on the segment
            - vehicles_heading: List of vehicle IDs heading toward the segment
            - risk_level: Risk level of the segment
        """
        db = next(get_db())
        try:
            # Get the road segment's risk level
            segment = db.query(RoadSegment).filter(RoadSegment.id == road_segment_id).first()
            if not segment:
                return {
                    "vehicles_affected": [],
                    "vehicles_heading": [],
                    "risk_level": "Unknown"
                }

            # Get vehicles currently on this segment (simplified for MVP)
            # In a real implementation, we would check if the vehicle's current location
            # is within the segment's geographic bounds
            vehicles_affected = []

            # Get vehicles heading toward this segment (simplified for MVP)
            # In a real implementation, we would check if the vehicle's destination
            # is the same as this segment or if it's on a route that includes this segment
            vehicles_heading = []

            # For MVP, we'll just return the segment's risk level
            return {
                "vehicles_affected": vehicles_affected,
                "vehicles_heading": vehicles_heading,
                "risk_level": segment.risk_level
            }
        finally:
            db.close()

vehicle_service = VehicleService()