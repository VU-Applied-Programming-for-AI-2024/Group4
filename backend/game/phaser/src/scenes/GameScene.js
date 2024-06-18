import axios from 'axios';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        this.add.image(400, 300, 'bar');

        const selectedCharacter = this.registry.get('selectedCharacter');
        this.player = this.physics.add.sprite(400, 300, selectedCharacter);

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers(selectedCharacter, { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers(selectedCharacter, { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(selectedCharacter, { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(selectedCharacter, { start: 9, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        // Show chat container
        const chatContainer = document.getElementById('chat-container');
        chatContainer.style.display = 'block';

        // Set up chat input handling
        const chatInput = document.getElementById('chat-input');
        chatInput.addEventListener('keydown', this.handleChatInput);

        // Reference to the chat messages container
        this.chatMessages = document.getElementById('chat-messages');
    }

    update() {
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
            this.player.anims.play('up', true);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
            this.player.anims.play('down', true);
        } else {
            this.player.anims.stop();
        }
    }

    handleChatInput = (event) => {
        if (event.key === 'Enter') {
            const chatInput = event.target;
            const message = chatInput.value;
            chatInput.value = '';
            this.handlePlayerInput(message);
        }
    }

    handlePlayerInput(message) {
        // Display the player's message
        this.displayMessage('Player', message);

        // Send the message to the OpenAI API and display the response
        this.getBartenderResponse(message).then(response => {
            this.displayMessage('Bartender', response);
        });
    }

    displayMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${sender}: ${message}`;
        this.chatMessages.appendChild(messageElement);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight; // Scroll to bottom
    }

    async getBartenderResponse(message) {
        try {
            const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
                prompt: `Player: ${message}\n\nPour and Listen Bartender:`,
                max_tokens: 150,
                n: 1,
                stop: ["\n", "Player:"],
            }, {
                headers: {
                    'Authorization': `https://chatgpt.com/g/g-fjKil9mZO-pour-and-listen-bartender`
                }
            });

            return response.data.choices[0].text.trim();
        } catch (error) {
            console.error('Error fetching response from OpenAI API:', error);
            return 'Sorry, I had trouble understanding that. Could you try again?';
        }
    }

    shutdown() {
        // Hide chat container
        const chatContainer = document.getElementById('chat-container');
        chatContainer.style.display = 'none';

        // Remove chat input event listener
        const chatInput = document.getElementById('chat-input');
        chatInput.removeEventListener('keydown', this.handleChatInput);
    }

    // Ensure the chat is hidden when the scene is stopped or switched
    sceneWillRemove() {
        this.shutdown();
    }
}
