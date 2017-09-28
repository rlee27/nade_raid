import Sprite from './sprite';
import Blast from './blast';
import Block from './blocks';
import Bomb from './bomb';

const monsterImage = new Image (406, 136);
monsterImage.src = "./assets/monsters.png";

class Monster extends Sprite {
  constructor(options) {
    super(options);

    this.image = monsterImage;
    this.sWidth = 406 / 14;
    this.sHeight = 136 / 5;
    this.dWidth = 49;
    this.dHeight = 49;
    this.moveDirs = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.dir = "";
    this.frameIndex = 0;
    this.frameCounter = 0;
    this.isHit = false;
  }

  isCollidedWith(otherObj) {
    if (otherObj instanceof Blast) {
      if (this.dx + 10 < otherObj.dx + otherObj.dWidth &&
        this.dx + 10 + this.dWidth - 10 > otherObj.dx &&
        this.dy + 10 < otherObj.dy + otherObj.dHeight &&
        this.dy + 10 + this.dHeight - 10 > otherObj.dy) {
          return true;
        } else {
          return false;
        }
    } else {
      if (this.dx < otherObj.dx + otherObj.dWidth &&
          this.dx + this.dWidth > otherObj.dx &&
          this.dy < otherObj.dy + otherObj.dHeight &&
          this.dy + this.dHeight > otherObj.dy) {
            return true;
          } else {
            return false;
          }
    }
  }

  collideWith(otherObj) {
    if (otherObj instanceof Blast) {
      if (this.isHit === false) {
        this.isHit = true;
        this.frameIndex = 5;
      }
    } else if (otherObj instanceof Block || otherObj instanceof Bomb) {
      this.wallCollision(otherObj);
    }
  }

  checkFrame() {
    this.frameCounter += 1;
    if (this.isHit === false) {
      if (this.frameCounter % 30 === 0) {
        this.frameCounter = 1;
        this.frameIndex += 1;
        this.frameIndex = this.frameIndex % 6;
        this.sx = -5 + (this.frameIndex * 30);
      }
      if (this.frameCounter % 15 === 0) {
        this.getDir();
      }
    } else {
      if (this.frameCounter % 15 === 0) {
        this.frameCounter = 1;
        this.frameIndex += 1;
        this.sx = -5 + (this.frameIndex * 30);
      }
      if (this.frameIndex > 10) {
        this.remove();
      }
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

  move() {
    this.checkFrame();
    if (this.isHit === false) {
      switch (this.dir) {
        case "right":
        if ((this.pos[0] + 1) < 660) {
          this.pos[0] += 1;
        }
        break;
        case "left":
        if ((this.pos[0] - 1) > 45) {
          this.pos[0] -= 1;
        }
        break;
        case "down":
        if ((this.pos[1] + 1) < 550) {
          this.pos[1] += 1;
        }
        break;
        case "up":
        if ((this.pos[1] - 1) > 50) {
          this.pos[1] -= 1;
        }
        break;
      }

      this.dx = this.pos[0];
      this.dy = this.pos[1];
    } else {
      this.stopMoving();
    }
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

    if (monsterRight > wallLeft && monsterRight / 2 <= wallRight / 2) {
      if (monsterBot > wallTop && monsterBot < wallBot) {
        if (monsterRight < wallLeft + 2) {
          this.stopMoving();
          this.pos[0] = wallLeft - this.dWidth;
          this.pos[1] -= 1;
        } else {
          this.stopMoving();
          this.pos[0] -= 1;
          this.pos[1] = wallTop - this.dHeight;
        }
      } else {
        if (monsterRight <= wallLeft) {
          this.stopMoving();
          this.pos[0] = wallLeft - this.dWidth;
          this.pos[1] += 1;
        } else if (monsterRight > wallLeft){
          this.stopMoving();
          this.pos[0] -= 1;
          this.pos[1] = wallBot;
        }
      }
    } else if (monsterLeft < wallRight && monsterRight > wallRight) {
      if (monsterBot > wallTop && monsterBot < wallBot) {
        if (monsterLeft >= wallRight - 2) {
          this.stopMoving();
          this.pos[0] = wallRight;
          this.pos[1] -= 1;
        } else {
          this.stopMoving();
          this.pos[0] += 1;
          this.pos[1] = wallTop - this.dHeight;
        }
      } else {
        if (monsterLeft > wallRight - 2) {
          this.stopMoving();
          this.pos[0] = wallRight;
          this.pos[1] += 1;
        } else {
          this.stopMoving();
          this.pos[0] += 1;
          this.pos[1] = wallBot;
        }
      }
    }
  }

  stopMoving() {
    this.moveDirs = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.dir = "";
  }

  remove() {
    this.game.remove(this);
  }

  monsterMoving() {
    return Object.values(this.moveDirs).includes(true);
  }

}

export default Monster;
