#
# I don't know what this is, it looks like a practice page
# Not in use.
#

from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from app import app, db
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy import create_engine

migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()

# Create an engine to connect to the database
engine = create_engine('sqlite:///database.db')

# Check if the database exists
if not database_exists(engine.url):
    # The database doesn't exist, create it
    create_database(engine.url)
    print("Database created successfully.")
else:
    print("Database already exists.")