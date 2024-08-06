/* eslint-disable no-undef */
let w = window.innerWidth;
let h = window.innerHeight;

const STATUS = {
  SOUNDTRACK: 'SOUNDTRACK',
  SOUNDBEAT: 'SOUNDBEAT',
  MUTE: 'MUTE',
};

const COLORS = {
  RED: '#f43f5e',
  GREEN: '#22c55e',
  BLUE: '#0ea5e9',
  VIOLET: '#a855f7',
  YELLOW: '#fde047',
};

const EMOJI_TYPE = {
  AWAIT: 'AWAIT',
  SNAKE: 'SNAKE',
  SWITCH: 'SWITCH',
};

const { Engine, Common } = Matter;
let engine;

let isLoad = false;
let isRun = false;
let isReset = true;
let isPause = false;
let isNext = false;
let emojiType = EMOJI_TYPE.SNAKE;

let speed = 3.5;
let speedSwitch = 3;
let gSwitch = 1.5;
let scores = 0;
let volume;
let touch;
let bestGoal = 0;
let bestGoalSwitch = 0;
var statusSound = STATUS.SOUNDBEAT;
let isMute = false;

let sizeSetting = 40;
let home;
let emojiSnake;
let emojiSwitch;
let mute;
let emoji;
let coin;

let skill_1;
let skill_2;
let skill_3;

let runSkill_1 = false;
let runSkill_2 = false;
let runSkill_3 = false;

let frameSkill1 = 0;
let frameSkill2 = 0;
let frameSkill3 = 0;

let coin_1;
let coin_2;
let coin_3;

let lock_1;
let lock_2;
let lock_3;

let isLockCard3 = true;

let isLock_1 = true;
let isLock_2 = true;
let isLock_3 = true;

let face = 'S0';
var numberCoin = 0;

let colors = [COLORS.GREEN, COLORS.RED, COLORS.BLUE, COLORS.VIOLET];
let snake;
let _switch;
let snakeHome;
// TODO Switch
let _switchHome;
let wallLeft;
let wallRight;
let gate;
// let dot;

let sizeFood = 0;
let foods = [];

let coinRand;
// let coinReward

let rest = 150;
let size = (w - 40 - rest) / sizeFood;

let a = 0.0;
let rate = 8;

/**
 * Test
 */
let price1 = 15;
let price2 = 20;
let price3 = 25;

// let price1 = 0
// let price2 = 0
// let price3 = 0

let canvasDiv = document.getElementById('myCanvasContainer');
function setup() {
  // frameRate(120)
  w = window.innerWidth;
  h = window.innerHeight;
  size = (w - 40 - rest) / sizeFood;

  colorMode(HSB);
  // createCanvas(w, h);
  let sketchCanvas = createCanvas(w, h);

  sketchCanvas.parent('myCanvasContainer');
  sketchCanvas.id('myCanvas');

  engine = Engine.create();
  engine.world.gravity.x = 0;
  engine.world.gravity.y = 0;

  /**
   * Basic
   */
  touch = createImg('images/touch.png');
  touch.parent('myCanvasContainer');
  touch.size(32, 32);

  // home = createImg('images/home.png');
  // home.size(sizeSetting, sizeSetting);
  // home.style('z-index', '999');
  // home.touchStarted(onPressHome);
  // home.touchEnded(onPressHomeEnded);

  // volume = createImg('images/volume.png');
  // volume.size(sizeSetting, sizeSetting);
  // volume.style('z-index', '999');
  // volume.touchStarted(onPressVolume);

  // beat = createImg('images/beat.png');
  // beat.size(sizeSetting, sizeSetting);
  // beat.style('z-index', '999');
  // beat.touchStarted(onPressVolume);

  // mute = createImg('images/mute.png');
  // mute.size(sizeSetting, sizeSetting);
  // mute.style('z-index', '999');
  // mute.touchStarted(onPressVolume);

  // emoji = createImg('images/smiley.png');
  // emoji.size(sizeSetting, sizeSetting);
  // emoji.style('z-index', '999');
  // emoji.touchStarted(onPressEmoji);
  // emoji.touchEnded(onPressEmojiEnded);

  // coin = createImg('images/coin.png');
  // coin.style('z-index', '999');
  // coin.size(20, 20);

  emojiSnake = createImg('images/snake.png');
  emojiSnake.parent('myCanvasContainer');
  emojiSnake.size(150, 150);
  emojiSnake.style('z-index', '999');
  emojiSnake.touchStarted(onPressEmojiSnake);

  emojiSwitch = createImg('images/switch.png');
  emojiSwitch.parent('myCanvasContainer');
  emojiSwitch.size(150, 150);
  emojiSwitch.style('z-index', '999');
  emojiSwitch.touchStarted(onPressEmojiSwitch);

  skill_1 = createImg('images/K1.png');
  skill_1.parent('myCanvasContainer');
  skill_1.size(28, 28);
  skill_1.style('z-index', '999');
  skill_1.touchStarted(onPressSkill_1);

  coin_1 = createImg('images/coin.png');
  coin_1.parent('myCanvasContainer');
  coin_1.style('z-index', '999');
  coin_1.size(10, 10);

  lock_1 = createImg('images/lock.png');
  lock_1.parent('myCanvasContainer');
  lock_1.style('z-index', '999');
  lock_1.size(12, 12);

  skill_2 = createImg('images/K2.png');
  skill_2.parent('myCanvasContainer');
  skill_2.size(28, 28);
  skill_2.style('z-index', '999');
  skill_2.touchStarted(onPressSkill_2);

  coin_2 = createImg('images/coin.png');
  coin_2.parent('myCanvasContainer');
  coin_2.style('z-index', '999');
  coin_2.size(10, 10);

  lock_2 = createImg('images/lock.png');
  lock_2.parent('myCanvasContainer');
  lock_2.style('z-index', '999');
  lock_2.size(12, 12);

  skill_3 = createImg('images/K3.png');
  skill_3.parent('myCanvasContainer');
  skill_3.size(28, 28);
  skill_3.style('z-index', '999');
  skill_3.touchStarted(onPressSkill_3);

  coin_3 = createImg('images/coin.png');
  coin_3.parent('myCanvasContainer');
  coin_3.style('z-index', '999');
  coin_3.size(12, 12);

  lock_3 = createImg('images/lock.png');
  lock_3.parent('myCanvasContainer');
  lock_3.style('z-index', '999');
  lock_3.size(12, 12);

  wallLeft = new Wall(engine.world, 10, h / 2, 20, h);
  wallRight = new Wall(engine.world, w - 10, h / 2, 20, h);

  // wallLeft = new Wall(engine.world, (w - 500) / 2, h / 2, 20, h);
  // wallRight = new Wall(engine.world, w - 10, h / 2, 20, h);

  let randomColor = colors[Math.floor(Math.random() * colors.length)];
  gate = new Gate(engine.world, (-2 * h) / 3, randomColor);

  // dot = new Dot(engine.world, 2 * h, randomColor, true);

  randomColor = colors[Math.floor(Math.random() * colors.length)];

  snake = new Snake(engine.world, -w / 2, -h / 2 + 80, randomColor, face);
  snakeHome = new SnakeHome(engine.world, w / 2, h / 2 - 15, randomColor, face);

  _switch = new Switch(engine.world, -w / 2, -h / 2 + 80, randomColor, face);
  _switchHome = new SwitchHome(
    engine.world,
    w / 2,
    h / 2 + 195,
    randomColor,
    face,
  );

  /**
   * Setup Food
   */
  foods = setUpMaps();

  /**
   * Setup Coin
   */

  coinRand = new Coin(engine.world, -w / 2, (3 * h) / 2);
}

