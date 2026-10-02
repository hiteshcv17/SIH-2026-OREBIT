import sys
import json
from pathlib import Path
from fastapi.testclient import TestClient

# Add backend root to path
sys.path.insert(0, str(Path(__file__).parent))

from app.main import app

client = TestClient(app)

def run_api_tests():
    print("==================================================")
    print(" Testing FastAPI Pydantic Validation & Endpoints")
    print("==================================================")

    # 1. Test Root
    res = client.get("/")
    assert res.status_code == 200
    print("[OK] GET / -> 200 OK")
    print(f"     Data: {res.json()['service']} v{res.json()['version']}")

    # 2. Test Health
    res = client.get("/health")
    assert res.status_code == 200
    print("[OK] GET /health -> 200 OK")

    # 3. Test Reserve Map with validation & filtering
    res = client.get("/api/reserve-map?min_iron_grade=60.0&zone_name=North")
    assert res.status_code == 200
    data = res.json()
    points = data["satellite_reserves"]["grid_points"]
    print(f"[OK] GET /api/reserve-map?min_iron_grade=60.0&zone_name=North -> 200 OK ({len(points)} grid points matched)")
    for p in points:
        assert p["iron_grade_pct"] >= 60.0

    # 4. Test Validation Error on Invalid Input (e.g., min_iron_grade > 100)
    res_err = client.get("/api/reserve-map?min_iron_grade=150.0")
    assert res_err.status_code == 422
    err_json = res_err.json()
    assert err_json["status"] == "error"
    assert err_json["error"]["code"] == "VALIDATION_ERROR"
    print(f"[OK] GET /api/reserve-map?min_iron_grade=150.0 -> 422 UNPROCESSABLE ENTITY (Validation Error Caught!)")
    print(f"     Error detail: {err_json['error']['message']}")

    # 5. Test Shortfall Forecast with limit_days parameter
    res = client.get("/api/shortfall-forecast?limit_days=7")
    assert res.status_code == 200
    recs = res.json()["production_forecast"]["records"]
    assert len(recs) <= 7
    print(f"[OK] GET /api/shortfall-forecast?limit_days=7 -> 200 OK ({len(recs)} records returned)")

    # 6. Test Equipment Health with status_filter
    res = client.get("/api/equipment-health?status_filter=Warning")
    assert res.status_code == 200
    fleet = res.json()["equipment"]["fleet"]
    print(f"[OK] GET /api/equipment-health?status_filter=Warning -> 200 OK ({len(fleet)} machines with Warning status)")
    for m in fleet:
        assert m["status"].lower() == "warning"

    # 7. Test Blast Recommendations
    res = client.get("/api/blast-recommendations")
    assert res.status_code == 200
    analysis = res.json()["blast_analysis"]
    blasts = analysis.get("recent_blasts") or analysis.get("blast_records") or []
    print(f"[OK] GET /api/blast-recommendations -> 200 OK ({len(blasts)} blasts returned)")

    # 8. Test Fleet Status
    res = client.get("/api/fleet-status")
    assert res.status_code == 200
    summary = res.json()["summary"]
    print(f"[OK] GET /api/fleet-status -> 200 OK (Total Machines: {summary['total_machines']}, Operational: {summary['operational']})")

    print("\n[OK] ALL API INPUT VALIDATION & ERROR HANDLING TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    run_api_tests()
