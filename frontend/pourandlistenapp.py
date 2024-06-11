#
# Flask code
#

#pip install flask flask_sqlalchemy flask_login flask_bcrypt flask_wtf wtforms email_validator


# importing Flask and other modules
from flask import Flask, request, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin 

from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database



# Flask constructor
app = Flask(__name__)  
#show app where database file is located
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
#create key to acces database
app.config['SECRET_KEY'] = 'thisisasecretkey'
#Set up database
db = SQLAlchemy(app)


#creating layout of database:
class User(db.Model, UserMixin):
   id = db.Column(db.Integer, primary_key=True)
   username = db.Column(db.String(20), nullable=False, unique=True)
   password = db.Column(db.String(80), nullable=False)


 
# A decorator used to tell the application
# which URL is associated function
@app.route('/', methods =["GET", "POST"])
def index():
   return render_template('index.html')


@app.route('/login', methods =["GET", "POST"])
def login():
   return render_template('loginpage.html')


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


@app.route('/game', methods =["GET", "POST"])
def game():
   return render_template('gamepage.html')

@app.route('/registrationsucces', methods =["GET", "POST"])
def registrationsucces():
   return render_template('registrationSucceeded.html')


 
if __name__=='__main__':
   with app.app_context():
      db.create_all()
   app.run(debug=True)