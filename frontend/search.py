from flask import Flask, render_template, request, jsonify, Blueprint, redirect, url_for, flash, session
from sqlalchemy import text
from data.user import User
from db import db

search = Blueprint('search', __name__)
# auth.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"
# db.init_app(auth)

@search.route('/search_res')
def search_data_page():
    search_input = request.args.get('search_input')
    filter_value = request.args.get('filter')

    if filter_value is not None:
        session['filter'] = filter_value
    else:
        filter_value = session['filter']
    if search_input is not None:
        session['search_input'] = search_input
    else:
        search_input = session['search_input']


    results = db.session.execute(text(f"select * from furniture F where F.name like '%{search_input}%' and (F.label == '{filter_value}' or '{filter_value}' == 'all')")).all()
    return render_template("search_results.html", results=results)

@search.route('/select_item', methods=["POST"])
def select_item():
    item_id = request.form.get('item_id')
    furniture = db.session.execute(text(f"select * from furniture F where F.id == '{item_id}'")).first()
    label = furniture.label
    path = furniture.path
    session[f'{label}'] = path

    # return 'hello world'
    return render_template("select_item.html", path=path)

