from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
import os

class Base(DeclarativeBase):
  pass

db = SQLAlchemy()
db_path = os.path.join(os.path.dirname(__file__), 'data', 'pour&listen.db')