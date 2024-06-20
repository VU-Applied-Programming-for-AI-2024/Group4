import Phaser from 'phaser'
import BootScene from './scenes/BootScene.js';
import SelectionScene from './scenes/SelectionScene.js';
import GameScene from './scenes/GameScene.js';
import axios from 'axios';


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [BootScene, GameScene], //removed SelectionScene since character selection is already handled by the HTML
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
