class Particles {
  constructor(x, y, color, number) {
    this.gravity = createVector(0, 0.2);
    this.particles = [];

    for (var i = 0; i < number; i++) {
      var p = new Particle(x, y, color, false);
      this.particles.push(p);
    }
  }

  /**
   * Method
   */
  update() {
    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(this.gravity);
      this.particles[i].update();

      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  show() {
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
    noStroke()
  }
}