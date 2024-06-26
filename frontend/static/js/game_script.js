// This script handles the game container using the Phaser library

// BootScene class handles the inirial loading of assets and transitions to the GameScene
class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' }); // Call the Phaser.Scene constructor with a unique key 'BootScene'
    }

    // This method loads assets before the game starts
    preload() {
        var env = {}; // empty object created to hold environment data
        // fetch('http://localhost:5000/session', {
        fetch('http://127.0.0.1:5000/session', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Received session log:', data);
            for (var key in data) {
                console.log(key, data[key]);
                env[key] = data[key];
              }
            this.load.image('theme', '/static/images/' + env['theme']);
            this.load.image('floor', '/static/images/' + env['floor']);
            this.load.image('misc', '/static/images/' + env['misc']);
            this.load.image('view', '/static/images/' + env['view']);
            this.load.image('light', '/static/images/' + env['light']);
            this.load.image('character', '/static/images/' + env['character']);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            appendMessage('System', 'There was an error sending your message.');
        });

        console.log("Loading assets...");

        // Load static images for the boy and girl sprites
        this.load.image('boy', '/static/images/boy.png');
        this.load.image('girl', '/static/images/girl.png');
    }

    // Create method starts the GameScene after assets are loaded
    create() {
        console.log("Assets loaded, starting GameScene...");
        this.scene.start('GameScene'); // Transition to GameScene
    }
}

// GameScene class handles the main game logic and rendering
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' }); // Call Phaser.Scene constructor with unique key
    }    

    // Create method sets up game scene
    create() {
        console.log("Creating GameScene...");

        const floor = this.add.image(0, 0, 'floor').setOrigin(0, 0);
        const view = this.add.image(0, 0, 'view').setOrigin(0, 0);
        const bg = this.add.image(0, 0, 'theme').setOrigin(0, 0);
        const misc = this.add.image(0, 0, 'misc').setOrigin(0, 0);
        const light = this.add.image(0, 0, 'light').setOrigin(0, 0);
        bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        misc.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        floor.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        view.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        light.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        
        // Set world bounds to match the size of the game
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);

        // Add player sprite to the scene and position it at the center
        this.player = this.physics.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'character');
        this.player.setScale(0.08);

        // Make the player collide with the world bounds
        this.player.setCollideWorldBounds(true);

        // Create cursor keys for player movement
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    // Update method to handle game logic that needs to run every frame
    update() {
        this.player.setVelocity(0); // Reset player velocity

        // Check for cursor key presses and set the player's velocity in the right direction
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
            this.player.anims.play('right', true);
        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-300);
            this.player.anims.play('up', true);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(300);
            this.player.anims.play('down', true);
        } else {
            this.player.anims.stop(); // Stop animation if no key is pressed
        }
    }
}

let game; // Variable declaration

// Initializes the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: [BootScene, GameScene], // Define the scenes to use
        physics: {
            default: 'arcade', // arcade physics engine
            arcade: {
                gravity: { y: 0 }, // No gravity since this is a top-down view game
                debug: false
            }
        },
        parent: 'game-container' // Specify the parent HTML element
    };

    // Create new Phaser game with the defined configuration
    game = new Phaser.Game(config);
});