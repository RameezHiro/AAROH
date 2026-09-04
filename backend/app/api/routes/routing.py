from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.routing_service import routing_service
import app.schemas.schemas as schemas
from typing import Dict

router = APIRouter(tags=["Routing"])

@router.post("/find-route", response_model=schemas.RouteResponse)
def find_route(route_req: schemas.RouteRequest, db: Session = Depends(get_db)):
    """
    Find the optimal risk-aware route between two nodes using Dijkstra's algorithm.
    """
    if route_req.start_node_id == route_req.end_node_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Start node and end node must be different."
        )

    try:
        route_result = routing_service.find_route(
            start_id=route_req.start_node_id,
            end_id=route_req.end_node_id,
            db=db
        )
        return route_result
    except ValueError as e:
        if "No path exists" in str(e):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No path exists between start and end nodes."
            )
        elif "not found in graph" in str(e):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Start or end node not found in graph."
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e)
            )
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred: {str(e)}"
        )
