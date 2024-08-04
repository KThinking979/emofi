class Shape1 {
  constructor(world, x, y, angle, type, dis, disWall, sizeFood) {
    this.x = x
    this.y = y
    this.angle = angle
    this.type = type

    this.foods = []
    this.sizeFood = sizeFood ? sizeFood : 5
    this.disWall = disWall

    this.shapes = ['RECT', 'CIRCLE', 'TRIANGLE', 'DIAMOND']

    this.rest = dis * (this.sizeFood - 1)
    this.size = (w - 40 - this.disWall * 2 - this.rest) / this.sizeFood

    this.distance = this.size

    this.typeEven = this.type
    this.typeOdd = this.type

    this.isUpEven = Math.floor(Math.random() * 5)

    let indexColor = Math.floor(Math.random() * this.sizeFood)
    for (let i = 0; i < this.sizeFood; i++) {
      let food
      let randomColor =
        indexColor === i
          ? snake.color
          : colors[Math.floor(Math.random() * colors.length)]

      let x =
        20 +
        this.disWall +
        this.size / 2 +
        i * (this.size + this.rest / (this.sizeFood - 1))

      let _y = this.y

      switch (type) {
        case 'RECT':
          if (this.isUpEven === 1) {
            _y = i % 2 === 0 ? this.y : this.y + this.size
          }

          if (this.isUpEven === 2) {
            _y = i % 2 !== 0 ? this.y : this.y + this.size
          }

          food = this.genShapeRand(
            world,
            type,
            x,
            _y,
            this.size,
            randomColor,
            this.angle,
            0,
          )
          break
        case 'DIAMOND':
          if (this.isUpEven === 1) {
            _y = i % 2 === 0 ? this.y : this.y + this.size
          }

          if (this.isUpEven === 2) {
            _y = i % 2 !== 0 ? this.y : this.y + this.size
          }

          food = this.genShapeRand(
            world,
            type,
            x,
            _y,
            this.size,
            randomColor,
            this.angle,
            0,
          )
          break
        case 'CIRCLE':
          if (this.isUpEven === 1) {
            _y = i % 2 === 0 ? this.y : this.y + this.size
          }

          if (this.isUpEven === 2) {
            _y = i % 2 !== 0 ? this.y : this.y + this.size
          }

          food = this.genShapeRand(
            world,
            type,
            x,
            _y,
            this.size,
            randomColor,
            this.angle,
            0,
          )
          break
        case 'TRIANGLE':
          if (this.isUpEven === 1) {
            _y = i % 2 === 0 ? this.y : this.y + this.size
          }

          if (this.isUpEven === 2) {
            _y = i % 2 !== 0 ? this.y : this.y + this.size
          }

          food = this.genShapeRand(
            world,
            type,
            x,
            _y,
            this.size,
            randomColor,
            this.angle,
            0,
          )
          break
        default:
          if (i === 0) {
            this.typeEven = this.shapes[Math.floor(Math.random() * 4)]
            this.typeOdd = this.shapes[Math.floor(Math.random() * 4)]
          }

          let _angle = this.isUpEven === 0 && i % 2 === 0 ? this.angle : 0
          if (this.isUpEven !== 0) {
            _angle = this.isUpEven === 4 && i % 2 !== 0 ? this.angle : 0
          }

          if (this.isUpEven === 1) {
            _y = i % 2 === 0 ? this.y : this.y + this.size
            _angle = i % 2 === 0 ? this.angle : 0
          }

          if (this.isUpEven === 2) {
            _y = i % 2 !== 0 ? this.y : this.y + this.size
            _angle = i % 2 !== 0 ? this.angle : 0
          }

          food = this.genShapeRand(
            world,
            i % 2 === 0 ? this.typeEven : this.typeOdd,
            x,
            _y,
            this.size,
            randomColor,
            _angle,
            0,
          )
          break
      }

      this.foods.push(food)
    }
    this.body = this.isUpEven === 2 ? this.foods[1].body : this.foods[0].body
  }

  genShapeRand(world, type, x, y, size, color, angle, amplitude) {
    switch (type) {
      case 'RECT':
        return new Rect(
          world,
          x,
          y,
          size,
          size,
          color,
          angle === 1 ? 0.5 : angle,
          amplitude,
          0,
        )
      case 'DIAMOND':
        return new Rect(
          world,
          x,
          y,
          size / Math.sqrt(2),
          size / Math.sqrt(2),
          color,
          angle === 1 ? 0.5 : angle,
          amplitude,
          PI / 4,
        )
      case 'CIRCLE':
        return new Circle(world, x, y, size, color, angle, amplitude)
      case 'TRIANGLE':
        return new Triangle(
          world,
          x,
          y + 0.17 * size,
          size,
          3,
          color,
          angle,
          amplitude,
        )
      default:
        break
    }
  }

  /**
   * Method
   */
  update() {
    for (let i = 0; i < this.foods.length; i++) {
      this.foods[i].update()
    }
    this.body = this.isUpEven === 2 ? this.foods[1].body : this.foods[0].body
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
    this.body = this.foods[0]
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
    const shape = this.isUpEven === 2 ? this.foods[1] : this.foods[0]
    if (shape && shape.body.position.y >= h + this.distance / 2) {
      this.destroy()
      return true
    }
    return false
  }
}
