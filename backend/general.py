from flask import Flask, render_template, request, jsonify, Blueprint, redirect, url_for, flash, session
from flask_login import current_user

general = Blueprint('general', __name__)
# general.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"
# db.init_general(general)

@general.route('/')
def index():
   is_auth = current_user.is_authenticated
   return render_template('index.html', is_auth=is_auth)

@general.route('/registrationsucces', methods =["GET", "POST"])
def registrationsucces():
   return render_template('registrationSucceeded.html')

@general.route('/game', methods =["GET", "POST"])
def game():
   return render_template('gamepage.html')

@general.route('/summary_plot')
def summary_plot():
    return render_template("summary_plot.html")

@general.route('/about', methods=["GET"])
def about():
   return render_template('about.html')

@general.route('/choosechar', methods =["GET", "POST"])
def choosechar():
   return render_template('choose_character.html')

@general.route('/nameboy', methods =["GET", "POST"])
def nameboy():
   return render_template('name_boy_character.html')

#The naming girl character page
@general.route('/namegirl', methods =["GET", "POST"])
def namegirl():
   return render_template('name_girl_character.html')