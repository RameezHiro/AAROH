# AAROH - AI-Based Smart Logistics & Accessibility Intelligence Platform

A monorepo for the NER Smart Logistics Platform.

## Repository Structure

```
AAROH/
├── backend/          # FastAPI backend application
│   ├── app/          # Main application code
│   ├── scripts/      # Database seeding and utilities
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md      # Backend-specific instructions
├── frontend/         # Future frontend application
├── docs/             # Project documentation
├── data/             # Sample data and resources
├── .gitignore
├── README.md          # This file
└── CLAUDE.md          # Development instructions
```

## Getting Started

### Backend

The backend is a FastAPI application for monitoring transport, predicting disruptions, and managing logistics in the North Eastern Region.

**Working Directory**: All backend commands must be run from the `backend/` directory.

```bash
cd backend
python -m uvicorn app.main:app --reload
```

See `backend/README.md` for detailed backend setup and usage instructions.

### Frontend

The frontend directory is reserved for future frontend development. Currently empty.

## Development

See `CLAUDE.md` for project-wide development instructions, build commands, and testing guidelines.

## Documentation

- `docs/api.md` - API documentation
- `docs/architecture.md` - System architecture
- `docs/progress.md` - Project progress tracking

## License

This project is developed for the Smart India Hackathon (SIH) 2026.
