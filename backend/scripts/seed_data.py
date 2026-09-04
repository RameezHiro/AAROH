from sqlalchemy.orm import Session
from app.db.database import SessionLocal, engine
import app.db.models.models as models


def seed_database():
    # Create tables first
    models.Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    # Check if data already exists
    if db.query(models.RoadSegment).count() > 0:
        print("Database already seeded.")
        db.close()
        return

    print("Seeding NER Smart Logistics database...")

    # Seed Road Nodes
    nodes = [
        models.RoadNode(id=1, name="Guwahati", latitude=26.1445, longitude=91.7362, district="Ri Bhoi", state="Meghalaya"),
        models.RoadNode(id=2, name="Shillong", latitude=25.5941, longitude=91.8988, district="East Khasi Hills", state="Meghalaya"),
        models.RoadNode(id=3, name="Imphal", latitude=24.8170, longitude=93.9368, district="Imphal West", state="Manipur"),
        models.RoadNode(id=4, name="Jiribam", latitude=24.6667, longitude=93.9000, district="Tamenglong", state="Manipur"),
        models.RoadNode(id=5, name="Aizawl", latitude=23.7271, longitude=92.7176, district="Aizawl", state="Mizoram"),
        models.RoadNode(id=6, name="Lunglei", latitude=22.8900, longitude=92.7500, district="Lunglei", state="Mizoram"),
        models.RoadNode(id=7, name="Itanagar", latitude=27.0844, longitude=93.6053, district="Papum Pare", state="Arunachal Pradesh"),
        models.RoadNode(id=8, name="Naharlagun", latitude=27.1045, longitude=93.6986, district="Papum Pare", state="Arunachal Pradesh"),
        models.RoadNode(id=9, name="Kohima", latitude=25.6741, longitude=94.1100, district="Kohima", state="Nagaland"),
        models.RoadNode(id=10, name="Dimapur", latitude=25.9167, longitude=93.7333, district="Dimapur", state="Nagaland"),
        models.RoadNode(id=11, name="Agartala", latitude=23.8315, longitude=91.2868, district="West Tripura", state="Tripura"),
        models.RoadNode(id=12, name="Udaipur", latitude=23.3333, longitude=91.3333, district="West Tripura", state="Tripura"),
    ]
    db.add_all(nodes)
    db.commit()

    # Seed Road Segments
    roads = [
        models.RoadSegment(name="Guwahati-Shillong Highway (NH 6)", start_node_id=1, end_node_id=2, district="Ri Bhoi", state="Meghalaya", risk_level="Low", condition_score=85.0, is_blocked=False),
        models.RoadSegment(name="Imphal-Jiribam Highway (NH 37)", start_node_id=3, end_node_id=4, district="Tamenglong", state="Manipur", risk_level="High", condition_score=40.0, is_blocked=True),
        models.RoadSegment(name="Aizawl-Lunglei Road (NH 54)", start_node_id=5, end_node_id=6, district="Aizawl", state="Mizoram", risk_level="Medium", condition_score=65.0, is_blocked=False),
        models.RoadSegment(name="Itanagar-Naharlagun Bypass", start_node_id=7, end_node_id=8, district="Papum Pare", state="Arunachal Pradesh", risk_level="Low", condition_score=90.0, is_blocked=False),
        models.RoadSegment(name="Kohima-Dimapur Road (NH 29)", start_node_id=9, end_node_id=10, district="Kohima", state="Nagaland", risk_level="High", condition_score=45.0, is_blocked=False),
        models.RoadSegment(name="Agartala-Udaipur Highway (NH 8)", start_node_id=11, end_node_id=12, district="West Tripura", state="Tripura", risk_level="Low", condition_score=95.0, is_blocked=False),
    ]
    db.add_all(roads)
    db.commit()

    # Seed Weather Data
    weathers = [
        models.WeatherData(district="Ri Bhoi", rainfall_mm=12.5, temperature=24.0, wind_speed=8.0, humidity=82.0),
        models.WeatherData(district="Tamenglong", rainfall_mm=78.2, temperature=21.5, wind_speed=15.4, humidity=95.0),
        models.WeatherData(district="Aizawl", rainfall_mm=34.0, temperature=22.0, wind_speed=10.0, humidity=88.0),
        models.WeatherData(district="Papum Pare", rainfall_mm=5.0, temperature=26.0, wind_speed=6.0, humidity=75.0),
        models.WeatherData(district="Kohima", rainfall_mm=55.8, temperature=19.0, wind_speed=12.0, humidity=91.0),
    ]
    db.add_all(weathers)
    db.commit()

    # Seed Vehicles
    vehicles = [
        models.VehicleTracking(vehicle_number="AS-01-F-1234", driver_name="Biren Das", cargo_type="Medical Supplies", current_lat=26.1445, current_lon=91.7362, destination="Shillong Civil Hospital", status="In Transit"),
        models.VehicleTracking(vehicle_number="MN-02-C-5678", driver_name="Thangjam Singh", cargo_type="Food Supplies", current_lat=24.8170, current_lon=93.9368, destination="Imphal Relief Camp", status="Delayed"),
        models.VehicleTracking(vehicle_number="MZ-01-A-9988", driver_name="Lalremruata", cargo_type="Construction Materials", current_lat=23.7271, current_lon=92.7176, destination="Lunglei Bridge Site", status="In Transit"),
    ]
    db.add_all(vehicles)
    db.commit()

    # Seed Incidents
    incidents = [
        models.IncidentReport(road_segment_id=2, reported_by="District Official Tamenglong", incident_type="Landslide", description="Heavy rainfall triggered landslide near KM 42 blocking essential goods transport.", latitude=24.9140, longitude=93.4832, severity="Critical"),
        models.IncidentReport(road_segment_id=5, reported_by="Traffic Police Kohima", incident_type="Road Damage", description="Sinking road surface due to continuous seepage and heavy trucks.", latitude=25.6741, longitude=94.1100, severity="High"),
    ]
    db.add_all(incidents)
    db.commit()

    print("Database seeding completed successfully!")
    db.close()

if __name__ == "__main__":
    seed_database()