export default class Ball {
  constructor(p5) {
    this.pos = p5.createVector(p5.width / 2, p5.height / 2);
    this.r = 30;
    this.direction = p5.createVector(1, 1);
    this.vel = p5.createVector(1, 1).mult(9); // the speed of the ball
    this.color = p5.color(100);
    p5.stroke(this.color);
  }

  display(p5) {
    p5.pop();
    p5.fill(100);
    p5.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    p5.push();
  }

  update() {
    this.pos.x += this.vel.x * this.direction.x;
    this.pos.y += this.vel.y * this.direction.y;
  }

  checkEdges(p5) {
    if (this.pos.y < this.r && this.direction.y < 0) this.direction.y *= -1;
    else if (this.pos.x < this.r && this.direction.x < 0)
      this.direction.x *= -1;
    else if (this.pos.x > p5.width - this.r && this.direction.x > 0)
      this.direction.x *= -1;
  }

  meets(paddle, p5) {
    if (
      this.pos.y < paddle.pos.y &&
      this.pos.y > paddle.pos.y - this.r &&
      this.pos.x > paddle.pos.x - this.r &&
      this.pos.x < paddle.pos.x + paddle.w + this.r
    ) {
      return true;
    } else return false;
  }
  // @param returns boolean
  hits(brick, p5) {
    let distance = p5.dist(this.pos.x, this.pos.y, brick.pos.x, brick.pos.y);
    if (distance < this.r + brick.r) return true;
    else return false;
  }
}
