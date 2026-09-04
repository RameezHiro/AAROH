# AAROH API Documentation

## Overview
AAROH is an AI-powered logistics platform for monitoring transport infrastructure, predicting disruptions, and managing logistics in the North Eastern Region (NER) of India.

## Base URL
`http://127.0.0.1:8000`

## Authentication
Not implemented in this MVP. All endpoints are publicly accessible.

## Endpoints

### Roads

#### Get All Road Segments
```
GET /api/roads
```
- **Description**: Retrieve all road segments.
- **Response**: List of `RoadSegmentResponse` objects.

#### Create a Road Segment
```
POST /api/roads
```
- **Description**: Create a new road segment.
- **Request Body**: `RoadSegmentCreate` object.
- **Response**: Created `RoadSegmentResponse` object.

### Road Nodes

#### Get All Road Nodes
```
GET /api/road-nodes
```
- **Description**: Retrieve all road nodes (junctions/intersections).
- **Response**: List of `RoadNodeResponse` objects.

### Routing

#### Find Route
```
POST /api/routing/find-route
```
- **Description**: Find the optimal risk-aware route between two road nodes.
- **Request Body**: `RouteRequest` object with `start_node_id` and `end_node_id`.
- **Response**: `RouteResponse` object containing:
  - `path_nodes`: List of node IDs in the path.
  - `path_roads`: List of road IDs traversed.
  - `total_risk_score`: Total risk score of the route.
  - `risk_details`: Detailed risk information for each traversed road.
  - `coordinates`: Coordinates for each node in the path.
  - `avoided_roads`: List of roads that were avoided due to high risk or blockage.

### Weather

#### Get All Weather Data
```
GET /api/weather
```
- **Description**: Retrieve all weather data.
- **Response**: List of `WeatherResponse` objects.

#### Create Weather Data
```
POST /api/weather
```
- **Description**: Create new weather data.
- **Request Body**: `WeatherCreate` object.
- **Response**: Created `WeatherResponse` object.

### Vehicles

#### Get All Vehicles
```
GET /api/vehicles
```
- **Description**: Retrieve all vehicle tracking data.
- **Response**: List of `VehicleResponse` objects.

#### Create Vehicle Tracking
```
POST /api/vehicles
```
- **Description**: Create new vehicle tracking data.
- **Request Body**: `VehicleCreate` object.
- **Response**: Created `VehicleResponse` object.

### Incidents

#### Get All Incidents
```
GET /api/incidents
```
- **Description**: Retrieve all incident reports.
- **Response**: List of `IncidentResponse` objects.

#### Create Incident Report
```
POST /api/incidents
```
- **Description**: Create a new incident report.
- **Request Body**: `IncidentCreate` object.
- **Response**: Created `IncidentResponse` object.

### Predictions

#### Evaluate Road Risk
```
POST /api/predictions/evaluate-road
```
- **Description**: Evaluate the risk of disruption for a road segment.
- **Request Body**: `PredictionRequest` object with `rainfall_mm`, `terrain_slope`, and `historical_landslides`.
- **Response**: `PredictionResponse` object with risk level and probability.

### Alerts

#### Get All Alerts
```
GET /api/alerts/
```
- **Description**: Retrieve all active alerts.
- **Response**: List of alert dictionaries.

### Dashboard

#### Get Dashboard Data
```
GET /api/dashboard/
```
- **Description**: Retrieve aggregated dashboard data.
- **Response**: `DashboardResponse` object containing alerts, incidents, vehicles, and roads.

## Models

### RouteRequest
```
{
  "start_node_id": int,
  "end_node_id": int
}
```

### RouteResponse
```
{
  "path_nodes": [int],
  "path_roads": [int],
  "total_risk_score": float,
  "risk_details": [
    {
      "road_id": int,
      "name": str,
      "risk_level": str,
      "is_blocked": bool,
      "risk_weight": float
    }
  ],
  "coordinates": [
    {
      "node_id": int,
      "latitude": float,
      "longitude": float,
      "name": str,
      "district": str,
      "state": str
    }
  ],
  "avoided_roads": [
    {
      "road_id": int,
      "name": str,
      "risk_level": str,
      "is_blocked": bool,
      "risk_weight": float
    }
  ]
}
```

### RoadNodeResponse
```
{
  "id": int,
  "name": str,
  "latitude": float,
  "longitude": float,
  "district": str,
  "state": str
}
```

## Routing Architecture

AAROH models the road network as a node-edge graph:
- **RoadNode**: Represents junctions/intersections with geographic coordinates.
- **RoadSegment**: Represents edges between nodes, with risk levels and blockage status.
- **NetworkX**: Used to build the graph and compute shortest paths.
- **Dijkstra's Algorithm**: Finds the lowest-risk route between nodes.
- **Risk Weights**: Applied to edges based on risk level:
  - Low: 1.0
  - Medium: 2.5
  - High: 5.0
  - Blocked: ∞ (infinity)

Blocked roads are excluded from the graph, and high-risk roads are avoided when feasible.

## Example Usage

### Find a Route
```bash
curl -X POST "http://127.0.0.1:8000/api/routing/find-route" \
  -H "Content-Type: application/json" \
  -d '{"start_node_id": 1, "end_node_id": 2}'
```

### Response
```json
{
  "path_nodes": [1, 2],
  "path_roads": [1],
  "total_risk_score": 1.0,
  "risk_details": [
    {
      "road_id": 1,
      "name": "Guwahati-Shillong Highway",
      "risk_level": "Low",
      "is_blocked": false,
      "risk_weight": 1.0
    }
  ],
  "coordinates": [
    {
      "node_id": 1,
      "latitude": 26.1445,
      "longitude": 91.7362,
      "name": "Guwahati",
      "district": "Ri Bhoi",
      "state": "Meghalaya"
    },
    {
      "node_id": 2,
      "latitude": 25.5941,
      "longitude": 91.8988,
      "name": "Shillong",
      "district": "East Khasi Hills",
      "state": "Meghalaya"
    }
  ],
  "avoided_roads": []
}
```