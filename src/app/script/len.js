class Len {
  constructor(world, x, y, r, color) {
    this.r = r
    this.color = color
    this.destroy = false;

    this.body = Matter.Bodies.circle(x, y, this.r);

    this.isDie = false;
    this.particles;
  }

  /**
   * Method
   */
  update() {
    if (this.body.position.y >= h + this.r + 4) {
      this.destroy = true
    } else {
      Matter.Body.translate(this.body, { x: 0, y: +speed });
    }
    // Matter.Body.setVelocity(this.body, { x: 0, y: speed });
  }

  show() {
    const position = this.body.position;
    const angle = this.body.angle;
    push()
    translate(position.x, position.y);
    rotate(angle);
    fill(this.color);
    rectMode(CENTER)
    circle(0, 0, this.r * 2)
    pop()
  }

  dieStatus() {
    if (!this.particles) {
      this.particles = new Particles(
        this.body.position.x,
        this.body.position.y,
        this.color,
        1
      )
    }
    this.particles && this.particles.update()
    this.particles && this.particles.show()
  }
}