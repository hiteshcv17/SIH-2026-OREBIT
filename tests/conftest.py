import pytest
from fastapi.testclient import TestClient
import sys
from pathlib import Path

# Add backend root to sys.path
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.main import app

@pytest.fixture(scope="session")
def client():
    """Shared FastAPI test client instance for pytest sessions."""
    with TestClient(app) as test_client:
        yield test_client
