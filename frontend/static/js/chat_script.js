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
    console.log('DOM fully loaded and parsed');
    
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

    // Initial prompt for the user
    appendMessage('Bartender', "Do you crave something sweet, sour, fruity, or bitter?");
});
