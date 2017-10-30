"use strict";
// const p5 = require("../node_modules/p5");
// import p5 from "../libraries/p5";
let paddle;
let ball;
let points;
import Paddle from "./Paddle.js";
import Ball from "./Ball.js";
import Brick from "./Brick.js";

new p5(function(p5) {
  let paddle;
  let ball;
  let bricks = [];
  let gameOver = true;
  let playingGame = false;
  let youWin = false;
  let winText, instructionText, pointText;
  let points = 0;
  let finalpoints = 0;

  const BRICK_NUM = 40;

  p5.setup = function() {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.ellipseMode(p5.CENTER);
    p5.textAlign(p5.CENTER);
    p5.fill(150);
    p5.stroke(0);

    paddle = new Paddle(p5);
    ball = new Ball(p5);

    createBricks(p5);
  };

  p5.draw = function() {
    p5.background(255);
    p5.removeElements();
    // console.log("finalpoints: " + finalpoints);
    // console.log("points: " + points);
    createTextPoints(points, p5);
    createText(finalpoints, p5);
    paddle.display(p5);
    if (!gameOver) paddle.update(p5);
    if (!gameOver) paddle.checkEdges(p5);

    // pointText.display;
    // //ball
    if (ball.meets(paddle) && ball.direction.y > 0) ball.direction.y *= -1;

    ball.display(p5);
    if (!gameOver) ball.update(p5);
    if (!gameOver) ball.checkEdges(p5);

    if (ball.pos.y > p5.height) {
      ball.pos = p5.createVector(paddle.pos.x + paddle.r, p5.height - 500);
      if (bricks.length < BRICK_NUM) createBricks(p5);
      gameOver = true;
      // console.log(gameOver);
    }

    if (bricks.length === 0) {
      if (finalpoints < points) finalpoints = points;
      points = 0;
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
      // console.log("in gameover if");

      instructionText.style("display", "block");
    } else {
      instructionText.style("display", "none");
    }

    for (let j = bricks.length - 1; j >= 0; j--) {
      if (ball.hits(bricks[j], p5)) {
        if (bricks[j].r >= 40) {
          let newBricks = bricks[j].shrink(p5);
          bricks = bricks.concat(newBricks);
          points += 50;
        }
        points += 10;

        bricks.splice(j, 1);
        ball.direction.y *= -1;
        break;
      }
      // console.log("hit: ", j);
      bricks[j].display(p5);
    }
  };

  p5.keyReleased = function() {
    paddle.isMovingLeft = false;
    paddle.isMovingRight = false;
  };

  p5.keyPressed = function(p5) {
    // console.log(p5.key);
    if (p5.key === "a" || p5.key === "A" || p5.key === "ArrowLeft") {
      paddle.isMovingLeft = true;
    } else if (p5.key === "d" || p5.key === "D" || p5.key === "ArrowRight") {
      paddle.isMovingRight = true;
    } else if (p5.key === "s" || p5.key === "S") {
      // if (bricks.length === 0) createBricks(BRICK_NUM);
      gameOver = false;
      youWin = false;
    }
  };

  function createBricks(p5) {
    for (let i = 0; i < BRICK_NUM; i++) {
      bricks.push(new Brick(p5));
    }
  }

  function createText(fp, p5) {
    winText = p5.createP("YOU WIN!!!!!\nYour Score was " + fp + "!!"); //from p5 create p elem
    winText.style("font-size", "30px");
    winText.style("font-family", "Geneva");
    winText.position(p5.width / 2 - 240, p5.height / 2 - 280);

    instructionText = p5.createP(
      "Press 'S' to Start, 'A' / 'D' to move Right/Left"
    );
    instructionText.style("display", "none");
    instructionText.style("font-size", "30px");
    instructionText.style("font-family", "Geneva");
    instructionText.position(p5.width / 2 - 240, 100);
  }

  function createTextPoints(p, p5) {
    // p5.removeElements();
    pointText = p5.createP("POINTS: " + p); //from p5 create p elem
    pointText.style("font-size", "24px");
    pointText.style("font-family", "Geneva");
    pointText.position(p5.width / 2 - 200, p5.height - 70);
  }
});
