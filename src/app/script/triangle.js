class Triangle {
  constructor(world, x, y, r, n, color, angle, amplitude) {
    this.r = r / 3
    this.n = n
    this.color = color ? color : 255
    this.particles

    const path = this.genPath(0, 0, this.r * 2, this.r, n)
    this.form = Matter.Vertices.fromPath(path)
    this.body = Matter.Bodies.fromVertices(
      x,
      y,
      this.form,
      {
        render: {
          fillStyle: color,
          strokeStyle: color,
          lineWidth: 1,
        },
      },
      true,
    )

    this.body.render.fillStyle = color
    this.body.label = 'FOOD_TRIANGLE'
    this.body.isSensor = true

    this.angle = angle
    this.amplitude = amplitude

    // this.angle = 0
    // this.amplitude = 0

    Matter.Body.rotate(this.body, PI / 2)
    Matter.World.add(world, this.body)

    Matter.Events.on(engine, 'collisionStart', event => {
      event.pairs.forEach(pair => {
        if (pair.bodyA === this.body && !this.isDie) {
          if (
            pair.bodyB.label === 'SKILL2' ||
            pair.bodyB.label === 'BULLET' ||
            (pair.bodyB.label === 'SNAKE' &&
              pair.bodyA.render.fillStyle === snake.color)
          ) {
            this.body.label = 'DIE'
            this.particles = new Particles(
              this.body.position.x,
              this.body.position.y,
              this.color,
              8,
            )

            this.isDie = true
            if (statusSound !== STATUS.MUTE) {
              // window.ReactNativeWebView.postMessage('Food')
            }
            scores++
          }

          /**
           * Skill 1
           */
          if (
            pair.bodyB.label === 'SNAKE' &&
            pair.bodyA.render.fillStyle !== snake.color &&
            runSkill_1
          ) {
            this.body.label = 'DIE'
            snake.destroySkill1()

            this.particles = new Particles(
              this.body.position.x,
              this.body.position.y,
              this.color,
              8,
            )

            this.isDie = true
            if (statusSound !== STATUS.MUTE) {
              // window.ReactNativeWebView.postMessage('Food')
            }
            scores++
            runSkill_1 = false
          }
        }

        if (pair.bodyB === this.body && !this.isDie) {
          if (
            pair.bodyA.label === 'SKILL2' ||
            pair.bodyA.label === 'BULLET' ||
            (pair.bodyA.label === 'SNAKE' &&
              pair.bodyB.render.fillStyle === snake.color)
          ) {
            this.body.label = 'DIE'
            this.particles = new Particles(
              this.body.position.x,
              this.body.position.y,
              this.color,
              8,
            )
            this.isDie = true
            if (statusSound !== STATUS.MUTE) {
              // window.ReactNativeWebView.postMessage('Food')
            }
            scores++
          }

          /**
           * Skill 1
           */
          if (
            pair.bodyA.label === 'SNAKE' &&
            pair.bodyB.render.fillStyle !== snake.color &&
            runSkill_1
          ) {
            this.body.label = 'DIE'
            snake.destroySkill1()

            this.particles = new Particles(
              this.body.position.x,
              this.body.position.y,
              this.color,
              8,
            )

            this.isDie = true
            if (statusSound !== STATUS.MUTE) {
              // window.ReactNativeWebView.postMessage('Food')
            }
            scores++
            runSkill_1 = false
          }
        }
      })
    })
  }

  /**
   * Method
   */
  update() {
    Matter.Body.rotate(this.body, this.angle)

    // var px = w / 2 + this.amplitude * Math.sin(frameCount / 50.0)
    // Matter.Body.setVelocity(this.body, {
    //   x: px - this.body.position.x,
    //   y: speed,
    // })

    Matter.Body.setVelocity(this.body, { x: 0, y: speed });
  }

  stop() {
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
  }

  destroy() {
    Matter.World.remove(engine.world, this.body)
  }

  show() {
    if (!this.isDie) {
      const position = this.body.position
      const angle = this.body.angle

      push()
      translate(position.x, position.y)
      rotate(angle)
      fill(this.color)
      rectMode(CENTER)
      // rect(0, 0, this.w, this.h)
      this.star(0, 0, this.r * 2, this.r, this.n)
      pop()
    }
  }

  dieStatus() {
    this.particles && this.particles.update()
    this.particles && this.particles.show()
  }

  star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints
    let halfAngle = angle / 2.0
    beginShape()
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2
      let sy = y + sin(a) * radius2
      vertex(sx, sy)
      sx = x + cos(a + halfAngle) * radius1
      sy = y + sin(a + halfAngle) * radius1
      vertex(sx, sy)
    }
    endShape()
  }

  genPath(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints
    let halfAngle = angle / 2.0

    let path = ''
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2
      let sy = y + sin(a) * radius2
      path += ` ${sx} ${sy} `
      sx = x + cos(a + halfAngle) * radius1
      sy = y + sin(a + halfAngle) * radius1
      path += ` ${sx} ${sy} `
    }
    return path
  }
}
