class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    // loading images
    preload() {
        console.log("Loading assets...");
        this.load.image('bar', '/static/cafe_pal.png');
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
        console.log("Creating GameScene...");

        const bg = this.add.image(0, 0, 'bar').setOrigin(0, 0);
        bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        
        // Set the world bounds to match the size of the background image
        this.physics.world.setBounds(0, 0, bg.displayWidth, bg.displayHeight);

        // Enable collision between the player and the world bounds
        this.player.setCollideWorldBounds(true);

        // Make sure that the character is the selected character, if no selected character -> boy
        const selectedCharacter = sessionStorage.getItem('selectedCharacter') || 'boy';
        this.player = this.physics.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, selectedCharacter);
        this.player.setScale(0.08);

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
