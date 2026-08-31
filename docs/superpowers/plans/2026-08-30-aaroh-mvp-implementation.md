# AAROH MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the AI-powered logistics platform MVP featuring disruption risk prediction, risk-aware routing, and frontend dashboard integration.

**Architecture:** FastAPI backend (Random Forest ML, NetworkX/Dijkstra routing) + Frontend Dashboard.

**Tech Stack:** FastAPI, Python 3.11+, Scikit-Learn, NetworkX, React (for Dashboard).

**Spec:** docs/superpowers/specs/2026-08-30-aaroh-mvp-design.md

## Global Constraints
- Python 3.11+
- FastAPI backend under `backend/app/`
- Frontend dashboard under `frontend/`
- Model artifacts stored in `backend/app/models/artifacts/`
- All training data is synthetic/representative (labeled as such)

---

## Revised Dependency Graph
1. **Incident/Weather Input** (API)
2. **ML Prediction** (RF Model)
3. **Risk Update** (DB Update)
4. **Routing Service** (Recalculate path)
5. **Vehicle Impact Check** (Identify affected vehicles)
6. **Alert Service** (Notify system)
7. **Dashboard/Frontend** (Visualizing state)

---

## Implementation Phases

### Phase 0: Backend Foundation & Structure
- [ ] **Task 0.1: Project Structure Refinement**
  - **Files**: Ensure `backend/app/models/artifacts/` and `backend/data/training/` exist.
  - **Acceptance Criteria**: Repository paths adhere to backend/app/ structure; artifact directories exist.
  - **Parallel**: Backend-only.

### Phase 1: ML Prediction Engine
- [ ] **Task 1.1: RF Model Implementation**
  - **Files**: `backend/app/services/prediction_service.py`, `backend/scripts/train_model.py`
  - **Acceptance Criteria**: Model accepts (rain, slope, landslide_count), returns probability/risk/explanation.
  - **Parallel**: ML-focused.

### Phase 2: Risk-Aware Routing
- [ ] **Task 2.1: Graph Service**
  - **Files**: `backend/app/services/routing_service.py`
  - **Acceptance Criteria**: Dijkstra returns optimized path; high-risk segments are penalized or pruned (blocked).
  - **Parallel**: ML-focused (depends on prediction outputs).

### Phase 3: Integration Orchestration
- [ ] **Task 3.1: Pipeline Integration**
  - **Files**: `backend/app/api/routes/incidents.py`, `backend/app/services/integration_service.py`
  - **Acceptance Criteria**: Incident upload triggers prediction → route recalculation → impact check.
  - **Parallel**: Backend-focused.

### Phase 4: Alert & Dashboard APIs
- [ ] **Task 4.1: Alert Engine**
  - **Files**: `backend/app/services/alert_service.py`
  - **Acceptance Criteria**: High-risk impacts are stored and accessible via `GET /api/alerts`.
- [ ] **Task 4.2: Dashboard API**
  - **Files**: `backend/app/api/routes/dashboard.py`
  - **Acceptance Criteria**: Endpoint aggregates incidents, vehicle status, and high-risk segments.

### Phase 5: Frontend Dashboard
- [ ] **Task 5.1: Dashboard UI**
  - **Files**: `frontend/src/Dashboard.js`, `frontend/public/index.html`
  - **Acceptance Criteria**: Dashboard fetches from Backend API and visualizes route disruptions and vehicle impacts.
  - **Parallel**: Frontend-focused.

---

## Critical Path
1. ML Prediction Engine (Task 1.1)
2. Risk-Aware Routing (Task 2.1)
3. Integration Orchestration (Task 3.1)
4. Dashboard/Frontend Integration (Task 4.2, 5.1)

## Parallel Work
- **Backend/Integration**: Alert service development.
- **ML**: Model refinement and validation (synthetic).
- **Frontend**: Dashboard layout and API integration (can start once API contracts are finalized).

## MVP Cut Line
- If time is limited: Remove "Vehicle Impact Analysis" auto-check (Task 5.1), keep manual dashboard querying.

## Definition of Done
- E2E Pipeline: Incident/Weather report automatically updates risks, forces route re-calculation, and triggers an alert.
- Frontend Dashboard displays the impacted status clearly.
- All code committed and documented.
