import Sprite from './sprite';
import Bomb from './bomb';
import Blast from './blast';
import Block from './blocks';

const playerSheetImage = new Image (412, 1101);
playerSheetImage.src = "./assets/player_white.png";

class Player extends Sprite {
  constructor(options) {
    super(options);
    this.image = playerSheetImage;
    this.sx = -5;
    this.sWidth = 412 / 14;
    this.sHeight = 1101 / 38;
    this.moveDirs = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.dir = "";
    this.frameCounter = 0;
    this.frameIndex = 0;
    this.numFrames = 3;
    this.pos = options.pos;
  }

  move(timeChange) {
    const normalizedFrame = timeChange / (1000 / 60);

    this.checkFrame();

    switch (this.dir) {
      case "right":
      this.sy = (playerSheetImage.height / 37 * 30);
      this.sx = (playerSheetImage.width / 14 * 7) + (this.frameIndex * this.sWidth);
      if ((this.pos[0] + 2 * normalizedFrame) < 660) {
        this.pos[0] += 2 * normalizedFrame;
      }
        break;
      case "left":
      this.sy = playerSheetImage.height / 37 * 29;
      this.sx = playerSheetImage.width / 14 * 7 + (this.frameIndex * this.sWidth);
      if ((this.pos[0] - 2 * normalizedFrame) > 45) {
        this.pos[0] -= 2 * normalizedFrame;
      }
        break;
      case "down":
      this.sy = playerSheetImage.height / 37 * 29;
      this.sx = -5 + (this.frameIndex * this.sWidth);
      if ((this.pos[1] + 2 * normalizedFrame) < 550) {
        this.pos[1] += 2 * normalizedFrame;
      }
        break;
      case "up":
      this.sy = playerSheetImage.height / 37 * 30;
      this.sx = -5 + (this.frameIndex * this.sWidth);
      if ((this.pos[1] - 2 * normalizedFrame) > 50) {
        this.pos[1] -= 2 * normalizedFrame;
      }
        break;
    }

    this.dx = this.pos[0];
    this.dy = this.pos[1];
  }

  checkFrame(timeChange) {
    this.frameCounter += 1;
    if (this.frameCounter % 6 === 0) {
      this.frameCounter = 1;
      this.frameIndex += 1;
      this.frameIndex = this.frameIndex % 3;
    }
  }

  collideWith(otherObj) {
    if (otherObj instanceof Blast) {
      this.remove();
    } else if (otherObj instanceof Block) {
      this.wallCollision(otherObj);
    }
  }

  wallCollision(otherObj) {
    const wallLeft = otherObj.dx;
    const wallRight = otherObj.dx + otherObj.dWidth;
    const wallTop = otherObj.dy;
    const wallBot = otherObj.dy + otherObj.dHeight;
    const playerLeft = this.dx;
    const playerRight = this.dx + this.dWidth;
    const playerTop = this.dy;
    const playerBot = this.dy + this.dHeight;

    if (playerRight > wallLeft && playerRight / 2 < wallRight / 2) {
      if (playerBot > wallTop && playerBot < wallBot) {
        if (Math.round(playerRight) <= wallLeft + 2) {
          this.pos[0] = wallLeft - this.dWidth;
          if (this.playerMoving()) {
            this.pos[1] -= 2;
          }
        } else {
          if (this.playerMoving()) {
            this.pos[0] -= 2;
          }
          this.pos[1] = wallTop - this.dHeight;
        }
      } else {
        if (Math.round(playerRight) <= wallLeft + 2) {
          this.pos[0] = wallLeft - this.dWidth;
          if (this.playerMoving()) {
            this.pos[1] += 2;
          }
        } else {
          if (this.playerMoving()) {
            this.pos[0] -= 2;
          }
          this.pos[1] = wallBot;
        }
      }
    } else if (playerLeft < wallRight && playerRight >= wallRight) {
      if (playerBot > wallTop && playerBot < wallBot) {
        if (Math.round(playerLeft) >= wallRight - 2) {
          this.pos[0] = wallRight;
          if (this.playerMoving()) {
            this.pos[1] -= 2;
          }
        } else {
          if (this.playerMoving()) {
            this.pos[0] += 2;
          }
          this.pos[1] = wallTop - this.dHeight;
        }
      } else {
        if (Math.round(playerLeft) >= wallRight - 2) {
          this.pos[0] = wallRight;
          if (this.playerMoving()) {
            this.pos[1] += 2;
          }
        } else {
          if (this.playerMoving()) {
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

  placeBomb() {
    const bomb = new Bomb ({
      pos: this.nearestCell(),
      game: this.game,
    });
    this.game.add(bomb);
  }

  playerMoving() {
    return Object.values(this.moveDirs).includes(true);
  }
}

export default Player;
