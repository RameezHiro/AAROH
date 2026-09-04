# AAROH Architecture Documentation

## Overview
AAROH is an AI-powered logistics platform designed to monitor transport infrastructure, predict disruptions, and manage logistics in the North Eastern Region (NER) of India. The platform integrates real-time monitoring, predictive analytics, and risk-aware routing.

## System Architecture

### Core Components
1. **Backend API**: FastAPI-based RESTful API.
2. **Database**: SQLite (development), PostgreSQL (production).
3. **Geospatial Data**: Road network modeled as a node-edge graph.
4. **Machine Learning**: Scikit-learn-based risk prediction.
5. **Alert Engine**: Rule-based alert generation.

## Database Schema

### RoadNode
- **Purpose**: Represents junctions/intersections in the road network.
- **Fields**:
  - `id`: Primary key.
  - `name`: Name of the node (e.g., "Guwahati").
  - `latitude`: Geographic latitude.
  - `longitude`: Geographic longitude.
  - `district`: Administrative district.
  - `state`: Administrative state.

### RoadSegment
- **Purpose**: Represents road segments connecting nodes.
- **Fields**:
  - `id`: Primary key.
  - `name`: Name of the road segment (e.g., "Guwahati-Shillong Highway").
  - `start_node_id`: Foreign key to `RoadNode` (start of the segment).
  - `end_node_id`: Foreign key to `RoadNode` (end of the segment).
  - `district`: Administrative district.
  - `state`: Administrative state.
  - `risk_level`: Risk level (Low, Medium, High, Blocked).
  - `condition_score`: Condition score (0-100).
  - `is_blocked`: Whether the road is currently blocked.

## Routing Architecture

### Graph-Based Routing
AAROH models the road network as a **node-edge graph** where:
- **Nodes** = `RoadNode` (junctions/intersections).
- **Edges** = `RoadSegment` (road segments).

### Routing Service
- **Library**: NetworkX.
- **Algorithm**: Dijkstra's algorithm.
- **Edge Weights**: Based on risk level:
  - Low: 1.0
  - Medium: 2.5
  - High: 5.0
  - Blocked: ∞ (infinity)

### Routing Logic
1. **Graph Construction**: The `RoutingService` builds a directed graph from the database.
2. **Risk Application**: Edge weights are assigned based on the `risk_level` of the road segment.
3. **Path Finding**: Dijkstra's algorithm finds the lowest-risk path between nodes.
4. **Blocked Roads**: Roads with `is_blocked=True` are excluded from the graph.

### Example
- **Input**: Start node ID = 1 (Guwahati), End node ID = 2 (Shillong).
- **Output**: Optimal path with risk details, coordinates, and avoided roads.

## API Endpoints

### Routing
- **POST /api/routing/find-route**: Find the optimal risk-aware route between two nodes.
- **Request**: `{"start_node_id": 1, "end_node_id": 2}`
- **Response**: Detailed route information including path nodes, road segments, risk scores, and coordinates.

### Road Nodes
- **GET /api/road-nodes**: Retrieve all road nodes (junctions/intersections).

## Risk-Aware Routing Workflow

1. **User Request**: Client requests a route between two nodes.
2. **Graph Construction**: The `RoutingService` builds the graph from the database.
3. **Path Finding**: Dijkstra's algorithm computes the lowest-risk path.
4. **Response**: Detailed route information is returned to the client.

## Data Flow

1. **Database**: Stores road nodes, segments, and their attributes.
2. **Routing Service**: Constructs the graph and computes routes.
3. **API Layer**: Exposes routing endpoints to clients.
4. **Frontend**: Visualizes routes on a map using coordinates.

## Frontend Integration

The frontend can visualize routes using the coordinates provided in the `RouteResponse`.
- **Map Libraries**: Leaflet.js or Mapbox GL JS.
- **Data**: `coordinates` field in `RouteResponse` contains latitude/longitude for each node in the path.

## Limitations

- **Topology**: The current implementation uses a simplified topology for demonstration.
- **Real-World Data**: For a production system, real-world road network data (e.g., OpenStreetMap) should be used.
- **Dynamic Updates**: The routing graph is rebuilt on each request. For high-traffic systems, consider caching.

## Future Enhancements

- **Real-World Topology**: Integrate OpenStreetMap or other geospatial datasets.
- **Dynamic Risk Updates**: Real-time updates to risk levels and blockages.
- **Advanced Routing**: Integration with GraphHopper or OSRM for more accurate routing.
- **Visualization**: Enhanced map visualization with risk overlays.

## Dependencies

- **Backend**: FastAPI, SQLAlchemy, NetworkX, Scikit-learn
- **Database**: SQLite (development), PostgreSQL (production)
- **Frontend**: Leaflet.js or Mapbox GL JS (for visualization)

## Summary

AAROH's routing system provides a **risk-aware pathfinding** solution for logistics management in the North Eastern Region. By modeling the road network as a graph and applying Dijkstra's algorithm with risk-based edge weights, the system ensures that vehicles take the safest possible routes while avoiding blocked roads.