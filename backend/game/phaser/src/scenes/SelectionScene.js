export default class SelectionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SelectionScene' });
    }

    create() {
        this.add.text(400, 100, 'Choose Your Character', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        const boy = this.add.image(300, 300, 'boy').setInteractive();
        boy.setScale(2);

        const girl = this.add.image(500, 300, 'girl').setInteractive();
        girl.setScale(2);

        boy.on('pointerdown', () => {
            this.startGame('boy');
        });

        girl.on('pointerdown', () => {
            this.startGame('girl');
        });
    }

    startGame(character) {
        this.registry.set('selectedCharacter', character);
        this.scene.start('GameScene');
    }
}
