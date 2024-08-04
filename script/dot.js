class Dot {
  constructor(world, y, color, isDie) {
    const positionX = w / 2
    const positionY = y

    this.r = 30
    this.color = color ? color : 255

    this.particles

    this.partC = Matter.Bodies.circle(positionX, positionY, this.r / 2)

    this.isDie = isDie ? true : false

    this.body = Matter.Body.create({
      parts: [this.partC],
    })
    this.body.render.fillStyle = color
    this.partC.render.fillStyle = color

    this.body.label = 'DOT'
    this.partC.label = 'DOT'

    this.body.isSensor = true
    this.partC.isSensor = true

    this.body.isStatic = true
    this.partC.isStatic = true

    this.imgDot = createImg('images/dot.png')
    this.imgDot.size(this.r, this.r)
    this.imgDot.position(positionX, positionY)

    Matter.World.add(world, this.body)

    Matter.Events.on(engine, 'collisionStart', event => {
      event.pairs.forEach(pair => {
        if (
          !_switch.isDie &&
          ((pair.bodyA === this.partC && pair.bodyB.label === 'SWITCH') ||
            (pair.bodyB === this.partC && pair.bodyA.label === 'SWITCH'))
        ) {
          this.isDie = true
          this.imgDot.position(-w, -h)

          this.particles = new Particles(
            this.body.position.x,
            this.body.position.y,
            this.color,
            8,
          )

          this.body.render.fillStyle = this.color
          this.partC.render.fillStyle = this.color

          Matter.Body.setVelocity(this.body, { x: -w, y: -h })
        }
      })
    })
  }

  /**
   * Method
   */
  update() {
    if (!this.isDie) {
      Matter.Body.translate(this.body, { x: 0, y: +speedSwitch })
    }

    // let randomColor = colors[Math.floor(Math.random() * colors.length)]
    // this.color = randomColor
    // this.body.render.fillStyle = randomColor
    // this.partC.render.fillStyle = randomColor
  }

  stop() {
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 })
  }

  destroy() {
    this.imgDot.remove()
    Matter.World.remove(engine.world, this.body)
  }

  show() {
    const position = this.body.position
    const angle = this.body.angle
    // const gateColor = color(this.color)
    // gateColor.setAlpha(128 + 50 * sin(millis() / 80))

    push()
    rotate(angle)
    // fill(gateColor)
    rectMode(CENTER)
    // circle(position.x, position.y, this.r)
    this.imgDot.style('transform', `rotate(${radians(frameCount / 0.2)}rad)`)
    this.imgDot.position(position.x - this.r / 2, position.y - this.r / 2)
    pop()
  }

  dieStatus() {
    // for (let i = 0; i < this.particles.length; i++) {
    //   this.particles[i].update()
    //   this.particles[i].show()
    // }

    this.particles && this.particles.update()
    this.particles && this.particles.show()
    this.destroy()
  }
}
