from flask import Flask, render_template, request, jsonify, Blueprint, redirect, url_for, flash, session
from datetime import datetime
from flask_login import current_user
from sqlalchemy import text
from db import db
from data.message import Message
from chatgpt import chat
from data_summary import summarizer

api = Blueprint('api', __name__)

def api_call(message, chatgpt):
    # put here api thing
    response_content = chatgpt.response(message)
    response = {'response': response_content}
    return response

@api.route('/chat', methods=['POST'])
def chat_api():
    messages = session['messages']
    data = request.json
    message = data.get('message', '')
    message_db = Message(content=message, date=datetime.now(), uid=current_user.uid)
    db.session.add(message_db)
    db.session.commit()
    print(message_db, 'stored')
    messages.append({'message': message})
    response = api_call(message, chat)
    messages.append(response)
    return jsonify(response)

@api.route('/session', methods=['GET'])
def session_send():
    return jsonify(session)

@api.route('/summary_data')
def summary_data():
    uid = current_user.uid
    messages = db.session.execute(text(f'select content from message where uid == {uid}')).all()
    messages = list(map(lambda x: x[0], messages))
    return jsonify(summarizer.analyse(messages))
