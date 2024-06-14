from flask import Flask, render_template, request, jsonify, Blueprint, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import text
from data.user import User
import os

class Base(DeclarativeBase):
  pass

db = SQLAlchemy()
db_path = os.path.join(os.path.dirname(__file__), 'data', 'pour&listen.db')

auth = Blueprint('auth', __name__)
# auth.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"
# db.init_app(auth)

@auth.route('/login')
def login():
   return render_template('loginpage.html')

@auth.route('/login', methods=['POST'])
def login_post():
    password = request.form.get('password')
    username = request.form.get('username')
   
    user = db.session.execute(text('select * from user where username == username and password == password')).all()
    print(len(user), user[0][2], username)

    if len(user) == 1 and user[0][2] == password:
       return redirect(url_for('game'))
    flash('Please check you login details and try again.')
    return redirect(url_for('auth.login'))
    