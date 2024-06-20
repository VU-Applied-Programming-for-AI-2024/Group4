from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from furniture import Furniture

Base = declarative_base()
engine = create_engine("sqlite:///data/pour&listen.db", echo=True)
Base.metadata.create_all(bind=engine)

Session = sessionmaker(bind=engine)
session = Session()

print(session.query(Furniture).all())