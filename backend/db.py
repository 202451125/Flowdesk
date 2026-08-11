import os
from pathlib import Path
import mysql.connector
from mysql.connector import pooling
from dotenv import load_dotenv

# Force load .env from the exact directory where db.py lives
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "port": int(os.getenv("DB_PORT", "3306")),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", "dbmslab"),
    "database": os.getenv("DB_NAME", "company_management_system"),
}

DB_POOL_SIZE = int(os.getenv("DB_POOL_SIZE", "20"))

try:
    connection_pool = pooling.MySQLConnectionPool(
        pool_name="flowdesk_pool",
        pool_size=DB_POOL_SIZE,
        pool_reset_session=True,
        **DB_CONFIG,
    )
    print("[DB Pool Success] Connected to MySQL successfully!")
except mysql.connector.Error as err:
    connection_pool = None
    print(f"[DB Pool Init Error] {err}")


def get_db_connection():
    if connection_pool is None:
        try:
            return mysql.connector.connect(**DB_CONFIG)
        except mysql.connector.Error as err:
            raise RuntimeError(f"Database connection failed: {err}") from err

    try:
        return connection_pool.get_connection()
    except mysql.connector.Error as err:
        try:
            return mysql.connector.connect(**DB_CONFIG)
        except mysql.connector.Error as direct_err:
            raise RuntimeError(
                f"Failed to get DB connection: {err}; direct connect also failed: {direct_err}"
            ) from direct_err