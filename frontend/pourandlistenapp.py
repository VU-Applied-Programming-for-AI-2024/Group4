#
# Flask code
#

#pip install flask flask_sqlalchemy flask_login flask_bcrypt flask_wtf wtforms email_validator


# importing Flask and other modules
from flask import Flask, request, render_template, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError
from flask_bcrypt import Bcrypt

from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
#from sqlalchemy_utils import database_exists, create_database
 


# Flask constructor
app = Flask(__name__)  
#show app where database file is located
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
#create key to acces database
app.config['SECRET_KEY'] = 'thisisasecretkey'
#Set up database
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager()
login_manager.init_app(app)


#creating layout of database:
class User(db.Model, UserMixin):
   id = db.Column(db.Integer, primary_key=True)
   username = db.Column(db.String(20), nullable=False, unique=True)  #username has max 20 characters
   password = db.Column(db.String(80), nullable=False) #nullable means field has to be entered


class RegisterForm(FlaskForm):
    username = StringField(validators=[
                           InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})

    password = PasswordField(validators=[
                             InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})

    submit = SubmitField('Register')

    def validate_username(self, username):
        existing_user_username = User.query.filter_by(
            username=username.data).first()
        if existing_user_username:
            raise ValidationError(
                'That username already exists. Please choose a different one.')
            
class LoginForm(FlaskForm):
    username = StringField(validators=[
                           InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})

    password = PasswordField(validators=[
                             InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})

    submit = SubmitField('Login')

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

 
# A decorator used to tell the application
# which URL is associated function
@app.route('/', methods =["GET", "POST"])
def index():
   return render_template('index.html')


@app.route('/login', methods =["GET", "POST"])
def login():
    form = LoginForm()
    return render_template('loginpage.html', form=form)

@app.route('/register', methods=["GET", "POST"])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        new_user = User(username=form.username.data, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('registrationsucces'))
    return render_template('registerpage.html', form=form)


    # if request.method == "POST":
    #     # getting input with name = username in HTML (registration)form
    #     username = request.form.get("username")
    #     # getting input with name = mail in HTML (registration)form 
    #     email = request.form.get("mail") 
    #     print(username, email)
    #     return render_template('registrationSucceeded.html', form=form)


@app.route('/game', methods =["GET", "POST"])
def game():
   return render_template('gamepage.html')

@app.route('/registrationsucces', methods =["GET", "POST"])
def registrationsucces():
   return render_template('registrationSucceeded.html')

@app.cli.command('create-db')
def create_db():
    """Create the database."""
    with app.app_context():
        db.create_all()
        print("Database created")

@app.cli.command('add-user')
def add_user():
    """Add a user to the database."""
    with app.app_context():
        hashed_password = bcrypt.generate_password_hash('password').decode('utf-8')
        new_user = User(username='testuser', password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        print("User added")
 
if __name__=='__main__':
   with app.app_context():
      db.create_all()
   app.run(debug=True, port=5001)