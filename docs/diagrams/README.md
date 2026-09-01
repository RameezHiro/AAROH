# AAROH Backend Architecture Diagrams

This directory contains clean Mermaid.js diagrams illustrating the AAROH Smart Logistics Platform backend architecture.

## 📊 Diagram Overview

All diagrams are created in **raw Mermaid.js format** (no Markdown fences or frontmatter).

## 📁 Directory Structure

```
docs/diagrams/
├── README.md
├── architecture/
│   ├── backend-architecture.mmd
│   └── database-architecture.mmd
└── modules/
    ├── roads-flow.mmd
    ├── weather-flow.mmd
    ├── vehicles-flow.mmd
    ├── incidents-flow.mmd
    ├── prediction-flow.mmd
    ├── routing-flow.mmd
    ├── alerts-flow.mmd
    └── dashboard-flow.mmd
```

## 🎨 Visual Style Guide

- **🟢 Green** (#9f9): API Routes and Entry Points
- **🟡 Yellow** (#ff9): Services and Business Logic
- **🟠 Orange** (#f96): Database Models
- **🔵 Blue** (#9ff): Database Systems
- **🟣 Purple** (#bbf): FastAPI Application
- **🟤 Light Blue** (#f96): ML Model
- **🔴 Red** (#f66): Critical/High Severity Components
- **Dashed Borders**: Future/Planned Components

## 📋 Diagram Descriptions

### Architecture Diagrams
1. **Backend Architecture**: High-level overview of the FastAPI application structure
2. **Database Architecture**: Database layer and ORM relationships

### Module Flow Diagrams
3. **Roads Flow**: Road segment management data flow
4. **Weather Flow**: Weather data ingestion and storage
5. **Vehicles Flow**: Vehicle tracking and monitoring
6. **Incidents Flow**: Incident reporting and integration pipeline
7. **Prediction Flow**: AI/ML disruption risk prediction
8. **Routing Flow**: Risk-aware route calculation
9. **Alerts Flow**: Rule-based alert generation engine
10. **Dashboard Flow**: Data aggregation for dashboard visualization

## 🔧 Usage

These diagrams can be:
- Rendered in any Mermaid-compatible viewer (VS Code, GitHub, GitLab)
- Exported to PNG/SVG for presentations
- Integrated into documentation
- Updated as the architecture evolves

## 📝 Rendering Instructions

To render these diagrams:
1. Copy the contents of any `.mmd` file
2. Paste into a Mermaid viewer
3. No additional formatting is needed

## 🔍 Implementation Verification

All diagrams are based on actual repository inspection. Components that exist in the codebase are shown with solid borders. Empty files or placeholder components are not included.

**Verified Components:**
- ✅ All API routes: /api/predictions, /api/incidents, /api/alerts, /api/dashboard, /api/roads, /api/weather, /api/vehicles
- ✅ All service modules: prediction_service, alert_service, dashboard_service, integration_service, routing_service, vehicle_service
- ✅ All database models: RoadSegment, WeatherData, VehicleTracking, IncidentReport, User
- ✅ FastAPI application with CORS middleware
- ✅ SQLite database with SQLAlchemy ORM
- ✅ ML model for disruption prediction

**Removed Components:**
- ❌ Empty route files: roads.py, vehicles.py, weather.py (0 bytes)
- ❌ Empty service files: gis_service.py, weather_service.py (0 bytes)

## 📅 Last Updated

**2026-09-01**

**Repository**: AAROH Smart Logistics Platform