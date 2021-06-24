var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, runner3, runner4;

var track, car1_img, car2_img, runner3_img, runner4_img, hurdle, invisibleGround1, invisibleGround2;

function preload() {
    hurdle = loadImage("../images/cone.png");
    track = loadImage("../images/pla.jpg");
    car1_img = loadImage("a.png", "b.png", "c.png");
    car2_img = loadImage("a.png", "b.png", "c.png");
}

function setup() {
    canvas = createCanvas(displayWidth, window.innerHeight);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
}


function draw() {
    if (playerCount === 2) {
        game.update(1);
    }
    if (gameState === 1) {
        clear();
        game.play();
    }
    if (gameState === 2) {
        game.end();
    }
}