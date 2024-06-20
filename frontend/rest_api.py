from flask import Flask, render_template, request, jsonify, Blueprint, redirect, url_for, flash, session
from flask_login import current_user
import openai
openai.api_key = 'sk-proj-b6J8wQ3KXq6ASLinpnvsT3BlbkFJz6b5TXP4yGhGuWkGX8GC'

api = Blueprint('api', __name__)
messages = []

def api_call(messages):
    # put here api thing
    messages = [ {"role": "system", "content":"You are a friendly, easygoing bartender in a cozy bar that offers advice and good conversation."} ]
    while True:
        message = input("User : ")
        if message:
            messages.append(
                {"role": "user", "content": message},
            )
            chat = openai.ChatCompletion.create(
                model="gpt-3.5-turbo", messages=messages
            )
        answer = chat.choices[0].message.content
        print(f"ChatGPT: {answer}")
        messages.append({"role": "assistant", "content": answer}) 
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

@api.route('/session', methods=['GET'])
def session_send():
    return jsonify(session)