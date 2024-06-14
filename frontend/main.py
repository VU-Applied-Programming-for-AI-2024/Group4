from flask import Flask, render_template, request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import text
from data.furniture import Furniture
from auth import auth as auth_blueprint
from auth import db, db_path
import os

# class Base(DeclarativeBase):
#   pass

# db = SQLAlchemy(model_class=Base)
# db_path = os.path.join(os.path.dirname(__file__), 'data', 'pour&listen.db')

app = Flask(__name__)
app.config["SECRET_KEY"] = 'group4'
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"
db.init_app(app)

app.register_blueprint(auth_blueprint)

simple_page = Blueprint('simple_page', __name__, template_folder='templates')
@simple_page.route('/', defaults={'page': 'index'})
@simple_page.route('/<page>')
def show(page):
   return render_template(f'templates/{page}.html')

with app.app_context():
    db.create_all()

@app.route('/')
def index():
   return render_template('index.html')

@app.route('/register', methods =["GET", "POST"])
def register():
   if request.method == "POST":
       # getting input with name = username in HTML (registration)form
       username = request.form.get("username")
       # getting input with name = mail in HTML (registration)form 
       email = request.form.get("mail") 
       print(username, email)
       return render_template('registrationSucceeded.html')
   return render_template('registerpage.html')

@app.route('/registrationsucces', methods =["GET", "POST"])
def registrationsucces():
   return render_template('registrationSucceeded.html')

@app.route('/game', methods =["GET", "POST"])
def game():
   return render_template('gamepage.html')

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