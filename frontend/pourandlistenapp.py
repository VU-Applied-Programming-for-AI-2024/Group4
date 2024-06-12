#
# Flask code
#

#pip install flask flask_sqlalchemy flask_login flask_bcrypt flask_wtf wtforms email_validator


# importing Flask and other modules
from flask import Flask, request, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, LoginManager
from flask_bcrypt import Bcrypt 
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError, DataRequired

from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database



#Flask constructor
app = Flask(__name__)  
#Show app where database file is located
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
#Create key to acces database
app.config['SECRET_KEY'] = 'thisisasecretkey'
#Initialize up database
db = SQLAlchemy(app)



#Creating layout of database:
class User(db.Model, UserMixin):
   __tablename__ = "users"
   id = db.Column(db.Integer, primary_key=True)
   username = db.Column(db.String(20), nullable=False, unique=True)
   # password max length below is 80, 
   # because the original password will be hashed
   # so might be longer than what you type in
   password = db.Column(db.String(80), nullable=False)


# Setting up the registration form:
class RegistrationForm(FlaskForm):
   username = StringField("Username", validators=[InputRequired(), Length(min=4, max=20,)])
   password = StringField("Password", validators=[InputRequired(), Length(min=4, max=20,)])
   submit = SubmitField("Register")

   def validateUsername(self, Username):
      #Function that checks if username already exists
      existing_user_username = User.query.filter_by(username=username.data).first()
      if existing_user_username:
         raise ValidationError("Username already exists. Please choose a different one.")
      
#Setting up the login form:
class LoginForm(FlaskForm):
   username = StringField("Username", validators=[InputRequired(), Length(min=4, max=20,)])
   password = StringField("Username", validators=[InputRequired(), Length(min=4, max=20,)])
   submit = SubmitField("Login")


#Setting up a test form, NOT used in final website
class testForm(FlaskForm):
   name = StringField('What is your name?', validators=[DataRequired()])
   submit = SubmitField("Submit")

# A decorator used to tell the application
# which URL is associated function

#The main home page
@app.route('/', methods =["GET", "POST"])
def index():
   return render_template('index.html')

#The login page
@app.route('/login', methods =["GET", "POST"])
def login():
   form = LoginForm()
   return render_template('old_loginpage.html', form=form)

#Test form
@app.route('/testform', methods =["GET", "POST"])
def testfrom():
   name = None
   form = testForm()
   if form.validate_on_submit():
      name = form.name.data
      form.name.data = ''
   return render_template('testform.html', form=form, name=name)

#The registration page
@app.route('/register', methods =["GET", "POST"])
def register():
   form = RegistrationForm()
   # if request.method == "POST":
   #     # getting input with name = username in HTML (registration)form
   #     username = request.form.get("username")
   #     # getting input with name = mail in HTML (registration)form 
   #     email = request.form.get("mail") 
   #     print(username, email)
   #     return render_template('old_registrationSucceeded.html')
   return render_template('old_registerpage.html', form=form)


#The choose-character page
@app.route('/choosechar', methods =["GET", "POST"])
def choosechar():
   return render_template('choose_character.html')

#The naming boy character page
@app.route('/nameboy', methods =["GET", "POST"])
def nameboy():
   return render_template('name_boy_character.html')

#The naming girl character page
@app.route('/namegirl', methods =["GET", "POST"])
def namegirl():
   return render_template('name_girl_character.html')

#The search page
@app.route('/search', methods =["GET", "POST"])
def search():
   return render_template('search.html')

#The registration succeeded page
@app.route('/registrationsucces', methods =["GET", "POST"])
def registrationsucces():
   return render_template('registrationSucceeded.html')


 
if __name__=='__main__':
   with app.app_context():
      db.create_all()
   app.run(debug=True)