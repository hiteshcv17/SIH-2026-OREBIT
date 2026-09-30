import pytest
from unittest.mock import patch
from fastapi import status

def test_empty_satellite_reserves_edge_case(client):
    """Verifies API gracefully handles an empty satellite reserves dataset."""
    empty_sat_payload = {
        "dataset": "satellite_band_ratio_reserves",
        "sensor": "Sentinel-2",
        "band_ratios": [],
        "bounding_box": {"min_lat": 0, "max_lat": 0, "min_lng": 0, "max_lng": 0},
        "grid_points": []
    }
    empty_dh_payload = {
        "dataset": "drillhole_exploration_logs",
        "standards": "UNFC",
        "drillholes": []
    }

    with patch("app.main.get_satellite_reserves", return_value=empty_sat_payload), \
         patch("app.main.get_drillhole_logs", return_value=empty_dh_payload):
        response = client.get("/api/reserve-map")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["status"] == "success"
        assert len(data["satellite_reserves"]["grid_points"]) == 0
        assert len(data["drillhole_logs"]["drillholes"]) == 0

def test_empty_equipment_fleet_edge_case(client):
    """Verifies fleet status metrics compute safely without zero-division error when fleet is empty."""
    empty_telemetry = {
        "dataset": "equipment_telemetry_phm",
        "total_fleet_units": 0,
        "fleet": []
    }

    with patch("app.main.get_equipment_telemetry", return_value=empty_telemetry):
        response = client.get("/api/fleet-status")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        summary = data["summary"]
        assert summary["total_machines"] == 0
        assert summary["operational"] == 0
        assert summary["overall_availability_pct"] == 0.0

def test_empty_shortfall_forecast_edge_case(client):
    """Verifies shortfall forecaster endpoint handles empty production records without crashing."""
    empty_prod = {
        "dataset": "daily_production_vs_target_30days",
        "period": "Last 30 Days",
        "records": []
    }

    with patch("app.main.get_daily_production", return_value=empty_prod):
        response = client.get("/api/shortfall-forecast")
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert len(data["production_forecast"]["records"]) == 0

def test_nonexistent_api_route_404(client):
    """Verifies request to invalid route returns 404 status code."""
    response = client.get("/api/invalid-nonexistent-endpoint")
    assert response.status_code == status.HTTP_404_NOT_FOUND
    data = response.json()
    assert "detail" in data or "error" in data or "status" in data
