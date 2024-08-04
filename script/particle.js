function Particle(x, y, color, firework) {
  this.pos = createVector(x, y);
  this.firework = firework;
  this.lifespan = 255;
  this.color = color;
  this.acc = createVector(0, 0);

  this.vel = p5.Vector.random2D();
  this.vel.mult(random(2, 8));

  this.applyForce = function (force) {
    this.acc.add(force);
  };

  this.update = function () {
    this.vel.mult(0.9);
    this.lifespan -= 8;

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.done = function () {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  };

  this.show = function () {
    colorMode(HSB);
    strokeWeight(6);
    stroke(color);
    point(this.pos.x, this.pos.y);
  };
}
