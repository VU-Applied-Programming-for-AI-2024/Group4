from db import db
from datetime import datetime

class Message(db.Model):
    __tablename__ = "message"

    id = db.Column("id", db.Integer, primary_key=True, autoincrement=True)
    content = db.Column("content", db.String, nullable=False)
    date = db.Column("date", db.DateTime, nullable=False)
    uid = db.Column("uid", db.String, nullable=False)

    def __init__(self, content: str, date: datetime, uid: str):
        self.content, self.date, self.uid = content, date, uid
    
    def __repr__(self):
        return f"Message #{self.id}: {self.content}"
