import binascii
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get("SECRET_KEY", binascii.hexlify(os.urandom(20)).decode())

DEBUG = not os.environ.get("DEBUG", "False") == "False"

ALGORITHM = "HS256"

SQLALCHEMY_DATABASE_URI = os.environ.get(
    "SQLALCHEMY_DATABASE_URI", f'sqlite:///{BASE_DIR / "db.sqlite3"}'
)
SQLALCHEMY_TRACK_MODIFICATIONS = (
    os.environ.get("SQLALCHEMY_TRACK_MODIFICATIONS", "True") == "True"
)
