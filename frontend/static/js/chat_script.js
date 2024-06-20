document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');
    
    const chatBox = document.getElementById('messages');
    const userInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatContainer = document.getElementById('chat-container');
    const gameContainer = document.getElementById('game-container');

    const adjustGameContainerHeight = () => {
        const chatContainerHeight = chatContainer.offsetHeight;
        gameContainer.style.height = `calc(100vh - ${chatContainerHeight}px)`;
        console.log(`Game container height adjusted: ${gameContainer.style.height}`);
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

    const sendMessage = () => {
        const message = userInput.value.trim();
        console.log(`Message to send: "${message}"`);
        if (message !== '') {
            appendMessage('You', message);
            userInput.value = '';
            // Call the external API to get the bot response
            fetch('http://127.0.0.1:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Received bot response:', data['response']);
                appendMessage('Bot', data['response']);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                appendMessage('System', 'There was an error sending your message.');
            });
        } else {
            console.log('Message is empty, not sending');
        }
    };

    sendButton.addEventListener('click', (event) => {
        event.preventDefault();  // Prevent default form submission
        sendMessage();
    });

    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();  // Prevent default form submission
            sendMessage();
        }
    });

    // Prevent Phaser from capturing the spacebar when the chat input is focused
    userInput.addEventListener('focus', () => {
        console.log('Input focused, disabling game input');
        game.input.keyboard.enabled = false;
    });

    userInput.addEventListener('blur', () => {
        console.log('Input blurred, enabling game input');
        game.input.keyboard.enabled = true;
    });

    // Log to ensure elements are correctly set up
    console.log('Chat script initialized');
    console.log('Chat box:', chatBox);
    console.log('User input:', userInput);
    console.log('Send button:', sendButton);
});