function draw() {
  colorMode(RGB);
  background(0);
  noStroke();

  a = a + 0.04;

  /**
   * Snake
   */
  if (isReset) {
    reset();
  }

  if (emojiType === EMOJI_TYPE.SNAKE) {
    /**
     * Coin
     */
    if (coinRand.isDie) {
      coinRand.dieStatus();
    } else {
      if (isRun && !isPause) {
        coinRand.update();
      } else {
        coinRand.stop();
      }

      coinRand.show();
    }

    /**
     * Coin Reward
     */
    // coinReward && coinReward.rewardCoin()

    /**
     * Gate
     */
    if (gate.isDie) {
      gate.dieStatus();
    } else {
      if (isRun && !isPause) {
        gate.update();
      } else {
        gate.stop();
      }
      gate.show();
    }

    /**
     * Maps
     */
    let isBreak = false;
    for (let i = 0; i < foods.length; i++) {
      if (isRun && !isPause) {
        foods[i].update();
      } else {
        foods[i].stop();
      }

      foods[i].show();
      foods[i].dieStatus();

      if (foods[i].checkDestroy()) {
        isBreak = true;
      }
    }

    if (isBreak) {
      /**
       * Gate
       */
      if (gate && gate.isDie && Math.random() <= 0.4) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const prevFood = foods[foods.length - 1];
        let distance = h / 3;
        let y = prevFood.body.position.y - prevFood.distance / 2 - distance;

        gate.destroy();
        gate = new Gate(engine.world, y, randomColor);
      }

      /**
       * Coin
       */
      if (coinRand && coinRand.isDie && Math.random() <= 0.7) {
        const prevFood = foods[foods.length - 1];
        let distance = getRandomArbitrary(20, 50);
        let y =
          getRandomArbitrary(1, 4) % 2
            ? prevFood.body.position.y - prevFood.distance / 2 - distance
            : prevFood.body.position.y +
              prevFood.distance / 2 +
              distance +
              (prevFood.isUpEven === 1 || prevFood.isUpEven === 2
                ? prevFood.size
                : 0);

        const maxX = w - (20 + 10);
        const minX = 20 + 10;
        const x = getRandomArbitrary(minX, maxX);

        coinRand.destroy();
        coinRand = new Coin(engine.world, x, y);
      }

      foods.shift();
      const food = genMaps(foods[foods.length - 1]);
      foods.push(food);
    }

    // wallLeft.show();
    // wallRight.show();

    if (snake.isDie) {
      snake.dieStatus();
    } else {
      console.log('location snake Show');
      snake.show();
      if (isRun && !isPause) {
        snake.update();
      } else {
        snake.stop();
      }
    }
  }

  if (emojiType === EMOJI_TYPE.SWITCH) {
    /**
     * Coin
     */
    if (coinRand.isDie) {
      coinRand.dieStatus();
    } else {
      if (isRun && !isPause) {
        coinRand.updatePosition();
        if (isNext) {
          coinRand.updateSwitch();
        }
      } else {
        coinRand.stop();
      }

      coinRand.show();
    }

    /**
     * Dot
     */
    // if (dot.isDie) {
    //   dot.dieStatus();
    // } else {
    //   if (isRun && !isPause) {
    //     if (isNext) {
    //       dot.update();
    //     }
    //   } else {
    //     dot.stop();
    //   }
    //   dot.show();
    // }

    /**
     * Maps
     */
    let isBreak = false;
    for (let i = 0; i < foods.length; i++) {
      if (isRun && !isPause) {
        if (isNext) {
          foods[i].updatePosition();
        }

        foods[i].update();
      } else {
        foods[i].stop();
      }

      foods[i].show();
      foods[i].dieStatus();

      if (foods[i].checkDestroy()) {
        isBreak = true;
      }
    }

    if (isBreak) {
      /**
       * Dot
       */
      // if (dot && dot.isDie && Math.random() <= 0.3) {
      //   const randomColor = colors[Math.floor(Math.random() * colors.length)];
      //   const prevFood = foods[foods.length - 1];
      //   let distance = h / 5;
      //   let y = prevFood.body.position.y - prevFood.distance / 2 - distance;

      //   dot.destroy();
      //   dot = new Dot(engine.world, y, randomColor, false);
      // }

      /**
       * Coin
       */
      if (coinRand && coinRand.isDie && Math.random() <= 0.3) {
        const prevFood = foods[foods.length - 1];
        let distance = getRandomArbitrary(40, 60);
        let y =
          getRandomArbitrary(1, 4) % 2
            ? prevFood.body.position.y - prevFood.distance / 2 - distance
            : prevFood.body.position.y +
              prevFood.distance / 2 +
              distance +
              (prevFood.isUpEven === 1 || prevFood.isUpEven === 2
                ? prevFood.size
                : 0);

        const maxX = w - (20 + 10);
        const minX = 20 + 10;
        const x = getRandomArbitrary(minX, maxX);

        coinRand.destroy();
        coinRand = new Coin(engine.world, x, y);
      }

      foods.shift();
      const food = genSwitchMaps(foods[foods.length - 1]);
      foods.push(food);
    }

    if (isNext) {
      isNext = false;
    }

    if (_switch.isDie) {
      _switch.dieStatus();
    } else {
      if (isRun && !isPause) {
        _switch.update();
      } else {
        _switch.stop();
      }

      _switch.show();
    }
  }

  /**
   * Basic setting
   */
  textAlign(CENTER);
  fill(255);

  let d = 44;
  if (emojiType === EMOJI_TYPE.AWAIT) {
    push();
    fill(COLORS.YELLOW);
    translate(w / 2 - d * 2, 150);
    scale(abs(sin(a + 0.1 * 2) / rate) + 1);
    textSize(60);
    text('C', 0, 0);
    pop();

    push();
    fill(COLORS.RED);
    translate(w / 2 - d, 150);
    scale(abs(sin(a + 0.1) / rate) + 1);
    textSize(60);
    text('O', 0, 0);
    pop();

    push();
    fill(COLORS.VIOLET);
    translate(w / 2, 150);
    scale(abs(sin(a) / rate) + 1);
    textSize(60);
    text('L', 0, 0);
    pop();

    push();
    fill(COLORS.BLUE);
    translate(w / 2 + d * 1, 150);
    scale(abs(sin(a - 0.1 * 1) / rate) + 1);
    textSize(60);
    text('O', 0, 0);
    pop();

    push();
    fill(COLORS.GREEN);
    translate(w / 2 + d * 2, 150);
    scale(abs(sin(a - 0.1 * 2) / rate) + 1);
    textSize(60);
    text('R', 0, 0);
    pop();

    push();
    translate(w / 2 - d * 2, 220);
    scale(abs(sin(a - 0.1 * 2) / rate) + 1);
    textSize(60);
    text('E', 0, 0);
    pop();

    push();
    translate(w / 2 - d, 220);
    scale(abs(sin(a - 0.1) / rate) + 1);
    textSize(60);
    text('M', 0, 0);
    pop();

    push();
    translate(w / 2 + 4, 220);
    scale(abs(sin(a) / rate) + 1);
    textSize(60);
    text('O', 0, 0);
    pop();

    push();
    translate(w / 2 + d, 220);
    scale(abs(sin(a + 0.1) / rate) + 1);
    textSize(60);
    text('J', 0, 0);
    pop();

    push();
    translate(w / 2 + d * 2, 220);
    scale(abs(sin(a + 0.1 * 2) / rate) + 1);
    textSize(60);
    text('I', 0, 0);
    pop();

    emojiSnake.position(w / 2 - 150 / 2, h / 2 - 50);
    snakeHome.show();
    snakeHome.update();

    emojiSwitch.style('transform', `rotate(${-frameCount / 80}rad)`);
    emojiSwitch.position(w / 2 - 150 / 2, h / 2 + 120);
    _switchHome.show();
    _switchHome.update();

    touch.position(-w / 2 - 16, h / 2 + 250);
  }

  if (emojiType === EMOJI_TYPE.SNAKE && !isRun && !snake.isDie) {
    push();
    fill(COLORS.YELLOW);
    translate(w / 2 - d * 2, 150);
    scale(abs(sin(a + 0.1 * 2) / rate) + 1);
    textSize(60);
    text('C', 0, 0);
    pop();

    push();
    fill(COLORS.RED);
    translate(w / 2 - d, 150);
    scale(abs(sin(a + 0.1) / rate) + 1);
    textSize(60);
    text('O', 0, 0);
    pop();

    push();
    fill(COLORS.VIOLET);
    translate(w / 2 + 4, 150);
    scale(abs(sin(a) / rate) + 1);
    textSize(60);
    text('L', 0, 0);
    pop();

    push();
    fill(COLORS.BLUE);
    translate(w / 2 + d * 1, 150);
    scale(abs(sin(a - 0.1 * 1) / rate) + 1);
    textSize(60);
    text('O', 0, 0);
    pop();

    push();
    fill(COLORS.GREEN);
    translate(w / 2 + d * 2, 150);
    scale(abs(sin(a - 0.1 * 2) / rate) + 1);
    textSize(60);
    text('R', 0, 0);
    pop();

    fill(255);
    push();
    translate(w / 2 - d * 2, 220);
    scale(abs(sin(a - 0.1 * 2) / rate) + 1);
    textSize(60);
    text('E', 0, 0);
    pop();

    push();
    translate(w / 2 - d, 220);
    scale(abs(sin(a - 0.1) / rate) + 1);
    textSize(60);
    text('M', 0, 0);
    pop();

    push();
    translate(w / 2, 220);
    scale(abs(sin(a) / rate) + 1);
    textSize(60);
    text('O', 0, 0);
    pop();

    push();
    translate(w / 2 + d * 1, 220);
    scale(abs(sin(a + 0.1 * 1) / rate) + 1);
    textSize(60);
    text('F', 0, 0);
    pop();

    push();
    translate(w / 2 + d * 2, 220);
    scale(abs(sin(a + 0.1 * 2) / rate) + 1);
    textSize(60);
    text('I', 0, 0);
    pop();

    push();
    fill('#9ca3af');
    textAlign(RIGHT);
    textSize(18);
    text('BEST', w / 2 - 4, 280);
    pop();

    push();
    fill(255);
    textAlign(LEFT);
    textSize(24);
    text(`${bestGoal}`, w / 2 + 4, 280);
    pop();

    fill('#9ca3af');
    textSize(16);
    text('TOUCH TO MOVE', w / 2, h / 2 + 240);
    touch.position(w / 2 - 16, h / 2 + 320);

    emojiSnake.position(-w / 2 - 40, h / 2);
    emojiSwitch.position(-w / 2 - 40, h / 2 + 120);
    // touch.position(w / 2 - 16, h / 2 + 250);
  }

  if (emojiType === EMOJI_TYPE.SWITCH && !isRun && !_switch.isDie) {
    push();
    fill(COLORS.YELLOW);
    translate(w / 2 - d * 2, 150);
    scale(abs(sin(a + 0.1 * 2) / rate) + 1);
    textSize(60);
    text('C', 0, 0);
    pop();

    push();
    fill(COLORS.RED);
    translate(w / 2 - d, 150);
    scale(abs(sin(a + 0.1) / rate) + 1);
    textSize(60);
    text('O', 0, 0);
    pop();

    push();
    fill(COLORS.VIOLET);
    translate(w / 2 + 4, 150);
    scale(abs(sin(a) / rate) + 1);
    textSize(60);
    text('L', 0, 0);
    pop();

    push();
    fill(COLORS.BLUE);
    translate(w / 2 + d * 1, 150);
    scale(abs(sin(a - 0.1 * 1) / rate) + 1);
    textSize(60);
    text('O', 0, 0);
    pop();

    push();
    fill(COLORS.GREEN);
    translate(w / 2 + d * 2, 150);
    scale(abs(sin(a - 0.1 * 2) / rate) + 1);
    textSize(60);
    text('R', 0, 0);
    pop();

    push();
    translate(w / 2, 220);
    scale(abs(sin(a - 0.1 * 2) / rate) + 1);
    textSize(60);
    text('SWITCH', 0, 0);
    pop();

    push();
    fill('#9ca3af');
    textAlign(RIGHT);
    textSize(18);
    text('BEST', w / 2 - 4, 280);
    pop();

    push();
    fill(255);
    textAlign(LEFT);
    textSize(24);
    text(`${bestGoalSwitch}`, w / 2 + 4, 280);
    pop();

    fill('#9ca3af');
    textSize(16);
    text('TOUCH TO MOVE', w / 2, h / 2 + 240);
    touch.position(w / 2 - 16, h / 2 + 250);

    emojiSnake.position(-w / 2 - 40, h / 2);
    emojiSwitch.position(-w / 2 - 40, h / 2 + 120);
  }

  if (isRun) {
    textSize(34);
    text(scores, w / 2, 80);
    touch.position(-w / 2, -100);
  }

  if (emojiType !== EMOJI_TYPE.AWAIT) {
    skill_1.position(w - 30 - 28, h / 2 + 80);

    push();
    noFill();
    stroke('#f472b6');
    strokeWeight(2);
    rectMode(CENTER);
    circle(w - 30 - 15, h / 2 + 80 + 15, 40);

    if (runSkill_1) {
      frameSkill1 += 5;
      skill_1.style('transform', `rotate(${radians(frameSkill1)}rad)`);
      coin_1.position(-w - 30 - 12.5, h / 2 + 80 + 40 - 9.5);
    } else {
      if (frameSkill1 % 360 === 0) {
        skill_1.style('transform', `rotate(${0}rad)`);
        strokeWeight(0);
        fill('#f472b6');
        rect(w - 30 - 15, h / 2 + 80 - 26, 28, 15, 4);

        if (isLock_1) {
          lock_1.position(w - 30 - 15 - 6, h / 2 + 80 + 40 - 9.5);
          coin_1.position(-w - 30 - 12.5, h / 2 + 80 + 40 - 9.5);
        } else {
          fill(255);
          textSize(12);
          text(15, w - 30 - 20.5, h / 2 + 80 + 40);
          coin_1.position(w - 30 - 12.5, h / 2 + 80 + 40 - 9.5);
          lock_1.position(-w - 30 - 15 - 6, h / 2 + 80 + 40 - 9.5);
        }
      } else {
        frameSkill1 += 5;
        skill_1.style('transform', `rotate(${radians(frameSkill1)}rad)`);
      }
    }
    pop();

    skill_2.position(w - 30 - 28, h / 2 + 80 + 60);
    push();
    noFill();
    runSkill_2 ? stroke('#e4e4e7') : stroke('#fb923c');
    strokeWeight(2);
    rectMode(CENTER);
    circle(w - 30 - 15, h / 2 + 80 + 60 - 45, 40);

    if (runSkill_2) {
      frameSkill2 += emojiType === EMOJI_TYPE.SNAKE ? 8 : 10;
      skill_2.style('transform', `rotate(${radians(frameSkill2)}rad)`);
      coin_2.position(-w - 30 - 12.5, h / 2 + 140 + 40 - 9.5);

      const _rateRad = frameSkill2 / 10;
      stroke('#fb923c');
      arc(w - 30 - 15, h / 2 + 80 + 60 - 26, 40, 40, 0, radians(_rateRad));

      if (frameSkill2 >= 360 * 10) {
        frameSkill2 = 0;
        runSkill_2 = false;
        if (emojiType === EMOJI_TYPE.SNAKE) {
          snake.destroySkill2();
        } else {
          _switch.destroySkill2();
        }
      }
    } else {
      if (frameSkill2 % 360 === 0) {
        skill_2.style('transform', `rotate(${0}rad)`);
        strokeWeight(0);
        fill('#fb923c');
        rect(w - 30 - 15, h / 2 + 80 + 60 - 26, 28, 15, 4);

        if (isLock_2) {
          lock_2.position(w - 30 - 15 - 6, h / 2 + 140 + 40 - 9.5);
          coin_2.position(-w - 30 - 12.5, h / 2 + 140 + 40 - 9.5);
        } else {
          fill(255);
          textSize(12);
          text(20, w - 30 - 20.5, h / 2 + 140 + 40);
          coin_2.position(w - 30 - 12.5, h / 2 + 140 + 40 - 9.5);
          lock_2.position(-w - 30 - 15 - 6, h / 2 + 140 + 40 - 9.5);
        }
      } else {
        frameSkill2 += 5;
        skill_2.style('transform', `rotate(${radians(frameSkill2)}rad)`);
      }
    }
    pop();

    skill_3.position(w - 30 - 28, h / 2 + 80 + 60 + 60);
    push();
    noFill();
    stroke('#34d399');
    strokeWeight(2);
    rectMode(CENTER);
    circle(w - 30 - 15, h / 2 + 80 + 60 + 60 - 45, 40);

    if (runSkill_3) {
      frameSkill3 += 5;
      skill_3.style('transform', `rotate(${radians(frameSkill3)}rad)`);
      coin_3.position(-w - 30 - 12.5, h / 2 + 200 + 40 - 9.5);

      if (frameSkill3 >= 360 * 2) {
        frameSkill3 = 0;
        runSkill_3 = false;
      }
    } else {
      skill_3.style('transform', `rotate(${0}rad)`);
      strokeWeight(0);
      fill('#34d399');
      rect(w - 30 - 15, h / 2 + 200 - 26, 28, 15, 4);

      if (isLock_3) {
        lock_3.position(w - 30 - 15 - 6, h / 2 + 200 + 40 - 9.5);
        coin_3.position(-w - 30 - 12.5, h / 2 + 200 + 40 - 9.5);
      } else {
        fill(255);
        textSize(12);
        text(25, w - 30 - 20.5, h / 2 + 200 + 40);
        coin_3.position(w - 30 - 12.5, h / 2 + 200 + 40 - 9.5);
        lock_3.position(-w - 30 - 15 - 6, h / 2 + 200 + 40 - 9.5);
      }
    }

    pop();
  } else {
    skill_2.position(-w - 30 - 28, h - 150);
    skill_3.position(-w - 30 - 28, h - 100);
    skill_1.position(-w - 30 - 28, h - 200);
    coin_1.position(-w - 30 - 12.5, h - 220 + 40 - 9.5);
    lock_1.position(-w - 30 - 15 - 6, h - 220 + 40 - 9.5);
    coin_2.position(-w - 30 - 12.5, h - 160 + 40 - 9.5);
    lock_2.position(-w - 30 - 15 - 6, h - 160 + 40 - 9.5);
    coin_3.position(-w - 30 - 12.5, h - 100 + 40 - 9.5);
    lock_3.position(-w - 30 - 15 - 6, h - 100 + 40 - 9.5);
  }

  // home.position(25, 10);
  // emoji.position(80, 10);

  // switch (statusSound) {
  //   case STATUS.SOUNDTRACK:
  //     volume.position(135, 10);
  //     beat.position(135, -100);
  //     mute.position(135, -100);
  //     break;
  //   case STATUS.SOUNDBEAT:
  //     beat.position(135, 10);
  //     volume.position(135, -100);
  //     mute.position(135, -100);
  //     break;
  //   case STATUS.MUTE:
  //     mute.position(135, 10);
  //     volume.position(135, -100);
  //     beat.position(135, -100);
  //     break;
  //   default:
  //     break;
  // }

  textSize(20);
  textAlign(RIGHT);
  fill(255);
  // text(numberCoin, w - 50, 36);
  // coin.position(w - 45, 19);

  /**
   * Card 3
   */
  if (isLockCard3 && isRun && scores >= 10000) {
    engine.world.gravity.y = 0;
    isPause = true;

    isLockCard3 = false;
    window.ReactNativeWebView.postMessage('Card3');
  }

  Matter.Engine.update(engine);
}

