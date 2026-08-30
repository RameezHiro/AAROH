# AAROH Development Instructions

This document provides project-wide development instructions for the AAROH Smart Logistics Platform.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Development Workflow](#development-workflow)
3. [Backend Development](#backend-development)
4. [Testing](#testing)
5. [Database Management](#database-management)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

## Project Overview

AAROH is an AI-powered logistics platform designed to monitor transport infrastructure, predict disruptions, and manage logistics in the North Eastern Region (NER) of India. The platform integrates:
- Real-time road condition monitoring
- Weather-based disruption prediction
- Vehicle tracking
- Incident reporting

## Development Workflow

### Prerequisites

- Python 3.10+ (recommended: 3.11)
- pip (Python package manager)
- Git
- A code editor (VS Code, PyCharm, etc.)

### Setting Up the Environment

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/aaroh.git
   cd aaroh
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Linux/macOS
   venv\Scripts\activate     # Windows
   pip install -r requirements.txt
   ```

## Backend Development

### Running the Backend

```bash
cd backend
python -m uvicorn app.main:app --reload
```

The API will be available at:
- http://127.0.0.1:8000/docs (Swagger UI)
- http://127.0.0.1:8000/redoc (ReDoc)

### Database Setup

1. Initialize the database:
   ```bash
   cd backend
   python -m scripts.seed_data
   ```

2. For PostgreSQL (production):
   - Set up the database using the connection string in `.env`
   - Run migrations if using Alembic

## Testing

### Running Tests

```bash
cd backend
# Add pytest to requirements.txt if needed
pip install pytest
pytest tests/  # If tests exist
```

### API Testing

Use the Swagger UI at `http://127.0.0.1:8000/docs` to test API endpoints:

- `/api/roads` - Get road segments
- `/api/weather` - Get weather data
- `/api/vehicles` - Get vehicle tracking
- `/api/incidents` - Get incident reports
- `/api/predictions/evaluate-road` - Evaluate road disruption risk

## Database Management

### SQLite (Development)

The development database is stored at `backend/ner_logistics.db`.

### PostgreSQL (Production)

For production, configure PostgreSQL with PostGIS extension:

1. Set up the database:
   ```bash
   createdb ner_logistics
   psql -d ner_logistics -c "CREATE EXTENSION postgis;"
   ```

2. Update `.env` with your PostgreSQL connection string:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/ner_logistics
   ```

## Deployment

### Docker (Recommended)

1. Create a `Dockerfile`:
   ```dockerfile
   FROM python:3.11-slim
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt
   COPY . .
   CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
   ```

2. Build and run:
   ```bash
   docker build -t aaroh-backend .
   docker run -p 8000:8000 aaroh-backend
   ```

### Manual Deployment

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the application:
   ```bash
   python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

## Troubleshooting

### Common Issues

1. **Database Connection Errors**:
   - Verify your `.env` file has the correct `DATABASE_URL`
   - Ensure the database server is running

2. **Import Errors**:
   - Always run commands from the `backend/` directory
   - Verify all dependencies are installed

3. **Port Conflicts**:
   - Change the port in the uvicorn command or stop the conflicting service

4. **Missing Dependencies**:
   - Run `pip install -r requirements.txt` again

### Debugging Tips

- Check logs for errors:
  ```bash
  tail -f logs/uvicorn.log  # If logging is configured
  ```

- Run with debug output:
  ```bash
  python -m uvicorn app.main:app --reload --log-level debug
  ```

## Contributing

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -am 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request

## License

This project is developed for the Smart India Hackathon (SIH) 2026.
