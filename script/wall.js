class Wall {
  constructor(world, x, y, w, h) {
    this.w = w;
    this.h = h;
    this.color = 'gray';

    this.body = Matter.Bodies.rectangle(x, y, w, h)
    this.body.isStatic = true;
    this.body.label = 'WALL'
    Matter.World.add(world, this.body)
  }

  show() {
    const position = this.body.position;
    const angle = this.body.angle;

    push()
    translate(position.x, position.y);
    rotate(angle);
    fill(this.color);
    rectMode(CENTER)
    rect(0, 0, this.w, this.h)
    pop()
  }
}