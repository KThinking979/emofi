class Gate {
  constructor(world, y, color) {
    const positionX = w / 2
    const positionY = y

    const positionAX = 20 + 10
    const positionAY = positionY

    const positionBX = w - 20 - 10
    const positionBY = positionY

    this.w = w - 40 - 40
    this.h = 4
    this.color = color ? color : 255

    this.particles = []

    this.partA = Matter.Bodies.rectangle(positionAX, positionAY, 20, 20)
    this.partB = Matter.Bodies.rectangle(positionBX, positionBY, 20, 20)

    this.partC = Matter.Bodies.rectangle(positionX, positionY, this.w, this.h)

    this.isDie = false

    this.body = Matter.Body.create({
      parts: [this.partA, this.partB, this.partC],
    })
    this.body.render.fillStyle = color
    this.partA.render.fillStyle = color
    this.partB.render.fillStyle = color
    this.partC.render.fillStyle = color
    this.body.label = 'GATE'
    this.partA.label = 'GATE'
    this.partB.label = 'GATE'
    this.partC.label = 'GATE'

    this.body.isSensor = true
    this.partA.isSensor = true
    this.partB.isSensor = true
    this.partC.isSensor = true

    Matter.World.add(world, this.body)

    Matter.Events.on(engine, 'collisionStart', event => {
      event.pairs.forEach(pair => {
        if (
          ((pair.bodyA === this.partA ||
            pair.bodyA === this.partB ||
            pair.bodyA === this.partC) &&
            pair.bodyB.label === 'SNAKE') ||
          ((pair.bodyB === this.partA ||
            pair.bodyB === this.partB ||
            pair.bodyB === this.partC) &&
            pair.bodyA.label === 'SNAKE')
        ) {
          this.isDie = true
          for (let i = 20; i < w - 20; i += 20) {
            const particle = new Particles(
              i,
              this.body.position.y,
              this.color,
              1,
            )
            this.particles.push(particle)
          }

          this.body.render.fillStyle = this.color
          this.partA.render.fillStyle = this.color
          this.partB.render.fillStyle = this.color
          this.partC.render.fillStyle = this.color

          Matter.Body.setVelocity(this.body, { x: -w, y: -h });
        }
      })
    })
  }

  /**
   * Method
   */
  update() {
    if (!this.isDie) {
      Matter.Body.translate(this.body, { x: 0, y: +speed })
    }
  }

  stop() {
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
  }

  destroy() {
    Matter.World.remove(engine.world, this.body)
  }

  show() {
    const position = this.body.position
    const angle = this.body.angle
    const gateColor = color(this.color)
    gateColor.setAlpha(128 + 50 * sin(millis() / 80))

    push()
    rotate(angle)
    fill(gateColor)
    rectMode(CENTER)
    rect(position.x, position.y, this.w, this.h)
    rect(this.partA.position.x, this.partA.position.y, 20, 20)
    rect(this.partB.position.x, this.partB.position.y, 20, 20)
    pop()
  }

  dieStatus() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update()
      this.particles[i].show()
    }
  }
}
