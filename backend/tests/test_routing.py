#!/usr/bin/env python3

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.db.database import Base, get_db
from app.db.models.models import RoadNode, RoadSegment
from app.services.routing_service import routing_service

# Use an in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# Create a sessionmaker bound to the in-memory database
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override the get_db dependency to use the test database
@pytest.fixture(scope="module")
def db_session():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

# Override the get_db dependency to use the test database
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

# Import app.main after setting up the dependency override
from app.main import app

# Apply the override after importing app.main
app.dependency_overrides[get_db] = override_get_db

# Create tables and seed data before running tests
Base.metadata.create_all(bind=engine)

# Seed test data
with TestingSessionLocal() as db:
    nodes = [
        RoadNode(id=1, name="Guwahati", latitude=26.1445, longitude=91.7362, district="Ri Bhoi", state="Meghalaya"),
        RoadNode(id=2, name="Shillong", latitude=25.5941, longitude=91.8988, district="East Khasi Hills", state="Meghalaya"),
        RoadNode(id=3, name="Imphal", latitude=24.8170, longitude=93.9368, district="Imphal West", state="Manipur"),
        RoadNode(id=4, name="Jiribam", latitude=24.6667, longitude=93.9000, district="Tamenglong", state="Manipur"),
        RoadNode(id=5, name="Aizawl", latitude=23.7271, longitude=92.7176, district="Aizawl", state="Mizoram"),
    ]
    db.add_all(nodes)
    db.commit()

    roads = [
        RoadSegment(name="Guwahati-Shillong Highway (NH 6)", start_node_id=1, end_node_id=2, district="Ri Bhoi", state="Meghalaya", risk_level="Low", is_blocked=False),
        RoadSegment(name="Imphal-Jiribam Highway (NH 37)", start_node_id=3, end_node_id=4, district="Tamenglong", state="Manipur", risk_level="High", is_blocked=True),
        RoadSegment(name="Aizawl-Imphal Highway (NH 54)", start_node_id=5, end_node_id=3, district="Aizawl", state="Mizoram", risk_level="Medium", is_blocked=False),
    ]
    db.add_all(roads)
    db.commit()

# Create tables and seed data before running tests
Base.metadata.create_all(bind=engine)

# Seed test data
with TestingSessionLocal() as db:
    nodes = [
        RoadNode(id=1, name="Guwahati", latitude=26.1445, longitude=91.7362, district="Ri Bhoi", state="Meghalaya"),
        RoadNode(id=2, name="Shillong", latitude=25.5941, longitude=91.8988, district="East Khasi Hills", state="Meghalaya"),
        RoadNode(id=3, name="Imphal", latitude=24.8170, longitude=93.9368, district="Imphal West", state="Manipur"),
        RoadNode(id=4, name="Jiribam", latitude=24.6667, longitude=93.9000, district="Tamenglong", state="Manipur"),
        RoadNode(id=5, name="Aizawl", latitude=23.7271, longitude=92.7176, district="Aizawl", state="Mizoram"),
    ]
    db.add_all(nodes)
    db.commit()

    roads = [
        RoadSegment(name="Guwahati-Shillong Highway (NH 6)", start_node_id=1, end_node_id=2, district="Ri Bhoi", state="Meghalaya", risk_level="Low", is_blocked=False),
        RoadSegment(name="Imphal-Jiribam Highway (NH 37)", start_node_id=3, end_node_id=4, district="Tamenglong", state="Manipur", risk_level="High", is_blocked=True),
        RoadSegment(name="Aizawl-Imphal Highway (NH 54)", start_node_id=5, end_node_id=3, district="Aizawl", state="Mizoram", risk_level="Medium", is_blocked=False),
    ]
    db.add_all(roads)
    db.commit()

# Create a new client after setting up the database
client = TestClient(app)

# Create a new client after setting up the database
client = TestClient(app)

def test_routing_service_graph_creation():
    db = TestingSessionLocal()
    try:
        routing_service.build_graph(db)
        assert routing_service.graph.edges[1, 2]['weight'] == 1.0  # Low risk
        assert routing_service.graph.edges[5, 3]['weight'] == 2.5  # Medium risk
        assert (3, 4) not in routing_service.graph.edges  # Blocked road excluded
    finally:
        db.close()

def test_find_route_success():
    response = client.post(
        "/api/routing/find-route",
        json={"start_node_id": 1, "end_node_id": 2}
    )
    assert response.status_code == 200
    data = response.json()
    assert "path_nodes" in data
    assert "path_roads" in data
    assert "total_risk_score" in data
    assert data["path_nodes"] == [1, 2]
    assert data["total_risk_score"] == 1.0  # Low risk

def test_find_route_blocked_road():
    response = client.post(
        "/api/routing/find-route",
        json={"start_node_id": 3, "end_node_id": 4}
    )
    assert response.status_code == 400
    assert "No path exists" in response.json()['detail']

def test_find_route_invalid_node():
    response = client.post(
        "/api/routing/find-route",
        json={"start_node_id": 99, "end_node_id": 1}
    )
    assert response.status_code == 400
    assert "not found in graph" in response.json()['detail']

def test_find_route_same_node():
    response = client.post(
        "/api/routing/find-route",
        json={"start_node_id": 1, "end_node_id": 1}
    )
    assert response.status_code == 400
    assert "must be different" in response.json()['detail']

def test_risk_based_route_selection():
    response = client.post(
        "/api/routing/find-route",
        json={"start_node_id": 5, "end_node_id": 2}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["path_nodes"] == [5, 3, 2]  # Aizawl -> Imphal -> Shillong
    assert data["total_risk_score"] == 3.5  # Medium (2.5) + Low (1.0)

def test_blocked_road_excluded():
    response = client.post(
        "/api/routing/find-route",
        json={"start_node_id": 3, "end_node_id": 4}
    )
    assert response.status_code == 400
    assert "No path exists" in response.json()['detail']