from flask import Flask, render_template, request, jsonify, Blueprint, redirect, url_for, flash
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user
from sqlalchemy import text
from wtforms import Form, StringField, PasswordField
from data.user import User
from db import db

class LoginForm(Form):
   username = StringField('Username')
   password = PasswordField('Password')

login_manager = LoginManager()
auth = Blueprint('auth', __name__)

@login_manager.user_loader
def load_user(user_id):
   return User.query.get(user_id)

@auth.route('/')
def index():
   if current_user.is_authenticated:
      return str(current_user.username)
   else:
      return "didn't log in"

@auth.route('/login/<uid>')
def login(uid):
   user = User.query.get(uid)
   print(user.username)
   login_user(User.query.get(uid))
   return 'Success'

@auth.route('/logout')
def logout():
   logout_user()
   return 'Success'


# @auth.route('/login')
# def login():
#    return render_template('loginpage.html')

# @auth.route('/login', methods=['POST'])
# def login_post():
#    password = request.form.get('password')
#    username = request.form.get('username')
   
#    user = db.session.execute(text('select * from user where username == username and password == password')).all()
#    print(len(user), user[0][2], username)

#    if len(user) == 1 and user[0][2] == password:    
#       return redirect(url_for('general.game'))
#    flash('Please check you login details and try again.', 'error')
#    return redirect(url_for('auth.login'))
    