import subprocess
import sys
import os

def run_entrypoint():
    print("==================================================")
    print(" OreBit Container Initialization Entrypoint")
    print("==================================================")
    
    # 1. Run database initialization and seeder
    try:
        print("[*] Running PostGIS database schema migration & seeder check...")
        subprocess.run([sys.executable, "app/db/seed.py"], check=False)
    except Exception as e:
        print(f"[!] Warning: Seeder execution check failed: {e}")

    # 2. Start Uvicorn FastAPI Server
    port = os.getenv("PORT", "8000")
    print(f"[*] Starting Uvicorn ASGI server on port {port}...")
    os.execv(sys.executable, [sys.executable, "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", port])

if __name__ == "__main__":
    run_entrypoint()
