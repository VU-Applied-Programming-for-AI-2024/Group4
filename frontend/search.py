from flask import Flask, render_template, request, jsonify, Blueprint, redirect, url_for, flash
from sqlalchemy import text
from data.user import User
from db import db

search = Blueprint('search', __name__)
# auth.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"
# db.init_app(auth)

@search.route('/search_res')
def search_data_page():
    search_input = request.args.get('search_input')
    results = db.session.execute(text(f"select * from furniture F where F.name like '%{search_input}%'")).all()
    return render_template("search_results.html", results=results)