function reset() {
  clear();
  background(0);
  engine.world.gravity.y = 0;

  emojiType === EMOJI_TYPE.SNAKE
    ? Matter.Composite.clear(engine.world, true)
    : Matter.Composite.clear(engine.world, false);

  /**
   * Setup Food
   */
  for (let i = 0; i < foods.length; i++) {
    foods[i].destroy();
  }
  foods = [];

  if (emojiType === EMOJI_TYPE.SNAKE) {
    foods = setUpMaps();
  }

  if (emojiType === EMOJI_TYPE.SWITCH) {
    foods = setUpSwitchMaps();
  }

  /**
   * Setup Coin
   */
  coinRand && coinRand.destroy();
  coinRand = new Coin(engine.world, -w / 2, (3 * h) / 2);

  /**
   * Dot
   */
  // dot && dot.destroy();

  let randomColor = colors[Math.floor(Math.random() * colors.length)];
  gate = new Gate(engine.world, (-2 * h) / 3, randomColor);

  // dot = new Dot(engine.world, 2 * h, randomColor, true);

  randomColor = colors[Math.floor(Math.random() * colors.length)];

  snake && snake.destroy();
  if (emojiType === EMOJI_TYPE.SNAKE) {
    snake = new Snake(engine.world, w / 2, h / 2 + 80, randomColor, face);
  }

  _switch && _switch.destroy();
  if (emojiType === EMOJI_TYPE.SWITCH) {
    _switch = new Switch(engine.world, w / 2, h / 2 + 80, randomColor, face);
  }

  snakeHome && snakeHome.destroy();
  _switchHome && _switchHome.destroy();
  if (emojiType === EMOJI_TYPE.AWAIT) {
    snakeHome = new SnakeHome(
      engine.world,
      w / 2,
      h / 2 - 15,
      randomColor,
      face,
    );

    _switchHome = new SwitchHome(
      engine.world,
      w / 2,
      h / 2 + 195,
      randomColor,
      face,
    );
  }

  scores = 0;
  isReset = false;
  isRun = false;
  isPause = false;
}

