var canvas;
var database, gameState, allPlayers;
var form, player, playerCount;
var bg, bgImg
var mangus, frango;
var frangoImg, mangusImg;
var gamers = [];
var shotImage1, shotImage2;

function preload() {

  frangoImg= loadImage ("frango.png");
  mangusImg= loadImage ("mangus.png");
  bgImg= loadImage ("neon city.png");
  shotImage1= loadImage ("lasershot.png");
  shotImage2=loadImage ("lasershot.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(bgImg);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }

  if (gameState === 2) {

  }
}



