import openai
openai.api_key = 'sk-proj-b6J8wQ3KXq6ASLinpnvsT3BlbkFJz6b5TXP4yGhGuWkGX8GC'
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