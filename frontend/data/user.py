from flask_login import UserMixin
from db import db

class User(db.Model, UserMixin):
    __tablename__ = "users"

    uid = db.Column(db.String, primary_key=True, autoincrement=False)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    def __repr__(self) -> str:
        return super().__repr__()

    def get_id(self):
        return self.uid







# from sqlalchemy import create_engine, ForeignKey, Column, String, Integer, CHAR
# from sqlalchemy.orm import sessionmaker, declarative_base
# import os

# Base = declarative_base()

# class User(Base):
#     __tablename__ = 'users'

#     id = Column('id', Integer, primary_key=True)
#     username = Column('username', String(20), nullable=False, unique=True)
#     password = Column('password', String(80), nullable=False)

#     def __init__(self, id: int, username: str, password: str):
#         self.id, self.username, self.password = id, username, password
    
#     def __repr__(self):
#         return f"Furniture: id: {self.id}, name: {self.username}"

