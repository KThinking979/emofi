export class Snake {
  constructor(world, x, y, color, face) {
    this.r = 7;
    this.color = color;
    this.dx = 0;
    this.points = [];
    this.isDie = false;

    this.face = face;
    this.sizeEmoji = this.r * 1.5;
    this.emoji = face.includes('S')
      ? createImg(`images/snakes/${face}.png`)
      : createImg(`images/anys/${face}.png`);
    this.emoji.size(this.sizeEmoji * 2, this.sizeEmoji * 2);
    if (this.face.includes('S64') || this.face.includes('S65')) {
      this.emoji.size(this.sizeEmoji * 2.6, this.sizeEmoji * 2.6);
    }
    this.setColorSnake(this.face);

    for (let i = 12; i >= 0; i--) {
      const len = new Len(world, x, y + i * this.r, this.r, color);
      this.points.push(len);
    }

    const len = new Len(world, x, y, this.r, color);
    this.points.push(len);

    this.dotOne = new Len(world, x, y + 14 * this.r + 4, this.r, color);
    this.dotTwo = new Len(world, x, y + 15 * this.r + 12, this.r / 2, color);

    /**
     * Skill 1
     */
    const faceSkill1 = this.getRandomArbitrary(1, 7);
    this.skill1 = createImg(`images/skills/B${faceSkill1}.png`);
    this.skill1.size(this.sizeEmoji * 1.5, this.sizeEmoji * 1.5);
    this.skill1.style('z-index', '999');
    this.skill1.position(-100, -100);

    /**
     * Skill 2
     */
    this.skill2 = [];

    this.bodySkill2A = Matter.Bodies.circle(-x, -y, this.sizeEmoji);
    this.bodySkill2A.label = 'DIE';
    this.bodySkill2A.isSensor = true;

    this.bodySkill2B = Matter.Bodies.circle(-x, -y, this.sizeEmoji);
    this.bodySkill2B.label = 'DIE';
    this.bodySkill2B.isSensor = true;

    this.bodySkill2C = Matter.Bodies.circle(-x, -y, this.sizeEmoji);
    this.bodySkill2C.label = 'DIE';
    this.bodySkill2C.isSensor = true;

    this.bodySkill2D = Matter.Bodies.circle(-x, -y, this.sizeEmoji);
    this.bodySkill2D.label = 'DIE';
    this.bodySkill2D.isSensor = true;

    for (let i = 0; i < 4; i++) {
      let skill = this.face.includes('S')
        ? createImg(`images/snakes/${this.face}.png`)
        : createImg(`images/anys/${this.face}.png`);

      skill.size(this.sizeEmoji * 2, this.sizeEmoji * 2);
      skill.style('z-index', '999');
      this.skill2.push(skill);
    }
    this.skill2[0].position(-100, -100);
    this.skill2[1].position(-100, -100);
    this.skill2[2].position(-100, -100);
    this.skill2[3].position(-100, -100);

    /**
     * Skill 3
     */
    this.skill3 = [];

    this.body = Matter.Bodies.circle(x, y, this.sizeEmoji);
    this.body.render.fillStyle = color;
    this.body.label = 'SNAKE';
    this.body.isSensor = true;

    Matter.World.add(world, this.body);

    Matter.World.add(world, this.bodySkill2A);
    Matter.World.add(world, this.bodySkill2B);
    Matter.World.add(world, this.bodySkill2C);
    Matter.World.add(world, this.bodySkill2D);

    Matter.Events.on(engine, 'collisionStart', event => {
      event.pairs.forEach(pair => {
        if (pair.bodyA === this.body || pair.bodyB === this.body) {
          const bodyCollide =
            pair.bodyA === this.body ? pair.bodyB : pair.bodyA;
          const color = bodyCollide.render.fillStyle;

          switch (bodyCollide.label) {
            case 'GATE':
              // runSkill_2 = false
              // this.destroySkill2()

              if (statusSound !== STATUS.MUTE) {
                // window.ReactNativeWebView.postMessage('Gate')
              }

              if (this.color !== color) {
                this.color = color;
                this.setColorSnake(this.face);
              }
              break;
            case 'COIN':
              // if (statusSound !== STATUS.MUTE) {
              //   window.ReactNativeWebView.postMessage('CoinSound')
              // }
              // window.ReactNativeWebView.postMessage('Coin')
              // numberCoin++
              break;
            default:
              break;
          }

          if (bodyCollide.label.includes('FOOD')) {
            if (color !== this.color) {
              if (runSkill_1) {
                this.skill1.position(-100, -100);
                // runSkill_1 = false
                return;
              }

              if (statusSound !== STATUS.MUTE) {
                // window.ReactNativeWebView.postMessage('Die')
              }

              /**
               * Clean image
               */
              this.emoji.position(-100, -100);
              this.skill1.position(-100, -100);

              this.skill2[0].position(-100, -100);
              this.skill2[1].position(-100, -100);
              this.skill2[2].position(-100, -100);
              this.skill2[3].position(-100, -100);

              isRun = false;
              this.isDie = true;

              if (scores > bestGoal) {
                bestGoal = scores;
              }

              // window.ReactNativeWebView.postMessage(
              //   `${JSON.stringify({ die: scores })}`,
              // )
            } else {
              // if (statusSound !== STATUS.MUTE) {
              //   // window.ReactNativeWebView.postMessage('Food')
              // }
              // scores++
            }
          }
        }
      });
    });
  }

  /**
   * Method
   */
  setDx() {
    this.dx = mouseX - this.body.position.x;
  }

  updatePosition() {
    const y = this.body.position.y;
    let x = this.body.position.x;
    let newDx = mouseX - x - this.dx;

    if (this.body.position.x + newDx <= this.sizeEmoji + 20) {
      newDx = this.sizeEmoji + 20 - this.body.position.x;
    } else if (this.body.position.x + newDx >= w - this.sizeEmoji - 20) {
      newDx = w - this.sizeEmoji - 20 - this.body.position.x;
    }

    Matter.Body.setPosition(this.body, { x: this.body.position.x + newDx, y });

    /**
     * Skill 2
     */
    if (runSkill_2) {
      Matter.Body.setPosition(this.bodySkill2A, {
        x: this.bodySkill2A.position.x + newDx,
        y: this.bodySkill2A.position.y,
      });

      Matter.Body.setPosition(this.bodySkill2B, {
        x: this.bodySkill2B.position.x + newDx,
        y: this.bodySkill2B.position.y,
      });

      Matter.Body.setPosition(this.bodySkill2C, {
        x: this.bodySkill2C.position.x + newDx,
        y: this.bodySkill2C.position.y,
      });

      Matter.Body.setPosition(this.bodySkill2D, {
        x: this.bodySkill2D.position.x + newDx,
        y: this.bodySkill2D.position.y,
      });
    }
  }

  update() {
    if (!this.isDie) {
      !this.dotOne.destroy && this.dotOne.update();
      !this.dotTwo.destroy && this.dotTwo.update();

      /**
       * Update
       */
      for (let i = 0; i < this.points.length; i++) {
        this.points[i].update();
        if (this.points[i].destroy) {
          this.points.splice(i, 1);
        }
      }

      if (this.body.position.y >= parseInt(h / 2) + 20) {
        const len = new Len(
          engine.world,
          this.body.position.x,
          this.body.position.y - this.r,
          this.r,
          this.color,
        );

        this.points.push(len);
        Matter.Body.setVelocity(this.body, { x: 0, y: -2 });

        /**
         * Skill 2
         */

        if (runSkill_2) {
          Matter.Body.setPosition(this.bodySkill2A, {
            x: this.bodySkill2A.position.x,
            y: this.bodySkill2A.position.y - 2,
          });

          Matter.Body.setPosition(this.bodySkill2B, {
            x: this.bodySkill2B.position.x,
            y: this.bodySkill2B.position.y - 2,
          });

          Matter.Body.setPosition(this.bodySkill2C, {
            x: this.bodySkill2C.position.x,
            y: this.bodySkill2C.position.y - 2,
          });

          Matter.Body.setPosition(this.bodySkill2D, {
            x: this.bodySkill2D.position.x,
            y: this.bodySkill2D.position.y - 2,
          });
        }
      } else {
        Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
        this.points.splice(this.points.length - 1, 1);
        const point = this.points[this.points.length - 1];

        if (abs(this.body.position.y - point.body.position.y) >= this.r) {
          const len = new Len(
            engine.world,
            this.body.position.x,
            this.body.position.y,
            this.r,
            this.color,
          );
          this.points.push(len);
        }

        const len = new Len(
          engine.world,
          this.body.position.x,
          this.body.position.y,
          this.r,
          this.color,
        );
        this.points.push(len);

        /**
         * Skill 2
         */
        if (runSkill_2) {
          Matter.Body.rotate(this.bodySkill2A, 0.08, {
            x: this.body.position.x,
            y: this.body.position.y,
          });

          Matter.Body.rotate(this.bodySkill2B, 0.08, {
            x: this.body.position.x,
            y: this.body.position.y,
          });

          Matter.Body.rotate(this.bodySkill2C, 0.08, {
            x: this.body.position.x,
            y: this.body.position.y,
          });

          Matter.Body.rotate(this.bodySkill2D, 0.08, {
            x: this.body.position.x,
            y: this.body.position.y,
          });
        }
      }

      /**
       * Skill 3
       */
      for (let i = 0; i < this.skill3.length; i++) {
        this.skill3[i].update();
      }
    }
  }

  stop() {
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 });

    /**
     * Skill 3
     */
    for (let i = 0; i < this.skill3.length; i++) {
      this.skill3[i].stop();
    }
  }

  show() {
    if (!this.isDie) {
      let isEmoji = this.face.includes('S') ? true : false;
      !this.dotOne.destroy && this.dotOne.show();
      !this.dotTwo.destroy && this.dotTwo.show();

      /**
       * Display
       */
      let colorLen = this.points[0].color;
      let index = 0;
      let isDrawDone = false;

      noFill();
      while (!isDrawDone) {
        let isBreak = false;
        strokeWeight(this.r * 2);
        stroke(colorLen);
        strokeJoin(ROUND);
        // curveTightness(0.5)
        beginShape();
        for (let i = index; i < this.points.length; i++) {
          if (this.points[i].color !== colorLen) {
            colorLen = this.points[i].color;
            index = i;
            isBreak = true;
            // break;
          }
          curveVertex(
            this.points[i].body.position.x,
            this.points[i].body.position.y,
          );

          if (i === this.points.length - 1) {
            isDrawDone = true;
          }
          if (isBreak && i === index + 2) {
            break;
          }
        }
        endShape();
      }

      noStroke();
      const position = this.body.position;
      const angle = this.body.angle;

      push();
      translate(position.x, position.y);
      rectMode(CENTER);
      fill(this.color);

      if (
        !isEmoji ||
        (isEmoji && !this.face.includes('S4') && !this.face.includes('S6'))
      ) {
        fill('black');
        // fill('white');
        circle(0, 0, this.sizeEmoji * 2);
      }

      if (!isEmoji) {
        noFill();
        stroke(this.color);
        strokeWeight(1);
        circle(0, 0, this.sizeEmoji * 2 + 1);
      }

      isEmoji
        ? rotate(angle)
        : this.emoji.style('transform', `rotate(${frameCount / 12}rad)`);

      this.emoji.position(
        this.body.position.x - this.sizeEmoji,
        this.body.position.y - this.sizeEmoji + 64,
      );
      if (this.face.includes('S64') || this.face.includes('S65')) {
        this.emoji.position(
          this.body.position.x - this.sizeEmoji * 1.3,
          this.body.position.y - this.sizeEmoji * 1.3,
        );
      }

      /**
       * Skill 1
       */
      if (runSkill_1) {
        isEmoji
          ? this.skill1.position(
              this.body.position.x - (this.sizeEmoji * 1.5) / 2,
              this.body.position.y - ((this.sizeEmoji * 1.5) / 2) * 3.5,
            )
          : this.skill1.position(
              this.body.position.x - (this.sizeEmoji * 1.5) / 2,
              this.body.position.y - ((this.sizeEmoji * 1.5) / 2) * 3.5,
            );
      }

      /**
       * Skill 2
       */
      if (runSkill_2) {
        this.skill2[0].position(
          this.bodySkill2A.position.x - this.sizeEmoji,
          this.bodySkill2A.position.y - this.sizeEmoji,
        );
        // this.skill2[0].style('transform', `rotate(${frameCount / 10}rad)`)

        this.skill2[1].position(
          this.bodySkill2B.position.x - this.sizeEmoji,
          this.bodySkill2B.position.y - this.sizeEmoji,
        );
        // this.skill2[1].style('transform', `rotate(${frameCount / 10}rad)`)

        this.skill2[2].position(
          this.bodySkill2C.position.x - this.sizeEmoji,
          this.bodySkill2C.position.y - this.sizeEmoji,
        );
        // this.skill2[2].style('transform', `rotate(${frameCount / 10}rad)`)

        this.skill2[3].position(
          this.bodySkill2D.position.x - this.sizeEmoji,
          this.bodySkill2D.position.y - this.sizeEmoji,
        );
        // this.skill2[3].style('transform', `rotate(${frameCount / 10}rad)`)
      }
      pop();

      /**
       * Skill 3
       */
      push();
      for (let i = 0; i < this.skill3.length; i++) {
        this.skill3[i].show();
      }
      pop();
    }
  }

  dieStatus() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].dieStatus();
    }
  }

  destroy() {
    this.emoji.remove();
    this.skill1.remove();

    this.skill2[0].remove();
    this.skill2[1].remove();
    this.skill2[2].remove();
    this.skill2[3].remove();

    this.destroySkill3();
  }

  star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  setColorSnake(face) {
    if (face !== this.face) {
      this.face = face;
      /**
       * Skill
       */
      this.skill2[0].remove();
      this.skill2[1].remove();
      this.skill2[2].remove();
      this.skill2[3].remove();

      let _skill2 = [];
      for (let i = 0; i < 4; i++) {
        let skill = face.includes('S')
          ? createImg(`images/snakes/${face}.png`)
          : createImg(`images/anys/${face}.png`);

        skill.size(this.sizeEmoji * 2, this.sizeEmoji * 2);
        skill.style('z-index', '999');
        skill.position(-100, -100);

        _skill2.push(skill);
      }

      this.skill2 = _skill2;
    }
    let id = face;
    switch (this.color) {
      case COLORS.RED:
        id = `${id}R`;
        break;
      case COLORS.GREEN:
        id = `${id}G`;
        break;
      case COLORS.BLUE:
        id = `${id}B`;
        break;
      case COLORS.VIOLET:
        id = `${id}V`;
        break;
      default:
        break;
    }

    // TODO Remove && create
    this.emoji.remove();
    this.emoji = face.includes('S')
      ? createImg(`images/snakes/${id}.png`)
      : createImg(`images/anys/${id}.png`);
    this.emoji.size(this.sizeEmoji * 2, this.sizeEmoji * 2);
    this.emoji.style('z-index', '999');

    if (this.face.includes('S64') || this.face.includes('S65')) {
      this.emoji.size(this.sizeEmoji * 2.6, this.sizeEmoji * 2.6);
    }

    this.emoji.position(-100, -100);
  }

  /**
   * Skill
   */

  genSkill1() {
    this.skill1.remove();
    const faceSkill1 = this.getRandomArbitrary(1, 7);
    this.skill1 = createImg(`images/skills/B${faceSkill1}.png`);
    this.skill1.size(this.sizeEmoji * 1.5, this.sizeEmoji * 1.5);
    this.skill1.style('z-index', '999');
  }

  destroySkill1() {
    this.skill1.position(-100, -100);
  }

  genSkill2() {
    this.bodySkill2A.label = 'SKILL2';
    Matter.Body.setVelocity(this.bodySkill2A, { x: 0, y: 0 });
    Matter.Body.rotate(this.bodySkill2A, 0);
    Matter.Body.setPosition(this.bodySkill2A, {
      x: this.body.position.x + 40,
      y: this.body.position.y,
    });

    this.bodySkill2B.label = 'SKILL2';
    Matter.Body.setVelocity(this.bodySkill2B, { x: 0, y: 0 });
    Matter.Body.rotate(this.bodySkill2B, 0);
    Matter.Body.setPosition(this.bodySkill2B, {
      x: this.body.position.x - 40,
      y: this.body.position.y,
    });

    this.bodySkill2C.label = 'SKILL2';
    Matter.Body.setVelocity(this.bodySkill2C, { x: 0, y: 0 });
    Matter.Body.rotate(this.bodySkill2C, 0);
    Matter.Body.setPosition(this.bodySkill2C, {
      x: this.body.position.x,
      y: this.body.position.y + 40,
    });

    this.bodySkill2D.label = 'SKILL2';
    Matter.Body.setVelocity(this.bodySkill2D, { x: 0, y: 0 });
    Matter.Body.rotate(this.bodySkill2D, 0);
    Matter.Body.setPosition(this.bodySkill2D, {
      x: this.body.position.x,
      y: this.body.position.y - 40,
    });
  }

  destroySkill2() {
    this.skill2[0].position(-100, -100);
    this.skill2[1].position(-100, -100);
    this.skill2[2].position(-100, -100);
    this.skill2[3].position(-100, -100);

    this.bodySkill2A.label = 'DIE';
    this.bodySkill2B.label = 'DIE';
    this.bodySkill2C.label = 'DIE';
    this.bodySkill2D.label = 'DIE';
  }

  genSkill3() {
    this.bodySkill2A.label = 'SKILL3';
    for (let i = 0; i < 1; i++) {
      const bullet = new Bullet(
        engine.world,
        this.body.position.x,
        this.body.position.y,
        this.sizeEmoji,
        this.color,
        0,
        0,
        this.face,
      );
      this.skill3.push(bullet);
    }
  }

  destroySkill3() {
    for (let i = 0; i < this.skill3.length; i++) {
      this.skill3[i].destroy();
    }
  }

  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
