class Gate {
  constructor(world, color) {
    const sizeFood = 30;
    const maxX = w - (20 + sizeFood);
    const minX = (20 + sizeFood);

    const maxY = 0;
    const minY = -h / 2;

    const positionX = Math.floor(Math.random() * (maxX - minX) + minX);
    const positionY = Math.floor(Math.random() * (maxY - minY) + minY);

    this.w = sizeFood;
    this.h = sizeFood;
    this.color = color ? color : 255;
    this.particles;

    const path = this.genPath(0, 0, this.w * 2, this.w, 5)
    this.gateForm = Matter.Vertices.fromPath(path)
    this.body = Matter.Bodies.fromVertices(positionX, positionY, this.gateForm, {
      render: {
        fillStyle: color,
        strokeStyle: color,
        lineWidth: 1
      }
    }, true);
    // this.body.isStatic = true;
    this.body.render.fillStyle = color;

    Matter.World.add(world, this.body)

    Matter.Events.on(engine, "collisionStart", event => {
      event.pairs.forEach(pair => {
        if (
          (pair.bodyA === this.body && pair.bodyB === snake.body && pair.bodyA.render.fillStyle !== '#FFFFFF') ||
          (pair.bodyB === this.body && pair.bodyA === snake.body && pair.bodyB.render.fillStyle !== '#FFFFFF')
        ) {

          this.particles = new Particles(
            this.body.position.x,
            this.body.position.y,
            this.color,
            12
          )

          this.reset()
        }
      });
    });
  }

  /**
   * Method
   */
  update() {
    if (this.body.position.y >= h + 40) {
      this.reset();
    } else {
      Matter.Body.translate(this.body, { x: 0, y: +4 });
    }
  }

  reset() {
    const sizeFood = 40;
    const maxX = w - (20 + sizeFood);
    const minX = (20 + sizeFood);

    const maxY = 0;
    const minY = -h / 2;

    const positionX = Math.floor(Math.random() * (maxX - minX) + minX);
    const positionY = Math.floor(Math.random() * (maxY - minY) + minY);

    Matter.Body.setPosition(this.body, { x: positionX, y: positionY });
  }

  show() {
    const position = this.body.position;
    const angle = this.body.angle;

    push()
    translate(position.x, position.y);
    rotate(angle);
    fill(this.color);
    rectMode(CENTER)

    this.star(0, 0, this.w * 2, this.w, 5);
    fill('red');
    circle(0, 0, 4)

    pop()
  }

  dieStatus() {
    this.particles && this.particles.update()
    this.particles && this.particles.show()
  }

  star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape();
  }

  genPath(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;

    let path = '';
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      path += ` ${sx} ${sy} `;
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      path += ` ${sx} ${sy} `;
    }
    return path;
  }

}