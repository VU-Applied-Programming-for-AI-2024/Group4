from flask import Flask, render_template, request, jsonify, Blueprint, redirect, url_for, flash, session
from flask_login import current_user

api = Blueprint('api', __name__)
messages = []

def api_call(messages):
    # put here api thing
    response = {'response': messages[-1]['message']}
    return response

@api.route('/chat', methods=['POST'])
def chat_api():
    global messages
    print('here')
    data = request.json
    message = data.get('message', '')
    messages.append({'message': message})
    response = api_call(messages)
    messages.append(response)
    return jsonify(response)
