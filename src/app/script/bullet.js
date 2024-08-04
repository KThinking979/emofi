class Bullet {
  constructor(world, x, y, r, color, angle, amplitude, face, speed) {
    this.r = r
    this.color = color ? color : 255
    this.particles
    this.isDie = false

    this.body = Matter.Bodies.circle(x, y, this.r)
    this.body.render.fillStyle = color
    this.body.label = 'BULLET'
    this.body.isSensor = true

    this.angle = angle
    this.amplitude = amplitude
    this.speed = speed ? -speed : -1

    this.face = face
    let id = this.face
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
    this.emoji = this.face.includes('S')
      ? createImg(`images/snakes/${id}.png`)
      : createImg(`images/anys/${id}.png`)
    this.emoji.size(this.r * 2, this.r * 2)

    /**
     * Skill 2
     */
    this.skills = []

    this.bodySkill1 = Matter.Bodies.circle(x - 30, y, this.r / 2)
    this.bodySkill1.label = 'BULLET'
    this.bodySkill1.isSensor = true

    this.bodySkill2 = Matter.Bodies.circle(x + 30, y, this.r / 2)
    this.bodySkill2.label = 'BULLET'
    this.bodySkill2.isSensor = true

    this.bodySkill3 = Matter.Bodies.circle(x, y - 30, this.r / 2)
    this.bodySkill3.label = 'BULLET'
    this.bodySkill3.isSensor = true

    this.bodySkill4 = Matter.Bodies.circle(x, y + 30, this.r / 2)
    this.bodySkill4.label = 'BULLET'
    this.bodySkill4.isSensor = true

    for (let i = 0; i < 4; i++) {
      let skill = this.face.includes('S')
        ? createImg(`images/snakes/${this.face}.png`)
        : createImg(`images/anys/${this.face}.png`)

      skill.size(this.r, this.r)
      skill.style('z-index', '998')
      this.skills.push(skill)
    }

    Matter.Body.setVelocity(this.bodySkill1, { x: 0, y: 0 })
    Matter.Body.rotate(this.bodySkill1, 0)

    Matter.Body.setVelocity(this.bodySkill2, { x: 0, y: 0 })
    Matter.Body.rotate(this.bodySkill2, 0)

    Matter.Body.setVelocity(this.bodySkill3, { x: 0, y: 0 })
    Matter.Body.rotate(this.bodySkill3, 0)

    Matter.Body.setVelocity(this.bodySkill4, { x: 0, y: 0 })
    Matter.Body.rotate(this.bodySkill4, 0)

    Matter.World.add(world, this.bodySkill1)
    Matter.World.add(world, this.bodySkill2)
    Matter.World.add(world, this.bodySkill3)
    Matter.World.add(world, this.bodySkill4)

    Matter.World.add(world, this.body)

    // Matter.Events.on(engine, 'collisionStart', event => {
    //   event.pairs.forEach(pair => {
    //     if (
    //       !this.isDie &&
    //       pair.bodyA === this.body &&
    //       pair.bodyB.label.includes('FOOD')
    //     ) {
    //       this.destroy()
    //     }

    //     if (
    //       !this.isDie &&
    //       pair.bodyB === this.body &&
    //       pair.bodyA.label.includes('FOOD')
    //     ) {
    //       this.destroy()
    //     }
    //   })
    // })
  }

  /**
   * Method
   */
  update() {
    if (this.body.position.y < 0) {
      this.body.label = 'DIE'
    }

    if (this.body.position.y < -this.r) {
      this.destroy()
    }

    Matter.Body.rotate(this.body, this.angle)

    Matter.Body.setVelocity(this.body, { x: 0, y: this.speed })
    Matter.Body.setVelocity(this.bodySkill1, { x: 0, y: this.speed })
    Matter.Body.setVelocity(this.bodySkill2, { x: 0, y: this.speed })
    Matter.Body.setVelocity(this.bodySkill3, { x: 0, y: this.speed })
    Matter.Body.setVelocity(this.bodySkill4, { x: 0, y: this.speed })

    Matter.Body.rotate(this.bodySkill1, 0.08, {
      x: this.body.position.x,
      y: this.body.position.y,
    })

    Matter.Body.rotate(this.bodySkill2, 0.08, {
      x: this.body.position.x,
      y: this.body.position.y,
    })

    Matter.Body.rotate(this.bodySkill3, 0.08, {
      x: this.body.position.x,
      y: this.body.position.y,
    })

    Matter.Body.rotate(this.bodySkill4, 0.08, {
      x: this.body.position.x,
      y: this.body.position.y,
    })
  }

  stop() {
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 })
    Matter.Body.setVelocity(this.bodySkill1, { x: 0, y: 0 })
    Matter.Body.setVelocity(this.bodySkill2, { x: 0, y: 0 })
    Matter.Body.setVelocity(this.bodySkill3, { x: 0, y: 0 })
    Matter.Body.setVelocity(this.bodySkill4, { x: 0, y: 0 })
  }

  destroy() {
    this.isDie = true

    this.emoji.remove()
    this.skills[0].remove()
    this.skills[1].remove()
    this.skills[2].remove()
    this.skills[3].remove()

    Matter.World.remove(engine.world, this.body)
    Matter.World.remove(engine.world, this.bodySkill1)
    Matter.World.remove(engine.world, this.bodySkill2)
    Matter.World.remove(engine.world, this.bodySkill3)
    Matter.World.remove(engine.world, this.bodySkill4)
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
      this.emoji.position(
        this.body.position.x - this.r,
        this.body.position.y - this.r,
      )
      this.emoji.style('transform', `rotate(${frameCount / 8}rad)`)

      this.skills[0].position(
        this.bodySkill1.position.x - this.r / 2,
        this.bodySkill1.position.y - this.r / 2,
      )

      this.skills[1].position(
        this.bodySkill2.position.x - this.r / 2,
        this.bodySkill2.position.y - this.r / 2,
      )

      this.skills[2].position(
        this.bodySkill3.position.x - this.r / 2,
        this.bodySkill3.position.y - this.r / 2,
      )

      this.skills[3].position(
        this.bodySkill4.position.x - this.r / 2,
        this.bodySkill4.position.y - this.r / 2,
      )
      pop()
    }
  }

  dieStatus() {
    this.particles && this.particles.update()
    this.particles && this.particles.show()
  }
}
