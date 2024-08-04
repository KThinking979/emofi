class SwitchHome {
  constructor(world, x, y, color, face) {
    this.r = 7
    this.color = color
    this.dx = 0
    this.points = []
    this.isDie = false
    this.isRun = true

    this.face = face
    this.sizeEmoji = this.r * 1.6

    this.emoji = face.includes('S')
      ? createImg(`images/snakes/${face}.png`)
      : createImg(`images/anys/${face}.png`)

    this.emoji.size(this.sizeEmoji * 2, this.sizeEmoji * 2)
    if (this.face.includes('S64') || this.face.includes('S65')) {
      this.emoji.size(this.sizeEmoji * 2.6, this.sizeEmoji * 2.6)
    }
    this.setColorSnake(this.face)

    for (let i = 12; i >= 0; i--) {
      const len = new Len(world, x, y + i * this.r, this.r, color)
      this.points.push(len)
    }

    const len = new Len(world, x, y, this.r, color)
    this.points.push(len)

    this.dotOne = new Len(world, x, y + 14 * this.r + 4, this.r, color)
    this.dotTwo = new Len(world, x, y + 15 * this.r + 12, this.r / 2, color)

    this.body = Matter.Bodies.circle(x, y, this.sizeEmoji)
    this.body.render.fillStyle = color
    this.body.label = 'SNAKE'

    Matter.World.add(world, this.body)
  }

  /**
   * Method
   */
  setDx() {
    this.dx = mouseX - this.body.position.x
  }

  updatePosition() {
    const y = this.body.position.y
    let x = this.body.position.x
    let newDx = mouseX - x - this.dx
    x += newDx

    Matter.Body.setPosition(this.body, { x, y })

    if (this.body.position.x <= this.sizeEmoji + 20) {
      Matter.Body.setPosition(this.body, { x: this.sizeEmoji + 20, y })
    }

    if (this.body.position.x >= w - this.sizeEmoji - 20) {
      Matter.Body.setPosition(this.body, { x: w - this.sizeEmoji - 20, y })
    }
  }

  update() {
    /**
     * Update
     */
    if (this.isRun) {
      Matter.Body.setVelocity(this.body, { x: 0, y: -3 })
    }

    if (this.body.position.y >= h / 2 + 220) {
      this.isRun = true
    }

    if (this.body.position.y <= h / 2 + 150) {
      this.isRun = false
      Matter.Body.setVelocity(this.body, { x: 0, y: 0 })
    }

    if (!this.isRun) {
      Matter.Body.setVelocity(this.body, { x: 0, y: 0.5 })
    }
  }

  show() {
    if (!this.isDie) {
      noStroke()
      const position = this.body.position
      const angle = this.body.angle

      push()
      translate(position.x, position.y)
      rectMode(CENTER)
      fill(this.color)

      this.emoji.style('transform', `rotate(${frameCount / 12}rad)`)

      this.emoji.position(
        this.body.position.x - this.sizeEmoji,
        this.body.position.y - this.sizeEmoji,
      )
      pop()
    }
  }

  dieStatus() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].dieStatus()
    }
  }

  destroy() {
    this.emoji.remove()
  }

  setColorSnake(face) {
    if (face !== this.face) {
      this.face = face
    }
    let id = face
    switch (this.color) {
      case COLORS.RED:
        id = `${id}R`
        break
      case COLORS.GREEN:
        id = `${id}G`
        break
      case COLORS.BLUE:
        id = `${id}B`
        break
      case COLORS.VIOLET:
        id = `${id}V`
        break
      default:
        id = 'S0'
        break
    }

    this.emoji.remove()
    this.emoji = face.includes('S')
      ? createImg(`images/snakes/${id}.png`)
      : createImg(`images/anys/${id}.png`)
    this.emoji.size(this.sizeEmoji * 2, this.sizeEmoji * 2)
    if (this.face.includes('S64') || this.face.includes('S65')) {
      this.emoji.size(this.sizeEmoji * 2.6, this.sizeEmoji * 2.6)
    }
    this.emoji.position(-w, -h)
  }
}
