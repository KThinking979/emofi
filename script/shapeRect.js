class ShapeRect {
  constructor(world, color) {
    const sizeFood = 10 
    const maxX = w - (20 + sizeFood)
    const minX = 20 + sizeFood

    const maxY = -30
    const minY = -h / 2

    const positionX = Math.floor(Math.random() * (maxX - minX) + minX)
    const positionY = Math.floor(Math.random() * (maxY - minY) + minY)

    this.w = sizeFood
    this.h = sizeFood
    this.color = color ? color : 255
    this.particles

    this.body = Matter.Bodies.rectangle(
      positionX,
      positionY,
      sizeFood,
      sizeFood,
    )
    this.body.render.fillStyle = color
    this.body.label = 'FOOD'
    // this.body.isSensor = true

    Matter.World.add(world, this.body)

    Matter.Events.on(engine, 'collisionStart', event => {
      event.pairs.forEach(pair => {
        if (
          (pair.bodyA === this.body &&
            pair.bodyB.label === 'SNAKE' &&
            pair.bodyA.render.fillStyle === snake.color) ||
          (pair.bodyB === this.body &&
            pair.bodyA.label === 'SNAKE' &&
            pair.bodyA.render.fillStyle === snake.color)
        ) {
          this.particles = new Particles(
            this.body.position.x,
            this.body.position.y,
            this.color,
            8,
          )

          this.reset()
        }
      })
    })
  }

  /**
   * Method
   */
  update() {
    // if (this.body.position.y >= h + 40) {
    if (this.body.position.y >= h/2 - 40) {
      this.reset()
    } else {
      Matter.Body.translate(this.body, { x: 0, y: +speed })
    }
  }

  reset() {
    const sizeFood = 40
    const maxX = w - (20 + sizeFood)
    const minX = 20 + sizeFood

    const maxY = -30
    const minY = -h / 2

    const positionX = Math.floor(Math.random() * (maxX - minX) + minX)
    const positionY = Math.floor(Math.random() * (maxY - minY) + minY)

    Matter.Body.setPosition(this.body, { x: positionX, y: positionY })
  }

  show() {
    const position = this.body.position
    const angle = this.body.angle

    push()
    translate(position.x, position.y)
    rotate(angle)
    fill(this.color)
    rectMode(CENTER)
    rect(0, 0, this.w, this.h)
    pop()
  }

  dieStatus() {
    this.particles && this.particles.update()
    this.particles && this.particles.show()
  }
}
