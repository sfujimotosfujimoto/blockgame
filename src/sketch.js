"use strict";
// import * as p from "../assets/p5";

var paddle;
var ball;
var bricks = [];
var gameOver = true;
var playingGame = false;
var youWin = false;
var winText, instructionText;

var BRICK_NUM = 18;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
  textAlign(CENTER);
  fill(150);
  stroke(0);

  paddle = new Paddle();
  ball = new Ball();

  createBricks(BRICK_NUM);

  createText();
}

function draw() {
  background(255);

  paddle.display();
  if (!gameOver) paddle.update();
  if (!gameOver) paddle.checkEdges();

  //ball
  if (ball.meets(paddle) && ball.direction.y > 0) ball.direction.y *= -1;

  ball.display();
  if (!gameOver) ball.update();
  if (!gameOver) ball.checkEdges();

  if (ball.pos.y > height) {
    ball.pos = createVector(paddle.pos.x + paddle.r, height - 500);
    gameOver = true;
  }

  if (bricks.length === 0) {
    youWin = true;
    playingGame = false;
    gameOver = true;
  }

  if (youWin) {
    winText.style("display", "block");
  } else {
    winText.style("display", "none");
  }

  if (gameOver) {
    instructionText.style("display", "block");
  } else {
    instructionText.style("display", "none");
  }

  for (var j = bricks.length - 1; j >= 0; j--) {
    if (ball.hits(bricks[j])) {
      if (bricks[j].r >= 40) {
        var newBricks = bricks[j].shrink();
        bricks = bricks.concat(newBricks);
      }
      bricks.splice(j, 1);
      ball.direction.y *= -1;
      break;
    }
    // console.log("hit: ", j);
    bricks[j].display();
  }
}

function keyReleased() {
  paddle.isMovingLeft = false;
  paddle.isMovingRight = false;
}

function keyPressed() {
  console.log(key);
  if (key === "a" || key === "A" || key === "%") {
    paddle.isMovingLeft = true;
  } else if (key === "d" || key === "D" || key === "'") {
    paddle.isMovingRight = true;
  } else if (key === "s" || key === "S") {
    if (bricks.length === 0) createBricks(BRICK_NUM);
    gameOver = false;
    youWin = false;
  }
}

function createBricks(n) {
  for (var i = 0; i < n; i++) {
    bricks.push(new Brick());
  }
}

function createText() {
  winText = createP("YOU WIN!!!!!"); //from p5 create p elem
  winText.style("font-size", "100px");
  winText.style("font-family", "Helvetica");
  winText.position(width / 2, height / 2 - 200, 80);

  instructionText = createP("Press 'S' to Start, 'A' / 'D' to move Right/Left");
  instructionText.style("display", "none");
  instructionText.style("font-size", "40px");
  instructionText.style("font-family", "Helvetica");
  instructionText.position(width / 2 - 240, 100);
}
