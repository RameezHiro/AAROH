from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

# Road Segment Schemas
class RoadSegmentBase(BaseModel):
    name: str
    district: str
    state: str
    risk_level: Optional[str] = "Low"
    condition_score: Optional[float] = 100.0
    is_blocked: Optional[bool] = False

class RoadSegmentCreate(RoadSegmentBase):
    pass

class RoadSegmentResponse(RoadSegmentBase):
    id: int
    updated_at: datetime

    class Config:
        orm_mode = True

# Weather Schemas
class WeatherBase(BaseModel):
    district: str
    rainfall_mm: float
    temperature: float
    wind_speed: float
    humidity: float

class WeatherCreate(WeatherBase):
    pass

class WeatherResponse(WeatherBase):
    id: int
    recorded_at: datetime

    class Config:
        orm_mode = True

# Vehicle Tracking Schemas
class VehicleBase(BaseModel):
    vehicle_number: str
    driver_name: str
    cargo_type: str
    current_lat: float
    current_lon: float
    destination: str
    status: Optional[str] = "In Transit"

class VehicleCreate(VehicleBase):
    pass

class VehicleResponse(VehicleBase):
    id: int
    last_updated: datetime

    class Config:
        orm_mode = True

# Incident Report Schemas
class IncidentBase(BaseModel):
    road_segment_id: Optional[int] = None
    reported_by: str
    incident_type: str
    description: str
    latitude: float
    longitude: float
    image_url: Optional[str] = None
    severity: Optional[str] = "Medium"

class IncidentCreate(IncidentBase):
    pass

class IncidentResponse(IncidentBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# User Schemas
class UserBase(BaseModel):
    username: str
    role: Optional[str] = "field_official"
    district: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
