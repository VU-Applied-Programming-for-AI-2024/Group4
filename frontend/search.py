from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import text
from data.furniture import Furniture
import os

class Base(DeclarativeBase):
  pass

db = SQLAlchemy(model_class=Base)
db_path = os.path.join(os.path.dirname(__file__), 'data', 'pour&listen.db')

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/')
@app.route('/search')
def search_page():
    return render_template("search.html")

@app.route('/search_res')
def search_data_page():
    search_input = request.args.get('search_input')
    results = db.session.execute(text(f"select * from furniture F where F.name like '%{search_input}%'")).all()
    return render_template("search_results.html", results=results)

if __name__ == "__main__":
    app.run(debug=True)