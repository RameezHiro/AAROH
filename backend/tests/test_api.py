import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.db.database import get_db
import app.db.models.models as models

client = TestClient(app)

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