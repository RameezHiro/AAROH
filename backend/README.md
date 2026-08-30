# AAROH Backend

AI-Based Smart Logistics & Accessibility Intelligence Platform for North Eastern Region (NER).

## Directory Structure

```
backend/
├── app/
│   ├── api/          # API routes and dependencies
│   ├── core/         # Configuration and security settings
│   ├── db/           # Database setup and models
│   ├── schemas/      # Pydantic models for validation
│   ├── services/     # Business logic and external integrations
│   └── main.py       # FastAPI application entry point
├── scripts/          # Database seeding and utility scripts
├── requirements.txt  # Python dependencies
├── .env.example      # Environment variables template
└── ner_logistics.db  # SQLite database (development)
```

## Running the Backend

Always navigate to the `backend/` directory first before running commands:

```bash
cd backend
```

### Installation

1. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Linux/macOS
   # or
   venv\Scripts\activate  # On Windows
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

### Running the API Server

Start the development server with auto-reload:

```bash
python -m uvicorn app.main:app --reload
```

The API will be accessible at:
- Documentation: http://127.0.0.1:8000/docs
- Alternative Docs: http://127.0.0.1:8000/redoc
- Base Endpoint: http://127.0.0.1:8000/

### Seeding Data

To seed the local database with initial test data:

```bash
python -m scripts.seed_data
```

## Tech Stack

- **Framework**: FastAPI
- **Database**: SQLite (Dev) / PostgreSQL + PostGIS (Production)
- **ORM**: SQLAlchemy
- **Data Validation**: Pydantic
- **ML/GIS**: GeoPandas, Shapely, Scikit-learn, TensorFlow
