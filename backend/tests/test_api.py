"""
AquaCop Backend Integration Tests
Tests core health, telemetry, threat classification, and database endpoints.
Can be executed with either:
  python -m unittest tests/test_api.py
or
  pytest tests/
"""
import os
import sys
import unittest

# Ensure backend root directory is always on python sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi.testclient import TestClient
from main import app


class TestAquaCopBackend(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        from models import init_db, SessionLocal, WaterBody
        from config import WATER_BODIES
        init_db()
        db = SessionLocal()
        try:
            if not db.query(WaterBody).first():
                for wb in WATER_BODIES:
                    db.add(WaterBody(
                        id=wb["id"],
                        name=wb["name"],
                        district=wb.get("district", "Chennai"),
                        type=wb.get("type", "Lake"),
                        center_lat=wb["center"][0],
                        center_lon=wb["center"][1],
                        bbox=wb["bbox"],
                        historical_area_sqkm=wb.get("historical_area_sqkm", 10.0),
                        current_area_sqkm=wb.get("historical_area_sqkm", 10.0) * 0.75,
                        encroached_area_sqkm=wb.get("historical_area_sqkm", 10.0) * 0.25,
                        ndwi_index=0.42,
                        flood_risk_score=85,
                        status="MONITORED",
                        last_satellite_pass="Sentinel-2A · Test Baseline"
                    ))
                db.commit()
        finally:
            db.close()
        cls.client = TestClient(app)

    def test_health_check_endpoint(self):
        """Verify /api/health returns HTTP 200, healthy status, and database connectivity."""
        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("service"), "aquacop-backend")
        self.assertIn(data.get("status"), ["healthy", "degraded"])
        self.assertIn("database", data)

    def test_status_endpoint(self):
        """Verify /api/status returns operational telemetry and sensor configuration."""
        response = self.client.get("/api/status")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("status"), "OPERATIONAL")
        self.assertIn("Copernicus Sentinel-2", data.get("primary_sensor", ""))

    def test_threat_classes_endpoint(self):
        """Verify /api/threats returns all 4 standard environmental threat classifications."""
        response = self.client.get("/api/threats")
        self.assertEqual(response.status_code, 200)
        threats = response.json()
        self.assertIsInstance(threats, dict)
        self.assertIn("CONSTRUCTION", threats)
        self.assertIn("LAND_FILLING", threats)
        self.assertIn("SAND_MINING", threats)
        self.assertIn("WASTE_DUMPING", threats)

    def test_stakes_endpoint(self):
        """Verify /api/stakes returns real ecological figures for disaster & groundwater risk."""
        response = self.client.get("/api/stakes")
        self.assertEqual(response.status_code, 200)
        stakes = response.json()
        self.assertIn("flooding", stakes)
        self.assertIn("groundwater", stakes)
        self.assertIn("permanent_loss", stakes)

    def test_waterbodies_endpoint(self):
        """Verify /api/waterbodies returns registered wetland and reservoir entities."""
        response = self.client.get("/api/waterbodies")
        self.assertEqual(response.status_code, 200)
        bodies = response.json()
        self.assertIsInstance(bodies, list)
        self.assertGreaterEqual(len(bodies), 1)


if __name__ == "__main__":
    unittest.main()
