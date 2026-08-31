# AAROH MVP Technical Design - 2026-08-30

## 1. Overview
The AAROH (AI-Powered Smart Logistics & Accessibility Intelligence Platform) MVP is an integrated logistics intelligence system tailored for the North Eastern Region (NER) of India. This document outlines the technical architecture for the MVP, focusing on AI-driven disruption risk prediction and risk-aware routing.

## 2. Problem and MVP Objectives
The NER faces logistics challenges due to terrain and weather-induced disruptions.
**MVP Objective**: Provide an end-to-end, integrated system that predicts road disruption risk, recommends safer routes, monitors vehicles, and alerts managers to high-risk logistics scenarios.

## 3. End-to-End AAROH Value Chain
Incident / Weather / Terrain → Risk Prediction → Risk Assessment → Route Recommendation → Vehicle Impact Analysis → Alert Generation → Dashboard Visualization.

## 4. User Personas and Workflows
- **Field Official**: Uploads incident reports (geo-tagged) via mobile-friendly API.
- **Logistics Manager**: Monitors vehicle tracking, receives high-risk alerts, and views optimized route recommendations.
- **Admin**: Oversees incident reports and verifies model predictions.

## 5. Current Backend Foundation
- **Framework**: FastAPI
- **DB**: SQLite (Dev) / PostgreSQL (Prod)
- **Current Models**: `RoadSegment`, `WeatherData`, `VehicleTracking`, `IncidentReport`, `User`
- **Implemented**: Basic CRUD for core models, initial API routing.

## 6. ML Prediction Architecture (Random Forest)
- **Target**: `disruption_probability` (0.0-1.0), `risk_level` (Low, Medium, High).
- **Features**: Rainfall (mm), Terrain slope, Historical landslide count, Drainage capacity.
- **Model**: Scikit-Learn Random Forest Classifier.
- **Training**: Synthetic/representative data only (see Disclaimer).
- **Inference**: Real-time evaluation upon weather/incident event updates.

## 7. Risk Model and Outputs
- `disruption_probability`: float
- `risk_level`: string ("Low", "Medium", "High")
- `model_confidence`: float
- `explanation`: List of top contributing features.
*Note: "Blocked" status is NOT a prediction. It is an observed operational state.*

## 8. Risk-Aware Routing Architecture
- **Algorithm**: Dijkstra’s algorithm (NetworkX).
- **Edge Costs**:
    - Low Risk: Base cost
    - Medium Risk: 2x Base cost
    - High Risk: 10x Base cost
    - Blocked: Pruned (removed)
- **Route Selection**: Path of minimum cost.
- **Response**: `path`, `total_risk_score`, `avoided_segments`.

## 9. Vehicle Impact Analysis
System continuously cross-references vehicle location (`VehicleTracking`) with `RoadSegment` risk status. If a vehicle is on or headed toward a high-risk/blocked segment, an alert is triggered.

## 10. Alert Architecture
- Triggered by:
    - High-risk prediction.
    - Incident report creation (Blocked status).
    - Vehicle entering high-risk zone.
- Delivery: Dashboard API endpoint for manager polling.

## 11. Dashboard/API Architecture
Aggregated API endpoints serving:
- District-wise connectivity status.
- Active incident reports.
- Vehicle tracking data.
- Recommended routes.

## 12. Database/Domain Model Changes Required
- Add `disruption_probability` and `risk_level` to `RoadSegment`.
- Add `alert` history table for tracking generated notifications.

## 13. API Contracts
- `POST /api/routing/recommend-route`: {start, end, commodity} -> {path, total_risk, avoided}
- `GET /api/dashboard/summary`: {active_incidents, critical_routes, vehicle_status}

## 14. Component Dependencies
[Foundation] → [Analysis (ML/Routing)] → [Integration (Alerts)] → [Visualization (Dashboard)]

## 15. MVP / V1 / Future Scope
- **MVP**: RF Model, NetworkX Routing, Incident/Vehicle CRUD, Alerting, Dashboard API.
- **V1**: WebSockets, Mapbox, Auto-ingestion.
- **Future**: Deep Learning, PostGIS, Offline Sync.

## 16. End-to-End Demo Scenario
Incident/Weather → Prediction → Risk Calculation → Pathfinding → Vehicle Impact check → Alert → Dashboard view (with justification).

## 17. Technical Risks and Limitations
- Synthetic data may not capture real-world NER nuances.
- Dijkstra's performance on large graphs needs monitoring.

## 18. Synthetic Data Disclaimer
All ML model training and evaluation are conducted on synthetic/representative data to demonstrate the system mechanism. We make no claims of real-world predictive accuracy, and this platform is not intended for operational use without validated historical NER data.
