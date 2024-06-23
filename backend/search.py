from flask import Flask, render_template, request, jsonify, Blueprint, redirect, url_for, flash, session
from sqlalchemy import text
from data.user import User
from db import db
from flask_login import current_user

search = Blueprint('search', __name__)

@search.route('/search')
def search_page():
    session['filter'] = 'all'
    session['search_input'] = ''
    labels = ['floor', 'view', 'theme', 'misc', 'character']
    paths = {}
    for label in labels:
        paths[label] = session.get(label, '')
    
    flash('')
    return render_template("search.html", labels=labels, paths=paths)

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


    results = db.session.execute(text(f"select * from furniture F where F.name like '%{search_input}%' and (F.label == '{filter_value}' or '{filter_value}' == 'all') ORDER BY CASE WHEN F.label == 'floor' then 1 WHEN F.label == 'view' then 2 WHEN F.label == 'theme' then 3 ELSE 4 END")).all()
    return render_template("search_results.html", results=results)

@search.route('/clear_search')
def clear_search():
    print('here')
    paths = {}
    labels = ['floor', 'view', 'theme', 'misc', 'character']
    for label in labels:
        session[f'{label}'] = ''
        paths[f'{label}'] = ''
    response = jsonify()
    response.headers['HX-Redirect'] = url_for('search.search_page')
    return response

@search.route('/select_item', methods=["POST"])
def select_item():
    item_id = request.form.get('item_id')
    furniture = db.session.execute(text(f"select * from furniture F where F.id == '{item_id}'")).first()
    label = furniture.label
    path = furniture.path
    session[f'{label}'] = path

    # return 'hello world'
    return render_template("select_item.html", path=path)

@search.route('/pregame_check', methods=['POST'])
def check_game():
    print('here')
    furnitures = [session.get('floor', ''),
        session.get('view', ''),
        session.get('theme', ''),
        session.get('misc', ''),
        session.get('character', '')]
    if all(furniture != '' for furniture in furnitures) and current_user.is_authenticated:
        print('here')
        response = jsonify()
        response.headers['HX-Redirect'] = url_for('game.game_only')
    else:
        print(session, current_user)
        response = jsonify()
        response.headers['HX-Redirect'] = url_for('search.search_page')
        flash('Login and pick all elements of environmnet!', 'error')
    return response