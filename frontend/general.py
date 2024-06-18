from flask import Flask, render_template, request, jsonify, Blueprint, redirect, url_for, flash
from flask_login import current_user

general = Blueprint('general', __name__)
# general.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"
# db.init_general(general)

@general.route('/')
def index():
   return render_template('index.html')

@general.route('/registrationsucces', methods =["GET", "POST"])
def registrationsucces():
   return render_template('registrationSucceeded.html')

@general.route('/game', methods =["GET", "POST"])
def game():
   return render_template('gamepage.html')

@general.route('/search')
def search_page():
    return render_template("search.html")
    