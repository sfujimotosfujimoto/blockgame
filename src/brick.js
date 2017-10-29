function Brick() {
  this.r = random(20, 80);
  this.pos = createVector(random(100, width - 100), random(100, height - 400));
  // this.total = 6; // it's a hexagon

  this.total = random(2, 4) * 2;

  this.color = color(random(50, 150), random(20, 100), random(80, 150));

  this.display = function() {
    push();
    stroke(this.color);
    fill(this.color);
    translate(this.pos.x, this.pos.y);
    beginShape();
    for (let i = 0; i < this.total; i++) {
      let angle = map(i, 0, this.total, 0, TWO_PI);
      var x = this.r * cos(angle);
      var y = this.r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop(); // restores the default
  };

  this.shrink = function() {
    var newB = [];
    newB[0] = new Brick(this.pos, this.r);

    return newB;
  };
}
