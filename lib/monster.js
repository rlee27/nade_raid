import Sprite from './sprite';
import Blast from './blast';
import Block from './blocks';

const monsterImage = new Image (406, 136);
monsterImage.src = "./assets/monsters.png";

class Monster extends Sprite {
  constructor(options) {
    super(options);

    this.image = monsterImage;
    this.sWidth = 406 / 14;
    this.sHeight = 136 / 5;
    this.dWidth = 50;
    this.dHeight = 50;
    this.moveDirs = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.dir = "";
    this.frameIndex = 0;
    this.numFrames = 4;
    this.frameCounter = 0;
  }

  collideWith(otherObj) {
    if (otherObj instanceof Blast) {
      
    } else if (otherObj instanceof Block) {
      this.wallCollision(otherObj);
    }
  }

  changeFrame(timeChange) {
    this.frameCounter += 1;
    if (this.frameCounter % 40 === 0) {
      this.frameCounter = 1;
      this.frameIndex += 1;
      this.frameIndex = this.frameIndex % 4;
      this.sx = -5 + (this.frameIndex * this.sWidth);
      this.getDir();
    }
  }

  getDir() {
    const min = 0;
    const max = 4;
    const randomGen = Math.floor(Math.random() * (max - min)) + min;
    const moveDirs = Object.keys(this.moveDirs);
    const dir = Object.keys(this.moveDirs)[randomGen];

    moveDirs.forEach((dir) => {
      this.moveDirs[dir] = false;
    });


    this.moveDirs[dir] = true;
    this.dir = dir;
  }

  move(timeChange) {
    const normalizedFrame = Math.round(timeChange / (1000 / 60));

    this.changeFrame();

    switch (this.dir) {
      case "right":
      if ((this.pos[0] + 1 * normalizedFrame) < 660) {
        this.pos[0] += 1 * normalizedFrame;
      }
        break;
      case "left":
      if ((this.pos[0] - 1 * normalizedFrame) > 45) {
        this.pos[0] -= 1 * normalizedFrame;
      }
        break;
      case "down":
      if ((this.pos[1] + 1 * normalizedFrame) < 550) {
        this.pos[1] += 1 * normalizedFrame;
      }
        break;
      case "up":
      if ((this.pos[1] - 1 * normalizedFrame) > 50) {
        this.pos[1] -= 1 * normalizedFrame;
      }
        break;
    }

    this.dx = this.pos[0];
    this.dy = this.pos[1];
  }

  wallCollision(otherObj) {
    const wallLeft = otherObj.dx;
    const wallRight = otherObj.dx + otherObj.dWidth;
    const wallTop = otherObj.dy;
    const wallBot = otherObj.dy + otherObj.dHeight;
    const monsterLeft = this.dx;
    const monsterRight = this.dx + this.dWidth;
    const monsterTop = this.dy;
    const monsterBot = this.dy + this.dHeight;

    if (monsterRight > wallLeft && monsterRight / 2 < wallRight / 2 + 2) {
      if (monsterBot > wallTop && monsterBot < wallBot) {
        if (Math.round(monsterRight) < wallLeft) {
          this.moveDirs.right = false;
          this.pos[0] = wallLeft - this.dWidth;
          if (this.monsterMoving()) {
            this.pos[1] -= 2;
          }
        } else {
          this.moveDirs.down = false;
          if (this.monsterMoving()) {
            this.pos[0] -= 2;
          }
          this.pos[1] = wallTop - this.dHeight;
        }
      } else {
        if (Math.round(monsterRight) <= wallLeft + 2) {
          this.moveDirs.right = false;
          this.pos[0] = wallLeft - this.dWidth;
          if (this.monsterMoving()) {
            this.pos[1] += 2;
          }
        } else {
          this.moveDirs.up = false;
          if (this.monsterMoving()) {
            this.pos[0] -= 2;
          }
          this.pos[1] = wallBot;
        }
      }
    } else if (monsterLeft < wallRight && monsterRight > wallRight) {
      if (monsterBot > wallTop && monsterBot < wallBot) {
        if (Math.round(monsterLeft) >= wallRight - 2) {
          this.moveDirs.left = false;
          this.pos[0] = wallRight;
          if (this.monsterMoving()) {
            this.pos[1] -= 2;
          }
        } else {
          this.moveDirs.up = false;
          if (this.monsterMoving()) {
            this.pos[0] += 2;
          }
          this.pos[1] = wallTop - this.dHeight;
        }
      } else {
        if (Math.round(monsterLeft) > wallRight - 2) {
          this.moveDirs.left = false;
          this.pos[0] = wallRight;
          if (this.monsterMoving()) {
            this.pos[1] += 2;
          }
        } else {
          this.moveDirs.down = false;
          if (this.monsterMoving()) {
            this.pos[0] += 2;
          }
          this.pos[1] = wallBot;
        }
      }
    }
  }

  remove() {
    this.game.remove(this);
  }

  monsterMoving() {
    return Object.values(this.moveDirs).includes(true);
  }

}

export default Monster;
