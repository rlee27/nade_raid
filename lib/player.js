import Sprite from './sprite';
import Bomb from './bomb';

const playerSheetImage = new Image (412, 1101);
playerSheetImage.src = "./assets/player_white.png";

class Player extends Sprite {
  constructor(options) {
    super(options);
    this.image = playerSheetImage;
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
    this.game = options.game;
  }

  move(timeChange) {
    const normalizedFrame = timeChange / (1000 / 60);
    // this.frameIndex = (this.frameIndex + Math.round(normalizedFrame)) % this.numFrames;

    this.checkFrame();

    switch (this.dir) {
      case "right":
      this.sy = (playerSheetImage.height / 37 * 30);
      this.sx = (playerSheetImage.width / 14 * 7) + (this.frameIndex * this.sWidth);
      this.pos[0] += 3 * normalizedFrame;
        break;
      case "left":
      this.sy = playerSheetImage.height / 37 * 29;
      this.sx = playerSheetImage.width / 14 * 7 + (this.frameIndex * this.sWidth);
      this.pos[0] -= 3 * normalizedFrame;
        break;
      case "down":
      this.sy = playerSheetImage.height / 37 * 29;
      this.sx = playerSheetImage.width / 14 * 0 + (this.frameIndex * this.sWidth);
      this.pos[1] += 3 * normalizedFrame;
        break;
      case "up":
      this.sy = playerSheetImage.height / 37 * 30;
      this.sx = playerSheetImage.width / 14 * 0 + (this.frameIndex * this.sWidth);
      this.pos[1] -= 3 * normalizedFrame;
        break;
    }

    this.dx = this.pos[0];
    this.dy = this.pos[1];
  }

  checkFrame(timeChange) {
    this.frameCounter += 1;
    if (this.frameCounter % 5 === 0) {
      this.frameCounter = 1;
      this.frameIndex += 1;
      this.frameIndex = this.frameIndex % 3;
    }
  }

  remove() {
    this.game.remove(this);
  }

  placeBomb() {
    const bomb = new Bomb ({
      context: this.context,
      dx: this.pos[0],
      dy: this.pos[1],
      dWidth: 50,
      dHeight: 50,
    });
    bomb.draw();
  }
}

export default Player;
