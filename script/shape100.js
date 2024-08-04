class Shape100 {
  constructor(world, x, y, r, color, angle, amplitude, type, dis) {
    this.x = x
    this.y = y
    this.r = r
    this.angle = angle
    this.type = type

    this.foods = []
    this.sizeFood = 5
    this.rest = 150
    this.size = (w - 60 - this.rest) / this.sizeFood

    this.distance = this.size
    this.y = -(this.distance / 2 + dis)

    for (let i = 0; i < this.sizeFood; i++) {
      let randomColor = colors[Math.floor(Math.random() * colors.length)]
      let food

      switch (type) {
        case 'RECT':
          food = new Rect(
            world,
            30 +
            this.size / 2 +
            i * (this.size + this.rest / (this.sizeFood - 1)),
            this.y,
            this.size,
            this.size,
            randomColor,
            this.angle,
            0,
          )
          break
        case 'CIRCLE':
          food = new Circle(
            world,
            30 +
            this.size / 2 +
            i * (this.size + this.rest / (this.sizeFood - 1)),
            this.y,
            this.size,
            randomColor,
            this.angle,
            0,
          )
          break
        case 'TRIANGLE':
          food = new Triangle(
            world,
            30 +
            this.size / 2 +
            i * (this.size + this.rest / (this.sizeFood - 1)),
            this.y,
            this.size,
            3,
            randomColor,
            this.angle,
            0,
          )
          break
        default:
          food = new Circle(
            world,
            30 +
            this.size / 2 +
            i * (this.size + this.rest / (this.sizeFood - 1)),
            this.y,
            this.size,
            randomColor,
            this.angle,
            0,
          )
          break
      }

      this.foods.push(food)
    }
  }

  /**
   * Method
   */
  update() {
    for (let i = 0; i < this.foods.length; i++) {
      this.foods[i].update()
    }
  }

  stop() {
    for (let i = 0; i < this.foods.length; i++) {
      this.foods[i].stop()
    }
  }

  destroy() {
    for (let i = 0; i < this.foods.length; i++) {
      this.foods[i].destroy()
    }
  }

  show() {
    for (let i = 0; i < this.foods.length; i++) {
      this.foods[i].show()
    }
  }

  dieStatus() {
    for (let i = 0; i < this.foods.length; i++) {
      this.foods[i].dieStatus()
    }
  }

  checkDestroy() {
    const shape = this.foods[0]
    if (shape && shape.body.position.y >= h + this.distance / 2) {
      this.destroy()
      return true
    }
    // switch (this.type) {
    //   case 'RECT':
    //     if (shape && shape.body.position.y >= h + this.distance / 2) {
    //       this.destroy()
    //       isDestroy = true
    //     }
    //     break
    //   case 'CIRCLE':
    //     if (shape && shape.body.position.y >= h + this.distance / 2) {
    //       this.destroy()
    //       isDestroy = true
    //     }
    //     break
    //   case 'TRIANGLE':
    //     if (shape && shape.body.position.y >= h + this.distance / 2) {
    //       this.destroy()
    //       isDestroy = true
    //     }
    //     break

    //   default:
    //     break
    // }

    return false
  }
}
