# routing_service.py
# AI-Powered Risk-Aware Routing Service
# Uses NetworkX to build a directed graph of road segments and Dijkstra's algorithm
# for risk-aware pathfinding.

import networkx as nx
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models.models import RoadSegment, RoadNode
from typing import List, Dict, Tuple, Optional


class RoutingService:
    def __init__(self):
        self.graph = nx.DiGraph()
        self.risk_weights = {"Low": 1.0, "Medium": 2.5, "High": 5.0, "Blocked": float('inf')}

    def build_graph(self, db: Session) -> None:
        """
        Load road nodes and segments from the database and construct a directed graph.
        Each RoadSegment is an edge between RoadNodes.
        Blocked roads are excluded entirely from the graph.
        """
        self.graph.clear()

        # Add all road nodes to the graph
        nodes = db.query(RoadNode).all()
        for node in nodes:
            self.graph.add_node(
                node.id,
                name=node.name,
                latitude=node.latitude,
                longitude=node.longitude,
                district=node.district,
                state=node.state
            )

        # Add edges only for non-blocked roads
        segments = db.query(RoadSegment).filter(RoadSegment.is_blocked == False).all()
        for segment in segments:
            # Determine edge weight based on risk level
            weight = self.risk_weights.get(segment.risk_level, 1.0)

            self.graph.add_edge(
                segment.start_node_id,
                segment.end_node_id,
                weight=weight,
                road_id=segment.id,
                road_name=segment.name,
                risk_level=segment.risk_level,
                is_blocked=False  # Explicitly mark as non-blocked
            )

        print(f"Graph built with {len(self.graph.nodes)} nodes and {len(self.graph.edges)} edges.")

    def find_route(self, start_id: int, end_id: int, db: Session) -> Dict:
        """
        Find the optimal risk-aware route from start_id to end_id using Dijkstra's algorithm.

        Returns:
            {
                "path_nodes": List[int],
                "path_roads": List[int],
                "total_risk_score": float,
                "risk_details": List[Dict],
                "coordinates": List[Dict]
            }
        """
        # Rebuild the graph with the current database state
        self.build_graph(db)

        # Check if start or end node is missing
        if start_id not in self.graph or end_id not in self.graph:
            raise ValueError("Start or end node not found in graph.")

        # Check if start and end nodes are the same
        if start_id == end_id:
            raise ValueError("Start node and end node must be different.")

        try:
            path_nodes = nx.shortest_path(self.graph, source=start_id, target=end_id, weight='weight')

            # Get the road segments along the path
            path_roads = []
            total_risk_score = 0.0
            risk_details = []

            # Calculate total risk score and collect risk details
            for i in range(len(path_nodes) - 1):
                u = path_nodes[i]
                v = path_nodes[i + 1]
                if (u, v) not in self.graph.edges:
                    raise ValueError("No path exists between start and end nodes.")
                edge_data = self.graph.edges[u, v]
                road_id = edge_data['road_id']
                road_name = edge_data['road_name']
                risk_level = edge_data['risk_level']
                weight = edge_data['weight']

                path_roads.append(road_id)
                total_risk_score += weight
                risk_details.append({
                    "road_id": road_id,
                    "road_name": road_name,
                    "risk_level": risk_level,
                    "risk_weight": weight,
                    "is_blocked": False
                })

            # Get coordinates for the path nodes
            coordinates = []
            for node_id in path_nodes:
                node_data = self.graph.nodes[node_id]
                coordinates.append({
                    "node_id": node_id,
                    "latitude": node_data['latitude'],
                    "longitude": node_data['longitude'],
                    "name": node_data.get('name', ''),
                    "district": node_data.get('district', ''),
                    "state": node_data.get('state', '')
                })

            return {
                "path_nodes": path_nodes,
                "path_roads": path_roads,
                "total_risk_score": round(total_risk_score, 2),
                "risk_details": risk_details,
                "coordinates": coordinates,
                "avoided_roads": None
            }

        except nx.NetworkXNoPath:
            raise ValueError("No path exists between start and end nodes.")


# Initialize the routing service
routing_service = RoutingService()