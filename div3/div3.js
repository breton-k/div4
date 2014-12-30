if (Meteor.isClient) { 
  Template.game.game = function(){
   /*all your game code here*/
       // Initialize Phaser, and creates a 400x490px game
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

var menuState = {
    preload: function() {
        this.load.image('background', 'backgrounds/titleBackground.png');
        this.load.image('backgroundGrass', 'backgrounds/titleGrass2.png');
        this.load.image('backgroundWords', 'backgrounds/titleWords.png');
        this.load.image('startButton', 'buttons/startGameButton.png');
        this.load.image('infoButton', 'buttons/infoGameButton.png');
        this.load.image('creditsButton', 'buttons/creditsGameButton.png');
        this.load.audio('introMusic', 'audio/revalations.mp3')
    },
    create: function() {
        this.background = this.game.add.sprite(0, 0, 'background');
        this.background = this.game.add.sprite(0, 0, 'backgroundGrass');
        this.background = this.game.add.sprite(0, 0, 'backgroundWords');
        this.startButton = this.game.add.button(180, 530, 'startButton', this.onStartClick, this);
        this.startButton.anchor.setTo(0.5,0.5);
        this.infoButton = this.game.add.button(400, 530, 'infoButton', this.onInfoClick, this);
        this.infoButton.anchor.setTo(0.5,0.5);
        this.creditsButton = this.game.add.button(620, 530, 'creditsButton', this.onCreditsClick, this);
        this.creditsButton.anchor.setTo(0.5,0.5);
        this.music = this.game.add.audio('introMusic');
        this.music.fadeIn(4000);
      },
    update: function() {
    },
    onStartClick: function(){
      game.state.start('main');
    }, 
    onInfoClick: function(){
      game.state.start('info');
    },
    onCreditsClick: function(){
      game.state.start('credits');
    },
}

var infoState = {
    preload: function() {
        this.load.image('background', 'backgrounds/titleBackground.png');
        this.load.image('backgroundGrass', 'backgrounds/titleGrass2.png');
        this.load.image('menuButton', 'buttons/menuButton.png');
    },
    create: function() {
        this.background = this.game.add.sprite(0, 0, 'background');
        this.background = this.game.add.sprite(0, 0, 'backgroundGrass');
        this.menuButton = this.game.add.button(135, 530, 'menuButton', this.onMenuClick, this);
        this.menuButton.anchor.setTo(0.5,0.5);
    },
    onMenuClick: function(){
      game.state.start('menu');
    },
}

var creditState = {
    preload: function() {
        this.load.image('background', 'backgrounds/titleBackground.png');
        this.load.image('backGroundGrass', 'backgrounds/titleGrass2.png');
        this.load.image('menuButton', 'buttons/menuButton.png');
    },
    create: function() {
        this.background = this.game.add.sprite(0, 0, 'background');
        this.background = this.game.add.sprite(0, 0, 'backGroundGrass');
        this.menuButton = this.game.add.button(135, 530, 'menuButton', this.onMenuClick, this);
        this.menuButton.anchor.setTo(0.5,0.5);
    },
    onMenuClick: function(){
      game.state.start('menu');
    },



}

// Creates a new 'main' state that will contain the game
var mainState = {

    // Function called first to load all the assets
    preload: function() { 
        // Change the background color of the game
        game.stage.backgroundColor = '#71c5cf';

        // Load the bird sprite
        game.load.image('bird', 'assets/bird.png');  

        // Load the pipe sprite
        game.load.image('pipe', 'assets/pipe.png');      
      },

    // Fuction called after 'preload' to setup the game 
    create: function() { 
        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Display the bird on the screen
        this.bird = this.game.add.sprite(100, 245, 'bird');
        
        // Add gravity to the bird to make it fall
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 400; 

        // Call the 'jump' function when the spacekey is hit
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this); 

        // Create a group of 20 pipes
        this.pipes = game.add.group();
        this.pipes.enableBody = true;
        this.pipes.createMultiple(20, 'pipe');  

        // Timer that calls 'addRowOfPipes' ever 1.5 seconds
        this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);           

        // Add a score label on the top left of the screen
        this.score = 0;
        this.labelScore = this.game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });  
      },

    // This function is called 60 times per second
    update: function() {
        // If the bird is out of the world (too high or too low), call the 'restartGame' function
        if (this.bird.inWorld == false)
          this.restartGame(); 

        // If the bird overlap any pipes, call 'restartGame'
        game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);      
      },

    // Make the bird jump 
    jump: function() {
        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
      },
    };

// Add and start the 'main' state to start the game
game.state.add('main', mainState);  
game.state.add('menu', menuState);
game.state.add('info', infoState);
game.state.add('credits', creditState);
game.state.start('menu'); 
}
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