function setUpMaps() {
  let _foods = [];
  const x = w / 2;

  for (let i = 0; i < 3; i++) {
    let food;
    let distance = h / 2;
    // let distance = 100
    let prevFood = i !== 0 ? _foods[_foods.length - 1] : null;

    const index = getRandomArbitrary(1, 1);
    // const index = 0

    /**
     * Map Level
     * Level 0(0): S0
     * Level 1(50): S1
     * Level 2(100): S2
     * Level 3(200): R1 - S1
     * Level 4(300): R1 - S2
     * Level 5(400): R2 - S1
     * Level 6(500): R2 - S2
     */

    let _rest = 0;
    let _size = 0;
    let y = 0;

    let dis = 0;
    let disWall = 0;

    let sizeS0 = Math.random() < 0.5 ? getRandomArbitrary(3, 5) : 5;

    switch (index) {
      case 0:
        _rest = 30;
        _size = (w - 40 - _rest) / 2;
        y =
          i === 0
            ? -_size
            : prevFood.body.position.y -
              prevFood.distance / 2 -
              distance -
              _size;

        dis = getRandomArbitrary(25, 50);
        disWall = 0;

        food = new Shape1(engine.world, x, y, 0, 'RECT', dis, disWall, sizeS0);
        break;
      case 1:
        _rest = 30;
        _size = (w - 40 - _rest) / 2;
        y =
          i === 0
            ? -_size
            : prevFood.body.position.y -
              prevFood.distance / 2 -
              distance -
              _size;
        dis = getRandomArbitrary(20, 50);
        disWall = 0;

        food = new Shape1(
          engine.world,
          x,
          y,
          0,
          'CIRCLE',
          dis,
          disWall,
          sizeS0,
        );
        break;
      case 2:
        _rest = 30;
        _size = (w - 40 - _rest) / 2;
        y =
          i === 0
            ? -_size
            : prevFood.body.position.y -
              prevFood.distance / 2 -
              distance -
              _size;

        dis = sizeS0 <= 3 ? 60 : 40;
        disWall = sizeS0 <= 3 ? 10 : 5;

        food = new Shape1(
          engine.world,
          x,
          y,
          0,
          'TRIANGLE',
          dis,
          disWall,
          sizeS0,
        );
        break;
      case 3:
        _rest = 30;
        _size = (w - 40 - _rest) / 2;
        y =
          i === 0
            ? -_size
            : prevFood.body.position.y -
              prevFood.distance / 2 -
              distance -
              _size;

        dis = getRandomArbitrary(20, 50);
        disWall = 0;

        food = new Shape1(
          engine.world,
          x,
          y,
          0,
          'DIAMOND',
          dis,
          disWall,
          sizeS0,
        );
        break;
      default:
        _rest = 30;
        _size = (w - 40 - _rest) / 2;
        y =
          i === 0
            ? -_size
            : prevFood.body.position.y -
              prevFood.distance / 2 -
              distance -
              _size;

        dis = getRandomArbitrary(25, 50);
        disWall = 0;

        food = new Shape1(engine.world, x, y, 0, 'RECT', dis, disWall, sizeS0);
        break;
    }

    _foods.push(food);
  }

  return _foods;
}

