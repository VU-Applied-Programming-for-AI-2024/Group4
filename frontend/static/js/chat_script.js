// import {Configuration, OpenAIApi} from "openai"
// Authorization: Bearer "sk-proj-b6J8wQ3KXq6ASLinpnvsT3BlbkFJz6b5TXP4yGhGuWkGX8GC"
// import OpenAI from "openai";



const openai = new OpenAI({
    organization: "find in organization settings",
    project: "find in general settings",
});




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
        const p = document.createElement('p');
        p.textContent = `${sender}: ${message}`;
        chatBox.appendChild(p);
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    const sendMessage = () => {
        const message = userInput.value.trim();
        if (message !== '') {
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
            .then(response => response.json())
            .then(data => {
                appendMessage('Bot', data.reply);
            })
            .catch(error => {
                console.error('Error:', error);
                appendMessage('System', 'There was an error sending your message.');
            });
        }
    };

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});





// curl https://api.openai.com/v1/models \
//   -H "Authorization: Bearer $sk-proj-uV8OlqqJ6Ea2MVIX6n6YT3BlbkFJCtH5a5uG9bzEfq7aZY77" \
//   -H "OpenAI-Organization: org-RNxIsjQZBUsZ9nzhA9bdIWoi" \
//   -H "OpenAI-Project: $proj_WUNKh8NZv0lRWi5aKnfC63Bw"