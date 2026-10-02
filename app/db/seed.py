import sys
import os
import json
from pathlib import Path

# Add backend root to path
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from app.db.database import init_and_seed_db, check_db_health
from app.services.data_loader import load_json_file

def main():
    print("==================================================")
    print(" OreBit PostgreSQL + PostGIS Seeder & Health Check")
    print("==================================================")
    
    health = check_db_health()
    print(f"Database Health: {json.dumps(health, indent=2)}")
    
    if not health.get("db_connected"):
        print("\n[!] WARNING: PostgreSQL database is not currently connected.")
        print("    Make sure PostgreSQL with PostGIS extension is running on port 5432 or set DATABASE_URL environment variable.")
        print("    Example: docker-compose up db -d\n")
        return

    print("\nExecuting schema migration and seeding process...")
    success = init_and_seed_db(load_json_file)
    if success:
        print("\n[✓] PostgreSQL + PostGIS database successfully initialized & seeded!")
        new_health = check_db_health()
        print(f"\nUpdated Record Counts: {json.dumps(new_health.get('record_counts'), indent=2)}")
    else:
        print("\n[X] Database seeding encountered an issue.")

if __name__ == "__main__":
    main()
