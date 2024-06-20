class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    // loading images
    preload() {
        var env = {};
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
        })
        .catch(error => {
            console.error('Fetch error:', error);
            appendMessage('System', 'There was an error sending your message.');
        });

        // light_path = sessionStorage.getItem('light');
        // theme_path = sessionStorage.getItem('theme');
        // floor_path = sessionStorage.getItem('floor');
        // misc_path = sessionStorage.getItem('misc');
        // view_path = sessionStorage.getItem('view');
        console.log("Loading assets...");
        // this.load.image('theme', '/static/images/' + theme_path);
        // this.load.image('floor', '/static/images/' + floor_path);
        // this.load.image('misc', '/static/images/' + misc_path);
        // this.load.image('view', '/static/images/' + view_path);
        // this.load.image('light', '/static/images/' + light_path);

        this.load.image('boy', '/static/boy_no_border.png');
        this.load.image('girl', '/static/girl_no_border.png');
    }

    create() {
        console.log("Assets loaded, starting GameScene...");
        this.scene.start('GameScene');
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // this.add.image(0, 0, 'theme')
        console.log("Creating GameScene...");

        const floor = this.add.image(0, 0, 'floor').setOrigin(0, 0);
        const view = this.add.image(0, 0, 'view').setOrigin(0, 0);
        const misc = this.add.image(0, 0, 'misc').setOrigin(0, 0);
        const bg = this.add.image(0, 0, 'theme').setOrigin(0, 0);
        const light = this.add.image(0, 0, 'light').setOrigin(0, 0);
        floor.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        view.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        misc.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        light.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        
        // Set world bounds to match the size of the game
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);

        // Make sure that the character is the selected character, if no selected character -> boy
        const selectedCharacter = sessionStorage.getItem('selectedCharacter') || 'boy';
        this.player = this.physics.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, selectedCharacter);
        this.player.setScale(0.08);

        // Make the player collide with the world bounds
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.player.setVelocity(0);

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
            this.player.anims.stop();
        }
    }
}

let game;

document.addEventListener('DOMContentLoaded', function () {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: [BootScene, GameScene],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        parent: 'game-container'
    };

    game = new Phaser.Game(config);
});