function genMaps(prevFood) {
  let food;
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const x = w / 2;
  let distance = h / 2;
  // let distance = 100

  /**
   * Map Level
   * Level 0(0): S0 0 - 5
   * Level 1(50): S1 4 - 7
   * Level 2(100): R1 - S1 7 - 10
   * Level 3(200): S2 10 - 16
   * Level 4(300): R1 - S2 16 -22
   * Level 5(400): R2 - S1 22 - 25
   * Level 6(500): R2 - S2 25 - 30
   */

  let index = getRandomArbitrary(0, 30);

  if (scores < 50) {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 30)
        : getRandomArbitrary(0, 4);
  } else if (scores >= 50 && scores < 100) {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 30)
        : getRandomArbitrary(0, 7);
  } else if (scores >= 100 && scores < 200) {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 30)
        : getRandomArbitrary(0, 10);
  } else if (scores >= 200 && scores < 300) {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 10)
        : getRandomArbitrary(7, 10);
  } else if (scores >= 300 && scores < 400) {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 30)
        : getRandomArbitrary(0, 16);
  } else if (scores >= 400 && scores < 500) {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 16)
        : getRandomArbitrary(10, 16);
  } else if (scores >= 500 && scores < 600) {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 30)
        : getRandomArbitrary(0, 22);
  } else if (scores >= 600 && scores < 700) {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 22)
        : getRandomArbitrary(16, 22);
  } else if (scores >= 700 && scores < 800) {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 30)
        : getRandomArbitrary(0, 25);
  } else if (scores >= 800 && scores < 900) {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 25)
        : getRandomArbitrary(22, 25);
  } else if (scores >= 900 && scores < 1000) {
    index = getRandomArbitrary(0, 30);
  } else {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 30)
        : getRandomArbitrary(16, 30);
  }

  // TODO Test
  // index = getRandomArbitrary(13, 13)

  let _rest = 0;
  let _size = 0;
  let y = 0;

  let dis = 0;
  let disWall = 0;

  let sizeS0 = Math.random() < 0.5 ? getRandomArbitrary(2, 5) : 5;

  switch (index) {
    /**
     * Level 0(S0): 0 - 4
     */
    case 0:
      _rest = 30;
      _size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - _size;

      dis =
        scores < 100 ? getRandomArbitrary(35, 50) : getRandomArbitrary(25, 50);
      disWall = 0;

      food = new Shape1(engine.world, x, y, 0, 'RECT', dis, disWall, sizeS0);
      break;
    case 1:
      _rest = 30;
      _size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - _size;

      dis =
        scores < 100 ? getRandomArbitrary(35, 50) : getRandomArbitrary(20, 50);
      disWall = 0;

      food = new Shape1(engine.world, x, y, 0, 'CIRCLE', dis, disWall, sizeS0);
      break;
    case 2:
      _rest = 30;
      _size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - _size;

      dis = sizeS0 <= 3 ? 60 : 40;
      disWall = sizeS0 <= 3 ? 10 : 5;

      food = new Shape1(
        engine.world,
        x,
        y,
        0,
        'TRIANGLE',
        dis,
        disWall,
        sizeS0,
      );
      break;
    case 3:
      _rest = 30;
      _size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - _size;

      dis =
        scores < 100 ? getRandomArbitrary(35, 50) : getRandomArbitrary(25, 50);
      disWall = 0;

      food = new Shape1(engine.world, x, y, 0, 'DIAMOND', dis, disWall, sizeS0);
      break;

    /**
     * Level 1(S1): 4 - 6
     */
    case 4:
    case 5:
    case 6:
      sizeS0 = Math.random() < 0.4 ? getRandomArbitrary(3, 5) : 5;
      _rest = 30;
      _size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - _size;

      dis =
        scores < 100 ? getRandomArbitrary(40, 50) : getRandomArbitrary(30, 50);
      disWall = 10;

      food = new Shape1(engine.world, x, y, 0, 'RAND', dis, disWall, sizeS0);
      break;

    /**
     * Level 2(R1- S1): 7 - 9
     */
    case 7:
    case 8:
    case 9:
      sizeS0 = Math.random() < 0.4 ? getRandomArbitrary(3, 5) : 5;
      _rest = 30;
      _size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - _size;

      dis = getRandomArbitrary(30, 50);
      disWall = 10;

      food = new Shape1(engine.world, x, y, 0.04, 'RAND', dis, disWall, sizeS0);
      break;

    /**
     * Level 3(S2): 10 - 15
     */
    case 10:
      _rest = 40;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new Shape2(engine.world, x, y, 80, randomColor, 0.02, 0, _rest);
      break;
    case 11:
      _rest = 40;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new Shape3(engine.world, x, y, 60, randomColor, 0.02, 0, _rest, 0);
      break;
    case 12:
      _rest = 40;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new Shape4(engine.world, x, y, 80, randomColor, 0.03, 0, _rest);
      break;
    case 13:
      _rest = 0;
      size = (40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new Shape5(engine.world, x, y, 40, randomColor, 0, 0, _rest, 0);
      break;
    case 14:
      _rest = 0;
      size = ((w / 2) * Math.sqrt(2) - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new Shape6(engine.world, x, y, 80, randomColor, 0, 0);
      break;
    case 15:
      _rest = 60;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new Shape7(
        engine.world,
        x,
        y,
        100,
        randomColor,
        0.02,
        0,
        _rest,
        0,
      );
      break;

    /**
     * Level 4(R1 - S2): 16 - 21
     */
    case 16:
      _rest = 40;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new Shape2(engine.world, x, y, 80, randomColor, 0.02, 0, _rest);
      break;
    case 17:
      _rest = 40;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new Shape3(
        engine.world,
        x,
        y,
        60,
        randomColor,
        0.02,
        0,
        _rest,
        0.04,
      );
      break;
    case 18:
      _rest = 40;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new Shape4(engine.world, x, y, 80, randomColor, 0.03, 0, _rest);
      break;
    case 19:
      _rest = 10;
      size = (40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new Shape5(engine.world, x, y, 40, randomColor, 0, 0, _rest, 0.04);
      break;
    case 20:
      _rest = 0;
      size = ((w / 2) * Math.sqrt(2) - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new Shape6(engine.world, x, y, 80, randomColor, 0, 0);
      break;
    case 21:
      _rest = 60;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new Shape7(
        engine.world,
        x,
        y,
        100,
        randomColor,
        0.02,
        0,
        _rest,
        0.01,
      );
      break;

    /**
     * Level 5(R2 - S1): 22 - 24
     */
    case 22:
    case 23:
    case 24:
      sizeS0 = Math.random() < 0.4 ? getRandomArbitrary(3, 5) : 5;
      _rest = 30;
      _size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - _size;

      dis = getRandomArbitrary(30, 50);
      disWall = 10;

      food = new Shape1(engine.world, x, y, 1, 'RAND', dis, disWall, sizeS0);
      break;

    /**
     * Level 6(R2 - S2): 25 - 30
     */
    case 25:
      _rest = 40;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new Shape2(engine.world, x, y, 80, randomColor, 0.02, 0, _rest);
      break;
    case 26:
      _rest = 40;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new Shape3(
        engine.world,
        x,
        y,
        60,
        randomColor,
        0.02,
        0,
        _rest,
        0.5,
      );
      break;
    case 27:
      _rest = 40;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new Shape4(engine.world, x, y, 80, randomColor, 0.03, 0, _rest);
      break;
    case 28:
      _rest = 10;
      size = (40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new Shape5(engine.world, x, y, 40, randomColor, 0, 0, _rest, 0.5);
      break;
    case 29:
      _rest = 0;
      size = ((w / 2) * Math.sqrt(2) - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new Shape6(engine.world, x, y, 80, randomColor, 0, 0);
      break;
    case 30:
      _rest = 60;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new Shape7(
        engine.world,
        x,
        y,
        100,
        randomColor,
        0.02,
        0,
        _rest,
        0.5,
      );
      break;

    default:
      _rest = 30;
      _size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - _size;

      dis = getRandomArbitrary(25, 50);
      disWall = 0;

      food = new Shape1(engine.world, x, y, 0, 'RECT', dis, disWall, sizeS0);
      break;
  }

  return food;
}

function setUpSwitchMaps() {
  let _foods = [];
  const x = w / 2;
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  for (let i = 0; i < 3; i++) {
    let food;
    let distance = h / 3;
    let prevFood = i !== 0 ? _foods[_foods.length - 1] : null;

    const index = getRandomArbitrary(0, 3);
    // const index = 0

    /**
     * Map Level
     * Level 0(0): S0
     * Level 1(50): S1
     * Level 2(100): S2
     * Level 3(200): R1 - S1
     * Level 4(300): R1 - S2
     * Level 5(400): R2 - S1
     * Level 6(500): R2 - S2
     */

    let _rest = 0;
    let y = 0;
    let isCoin = Math.random() < 0.3 ? true : false;
    switch (index) {
      case 0:
        _rest = 120;
        size = (w - 40 - _rest) / 2;
        y =
          i === 0
            ? -size
            : prevFood.body.position.y -
              prevFood.distance / 2 -
              distance -
              size;

        food = new ShapeS1(
          engine.world,
          x,
          y,
          60,
          randomColor,
          0.02,
          0,
          _rest,
          0,
          isCoin,
        );

        break;
      case 1:
        _rest = 120;
        size = (w - 40 - _rest) / 2;
        y =
          i === 0
            ? -size
            : prevFood.body.position.y -
              prevFood.distance / 2 -
              distance -
              size;

        food = new ShapeS2(
          engine.world,
          x,
          y,
          60,
          randomColor,
          0.02,
          0,
          _rest,
          0,
          isCoin,
        );
        break;
      case 2:
        _rest = 120;
        size = (w - 40 - _rest) / 2;
        y =
          i === 0
            ? -size
            : prevFood.body.position.y -
              prevFood.distance / 2 -
              distance -
              size;

        food = new ShapeS3(
          engine.world,
          x,
          y,
          60,
          randomColor,
          0.02,
          0,
          _rest,
          0,
          isCoin,
        );
        break;
      default:
        _rest = 120;
        size = (w - 40 - _rest) / 2;
        y =
          i === 0
            ? -size
            : prevFood.body.position.y -
              prevFood.distance / 2 -
              distance -
              size;

        food = new ShapeS3(
          engine.world,
          x,
          y,
          60,
          randomColor,
          0.02,
          0,
          _rest,
          0,
          isCoin,
        );
        break;
    }

    _foods.push(food);
  }

  return _foods;
}

function genSwitchMaps(prevFood) {
  let food;
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const x = w / 2;
  let distance = h / 3;

  /**
   * Map Level
   * Level 0(0): S0 0 - 5
   * Level 1(50): S1 4 - 7
   * Level 2(100): R1 - S1 7 - 10
   * Level 3(200): S2 10 - 16
   * Level 4(300): R1 - S2 16 -22
   * Level 5(400): R2 - S1 22 - 25
   * Level 6(500): R2 - S2 25 - 30
   */

  let index = getRandomArbitrary(0, 30);
  if (scores < 50) {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 30)
        : getRandomArbitrary(0, 4);
  } else if (scores >= 50 && scores < 100) {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 30)
        : getRandomArbitrary(0, 7);
  } else if (scores >= 100 && scores < 200) {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 30)
        : getRandomArbitrary(0, 10);
  } else if (scores >= 200 && scores < 300) {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 10)
        : getRandomArbitrary(7, 10);
  } else if (scores >= 300 && scores < 400) {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 30)
        : getRandomArbitrary(0, 16);
  } else if (scores >= 400 && scores < 500) {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 16)
        : getRandomArbitrary(10, 16);
  } else if (scores >= 500 && scores < 600) {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 30)
        : getRandomArbitrary(0, 22);
  } else if (scores >= 600 && scores < 700) {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 22)
        : getRandomArbitrary(16, 22);
  } else if (scores >= 700 && scores < 800) {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 30)
        : getRandomArbitrary(0, 25);
  } else if (scores >= 800 && scores < 900) {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 25)
        : getRandomArbitrary(22, 25);
  } else if (scores >= 900 && scores < 1000) {
    index = getRandomArbitrary(0, 30);
  } else {
    index =
      Math.random() <= 0.3
        ? getRandomArbitrary(0, 30)
        : getRandomArbitrary(16, 30);
  }

  // TODO Test
  // index = getRandomArbitrary(21, 30)

  let _rest = 0;
  let _size = 0;
  let y = 0;

  let _rotate = Math.random() < 0.5 ? 0.02 : -0.02;
  let isCoin = Math.random() < 0.3 ? true : false;

  switch (index) {
    /**
     * Level 0(S0): 0 - 4
     */
    case 0:
      _rotate = Math.random() < 0.5 ? 0.035 : -0.035;
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS1(
        engine.world,
        x,
        y,
        60,
        randomColor,
        _rotate,
        0,
        _rest,
        0,
        isCoin,
      );
      break;
    case 1:
      _rotate = Math.random() < 0.5 ? 0.03 : -0.03;
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS2(
        engine.world,
        x,
        y,
        60,
        randomColor,
        _rotate,
        0,
        _rest,
        0,
        isCoin,
      );
      break;
    case 2:
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS3(
        engine.world,
        x,
        y,
        60,
        randomColor,
        _rotate,
        0,
        _rest,
        0,
        isCoin,
      );
      break;

    case 3:
      _rotate = Math.random() < 0.5 ? 0.035 : -0.035;
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS1(
        engine.world,
        x,
        y,
        60,
        randomColor,
        _rotate,
        0,
        _rest,
        0.02,
        isCoin,
      );
      break;
    /**
     * Level 1(S1): 4 - 6
     */
    case 4:
      _rotate = Math.random() < 0.5 ? 0.03 : -0.03;
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS2(
        engine.world,
        x,
        y,
        60,
        randomColor,
        _rotate,
        0,
        _rest,
        0,
        isCoin,
      );
      break;
    case 5:
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS3(
        engine.world,
        x,
        y,
        60,
        randomColor,
        _rotate,
        0,
        _rest,
        0,
        isCoin,
      );
      break;
    case 6:
      _rotate = Math.random() < 0.5 ? 0.015 : -0.015;
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS4(
        engine.world,
        x,
        y,
        50,
        randomColor,
        _rotate,
        0,
        _rest,
        0,
        isCoin,
      );
      break;

    /**
     * Level 2(R1- S1): 7 - 9
     */
    case 7:
      _rotate = Math.random() < 0.5 ? 0.03 : -0.03;
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS2(
        engine.world,
        x,
        y,
        60,
        randomColor,
        _rotate,
        0,
        _rest,
        0.02,
        isCoin,
      );
      break;
    case 8:
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS3(
        engine.world,
        x,
        y,
        60,
        randomColor,
        _rotate,
        0,
        _rest,
        0,
        isCoin,
      );
      break;
    case 9:
      _rotate = Math.random() < 0.5 ? 0.015 : -0.015;
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS4(
        engine.world,
        x,
        y,
        50,
        randomColor,
        _rotate,
        0,
        _rest,
        0.02,
        isCoin,
      );
      break;

    /**
     * Level 3(S2): 10 - 15
     */
    case 10:
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS5(
        engine.world,
        x,
        y,
        60,
        randomColor,
        _rotate,
        0,
        _rest,
        0,
        isCoin,
      );
      break;
    case 11:
      _rest = 0;
      size = (40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS6(engine.world, x, y, 40, randomColor, 0, 0, _rest, 0);
      break;
    case 12:
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS7(engine.world, x, y, 90, randomColor, 0.02, 0, _rest);
      break;
    case 13:
      _rest = 0;
      size = ((w / 2) * Math.sqrt(2) - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS8(engine.world, x, y, 80, randomColor, 0, 0);
      break;
    case 14:
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS5(
        engine.world,
        x,
        y,
        60,
        randomColor,
        _rotate,
        0,
        _rest,
        0,
        true,
      );
      break;
    case 15:
      _rest = 0;
      size = (40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS6(engine.world, x, y, 40, randomColor, 0, 0, _rest, 0);
      break;

    /**
     * Level 4(R1 - S2): 16 - 21
     */
    case 16:
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS5(
        engine.world,
        x,
        y,
        60,
        randomColor,
        _rotate,
        0,
        _rest,
        0.02,
        isCoin,
      );
      break;
    case 17:
      _rest = 40;
      _rest = 0;
      size = (40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS6(
        engine.world,
        x,
        y,
        40,
        randomColor,
        0,
        0,
        _rest,
        0,
        0.02,
      );
      break;
    case 18:
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS7(engine.world, x, y, 90, randomColor, 0.02, 0, _rest);
      break;
    case 19:
      _rest = 0;
      size = ((w / 2) * Math.sqrt(2) - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS8(engine.world, x, y, 80, randomColor, 0, 0);
      break;
    case 20:
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS5(
        engine.world,
        x,
        y,
        60,
        randomColor,
        _rotate,
        0,
        _rest,
        0.02,
        isCoin,
      );
      break;

    /**
     * Level 5(R2 - S1): 22 - 24
     */
    case 21:
      _rotate = Math.random() < 0.5 ? 0.035 : -0.035;
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS1(
        engine.world,
        x,
        y,
        60,
        randomColor,
        _rotate,
        0,
        _rest,
        0.5,
        isCoin,
      );
      break;
    case 22:
      _rotate = Math.random() < 0.5 ? 0.03 : -0.03;
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS2(
        engine.world,
        x,
        y,
        60,
        randomColor,
        _rotate,
        0,
        _rest,
        0.5,
        isCoin,
      );
      break;
    case 23:
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS3(
        engine.world,
        x,
        y,
        60,
        randomColor,
        _rotate,
        0,
        _rest,
        0.5,
        isCoin,
      );
      break;
    case 24:
      _rotate = Math.random() < 0.5 ? 0.015 : -0.015;
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS4(
        engine.world,
        x,
        y,
        50,
        randomColor,
        _rotate,
        0,
        _rest,
        0.5,
        isCoin,
      );
      break;

    /**
     * Level 6(R2 - S2): 25 - 30
     */
    case 25:
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS5(
        engine.world,
        x,
        y,
        60,
        randomColor,
        _rotate,
        0,
        _rest,
        0.5,
        isCoin,
      );
      break;
    case 26:
      _rest = 40;
      _rest = 0;
      size = (40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS6(
        engine.world,
        x,
        y,
        40,
        randomColor,
        0,
        0,
        _rest,
        0,
        0.5,
      );
      break;
    case 27:
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS7(engine.world, x, y, 90, randomColor, 0.02, 0, _rest);
      break;
    case 28:
      _rest = 0;
      size = ((w / 2) * Math.sqrt(2) - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS8(engine.world, x, y, 80, randomColor, 0, 0);
      break;
    case 29:
      _rest = 120;
      size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS5(
        engine.world,
        x,
        y,
        60,
        randomColor,
        _rotate,
        0,
        _rest,
        0.5,
        isCoin,
      );
      break;
    case 30:
      _rest = 40;
      _rest = 0;
      size = (40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - size;

      food = new ShapeS6(
        engine.world,
        x,
        y,
        40,
        randomColor,
        0,
        0,
        _rest,
        0,
        0.5,
      );
      break;

    default:
      _rest = 120;
      _size = (w - 40 - _rest) / 2;
      y = prevFood.body.position.y - prevFood.distance / 2 - distance - _size;

      food = new ShapeS1(
        engine.world,
        x,
        y,
        60,
        randomColor,
        _rotate,
        0,
        _rest,
        0.02,
      );
      break;
  }

  return food;
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function touchStarted(e) {
  e.preventDefault();
  // if (mouseY > 60 && emojiType !== EMOJI_TYPE.AWAIT) {
  //   if (isLoad) {
  //     if (!isRun && emojiType === EMOJI_TYPE.SNAKE && !snake.isDie) {
  //       isRun = true;
  //     }

  //     if (emojiType === EMOJI_TYPE.SNAKE && !snake.isDie) {
  //       if (!isRun) {
  //         window.ReactNativeWebView.postMessage('Click');
  //         isRun = true;
  //       }

  //       snake.setDx();
  //     }

  //     if (emojiType === EMOJI_TYPE.SWITCH && !_switch.isDie) {
  //       if (!isRun) {
  //         isRun = true;
  //         engine.world.gravity.y = gSwitch;
  //       }

  //       isRun && _switch.upPosition();
  //       window.ReactNativeWebView.postMessage('Next');
  //     }
  //   } else {
  //     setTimeout(() => {
  //       isLoad = true;
  //     }, 500);
  //   }
  // }
}

function touchMoved(e) {
  e.preventDefault();
  if (emojiType === EMOJI_TYPE.SNAKE && isRun && !isPause) {
    snake.updatePosition();
  }
}

function onPressVolume(e) {
  e.preventDefault();
  window.ReactNativeWebView.postMessage('Click');
  switch (statusSound) {
    case STATUS.SOUNDTRACK:
      statusSound = STATUS.SOUNDBEAT;
      break;
    case STATUS.SOUNDBEAT:
      statusSound = STATUS.MUTE;
      break;
    case STATUS.MUTE:
      statusSound = STATUS.SOUNDTRACK;
      break;
    default:
      break;
  }
  window.ReactNativeWebView.postMessage(
    `${JSON.stringify({ sound: statusSound })}`,
  );
}

function onPressEmoji(e) {
  e.preventDefault();
  emoji.size(sizeSetting + 4, sizeSetting + 4);
  statusSound !== STATUS.MUTE && window.ReactNativeWebView.postMessage('Click');
  if (isRun) {
    engine.world.gravity.y = 0;
    isPause = true;

    window.ReactNativeWebView.postMessage('ShopRun');
  } else {
    isPause = false;
    window.ReactNativeWebView.postMessage('Shop');
  }
}

function onPressEmojiEnded(e) {
  e.preventDefault();
  emoji.size(sizeSetting, sizeSetting);
}

function onPressHome(e) {
  e.preventDefault();
  home.size(sizeSetting + 4, sizeSetting + 4);
  engine.world.gravity.y = 0;
  if (isRun) {
    isPause = true;
    statusSound !== STATUS.MUTE &&
      window.ReactNativeWebView.postMessage('Click');
    window.ReactNativeWebView.postMessage('Quit');
  } else {
    window.ReactNativeWebView.postMessage(
      `${JSON.stringify({ game: 'Home' })}`,
    );
    isLoad = false;
    emojiType = EMOJI_TYPE.AWAIT;
    isRun = false;
    isReset = true;
    isPause = false;
  }
}

function onPressHomeEnded(e) {
  e.preventDefault();
  home.size(sizeSetting, sizeSetting);
}

function onPressEmojiSnake(e) {
  e.preventDefault();

  window.ReactNativeWebView.postMessage(`${JSON.stringify({ game: 'Snake' })}`);

  emojiType = EMOJI_TYPE.SNAKE;
  isRun = false;
  isReset = true;
  isPause = false;
}

function onPressEmojiSwitch(e) {
  e.preventDefault();

  window.ReactNativeWebView.postMessage(
    `${JSON.stringify({ game: 'Switch' })}`,
  );

  emojiType = EMOJI_TYPE.SWITCH;
  isRun = false;
  isReset = true;
  isPause = false;
}

function onPressSkill_1(e) {
  e.preventDefault();
  if (!isLock_1 && isRun && !runSkill_1 && numberCoin >= price1) {
    statusSound !== STATUS.MUTE &&
      window.ReactNativeWebView.postMessage('Skill1');
    frameSkill1 = 0;
    runSkill_1 = true;

    if (emojiType === EMOJI_TYPE.SNAKE) {
      snake.genSkill1();
    } else {
      _switch.genSkill1();
    }
    numberCoin -= price1;
    window.ReactNativeWebView.postMessage(
      `${JSON.stringify({ coin: price1 })}`,
    );
  }
}

function onPressSkill_2(e) {
  e.preventDefault();
  if (!isLock_2 && isRun && !runSkill_2 && numberCoin >= price2) {
    statusSound !== STATUS.MUTE &&
      window.ReactNativeWebView.postMessage('Skill2');
    frameSkill2 = 0;
    runSkill_2 = true;

    if (emojiType === EMOJI_TYPE.SNAKE) {
      snake.genSkill2();
    } else {
      _switch.genSkill2();
    }

    numberCoin -= price2;
    window.ReactNativeWebView.postMessage(
      `${JSON.stringify({ coin: price2 })}`,
    );
  }
}

function onPressSkill_3(e) {
  e.preventDefault();
  if (!isLock_3 && isRun && numberCoin >= price3) {
    statusSound !== STATUS.MUTE &&
      window.ReactNativeWebView.postMessage('Skill3');
    frameSkill3 = 0;
    runSkill_3 = true;
    if (emojiType === EMOJI_TYPE.SNAKE) {
      snake.genSkill3();
    } else {
      _switch.genSkill3();
    }
    numberCoin -= price3;
    window.ReactNativeWebView.postMessage(
      `${JSON.stringify({ coin: price3 })}`,
    );
  }
}

function pieChart(diameter, data) {
  let lastAngle = 0;
  for (let i = 0; i < data.length; i++) {
    let gray = map(i, 0, data.length, 0, 255);
    fill(gray);
    arc(
      width / 2,
      height / 2,
      diameter,
      diameter,
      lastAngle,
      lastAngle + radians(angles[i]),
    );
    lastAngle += radians(angles[i]);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

window.navigation.addEventListener('navigate', async event => {
  console.log('document.location ', event.destination.url);

  let isPlay = false;
  if (event.destination.url === 'http://localhost:3000/emofi/') {
    isPlay = true;
  }

  if (isPlay) {
    console.log('location 1');
    await sleep(5000);
    console.log('location 2');
    reset();
    // draw();
  }
});
