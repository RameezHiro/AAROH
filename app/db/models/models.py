from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base

class RoadSegment(Base):
    __tablename__ = "road_segments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    district = Column(String, index=True)
    state = Column(String, index=True)
    risk_level = Column(String, default="Low") # Low, Medium, High, Blocked
    condition_score = Column(Float, default=100.0) # 0-100
    is_blocked = Column(Boolean, default=False)
    updated_at = Column(DateTime, default=datetime.utcnow)

    incidents = relationship("IncidentReport", back_populates="road_segment")

class WeatherData(Base):
    __tablename__ = "weather_data"

    id = Column(Integer, primary_key=True, index=True)
    district = Column(String, index=True)
    rainfall_mm = Column(Float, default=0.0)
    temperature = Column(Float, default=0.0)
    wind_speed = Column(Float, default=0.0)
    humidity = Column(Float, default=0.0)
    recorded_at = Column(DateTime, default=datetime.utcnow)

class VehicleTracking(Base):
    __tablename__ = "vehicle_tracking"

    id = Column(Integer, primary_key=True, index=True)
    vehicle_number = Column(String, unique=True, index=True)
    driver_name = Column(String)
    cargo_type = Column(String) # Medical, Food, Construction, Agricultural
    current_lat = Column(Float)
    current_lon = Column(Float)
    destination = Column(String)
    status = Column(String, default="In Transit") # In Transit, Delayed, Delivered, Alert
    last_updated = Column(DateTime, default=datetime.utcnow)

class IncidentReport(Base):
    __tablename__ = "incident_reports"

    id = Column(Integer, primary_key=True, index=True)
    road_segment_id = Column(Integer, ForeignKey("road_segments.id"), nullable=True)
    reported_by = Column(String)
    incident_type = Column(String) # Landslide, Flood, Road Damage, Traffic
    description = Column(Text)
    latitude = Column(Float)
    longitude = Column(Float)
    image_url = Column(String, nullable=True)
    severity = Column(String, default="Medium") # Low, Medium, High, Critical
    created_at = Column(DateTime, default=datetime.utcnow)

    road_segment = relationship("RoadSegment", back_populates="incidents")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="field_official") # admin, field_official, logistics_manager
    district = Column(String, nullable=True)
