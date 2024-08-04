class Coin {
  constructor(world, x, y, isReward) {
    this.r = 10;
    this.x = x;
    this.y = y;
    this.isDie = false;
    this.isReward = isReward ? isReward : false;
    this.positionReward = { x, y };

    this.theta = PI / 2;
    this.easing = 0.05;
    this.positionDie = null;

    this.color = '#fde047';
    this.particles;

    this.coin = createImg('images/coin.png');
    this.coin.size(20, 20);
    this.coin.position(this.x, this.y);
    if (isReward) {
      this.coin.remove();
    }

    this.coinDie = createImg('images/coin.png');
    this.coinDie.size(20, 20);
    this.coinDie.position(-w, -h);

    this.body = Matter.Bodies.circle(this.x, this.y, this.r);
    this.body.render.fillStyle = this.color;
    this.body.isSensor = true;
    this.body.isStatic = true;
    this.body.label = 'COIN';

    Matter.World.add(world, this.body);

    Matter.Events.on(engine, 'collisionStart', event => {
      event.pairs.forEach(pair => {
        if (!this.isReward && isRun) {
          if (
            (pair.bodyA === this.body &&
              (pair.bodyB.label === 'SNAKE' ||
                pair.bodyB.label === 'SWITCH' ||
                pair.bodyB.label === 'SKILL2' ||
                pair.bodyB.label === 'BULLET')) ||
            (pair.bodyB === this.body &&
              (pair.bodyA.label === 'SNAKE' ||
                pair.bodyA.label === 'SWITCH' ||
                pair.bodyA.label === 'SKILL2' ||
                pair.bodyA.label === 'BULLET'))
          ) {
            if (statusSound !== STATUS.MUTE) {
              // window.ReactNativeWebView.postMessage('CoinSound')
            }
            // window.ReactNativeWebView.postMessage('Coin')
            numberCoin++;

            this.particles = new Particles(
              this.body.position.x,
              this.body.position.y,
              this.color,
              4,
            );

            this.positionDie = {
              x: this.body.position.x,
              y: this.body.position.y,
            };

            this.isDie = true;
            this.coin.position(-w, -h);
            Matter.Body.setPosition(this.body, { x: -w, y: -h });
          }
        }
      });
    });
  }

  /**
   * Method
   */
  update() {
    if (this.body.position.y >= h + 40) {
      this.isDie = true;
    }

    if (!this.isDie) {
      Matter.Body.setPosition(this.body, {
        x: this.body.position.x,
        y: this.body.position.y + speed,
      });
    }
  }

  updateSwitch() {
    if (this.body.position.y >= h + 40) {
      this.isDie = true;
    }

    if (!this.isDie) {
      Matter.Body.setPosition(this.body, {
        x: this.body.position.x,
        y: this.body.position.y + speedSwitch,
      });
    }
  }

  updatePosition() {
    if (!this.isDie) {
      this.theta += 0.015;
      let px = (w / 2 - this.r * 2) * Math.sin(this.theta);

      Matter.Body.setPosition(this.body, {
        x: this.body.position.x + w / 2 - px - this.body.position.x,
        y: this.body.position.y,
      });
    }
  }

  stop() {
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
  }

  destroy() {
    this.isDie = true;
    this.coin.remove();
    this.coinDie.remove();
    Matter.World.remove(engine.world, this.body);
  }

  show() {
    const position = this.body.position;
    const angle = this.body.angle;

    push();
    translate(position.x, position.y);
    rotate(angle);
    fill(this.color);
    rectMode(CENTER);
    circle(0, 0, this.r * 2);
    this.coin.position(position.x - this.r, position.y - this.r);
    this.coinDie.position(position.x - this.r, position.y - this.r);
    pop();
  }

  dieStatus() {
    this.particles && this.particles.update();
    this.particles && this.particles.show();

    if (this.positionDie !== null) {
      let targetX = w - 45 + 10;
      let dx = targetX - this.positionDie.x;
      this.positionDie.x += dx * this.easing;

      let targetY = 19 + 10;
      let dy = targetY - this.positionDie.y;
      this.positionDie.y += dy * this.easing;
      push();
      translate(this.positionDie.x, this.positionDie.y);
      this.coinDie.position(
        this.positionDie.x - this.r,
        this.positionDie.y - this.r,
      );
      pop();

      if (dx === 0 && dy === 0) {
        this.positionDie = null;
        this.destroy();
      }
    }
  }

  rewardCoin() {
    let targetX = w - 45 + 10;
    let dx = targetX - this.positionReward.x;
    this.positionReward.x += dx * this.easing;

    let targetY = 19 + 10;
    let dy = targetY - this.positionReward.y;
    this.positionReward.y += dy * this.easing;
    push();
    translate(this.positionReward.x, this.positionReward.y);
    this.coinDie.position(
      this.positionReward.x - this.r,
      this.positionReward.y - this.r,
    );
    pop();

    if (dx === 0 && dy === 0) {
      this.positionReward = null;
      this.destroy();
    }
  }
}
