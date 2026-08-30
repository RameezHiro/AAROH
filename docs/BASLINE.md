# AAROH Project Baseline

## Project Overview

**Name**: AI-Based Smart Logistics & Accessibility Intelligence Platform (NER)
**Version**: 1.0.0
**Status**: Active Development
**Repository**: [AAROH Monorepo](https://github.com/RameezHiro/AAROH)

AAROH is an AI-powered logistics platform designed to monitor transport infrastructure, predict disruptions, and manage logistics in the North Eastern Region (NER) of India.

## Repository Structure

```
AAROH/
├── backend/          # FastAPI backend application
│   ├── app/          # Main application code
│   │   ├── api/      # API routes and dependencies
│   │   ├── core/     # Configuration and security
│   │   ├── db/       # Database setup and models
│   │   ├── schemas/  # Pydantic models
│   │   ├── services/ # Business logic
│   │   └── main.py   # FastAPI application entry point
│   ├── scripts/      # Database seeding and utilities
│   ├── requirements.txt
│   ├── .env.example
│   ├── ner_logistics.db  # SQLite database (development)
│   └── README.md     # Backend-specific instructions
├── frontend/         # Future frontend application (empty)
├── docs/             # Project documentation
│   ├── api.md       # API documentation
│   ├── architecture.md # System architecture
│   ├── progress.md   # Project progress tracking
│   └── BASLINE.md   # Project baseline
├── data/             # Sample data and resources
├── .gitignore        # Git ignore configuration
├── README.md         # Project overview
└── CLAUDE.md         # Development instructions
```

## Technical Stack

### Backend
- **Framework**: FastAPI
- **Database**: SQLite (Development) / PostgreSQL + PostGIS (Production)
- **ORM**: SQLAlchemy
- **Data Validation**: Pydantic
- **GIS**: GeoPandas, Shapely
- **Machine Learning**: Scikit-learn, TensorFlow
- **Authentication**: Passlib, Python-JOSE
- **Dependencies**: Uvicorn, Python-Dotenv

### Frontend (Future)
- Framework: To be determined (React, Vue, Angular, etc.)
- State Management: To be determined

## Backend API Overview

### Core Endpoints

| Endpoint                     | Method | Description                          | Response Model               |
|-----------------------------|--------|------------------------------------|------------------------------|
| `/api/roads`                | GET    | Get road segments               | List[RoadSegmentResponse]     |
| `/api/roads`                | POST   | Create road segment               | RoadSegmentResponse          |
| `/api/weather`              | GET    | Get weather data                 | List[WeatherResponse]         |
| `/api/weather`              | POST   | Create weather data               | WeatherResponse              |
| `/api/vehicles`             | GET    | Get vehicle tracking             | List[VehicleResponse]         |
| `/api/vehicles`             | POST   | Create vehicle tracking           | VehicleResponse              |
| `/api/incidents`            | GET    | Get incident reports              | List[IncidentResponse]        |
| `/api/incidents`            | POST   | Create incident report            | IncidentResponse             |
| `/api/predictions/evaluate-road` | POST | Evaluate road disruption risk    | PredictionResponse           |

### Root Endpoint

- **Endpoint**: `/`
- **Method**: GET
- **Description**: Welcome message and API status
- **Response**: JSON with welcome message and status

## Database Schema

### Core Models

1. **RoadSegment**: Road infrastructure data with condition scores
2. **WeatherData**: Weather conditions affecting logistics
3. **VehicleTracking**: Real-time vehicle tracking information
4. **IncidentReport**: Road incident reports with severity levels
5. **User**: System users with authentication credentials

## Development Workflow

### Backend Development

1. **Working Directory**: All backend commands must be run from the `backend/` directory
2. **Install Dependencies**:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Linux/macOS
   venv\Scripts\activate     # Windows
   pip install -r requirements.txt
   ```
3. **Run Server**:
   ```bash
   python -m uvicorn app.main:app --reload
   ```
4. **Seed Database**:
   ```bash
   python -m scripts.seed_data
   ```

### API Access

- **Swagger UI**: http://127.0.0.1:8000/docs
- **ReDoc**: http://127.0.0.1:8000/redoc

## Project Goals

1. Real-time road condition monitoring
2. Weather-based disruption prediction
3. Vehicle tracking and logistics management
4. Incident reporting and response coordination
5. AI-powered analytics for NER logistics optimization

## Future Development

1. **Frontend**: Develop user interface for the platform
2. **Mobile App**: Create mobile application for field officers
3. **Advanced Analytics**: Implement more sophisticated AI models
4. **Integration**: Connect with external logistics systems
5. **Deployment**: Prepare for production deployment

## License

This project is developed for the Smart India Hackathon (SIH) 2026.