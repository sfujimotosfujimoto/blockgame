export default class Paddle {
  constructor(p5) {
    this.w = 160;
    this.h = 20;

    this.isMovingLeft = false;
    this.isMovingRight = false;

    this.pos = p5.createVector(p5.width / 2, p5.height - 80);
  }

  display(p5) {
    p5.push();
    p5.fill(30);
    p5.rect(this.pos.x, this.pos.y, this.w, this.h);
    p5.pop();
  }

  move(step) {
    this.pos.x += step;
  }

  update(p5) {
    if (this.isMovingRight) {
      this.move(20);
    } else if (this.isMovingLeft) {
      this.move(-20);
    }
  }

  checkEdges(p5) {
    if (this.pos.x < 0) this.pos.x = 0;
    else if (this.pos.x > p5.width - this.w) this.pos.x = p5.width - this.w;
  }
}
