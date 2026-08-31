from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import app.db.models.models as models
import app.schemas.schemas as schemas
from app.db.database import engine, get_db
from app.api.routes.predictions import router as prediction_router
from app.api.routes.incidents import router as incident_router
from app.api.routes.alerts import router as alert_router
from app.api.routes.dashboard import router as dashboard_router

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI-Based Smart Logistics & Accessibility Intelligence Platform (NER)",
    description="Backend API for monitoring transport, predicting disruptions, and managing logistics in North Eastern Region",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prediction_router, prefix="/api/predictions", tags=["Predictions"])
app.include_router(incident_router, prefix="/api/incidents", tags=["Incidents"])
app.include_router(alert_router, prefix="/api/alerts", tags=["Alerts"])
app.include_router(dashboard_router, prefix="/api/dashboard", tags=["Dashboard"])

@app.get("/")
def read_root():
    return {
        "message": "Welcome to NER Smart Logistics & Accessibility Intelligence Platform API",
        "status": "active",
        "docs": "/docs"
    }

# --- Road Segments Endpoints ---
@app.get("/api/roads", response_model=List[schemas.RoadSegmentResponse])
def get_road_segments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    roads = db.query(models.RoadSegment).offset(skip).limit(limit).all()
    return roads

@app.post("/api/roads", response_model=schemas.RoadSegmentResponse)
def create_road_segment(road: schemas.RoadSegmentCreate, db: Session = Depends(get_db)):
    db_road = models.RoadSegment(**road.dict())
    db.add(db_road)
    db.commit()
    db.refresh(db_road)
    return db_road

# --- Weather Endpoints ---
@app.get("/api/weather", response_model=List[schemas.WeatherResponse])
def get_weather(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    weather = db.query(models.WeatherData).offset(skip).limit(limit).all()
    return weather

@app.post("/api/weather", response_model=schemas.WeatherResponse)
def create_weather(weather: schemas.WeatherCreate, db: Session = Depends(get_db)):
    db_weather = models.WeatherData(**weather.dict())
    db.add(db_weather)
    db.commit()
    db.refresh(db_weather)
    return db_weather

# --- Vehicle Tracking Endpoints ---
@app.get("/api/vehicles", response_model=List[schemas.VehicleResponse])
def get_vehicles(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    vehicles = db.query(models.VehicleTracking).offset(skip).limit(limit).all()
    return vehicles

@app.post("/api/vehicles", response_model=schemas.VehicleResponse)
def create_vehicle(vehicle: schemas.VehicleCreate, db: Session = Depends(get_db)):
    db_vehicle = models.VehicleTracking(**vehicle.dict())
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle

# --- Incident Reports Endpoints ---
@app.get("/api/incidents", response_model=List[schemas.IncidentResponse])
def get_incidents(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    incidents = db.query(models.IncidentReport).offset(skip).limit(limit).all()
    return incidents

@app.post("/api/incidents", response_model=schemas.IncidentResponse)
def create_incident(incident: schemas.IncidentCreate, db: Session = Depends(get_db)):
    db_incident = models.IncidentReport(**incident.dict())
    db.add(db_incident)
    db.commit()
    db.refresh(db_incident)
    return db_incident
