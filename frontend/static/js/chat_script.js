document.addEventListener('DOMContentLoaded', function () {
    const chatBox = document.getElementById('messages');
    const userInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatContainer = document.getElementById('chat-container');
    const gameContainer = document.getElementById('game-container');

    const appendMessage = (sender, message) => {
        console.log(`Appending message from ${sender}: ${message}`);
        const p = document.createElement('p');
        p.textContent = `${sender}: ${message}`;
        chatBox.appendChild(p);
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    const fetchCocktail = (preference) => {
        const preferenceMap = {
            sweet: "sweet",
            sour: "sour",
            fruity: "fruit",
            bitter: "bitter"
        };
        const ingredient = preferenceMap[preference.toLowerCase()];
        if (!ingredient) {
            appendMessage('Bartender', "Sorry, I didn't understand your preference. Please choose from sweet, sour, fruity, or bitter.");
            return;
        }

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.drinks && data.drinks.length > 0) {
                    const drink = data.drinks[Math.floor(Math.random() * data.drinks.length)];
                    appendMessage('Bartender', `How about a ${drink.strDrink}? Here's the recipe: ${drink.strInstructions}`);
                } else {
                    appendMessage('Bartender', "Sorry, I couldn't find any cocktails with that preference.");
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                appendMessage('System', 'There was an error fetching the cocktail recipe.');
            });
    };

    const sendMessage = () => {
        const message = userInput.value.trim();
        if (message !== '') {
            console.log('Sending message:', message);
            appendMessage('You', message);
            userInput.value = '';
            // Check for cocktail preferences
            if (['sweet', 'sour', 'fruity', 'bitter'].includes(message.toLowerCase())) {
                fetchCocktail(message);
            } else {
                appendMessage('Bartender', "Do you crave something sweet, sour, fruity, or bitter?");
            }
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

    // Initial prompt for the user
    appendMessage('Bartender', "Do you crave something sweet, sour, fruity, or bitter?");
});
