from sqlalchemy import create_engine, ForeignKey, Column, String, Integer, CHAR
from sqlalchemy.orm import sessionmaker, declarative_base
import os

Base = declarative_base()

class User(Base):
    __tablename__ = 'user'

    id = Column('id', Integer, primary_key=True)
    username = Column('username', String(20), nullable=False, unique=True)
    password = Column('password', String(80), nullable=False)

    def __init__(self, id: int, username: str, password: str):
        self.id, self.username, self.password = id, username, password
    
    def __repr__(self):
        return f"Furniture: id: {self.id}, name: {self.username}"
