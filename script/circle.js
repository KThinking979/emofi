class Circle {
  constructor(world, x, y, r, color, angle, amplitude) {
    this.r = r;
    this.color = color ? color : 255;
    this.particles;
    this.isDie = false;

    this.body = Matter.Bodies.circle(x, y, this.r / 2);
    this.body.render.fillStyle = color;
    this.body.label = 'FOOD_CIRCLE';
    this.body.isSensor = true;

    this.angle = angle;
    this.amplitude = amplitude;

    this.coins;

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

            /**
             * Coins
             */
            // if (scores % 100 === 0) {
            //   coinReward = new Coins(
            //     engine.world,
            //     this.body.position.x,
            //     this.body.position.y,
            //     scores * 0.1,
            //   )
            // }
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

            /**
             * Coins
             */
            // if (scores % 5 === 0) {
            // if (scores % 100 === 0) {
            //   coinReward = new Coins(
            //     engine.world,
            //     this.body.position.x,
            //     this.body.position.y,
            //     scores * 0.1,
            //   )
            // }
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

            /**
             * Coins
             */
            // if (scores % 5 === 0) {
            // if (scores % 100 === 0) {
            //   coinReward = new Coins(
            //     engine.world,
            //     this.body.position.x,
            //     this.body.position.y,
            //     scores * 0.1,
            //   )
            // }
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

            /**
             * Coins
             */
            // if (scores % 5 === 0) {
            // if (scores % 100 === 0) {
            //   coinReward = new Coins(
            //     engine.world,
            //     this.body.position.x,
            //     this.body.position.y,
            //     scores * 0.1,
            //   )
            // }
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
    this.isDie = false;
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
      circle(0, 0, this.r);
      pop();
    }
  }

  dieStatus() {
    this.particles && this.particles.update();
    this.particles && this.particles.show();
  }
}
