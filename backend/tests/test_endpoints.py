import pytest
from fastapi import status

def test_root_endpoint(client):
    response = client.get("/")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["status"] == "online"
    assert "OreBit" in data["message"]
    assert "service" in data
    assert "version" in data
    assert "timestamp" in data

def test_health_endpoint(client):
    response = client.get("/health")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["status"] == "healthy"
    assert data["uptime"] == "normal"
    assert "database" in data
    assert "timestamp" in data

def test_reserve_map_success(client):
    response = client.get("/api/reserve-map")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["status"] == "success"
    assert "data_source" in data
    assert "satellite_reserves" in data
    assert "drillhole_logs" in data
    assert len(data["satellite_reserves"]["grid_points"]) > 0
    assert len(data["drillhole_logs"]["drillholes"]) > 0

def test_reserve_map_query_filtering(client):
    response = client.get("/api/reserve-map?min_iron_grade=60.0&zone_name=North")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    points = data["satellite_reserves"]["grid_points"]
    for p in points:
        assert p["iron_grade_pct"] >= 60.0
        assert "north" in p["zone_name"].lower()

def test_reserve_map_validation_error(client):
    # min_iron_grade must be <= 100
    response = client.get("/api/reserve-map?min_iron_grade=150.0")
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    data = response.json()
    assert data["status"] == "error"
    assert data["error"]["code"] == "VALIDATION_ERROR"
    assert "details" in data["error"]

def test_shortfall_forecast_success(client):
    response = client.get("/api/shortfall-forecast")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["status"] == "success"
    forecast = data["production_forecast"]
    assert len(forecast["records"]) > 0
    for rec in forecast["records"]:
        assert "target_tons" in rec
        assert "actual_tons" in rec
        assert "shortfall_tons" in rec

def test_shortfall_forecast_limit_days(client):
    response = client.get("/api/shortfall-forecast?limit_days=5")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    records = data["production_forecast"]["records"]
    assert len(records) <= 5

def test_shortfall_forecast_invalid_limit(client):
    # limit_days must be <= 90
    response = client.get("/api/shortfall-forecast?limit_days=150")
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    data = response.json()
    assert data["status"] == "error"

def test_equipment_health_success(client):
    response = client.get("/api/equipment-health")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["status"] == "success"
    fleet = data["equipment"]["fleet"]
    assert len(fleet) > 0
    for machine in fleet:
        assert "status" in machine
        assert "availability_pct" in machine

def test_equipment_health_status_filter(client):
    response = client.get("/api/equipment-health?status_filter=Operational")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    fleet = data["equipment"]["fleet"]
    for machine in fleet:
        assert machine["status"].lower() == "operational"

def test_blast_recommendations_success(client):
    response = client.get("/api/blast-recommendations")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["status"] == "success"
    analysis = data["blast_analysis"]
    records = analysis.get("recent_blasts") or analysis.get("blast_records") or []
    assert len(records) > 0

def test_fleet_status_success(client):
    response = client.get("/api/fleet-status")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["status"] == "success"
    summary = data["summary"]
    assert summary["total_machines"] > 0
    assert summary["overall_availability_pct"] >= 0
