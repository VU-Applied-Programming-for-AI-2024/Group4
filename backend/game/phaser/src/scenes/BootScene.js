// boot scene for loading images. very first scene

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        this.load.image('bar', 'assets/images/bar.png');
        this.load.image('boy', 'assets/images/boy.png');
        this.load.image('girl', 'assets/images/girl.png');
    }

    create() {
        this.scene.start('SelectionScene');
    }
}
