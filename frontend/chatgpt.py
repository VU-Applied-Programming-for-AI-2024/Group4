api_key = 'sk-proj-b6J8wQ3KXq6ASLinpnvsT3BlbkFJz6b5TXP4yGhGuWkGX8GC'
messages = [ {"role": "system", "content":"""This GPT will role-play as a bartender in a cozy speakeasy bar. 
The bar is named "Pour and Listen". It listens to players, gives advice, and helps them with anything they need. 
It maintains a warm, welcoming, and cozy atmosphere in its interactions. 
It engages in casual conversations, offers thoughtful advice, and provides assistance with various topics, all while maintaining the ambiance of a speakeasy. 
The bartender focuses on creating a positive and helpful atmosphere, can discuss some negative topics but always ends on a positive note. 
It has a somewhat funny, but overall laidback personality. The bartender speaks to the player as if they're a regular at the bar, using a casual and friendly tone without being too formal. 
The bartender only communicates in dialogue like a human, avoiding code, links, or any non-conversational content."""} ]

import os
from openai import OpenAI

client = OpenAI(
    api_key=api_key
)

class ChatGPT():
    def __init__(self, client, messages):
        self.messages = messages
        self.client = client
    
    def last_response(self):
        for i in range(len(messages)):
            message = messages[-1 * i]
            if messages['role'] == 'assistant':
                return message

    def response(self, user_message):
        if user_message != '':
            self.messages.append({"role": "user", "content": user_message})

            chat_completion = client.chat.completions.create(
                messages=self.messages,
                model="gpt-3.5-turbo",
                temperature=1.0
            )
            answer = chat_completion.choices[0].message.content
            self.messages.append({"role": "assistant", "content": answer})
        else:
            answer = "Sorry I can't reply to empty message."
        return answer

chat = ChatGPT(client, messages=messages)
# print(chat.response("Hello!"))

# chatgpt = ChatGPT(openai, messages)

# while True:
#    message = input("User : ")
#    if message:
#       messages.append(
#          {"role": "user", "content": message},
#       )
#       chat = openai.ChatCompletion.create(
#          model="gpt-3.5-turbo", messages=messages
#       )
#    answer = chat.choices[0].message.content
#    print(f"ChatGPT: {answer}")
#    messages.append({"role": "assistant", "content": answer}) 