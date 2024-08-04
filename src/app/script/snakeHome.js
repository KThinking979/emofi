class SnakeHome {
  constructor(world, x, y, color, face) {
    this.r = 7
    this.color = color
    this.dx = 0
    this.points = []
    this.isDie = false
    this.theta = 0.0
    this.amplitude = 20
    this.period = 300.0
    this.dy = (TWO_PI / this.period) * 16

    this.face = face
    this.sizeEmoji = this.r * 1.5
    this.emoji = face.includes('S')
      ? createImg(`images/snakes/${face}.png`)
      : createImg(`images/anys/${face}.png`)
    this.emoji.size(this.sizeEmoji * 2, this.sizeEmoji * 2)
    if (this.face.includes('S64') || this.face.includes('S65')) {
      this.emoji.size(this.sizeEmoji * 2.6, this.sizeEmoji * 2.6)
    }
    this.setColorSnake(this.face)

    for (let i = 12; i >= 0; i--) {
      let len = new Len(world, x, y + i * this.r, this.r, color)
      this.points.push(len)
    }

    this.body = Matter.Bodies.circle(x, y, this.sizeEmoji)
    this.body.render.fillStyle = color
    this.body.label = 'SNAKE_HOME'

    Matter.World.add(world, this.body)
  }

  update() {
    this.theta += 0.04

    let y = this.theta
    for (let i = 0; i < this.points.length; i++) {
      if (i === this.points.length - 1) {
        this.body.position.x = w / 2 + sin(y) * this.amplitude
      }

      this.points[i].body.position.x = w / 2 + sin(y) * this.amplitude
      y += this.dy
    }
  }

  show() {
    if (!this.isDie) {
      let isEmoji = this.face.includes('S') ? true : false

      /**
       * Display
       */
      let colorLen = this.points[0].color
      let index = 0
      let isDrawDone = false

      noFill()
      while (!isDrawDone) {
        let isBreak = false
        strokeWeight(this.r * 2)
        stroke(colorLen)
        strokeJoin(ROUND)
        // curveTightness(0.5)
        beginShape()
        for (let i = index; i < this.points.length; i++) {
          if (this.points[i].color !== colorLen) {
            colorLen = this.points[i].color
            index = i
            isBreak = true
            // break;
          }
          curveVertex(
            this.points[i].body.position.x,
            this.points[i].body.position.y,
          )

          if (i === this.points.length - 1) {
            isDrawDone = true
          }
          if (isBreak && i === index + 2) {
            break
          }
        }
        endShape()
      }

      noStroke()
      const position = this.body.position
      const angle = this.body.angle

      push()
      translate(position.x, position.y)
      rectMode(CENTER)
      fill(this.color)

      if (
        !isEmoji ||
        (isEmoji &&
          // !this.face.includes('S3') &&
          !this.face.includes('S4') &&
          !this.face.includes('S6'))
      ) {
        fill('black')
        circle(0, 0, this.sizeEmoji * 2)
      }

      if (!isEmoji) {
        noFill()
        stroke(this.color)
        strokeWeight(1)
        circle(0, 0, this.sizeEmoji * 2 + 1)
      }

      isEmoji
        ? this.emoji.style('transform', `rotate(${angle}rad)`)
        : this.emoji.style('transform', `rotate(${frameCount / 12}rad)`)

      this.emoji.position(
        this.body.position.x - this.sizeEmoji,
        this.body.position.y - this.sizeEmoji,
      )
      if (this.face.includes('S64') || this.face.includes('S65')) {
        this.emoji.position(
          this.body.position.x - this.sizeEmoji * 1.3,
          this.body.position.y - this.sizeEmoji * 1.3,
        )
      }
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
        break
    }

    // TODO Remove && create
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
