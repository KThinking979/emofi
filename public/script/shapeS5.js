class ShapeS5 {
  constructor(world, x, y, r, color, angle, amplitude, rest, rotate, isCoin) {
    this.x = x
    this.y = y
    this.r = r

    this.rotate = rotate ? rotate : 0
    this.shapes = ['RECT', 'CIRCLE', 'DIAMOND', 'TRIANGLE', 'LINE']
    const rand = Math.floor(Math.random() * 5)
    this.type = this.shapes[rand]

    if (
      (this.type === 'TRIANGLE' || this.type === 'LINE') &&
      this.rotate === 0.5
    ) {
      this.rotate = 1
    }

    if (this.type !== 'DIAMOND') {
      this.r = this.r * 0.8
    }

    if (this.type === 'LINE') {
      this.r = this.r * 0.75
    }

    this.rest = rest
    this.size = (w - 40 - this.rest) / 2 - this.r / 2
    this.distance = this.r + this.size * 2

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

    this.body = Matter.Bodies.circle(this.x, this.y, this.distance / 2)
    this.body.render.fillStyle = this.color
    this.body.isSensor = true
    this.body.isStatic = true

    this.body1 = this.genShapes(
      this.x - 20 - this.r / 2,
      this.y,
      this.r / 2,
      this.type,
    )
    this.body1.render.fillStyle = this.color1
    this.body1.label = `FOOD_3R1${this.time}`
    this.body1.isSensor = true
    this.body1.isStatic = true

    this.body2 = this.genShapes(
      this.x + 20 + this.r / 2,
      this.y,
      this.r / 2,
      this.type,
    )
    this.body2.render.fillStyle = this.color2
    this.body2.label = `FOOD_3R2${this.time}`
    this.body2.isSensor = true
    this.body2.isStatic = true

    this.body3 = this.genShapes(this.x + 60 + this.r, this.y, this.r, this.type)
    this.body3.render.fillStyle = this.color3
    this.body3.label = `FOOD_3R3${this.time}`
    this.body3.isSensor = true
    this.body3.isStatic = true

    this.body4 = this.genShapes(this.x - 60 - this.r, this.y, this.r, this.type)
    this.body4.render.fillStyle = this.color4
    this.body4.label = `FOOD_3R4${this.time}`
    this.body4.isSensor = true
    this.body4.isStatic = true

    this.angle = angle
    this.amplitude = amplitude

    this.isCoin = isCoin ? true : false
    this.coin

    if (this.isCoin) {
      this.coin = new Coin(
        engine.world,
        this.body.position.x,
        this.body.position.y,
      )
    }

    Matter.World.add(world, this.body)
    Matter.World.add(world, this.body1)
    Matter.World.add(world, this.body2)
    Matter.World.add(world, this.body3)
    Matter.World.add(world, this.body4)

    Matter.Events.on(engine, 'collisionStart', event => {
      event.pairs.forEach(pair => {
        if (_switch && !_switch.isDie) {
          /**
           * Body 1
           */

          if (pair.bodyA === this.body1 && !this.isDie1) {
            if (
              pair.bodyB.label === 'SKILL2' ||
              pair.bodyB.label === 'BULLET' ||
              (pair.bodyB.label === 'SWITCH' &&
                pair.bodyA.render.fillStyle === _switch.color)
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
              pair.bodyB.label === 'SWITCH' &&
              pair.bodyA.render.fillStyle !== _switch.color &&
              runSkill_1
            ) {
              this.body1.label = 'DIE'
              _switch.destroySkill1()

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
              (pair.bodyA.label === 'SWITCH' &&
                pair.bodyB.render.fillStyle === _switch.color)
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
              pair.bodyA.label === 'SWITCH' &&
              pair.bodyB.render.fillStyle !== _switch.color &&
              runSkill_1
            ) {
              this.body1.label = 'DIE'
              _switch.destroySkill1()

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
              (pair.bodyB.label === 'SWITCH' &&
                pair.bodyA.render.fillStyle === _switch.color)
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
              pair.bodyB.label === 'SWITCH' &&
              pair.bodyA.render.fillStyle !== _switch.color &&
              runSkill_1
            ) {
              this.body2.label = 'DIE'
              _switch.destroySkill1()

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
              (pair.bodyA.label === 'SWITCH' &&
                pair.bodyB.render.fillStyle === _switch.color)
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
              pair.bodyA.label === 'SWITCH' &&
              pair.bodyB.render.fillStyle !== _switch.color &&
              runSkill_1
            ) {
              this.body2.label = 'DIE'
              _switch.destroySkill1()

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
              (pair.bodyB.label === 'SWITCH' &&
                pair.bodyA.render.fillStyle === _switch.color)
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
              pair.bodyB.label === 'SWITCH' &&
              pair.bodyA.render.fillStyle !== _switch.color &&
              runSkill_1
            ) {
              this.body3.label = 'DIE'
              _switch.destroySkill1()

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
              (pair.bodyA.label === 'SWITCH' &&
                pair.bodyB.render.fillStyle === _switch.color)
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
              pair.bodyA.label === 'SWITCH' &&
              pair.bodyB.render.fillStyle !== _switch.color &&
              runSkill_1
            ) {
              this.body3.label = 'DIE'
              _switch.destroySkill1()

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
              (pair.bodyB.label === 'SWITCH' &&
                pair.bodyA.render.fillStyle === _switch.color)
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
              pair.bodyB.label === 'SWITCH' &&
              pair.bodyA.render.fillStyle !== _switch.color &&
              runSkill_1
            ) {
              this.body4.label = 'DIE'
              _switch.destroySkill1()

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
              (pair.bodyA.label === 'SWITCH' &&
                pair.bodyB.render.fillStyle === _switch.color)
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
              pair.bodyA.label === 'SWITCH' &&
              pair.bodyB.render.fillStyle !== _switch.color &&
              runSkill_1
            ) {
              this.body4.label = 'DIE'
              _switch.destroySkill1()

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
        }
      })
    })
  }

  /**
   * Method
   */
  updatePosition() {
    Matter.Body.setPosition(this.body, {
      x: this.body.position.x,
      y: this.body.position.y + speedSwitch,
    })
    Matter.Body.setPosition(this.body1, {
      x: this.body1.position.x,
      y: this.body1.position.y + speedSwitch,
    })
    Matter.Body.setPosition(this.body2, {
      x: this.body2.position.x,
      y: this.body2.position.y + speedSwitch,
    })
    Matter.Body.setPosition(this.body3, {
      x: this.body3.position.x,
      y: this.body3.position.y + speedSwitch,
    })
    Matter.Body.setPosition(this.body4, {
      x: this.body4.position.x,
      y: this.body4.position.y + speedSwitch,
    })

    this.coin && this.coin.updateSwitch()
  }

  update() {
    Matter.Body.rotate(this.body1, this.rotate)
    Matter.Body.rotate(this.body1, this.angle, {
      x: this.body.position.x,
      y: this.body.position.y,
    })

    Matter.Body.rotate(this.body2, this.rotate)
    Matter.Body.rotate(this.body2, this.angle, {
      x: this.body.position.x,
      y: this.body.position.y,
    })

    Matter.Body.rotate(this.body3, this.rotate)
    Matter.Body.rotate(this.body3, -this.angle, {
      x: this.body.position.x,
      y: this.body.position.y,
    })

    Matter.Body.rotate(this.body4, this.rotate)
    Matter.Body.rotate(this.body4, -this.angle, {
      x: this.body.position.x,
      y: this.body.position.y,
    })
  }

  stop() {
    this.coin && this.coin.stop()
  }

  destroy() {
    Matter.World.remove(engine.world, this.body)
    Matter.World.remove(engine.world, this.body1)
    Matter.World.remove(engine.world, this.body2)
    Matter.World.remove(engine.world, this.body3)
    Matter.World.remove(engine.world, this.body4)

    this.coin && this.coin.destroy()
  }

  checkDestroy() {
    if (this.body.position.y >= h + this.distance / 2) {
      this.destroy()
      return true
    }
    return false
  }

  show() {
    /**
     * Coin
     */
    this.coin && this.coin.show()

    if (!this.isDie1) {
      push()
      const position1 = this.body1.position
      const angle1 = this.body1.angle
      translate(position1.x, position1.y)
      rotate(angle1)
      fill(this.color1)
      rectMode(CENTER)
      this.showShapes(this.type, this.r / 2)
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
      this.showShapes(this.type, this.r / 2)
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
      this.showShapes(this.type, this.r)
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
      this.showShapes(this.type, this.r)
      pop()
    }
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
      case 'TRIANGLE':
        const path = this.genPath(0, 0, (r / 3) * 2, r / 3, 3)
        const form = Matter.Vertices.fromPath(path)
        body = Matter.Bodies.fromVertices(
          x,
          y,
          form,
          {
            render: {
              fillStyle: this.color,
              strokeStyle: this.color,
              lineWidth: 1,
            },
          },
          true,
        )
        break
      case 'LINE':
        body = Matter.Bodies.rectangle(x, y, r / 2.5, r * 1.5)
        break
      default:
        body = Matter.Bodies.circle(x, y, r / 2)
        break
    }
    return body
  }

  showShapes(type, r) {
    switch (type) {
      case 'RECT':
        rect(0, 0, r, r)
        break
      case 'DIAMOND':
        rect(0, 0, r / Math.sqrt(2), r / Math.sqrt(2))
        break
      case 'CIRCLE':
        circle(0, 0, r)
        break
      case 'TRIANGLE':
        this.star(0, 0, (r / 3) * 2, r / 3, 3)
        break
      case 'LINE':
        rect(0, 0, r / 2.5, r * 1.5)
        break
      default:
        circle(0, 0, r)
        break
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

    this.coin && this.coin.isDie && this.coin.dieStatus()
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
