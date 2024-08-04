class Shape6 {
  constructor(world, x, y, r, color, angle, amplitude) {
    this.x = x
    this.y = y
    this.r = w / 2
    this.w = w / 2
    this.h = w / 2
    this.theta = PI / 2

    this.distance = this.h * Math.sqrt(2)
    this.isRun = false

    this.shapes = ['RECT', 'CIRCLE', 'DIAMOND']
    const rand = Math.floor(Math.random() * 3)
    this.type = this.shapes[rand]

    this.time = Date.now()
    this.color = color
    this.color3 = colors[Math.floor(Math.random() * colors.length)]
    this.color4 = colors[Math.floor(Math.random() * colors.length)]

    this.particles3
    this.particles4

    this.isDie3 = false
    this.isDie4 = false

    this.body = Matter.Bodies.circle(this.x, this.y, this.distance / 2)
    this.body.render.fillStyle = this.color
    this.body.isSensor = true

    // this.body3 = Matter.Bodies.rectangle(this.x - w / 2, this.y, this.w, this.h)
    this.body3 = this.genShapes(this.x - w / 2, this.y, this.r, this.type)
    this.body3.render.fillStyle = this.color3
    this.body3.label = `FOOD_6R3${this.time}`
    this.body3.isSensor = true
    // Matter.Body.rotate(this.body3, PI / 4)

    // this.body4 = Matter.Bodies.rectangle(this.x + w / 2, this.y, this.w, this.h)
    this.body4 = this.genShapes(this.x + w / 2, this.y, this.r, this.type)
    this.body4.render.fillStyle = this.color4
    this.body4.label = `FOOD_6R4${this.time}`
    this.body4.isSensor = true
    // Matter.Body.rotate(this.body4, PI / 4)

    this.angle = angle
    this.amplitude = amplitude

    Matter.World.add(world, this.body)
    Matter.World.add(world, this.body3)
    Matter.World.add(world, this.body4)

    Matter.Events.on(engine, 'collisionStart', event => {
      event.pairs.forEach(pair => {
        /**
         * Body 3
         */
        if (pair.bodyA === this.body3 && !this.isDie3) {
          if (
            pair.bodyB.label === 'SKILL2' ||
            pair.bodyB.label === 'BULLET' ||
            (pair.bodyB.label === 'SNAKE' &&
              pair.bodyA.render.fillStyle === snake.color)
          ) {
            this.body3.label = 'DIE'
            this.particles3 = new Particles(
              this.body3.position.x,
              this.body3.position.y,
              this.color3,
              6,
            )

            this.isDie3 = true
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
            this.body3.label = 'DIE'
            snake.destroySkill1()

            this.particles3 = new Particles(
              this.body3.position.x,
              this.body3.position.y,
              this.color3,
              6,
            )

            this.isDie3 = true
            if (statusSound !== STATUS.MUTE) {
              // window.ReactNativeWebView.postMessage('Food')
            }
            scores++
            runSkill_1 = false
          }
        }

        if (pair.bodyB === this.body3 && !this.isDie3) {
          if (
            pair.bodyA.label === 'SKILL2' ||
            pair.bodyA.label === 'BULLET' ||
            (pair.bodyA.label === 'SNAKE' &&
              pair.bodyB.render.fillStyle === snake.color)
          ) {
            this.body3.label = 'DIE'
            this.particles3 = new Particles(
              this.body3.position.x,
              this.body3.position.y,
              this.color3,
              6,
            )
            this.isDie3 = true
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
            this.body3.label = 'DIE'
            snake.destroySkill1()

            this.particles3 = new Particles(
              this.body3.position.x,
              this.body3.position.y,
              this.color3,
              6,
            )

            this.isDie3 = true
            if (statusSound !== STATUS.MUTE) {
              // window.ReactNativeWebView.postMessage('Food')
            }
            scores++
            runSkill_1 = false
          }
        }

        /**
         * Body 4
         */
        if (pair.bodyA === this.body4 && !this.isDie4) {
          if (
            pair.bodyB.label === 'SKILL2' ||
            pair.bodyB.label === 'BULLET' ||
            (pair.bodyB.label === 'SNAKE' &&
              pair.bodyA.render.fillStyle === snake.color)
          ) {
            this.body4.label = 'DIE'
            this.particles4 = new Particles(
              this.body4.position.x,
              this.body4.position.y,
              this.color4,
              6,
            )

            this.isDie4 = true
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
            this.body4.label = 'DIE'
            snake.destroySkill1()

            this.particles4 = new Particles(
              this.body4.position.x,
              this.body4.position.y,
              this.color4,
              6,
            )

            this.isDie4 = true
            if (statusSound !== STATUS.MUTE) {
              // window.ReactNativeWebView.postMessage('Food')
            }
            scores++
            runSkill_1 = false
          }
        }

        if (pair.bodyB === this.body4 && !this.isDie4) {
          if (
            pair.bodyA.label === 'SKILL2' ||
            pair.bodyA.label === 'BULLET' ||
            (pair.bodyA.label === 'SNAKE' &&
              pair.bodyB.render.fillStyle === snake.color)
          ) {
            this.body4.label = 'DIE'
            this.particles4 = new Particles(
              this.body4.position.x,
              this.body4.position.y,
              this.color4,
              6,
            )
            this.isDie4 = true
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
            this.body4.label = 'DIE'
            snake.destroySkill1()

            this.particles4 = new Particles(
              this.body4.position.x,
              this.body4.position.y,
              this.color4,
              6,
            )

            this.isDie4 = true
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
    if (abs(this.body.position.y - snake.body.position.y) <= w) {
      this.isRun = true
    }

    let _x3 = 0
    let _x4 = 0
    let px = 0

    if (this.isRun) {
      this.theta += 0.006
      px = (w / 2) * Math.sin(this.theta)

      _x3 = w / 2 - px - this.body3.position.x
      _x4 = w / 2 + px - this.body4.position.x
    }

    Matter.Body.setVelocity(this.body3, {
      x: _x3,
      y: speed,
    })

    Matter.Body.setVelocity(this.body4, {
      x: _x4,
      y: speed,
    })

    Matter.Body.setVelocity(this.body, { x: 0, y: speed })
  }

  stop() {
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 })
    Matter.Body.setVelocity(this.body3, { x: 0, y: 0 })
    Matter.Body.setVelocity(this.body4, { x: 0, y: 0 })
  }

  destroy() {
    Matter.World.remove(engine.world, this.body)
    Matter.World.remove(engine.world, this.body3)
    Matter.World.remove(engine.world, this.body4)
  }

  checkDestroy() {
    if (this.body.position.y >= h + this.distance / 2) {
      this.destroy()
      return true
    }
    return false
  }

  show() {
    // push()
    // const position = this.body.position
    // const angle = this.body.angle
    // translate(position.x, position.y)
    // rotate(angle)
    // fill(this.color)
    // rectMode(CENTER)
    // circle(0, 0, this.distance)
    // pop()

    if (!this.isDie3) {
      push()
      const position3 = this.body3.position
      const angle3 = this.body3.angle
      translate(position3.x, position3.y)
      rotate(angle3)
      fill(this.color3)
      rectMode(CENTER)
      // rect(0, 0, this.w, this.h)
      this.showShapes(this.type)
      pop()
    }

    if (!this.isDie4) {
      push()
      const position4 = this.body4.position
      const angle4 = this.body4.angle
      translate(position4.x, position4.y)
      rotate(angle4)
      fill(this.color4)
      rectMode(CENTER)
      // rect(0, 0, this.w, this.h)
      this.showShapes(this.type)
      pop()
    }
  }

  dieStatus() {
    this.particles3 && this.particles3.update()
    this.particles3 && this.particles3.show()

    this.particles4 && this.particles4.update()
    this.particles4 && this.particles4.show()
  }

  genShapes(x, y, r, type) {
    let body
    switch (type) {
      case 'RECT':
        body = Matter.Bodies.rectangle(x, y, r, r)
        break
      case 'DIAMOND':
        body = Matter.Bodies.rectangle(x, y, r / Math.sqrt(2), r / Math.sqrt(2))
        Matter.Body.rotate(body, PI / 4)
        break
      case 'CIRCLE':
        body = Matter.Bodies.circle(x, y, r / 2)
        break
      default:
        body = Matter.Bodies.rectangle(x, y, r / Math.sqrt(2), r / Math.sqrt(2))
        Matter.Body.rotate(body, PI / 4)
        break
    }
    return body
  }

  showShapes(type) {
    switch (type) {
      case 'RECT':
        rect(0, 0, this.r, this.r)
        break
      case 'DIAMOND':
        rect(0, 0, this.r / Math.sqrt(2), this.r / Math.sqrt(2))
        break
      case 'CIRCLE':
        circle(0, 0, this.r)
        break
      default:
        rect(0, 0, this.r / Math.sqrt(2), this.r / Math.sqrt(2))
        break
    }
  }
}
