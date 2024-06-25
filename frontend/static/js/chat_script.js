// This script handles the chat functionality


// Wait until the document object model (DOM) is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');
    

    // Initialization of variables
    const chatBox = document.getElementById('messages'); //container for chat messages
    const userInput = document.getElementById('message-input'); //user input field
    const sendButton = document.getElementById('send-button');
    const chatContainer = document.getElementById('chat-container');
    const gameContainer = document.getElementById('game-container');

    // Function to adjust the height of the game container based on the chat container's height
    const adjustGameContainerHeight = () => {
        const chatContainerHeight = chatContainer.offsetHeight;
        gameContainer.style.height = `calc(100vh - ${chatContainerHeight}px)`; // Set game container height
        console.log(`Game container height adjusted: ${gameContainer.style.height}`);
    };

    // Adjust the game container height whenever the window is resized
    window.addEventListener('resize', adjustGameContainerHeight);
    adjustGameContainerHeight();  // Initial adjustment

    // Function to append a message to the chat box
    const appendMessage = (sender, message) => {
        console.log(`Appending message from ${sender}: ${message}`);
        const p = document.createElement('p'); // Create a new paragraph element
        p.textContent = `${sender}: ${message}`;  // Set the text content of the paragraph
        chatBox.appendChild(p); // Add the paragraph to the chat box
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom of the chat box
    };

     // Function to handle sending a message
    const sendMessage = () => {
        const message = userInput.value.trim(); // Get the trimmed message from the input field
        console.log(`Message to send: "${message}"`);
        if (message !== '') {
            appendMessage('You', message); // Append the user's message to the chat box
            userInput.value = ''; // Clear the input field
            // Call the external API to get the bot response
            fetch('http://127.0.0.1:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message }) // Send the message in the request body
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
                }
                return response.json();
            })
            .then(data => {
                console.log('Received bot response:', data['response']);
                appendMessage('Bot', data['response']); // Append the bot's response to the chat box
            })
            .catch(error => {
                console.error('Fetch error:', error);
                appendMessage('System', 'There was an error sending your message.'); // Handle fetch errors
            });
        } else {
            console.log('Message is empty, not sending'); // Log when the message is empty
        }
    };

     // Add an event listener to the send button to handle clicks
    sendButton.addEventListener('click', (event) => {
        event.preventDefault();  // Prevent default form submission
        sendMessage();
    });

     // Add an event listener to the user input field to handle 'Enter' key presses
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

     // Disable game input when the chat input is focused
    userInput.addEventListener('blur', () => {
        console.log('Input blurred, enabling game input');
        game.input.keyboard.enabled = true; // Enable game keyboard input
    });

    // Log to ensure elements are correctly set up
    console.log('Chat script initialized');
    console.log('Chat box:', chatBox);
    console.log('User input:', userInput);
    console.log('Send button:', sendButton);
});