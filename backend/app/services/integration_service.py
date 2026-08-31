from app.services.prediction_service import predictor
from app.services.routing_service import routing_service
from app.services.vehicle_service import vehicle_service

class IntegrationService:
    def __init__(self):
        self.predictor = predictor
        self.routing_service = routing_service
        self.vehicle_service = vehicle_service

    def process_incident(self, road_segment_id: int, incident_data: dict) -> dict:
        """
        Process an incident by:
        1. Predicting disruption risk
        2. Recalculating routes
        3. Checking vehicle impact
        """
        # Step 1: Predict disruption risk
        prediction = self.predictor.predict_risk(
            rainfall_mm=incident_data.get('rainfall_mm', 0),
            terrain_slope=incident_data.get('terrain_slope', 0),
            historical_landslides=incident_data.get('historical_landslides', 0)
        )

        # Step 2: Recalculate routes (if start and end segments are provided)
        routes = None
        if incident_data.get('start_segment_id') and incident_data.get('end_segment_id'):
            self.routing_service.build_graph()
            routes = self.routing_service.find_route(
                start_id=incident_data.get('start_segment_id'),
                end_id=incident_data.get('end_segment_id')
            )

        # Step 3: Check vehicle impact
        vehicles_affected = self.vehicle_service.check_impact(road_segment_id)

        return {
            "prediction": prediction,
            "routes": routes,
            "vehicles_affected": vehicles_affected
        }

integration_service = IntegrationService()