from flask import Flask, render_template, request, jsonify, Blueprint, redirect, url_for, flash, session
from flask_login import current_user
from chatgpt import chat

api = Blueprint('api', __name__)
messages = []

def api_call(message, chatgpt):
    # put here api thing
    response_content = chatgpt.response(message)
    response = {'response': response_content}
    return response

@api.route('/chat', methods=['POST'])
def chat_api():
    global messages
    print('here')
    data = request.json
    message = data.get('message', '')
    messages.append({'message': message})
    response = api_call(message, chat)
    messages.append(response)
    return jsonify(response)

@api.route('/session', methods=['GET'])
def session_send():
    return jsonify(session)