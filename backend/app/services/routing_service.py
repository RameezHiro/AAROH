# routing_service.py
# AI-Powered Risk-Aware Routing Service
# Uses NetworkX to build a directed graph of road segments and Dijkstra's algorithm
# for risk-aware pathfinding.

import networkx as nx
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models.models import RoadSegment
from typing import List, Dict, Tuple, Optional


class RoutingService:
    def __init__(self):
        self.graph = nx.DiGraph()

    def build_graph(self) -> None:
        """
        Load road segments from the database and construct a directed graph.
        """
        db = next(get_db())
        try:
            # Clear existing graph
            self.graph.clear()

            # Fetch all road segments from the database
            road_segments = db.query(RoadSegment).all()

            # Build directed graph
            for segment in road_segments:
                self.graph.add_node(segment.id, name=segment.name, risk_level=segment.risk_level)

            # Add edges between road segments (simplified for MVP)
            # In a real implementation, this would use a topology file or PostGIS
            # For now, we'll create a fully connected graph for testing
            for i in range(len(road_segments)):
                for j in range(len(road_segments)):
                    if i != j:  # Avoid self-loops
                        u = road_segments[i].id
                        v = road_segments[j].id
                        self.graph.add_edge(u, v, weight=1.0)

            print(f"Graph built with {len(self.graph.nodes)} nodes and {len(self.graph.edges)} edges.")

        finally:
            db.close()

    def find_route(self, start_id: int, end_id: int) -> Dict:
        """
        Find the optimal route from start_id to end_id using Dijkstra's algorithm.
        Dynamic edge costs are applied based on risk level.

        Returns:
            {
                "path": List[int],
                "total_risk_score": float,
                "avoided_segments": List[int]
            }
        """
        if start_id not in self.graph or end_id not in self.graph:
            raise ValueError("Start or end node not found in graph.")

        # Create a copy of the graph to avoid modifying the original
        working_graph = self.graph.copy()

        # Apply dynamic edge costs based on risk level
        for u, v, data in list(working_graph.edges(data=True)):
            u_risk = working_graph.nodes[u].get('risk_level', 'Low')
            v_risk = working_graph.nodes[v].get('risk_level', 'Low')

            # If either node is blocked, prune the edge
            if u_risk == "Blocked" or v_risk == "Blocked":
                working_graph.remove_edge(u, v)
                continue

            # Determine maximum risk level between u and v
            risk_weights = {"Low": 1.0, "Medium": 2.0, "High": 10.0}
            max_weight = max(risk_weights.get(u_risk, 1.0), risk_weights.get(v_risk, 1.0))
            data['weight'] = max_weight

        # Calculate total risk score and identify avoided segments
        try:
            path = nx.shortest_path(working_graph, source=start_id, target=end_id, weight='weight')

            risk_weights = {"Low": 1.0, "Medium": 2.0, "High": 10.0}
            total_risk_score = 0.0

            # Calculate total risk score along the path
            for node_id in path:
                risk = self.graph.nodes[node_id].get('risk_level', 'Low')
                total_risk_score += risk_weights.get(risk, 1.0)

            # Find all high-risk or blocked segments in the graph that were avoided
            avoided_segments = [
                node_id for node_id, data in self.graph.nodes(data=True)
                if data.get('risk_level') in ["High", "Blocked"] and node_id not in path
            ]

            return {
                "path": path,
                "total_risk_score": round(total_risk_score, 2),
                "avoided_segments": avoided_segments
            }

        except nx.NetworkXNoPath:
            raise ValueError("No path exists between start and end nodes.")


# Initialize the routing service
routing_service = RoutingService()