
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
var npc; 
var dialogActive = false; 
var inputText = ''; 
var chatBox; 

var game = new Phaser.Game(config);
// function preload ()
// {

// }
function create ()
{

}
function update ()
{

}
function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('npc', 'assets/npc.png', { frameWidth: 32, frameHeight: 48 }); // Load NPC sprite
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

    // NPC settings
    npc = this.physics.add.sprite(200, 450, 'npc');
    npc.setCollideWorldBounds(true);

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
    this.physics.add.collider(npc, platforms);

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(npc, platforms); //

    // Create chat box
    chatBox = this.add.rectangle(400, 550, 780, 200, 0x000000, 0.7); // Semi-transparent chat box
    chatBox.setOrigin(0.5, 0.5);
    chatBox.setVisible(false); // Hide by default

    this.input.keyboard.on('keydown-ENTER', handleEnter, this); // ENTER key event for handling dialog
    this.input.keyboard.on('keydown', handleTyping, this); // key event for handling text input
}

// function handleEnter(event) {
//     if (dialogActive) {
//         // Process the input text here
//         console.log('Player:', inputText);
//         inputText = '';
//     } else if (checkOverlap(player, npc)) { // Start dialog if near NPC
//         dialogActive = true;
//         chatBox.setVisible(true);
//     }
// }

// function handleTyping(event) {
//     if (dialogActive && event.key.length === 1) { // Only process character keys
//         inputText += event.key;
//     } else if (dialogActive && event.key === 'Backspace') {
//         inputText = inputText.slice(0, -1);
//     }
// }

// function checkOverlap(spriteA, spriteB) {
//     var boundsA = spriteA.getBounds();
//     var boundsB = spriteB.getBounds();
//     return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB); // Added function to check overlap
// }



// function any_pressed ()
// {
//     return cursor.left.isDown || cursor.right.isDown || cursor.up.isDown || cursor.down.isDown
// }
// function update ()
// {
//     if (gameOver)
//     {
//         return;
//     }
//     if (cursors.left.isDown && !any_pressed())
//     {
//         player.setVelocityX(-160);

//         player.anims.play('left', true);
//     }
//     else if (cursors.right.isDown && !any_pressed())
//     {
//         player.setVelocityX(160);

//         player.anims.play('right', true);
//     }
//     else if (cursors.down.isDown && !any_pressed())
//     {
//         player.setVelocityY(160);

// //        player.anims.play('down', true);
//     }
//     else if (cursors.up.isDown && !any_pressed())
//     {
//         player.setVelocityY(-160);

// //        player.anims.play('up', true);
//     }
//     if (!any_pressed())
//     {
//         player.setVelocityX(0);
//         player.setVelocityY(0)

//         player.anims.play('turn');
//     }

//     if (dialogActive) { // condition to handle dialog display
//         // Render input text on the chat box
//         var style = { font: "20px Arial", fill: "#ffffff", wordWrap: { width: chatBox.width - 20, useAdvancedWrap: true }};
//         var chatText = this.add.text(chatBox.x - chatBox.width / 2 + 10, chatBox.y - chatBox.height / 2 + 10, inputText, style);
//         chatText.setOrigin(0, 0);
//         this.add.existing(chatText);
//     }
// }