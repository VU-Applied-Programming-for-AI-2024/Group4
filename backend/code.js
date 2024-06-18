
var config = {
    type: Phaser.WEBGL,
    width: 1920,
    height: 1080,
//    scale: {
//        // Fit to window
////        mode: Phaser.Scale.FIT,
//        // Center vertically and horizontally
//        autoCenter: Phaser.Scale.CENTER_BOTH
////        parent: parentDiv
//        },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    //  A simple background for our game
    this.add.image(400, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
}
function any_pressed ()
{
    return cursor.left.isDown || cursor.right.isDown || cursor.up.isDown || cursor.down.isDown
}
function update ()
{
    if (gameOver)
    {
        return;
    }
    if (cursors.left.isDown && !any_pressed())
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown && !any_pressed())
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else if (cursors.down.isDown && !any_pressed())
    {
        player.setVelocityY(160);

//        player.anims.play('down', true);
    }
    else if (cursors.up.isDown && !any_pressed())
    {
        player.setVelocityY(-160);

//        player.anims.play('up', true);
    }
    if (!any_pressed())
    {
        player.setVelocityX(0);
        player.setVelocityY(0)

        player.anims.play('turn');
    }
}