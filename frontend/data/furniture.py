from sqlalchemy import create_engine, ForeignKey, Column, String, Integer, CHAR
from sqlalchemy.orm import sessionmaker, declarative_base

Base = declarative_base()

class Furniture(Base):
    __tablename__ = "furniture"
    
    id = Column("id", Integer, primary_key=True)
    name = Column("name", String, nullable=False)
    label = Column("label", String, nullable=False)
    path = Column("path", String, nullable=False)

    def __init__(self, id: int, name: str, label: str, path: str):
        self.id, self.name, self.label, self.path = id, name, label, path
    
    def __repr__(self):
        return f"Furniture: id: {self.id}, name: {self.name}, label: {self.label}, path: {self.path}"

