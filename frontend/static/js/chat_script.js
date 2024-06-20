// import {Configuration, OpenAIApi} from "openai"
// Authorization: Bearer "sk-proj-b6J8wQ3KXq6ASLinpnvsT3BlbkFJz6b5TXP4yGhGuWkGX8GC"
// import OpenAI from "openai";
import OpenAI from "openai";


// const openai = new OpenAI({
//   apiKey: "sk-proj-b6J8wQ3KXq6ASLinpnvsT3BlbkFJz6b5TXP4yGhGuWkGX8GC",
// });

const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()


document.addEventListener('DOMContentLoaded', function () {
    const chatBox = document.getElementById('messages');
    const userInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatContainer = document.getElementById('chat-container');
    const gameContainer = document.getElementById('game-container');

    const adjustGameContainerHeight = () => {
        const chatContainerHeight = chatContainer.offsetHeight;
        gameContainer.style.height = `calc(100vh - ${chatContainerHeight}px)`;
    };

    window.addEventListener('resize', adjustGameContainerHeight);
    adjustGameContainerHeight();  // Initial adjustment

    const appendMessage = (sender, message) => {
        console.log(`Appending message from ${sender}: ${message}`);
        const p = document.createElement('p');
        p.textContent = `${sender}: ${message}`;
        chatBox.appendChild(p);
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    const getResponse = async (message) => {
        console.log('GetResponse called')
        const response = await openai.chat.completions.create({
            messages: [
            {
                role: "system",
                content: "You are a friendly, easygoing bartender in a cozy bar that offers advice and good conversation.",
            },
            ],
            model: "gpt-3.5-turbo",
        });
    
      var answer = response.choices[0].message
      console.log(answer);
      appendMessage('Bartender: ', answer);
    };

    const sendMessage = () => {
        const message = userInput.value.trim();
        if (message !== '') {
            console.log('Sending message:', message);
            //send message to function
            // pass_values(input=message)
            //show message on screen
            appendMessage('You', message);

            userInput.value = '';

            // Call the external API to get the bot response
            fetch('https://api.example.com/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            })

            //Call chatgpt response
            getResponse(message)
            
            
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Received bot response:', data.response);
                appendMessage('Bot', data.response);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                appendMessage('System', 'There was an error sending your message.');
            });
        } else {
            console.log('Message is empty, not sending');
        }
    };
    

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // Prevent Phaser from capturing the spacebar when the chat input is focused
    userInput.addEventListener('focus', () => {
        game.input.keyboard.enabled = false;
    });

    userInput.addEventListener('blur', () => {
        game.input.keyboard.enabled = true;
    });

    // Log to ensure elements are correctly set up
    console.log('Chat script initialized');
    console.log('Chat box:', chatBox);
    console.log('User input:', userInput);
    console.log('Send button:', sendButton);
});



// function sendData() { 
//     var value = document.getElementById('input').value; 
//     $.ajax({ 
//         url: '/chatgptapijs', 
//         type: 'POST', 
//         contentType: 'application/json', 
//         data: JSON.stringify({ 'value': value }), 
//         success: function(response) { 
//             document.getElementById('output').innerHTML = response.result; 
//         }, 
//         error: function(error) { 
//             console.log(error); 
//         } 
//     }); 
// } 


// function pass_values(input) {
//     $.ajax(
//     {
//         type:'POST',
//         contentType:'application/json;charset-utf-08',
//         dataType:'json',
//         url:'http://127.0.0.1:5000/pass_val?value='+input ,
//         success:function (data) {
//             var reply=data.reply;
//             if (reply=="success")
//             {
//                 return;
//             }
//             else
//                 {
//                 alert("some error ocured in session agent")
//                 }
 
//         }
//     }
// );
//  }


// curl https://api.openai.com/v1/models \
//   -H "Authorization: Bearer $sk-proj-uV8OlqqJ6Ea2MVIX6n6YT3BlbkFJCtH5a5uG9bzEfq7aZY77" \
//   -H "OpenAI-Organization: org-RNxIsjQZBUsZ9nzhA9bdIWoi" \
//   -H "OpenAI-Project: $proj_WUNKh8NZv0lRWi5aKnfC63Bw"
