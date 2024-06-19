#
# Flask code. This code is the server of our website. 
# Run this code to start the website. 
# This code also includes all routes to pages 
# and the login/registration management
#

#pip install flask flask_sqlalchemy flask_login flask_bcrypt flask_wtf wtforms email_validator


# importing Flask and other modules
from flask import Flask, Request, render_template, url_for, request
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, LoginManager, login_user, login_required, logout_user, current_user
from flask_bcrypt import Bcrypt
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError, DataRequired
from datetime import datetime

from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import database_exists, create_database


import openai
OPENAI_API_KEY = "sk-proj-b6J8wQ3KXq6ASLinpnvsT3BlbkFJz6b5TXP4yGhGuWkGX8GC"
openai.api_key = OPENAI_API_KEY



#Flask constructor
app = Flask(__name__)  
#Show app where database file is located
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
#Create key to acces database
app.config['SECRET_KEY'] = 'thisisasecretkey'
#Initialize database
db = SQLAlchemy(app)








#A test database
class Names(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(50), nullable=False)
   email = db.Column(db.String(120), nullable=False, unique=True)

   def __repr__(self):
      return '<Name %r>' % self.name


#Creating layout of database (model):
class User(db.Model, UserMixin):
   __tablename__ = "users"
   id = db.Column(db.Integer, primary_key=True)
   username = db.Column(db.String(20), nullable=False, unique=True)
   # password max length below is 128, 
   # because the original password will be hashed
   # so might be longer than what you type in
   password = db.Column(db.String(128), nullable=False)






# Setting up the registration form:
class RegistrationForm(FlaskForm):
   username = StringField("Username", validators=[DataRequired(), Length(min=4, max=20,)])
   password = StringField("Password", validators=[DataRequired(), Length(min=4, max=20,)])
   submit = SubmitField("Register")

   def validateUsername(self, username):
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
   name = StringField('Name', validators=[DataRequired()])
   email = StringField('Email', validators=[DataRequired()])
   submit = SubmitField("Submit")












# A decorator used to tell the application
# which URL is associated function
#The main home page
@app.route('/', methods =["GET", "POST"])
def index():
   return render_template('index.html')

# Chat page (game page)
@app.route('/chat', methods =["GET", "POST"])
def chat():
   return render_template('chat.html')

#The login page
@app.route('/login', methods =["GET", "POST"])
def login():
   form = LoginForm()
   return render_template('loginpage.html', form=form)

# The about page
@app.route('/about', methods=["GET"])
def about():
   return render_template('about.html')

#Test form
@app.route('/testform', methods =["GET", "POST"])
def testfrom():
   username = None
   form = RegistrationForm()
   #check if form is validated (= correctly filled in )
   if form.validate_on_submit():
      #ask database to return all users with specific username (should be None)
      user = User.query.filter_by(username=form.username.data).first()
      if user == None:
         # hashed_pw = generate_password_hash(form.password_has.data, "pass678")
         user = User(username=form.username.data, password=form.password.data)
         db.session.add(user)
         db.session.commit()
      username = form.username.data
      #clear the form
      form.username.data = ''
      form.password.data = ''
      print('User added')
   our_users = User.query.order_by(User.id)
   return render_template('testform.html', form=form, username=username, our_users=our_users)

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
   return render_template('registerpage.html', form=form)


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




# TEMPORARY PAGE WITH ONLY MOVING MECHANICS FOR THE GAME
@app.route('/game-only', methods=["POST"])
def game_only():
   return render_template('game-only.html')

 
@app.route('/apichat', methods=["POST"])
def apichat():
   #get user input
   user_input = request.form["message"]
   #get api answer
   prompt = f"User: {user_input}\n Chatbot: "
   chat_history = []
   response = openai.Completion.create(
      engine="gpt-4o",
      prompt=prompt,
      temperature=0.5,
      max_tokens = 200,
      top_p=1,
      frequency_penalty=0,
      stop=["\nUser: ", "\nChatbot: "]
   )

   bot_response = response.choices[0].text.strip()

   chat_history.append(f"User: {user_input}\nChatbot: {bot_response}")

   return render_template(
      "apichattest.html",
      user_input = user_input,
      bot_response=bot_response,
   )

   completion = openai.ChatCompletion.create(
   model="gpt-3.5-turbo",
   messages=[
      {"role": "user", "content": message}
   ]
   )
   if completion.choices[0].message!=None:
      return completion.choices[0].message
   else:
      return 'Failed to Generate response!'
    

if __name__=='__main__':
   with app.app_context():
      db.create_all()
   app.run(debug=True)