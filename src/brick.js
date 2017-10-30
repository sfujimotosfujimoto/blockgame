export default class Brick {
  constructor(p5) {
    this.r = p5.random(20, 80);
    this.pos = p5.createVector(
      p5.random(100, p5.width - 100),
      p5.random(100, p5.height - 350)
    );
    // this.total = 6; // it's a hexagon
    this.total = p5.random(2, 4) * 2;
    this.color = p5.color(
      p5.random(50, 150),
      p5.random(20, 100),
      p5.random(80, 150)
    );
  }
  display(p5) {
    p5.push();
    p5.stroke(this.color);
    p5.fill(this.color);
    p5.translate(this.pos.x, this.pos.y);
    p5.beginShape();
    for (let i = 0; i < this.total; i++) {
      let angle = p5.map(i, 0, this.total, 0, p5.TWO_PI);
      var x = this.r * p5.cos(angle);
      var y = this.r * p5.sin(angle);
      p5.vertex(x, y);
    }
    p5.endShape(p5.CLOSE);
    p5.pop(); // restores the default
  }

  shrink(p5) {
    var newB = [];
    newB[0] = new Brick(p5);

    // below makes bricks shrink in its place but not fun
    // newB[0].pos.x = this.pos.x;
    // newB[0].pos.y = this.pos.y;

    return newB;
  }
}
