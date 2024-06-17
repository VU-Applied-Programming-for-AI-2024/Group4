// Phaser game logic in this file (moving mechanics).

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Load assets
        this.load.image('bar', '/static/cafe_pal.png');
        this.load.image('boy', '/static/happy_boy.png');
        this.load.image('girl', '/static/happy_girl.png');
    }

    create() {
        // Start GameScene after assets are loaded
        this.scene.start('GameScene');
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // Add background and scale it to fit the game canvas
        const bg = this.add.image(0, 0, 'bar').setOrigin(0, 0);
        bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        // Retrieve selected character from sessionStorage
        const selectedCharacter = sessionStorage.getItem('selectedCharacter') || 'boy';
        this.player = this.physics.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, selectedCharacter);

        // Scale the character sprite
        this.player.setScale(0.08);

        // // Set up animations
        // this.anims.create({
        //     key: 'up',
        //     frames: this.anims.generateFrameNumbers(selectedCharacter, { start: 0, end: 2 }),
        //     frameRate: 10,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'down',
        //     frames: this.anims.generateFrameNumbers(selectedCharacter, { start: 3, end: 5 }),
        //     frameRate: 10,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'left',
        //     frames: this.anims.generateFrameNumbers(selectedCharacter, { start: 6, end: 8 }),
        //     frameRate: 10,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'right',
        //     frames: this.anims.generateFrameNumbers(selectedCharacter, { start: 9, end: 11 }),
        //     frameRate: 10,
        //     repeat: -1
        // });

        // Set up keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // Handle player movement
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

// Initialize Phaser game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
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
        }
    };

    const game = new Phaser.Game(config);
});
