class Shape4 {
  constructor(world, x, y, r, color, angle, amplitude, rest) {
    this.x = x
    this.y = y
    this.r = r
    this.w = 36
    this.h = 120

    this.rest = rest
    this.size = (w - 40 - this.rest) / 2 - this.h / 2
    this.distance = this.h + this.size * 2

    this.time = Date.now()
    this.color = color
    this.color1 = colors[Math.floor(Math.random() * colors.length)]
    this.color2 = colors[Math.floor(Math.random() * colors.length)]
    this.color3 = colors[Math.floor(Math.random() * colors.length)]
    this.color4 = colors[Math.floor(Math.random() * colors.length)]

    this.particles1
    this.particles2
    this.particles3
    this.particles4

    this.isDie1 = false
    this.isDie2 = false
    this.isDie3 = false
    this.isDie4 = false

    this.body = Matter.Bodies.circle(x, y, this.distance / 2)
    this.body.render.fillStyle = this.color
    this.body.isSensor = true

    this.body1 = Matter.Bodies.rectangle(
      this.x - this.size,
      this.y,
      this.w,
      this.h,
    )
    this.body1.render.fillStyle = this.color1
    this.body1.label = `FOOD_4R1${this.time}`
    this.body1.isSensor = true
    // Matter.Body.rotate(this.body1, PI / 2)

    this.body2 = Matter.Bodies.rectangle(
      this.x + this.size,
      this.y,
      this.w,
      this.h,
    )
    this.body2.render.fillStyle = this.color2
    this.body2.label = `FOOD_4R2${this.time}`
    this.body2.isSensor = true
    // Matter.Body.rotate(this.body2, PI / 2)

    this.body3 = Matter.Bodies.rectangle(
      this.x,
      this.y + this.size,
      this.w,
      this.h,
    )
    this.body3.render.fillStyle = this.color3
    this.body3.label = `FOOD_4R3${this.time}`
    this.body3.isSensor = true

    this.body4 = Matter.Bodies.rectangle(
      this.x,
      this.y - this.size,
      this.w,
      this.h,
    )
    this.body4.render.fillStyle = this.color4
    this.body4.label = `FOOD_4R4${this.time}`
    this.body4.isSensor = true

    this.angle = angle
    this.amplitude = amplitude

    Matter.World.add(world, this.body)
    Matter.World.add(world, this.body1)
    Matter.World.add(world, this.body2)
    Matter.World.add(world, this.body3)
    Matter.World.add(world, this.body4)

    Matter.Events.on(engine, 'collisionStart', event => {
      event.pairs.forEach(pair => {
        /**
         * Body 1
         */

        if (pair.bodyA === this.body1 && !this.isDie1) {
          if (
            pair.bodyB.label === 'SKILL2' ||
            pair.bodyB.label === 'BULLET' ||
            (pair.bodyB.label === 'SNAKE' &&
              pair.bodyA.render.fillStyle === snake.color)
          ) {
            this.body1.label = 'DIE'
            this.particles1 = new Particles(
              this.body1.position.x,
              this.body1.position.y,
              this.color1,
              6,
            )

            this.isDie1 = true
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
            this.body1.label = 'DIE'
            snake.destroySkill1()

            this.particles1 = new Particles(
              this.body1.position.x,
              this.body1.position.y,
              this.color1,
              6,
            )

            this.isDie1 = true
            if (statusSound !== STATUS.MUTE) {
              // window.ReactNativeWebView.postMessage('Food')
            }
            scores++
            runSkill_1 = false
          }
        }

        if (pair.bodyB === this.body1 && !this.isDie1) {
          if (
            pair.bodyA.label === 'SKILL2' ||
            pair.bodyA.label === 'BULLET' ||
            (pair.bodyA.label === 'SNAKE' &&
              pair.bodyB.render.fillStyle === snake.color)
          ) {
            this.body1.label = 'DIE'
            this.particles1 = new Particles(
              this.body1.position.x,
              this.body1.position.y,
              this.color1,
              6,
            )
            this.isDie1 = true
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
            this.body1.label = 'DIE'
            snake.destroySkill1()

            this.particles1 = new Particles(
              this.body1.position.x,
              this.body1.position.y,
              this.color1,
              6,
            )

            this.isDie1 = true
            if (statusSound !== STATUS.MUTE) {
              // window.ReactNativeWebView.postMessage('Food')
            }
            scores++
            runSkill_1 = false
          }
        }

        /**
         * Body 2
         */
        if (pair.bodyA === this.body2 && !this.isDie2) {
          if (
            pair.bodyB.label === 'SKILL2' ||
            pair.bodyB.label === 'BULLET' ||
            (pair.bodyB.label === 'SNAKE' &&
              pair.bodyA.render.fillStyle === snake.color)
          ) {
            this.body2.label = 'DIE'
            this.particles2 = new Particles(
              this.body2.position.x,
              this.body2.position.y,
              this.color2,
              6,
            )

            this.isDie2 = true
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
            this.body2.label = 'DIE'
            snake.destroySkill1()

            this.particles2 = new Particles(
              this.body2.position.x,
              this.body2.position.y,
              this.color2,
              6,
            )

            this.isDie2 = true
            if (statusSound !== STATUS.MUTE) {
              // window.ReactNativeWebView.postMessage('Food')
            }
            scores++
            runSkill_1 = false
          }
        }

        if (pair.bodyB === this.body2 && !this.isDie2) {
          if (
            pair.bodyA.label === 'SKILL2' ||
            pair.bodyA.label === 'BULLET' ||
            (pair.bodyA.label === 'SNAKE' &&
              pair.bodyB.render.fillStyle === snake.color)
          ) {
            this.body2.label = 'DIE'
            this.particles2 = new Particles(
              this.body2.position.x,
              this.body2.position.y,
              this.color2,
              6,
            )
            this.isDie2 = true
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
            this.body2.label = 'DIE'
            snake.destroySkill1()

            this.particles2 = new Particles(
              this.body2.position.x,
              this.body2.position.y,
              this.color2,
              6,
            )

            this.isDie2 = true
            if (statusSound !== STATUS.MUTE) {
              // window.ReactNativeWebView.postMessage('Food')
            }
            scores++
            runSkill_1 = false
          }
        }

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
    Matter.Body.rotate(this.body1, this.angle)

    Matter.Body.rotate(this.body2, this.angle)
    Matter.Body.rotate(this.body3, this.angle)
    Matter.Body.rotate(this.body4, this.angle)

    // var px = w / 2 + this.amplitude * Math.sin(frameCount / 50.0);
    // Matter.Body.setVelocity(this.body, { x: px - this.body.position.x, y: speed });

    Matter.Body.setVelocity(this.body, { x: 0, y: speed })
    Matter.Body.setVelocity(this.body1, { x: 0, y: speed })
    Matter.Body.setVelocity(this.body2, { x: 0, y: speed })
    Matter.Body.setVelocity(this.body3, { x: 0, y: speed })
    Matter.Body.setVelocity(this.body4, { x: 0, y: speed })
  }

  stop() {
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 })
    Matter.Body.setVelocity(this.body1, { x: 0, y: 0 })
    Matter.Body.setVelocity(this.body2, { x: 0, y: 0 })
    Matter.Body.setVelocity(this.body3, { x: 0, y: 0 })
    Matter.Body.setVelocity(this.body4, { x: 0, y: 0 })
  }

  destroy() {
    Matter.World.remove(engine.world, this.body)
    Matter.World.remove(engine.world, this.body1)
    Matter.World.remove(engine.world, this.body2)
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
    // TODO DEBUG
    // push()
    // const position = this.body.position
    // const angle = this.body.angle
    // translate(position.x, position.y)
    // rotate(angle)
    // fill(this.color)
    // rectMode(CENTER)
    // circle(0, 0, this.distance)
    // pop()

    if (!this.isDie1) {
      push()
      const position1 = this.body1.position
      const angle1 = this.body1.angle
      translate(position1.x, position1.y)
      rotate(angle1)
      fill(this.color1)
      rectMode(CENTER)
      rect(0, 0, this.w, this.h)
      pop()
    }

    if (!this.isDie2) {
      push()
      const position2 = this.body2.position
      const angle2 = this.body2.angle
      translate(position2.x, position2.y)
      rotate(angle2)
      fill(this.color2)
      rectMode(CENTER)
      rect(0, 0, this.w, this.h)
      pop()
    }

    if (!this.isDie3) {
      push()
      const position3 = this.body3.position
      const angle3 = this.body3.angle
      translate(position3.x, position3.y)
      rotate(angle3)
      fill(this.color3)
      rectMode(CENTER)
      rect(0, 0, this.w, this.h)
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
      rect(0, 0, this.w, this.h)
      pop()
    }
  }

  dieStatus() {
    this.particles1 && this.particles1.update()
    this.particles1 && this.particles1.show()

    this.particles2 && this.particles2.update()
    this.particles2 && this.particles2.show()

    this.particles3 && this.particles3.update()
    this.particles3 && this.particles3.show()

    this.particles4 && this.particles4.update()
    this.particles4 && this.particles4.show()
  }
}
