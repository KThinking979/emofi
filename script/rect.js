class Rect {
  constructor(world, x, y, w, h, color, angle, amplitude, rotate) {
    this.w = w;
    this.h = h;
    this.color = color ? color : 255;
    this.particles;
    this.isDie = false;

    this.rotate = rotate;
    this.angle = angle;
    this.amplitude = amplitude;

    this.body = Matter.Bodies.rectangle(x, y, this.w, this.h);
    this.body.render.fillStyle = color;
    this.body.label = 'FOOD_RECT';
    this.body.isSensor = true;

    Matter.Body.rotate(this.body, this.rotate);
    Matter.World.add(world, this.body);

    Matter.Events.on(engine, 'collisionStart', event => {
      event.pairs.forEach(pair => {
        if (pair.bodyA === this.body && !this.isDie) {
          if (
            pair.bodyB.label === 'SKILL2' ||
            pair.bodyB.label === 'BULLET' ||
            (pair.bodyB.label === 'SNAKE' &&
              pair.bodyA.render.fillStyle === snake.color)
          ) {
            this.body.label = 'DIE';
            this.particles = new Particles(
              this.body.position.x,
              this.body.position.y,
              this.color,
              8,
            );

            this.isDie = true;
            if (statusSound !== STATUS.MUTE) {
              // // window.ReactNativeWebView.postMessage('Food')
            }
            scores++;
          }

          /**
           * Skill 1
           */
          if (
            pair.bodyB.label === 'SNAKE' &&
            pair.bodyA.render.fillStyle !== snake.color &&
            runSkill_1
          ) {
            this.body.label = 'DIE';
            snake.destroySkill1();

            this.particles = new Particles(
              this.body.position.x,
              this.body.position.y,
              this.color,
              8,
            );

            this.isDie = true;
            if (statusSound !== STATUS.MUTE) {
              // // window.ReactNativeWebView.postMessage('Food')
            }
            scores++;
            runSkill_1 = false;
          }
        }

        if (pair.bodyB === this.body && !this.isDie) {
          if (
            pair.bodyA.label === 'SKILL2' ||
            pair.bodyA.label === 'BULLET' ||
            (pair.bodyA.label === 'SNAKE' &&
              pair.bodyB.render.fillStyle === snake.color)
          ) {
            this.body.label = 'DIE';
            this.particles = new Particles(
              this.body.position.x,
              this.body.position.y,
              this.color,
              8,
            );
            this.isDie = true;
            if (statusSound !== STATUS.MUTE) {
              // // window.ReactNativeWebView.postMessage('Food')
            }
            scores++;
          }

          /**
           * Skill 1
           */
          if (
            pair.bodyA.label === 'SNAKE' &&
            pair.bodyB.render.fillStyle !== snake.color &&
            runSkill_1
          ) {
            this.body.label = 'DIE';
            snake.destroySkill1();

            this.particles = new Particles(
              this.body.position.x,
              this.body.position.y,
              this.color,
              8,
            );

            this.isDie = true;
            if (statusSound !== STATUS.MUTE) {
              // // window.ReactNativeWebView.postMessage('Food')
            }
            scores++;
            runSkill_1 = false;
          }
        }
      });
    });
  }

  /**
   * Method
   */
  update() {
    Matter.Body.rotate(this.body, this.angle);

    // var px = w / 2 + this.amplitude * Math.sin(frameCount / 50.0);
    // Matter.Body.setVelocity(this.body, { x: px - this.body.position.x, y: speed });
    Matter.Body.setVelocity(this.body, { x: 0, y: speed });
  }

  stop() {
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
  }

  destroy() {
    Matter.World.remove(engine.world, this.body);
  }

  show() {
    if (!this.isDie) {
      const position = this.body.position;
      const angle = this.body.angle;

      push();
      translate(position.x, position.y);
      rotate(angle);
      fill(this.color);
      rectMode(CENTER);
      rect(0, 0, this.w, this.h);
      pop();
    }
  }

  dieStatus() {
    this.particles && this.particles.update();
    this.particles && this.particles.show();
  }
}
