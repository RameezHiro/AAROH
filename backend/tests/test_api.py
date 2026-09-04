import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.db.database import Base, get_db
import app.db.models.models as models

# Use an in-memory SQLite database for test isolation
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(scope="module", autouse=True)
def setup_database():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        nodes = [
            models.RoadNode(id=1, name="Guwahati", latitude=26.1445, longitude=91.7362, district="Ri Bhoi", state="Meghalaya"),
            models.RoadNode(id=2, name="Shillong", latitude=25.5941, longitude=91.8988, district="East Khasi Hills", state="Meghalaya")
        ]
        db.add_all(nodes)
        roads = [
            models.RoadSegment(name="Guwahati-Shillong Highway", start_node_id=1, end_node_id=2, district="Ri Bhoi", state="Meghalaya", risk_level="Low", is_blocked=False)
        ]
        db.add_all(roads)
        db.commit()
    finally:
        db.close()

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "active"

def test_get_alerts():
    response = client.get("/api/alerts/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_roads():
    response = client.get("/api/roads")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_weather():
    response = client.get("/api/weather")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_road_nodes():
    response = client.get("/api/road-nodes")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_vehicles():
    response = client.get("/api/vehicles")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_dashboard():
    response = client.get("/api/dashboard/")
    assert response.status_code == 200
    dashboard_data = response.json()
    assert "alerts" in dashboard_data
    assert "incidents" in dashboard_data
    assert "vehicles" in dashboard_data
    assert "roads" in dashboard_data
    assert "active_alerts_count" in dashboard_data
    assert "active_incidents_count" in dashboard_data
    assert "active_vehicles_count" in dashboard_data
    assert isinstance(dashboard_data["alerts"], list)
    assert isinstance(dashboard_data["incidents"], list)
    assert isinstance(dashboard_data["vehicles"], list)
    assert isinstance(dashboard_data["roads"], list)