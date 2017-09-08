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
    this.dir = "down";
    this.frameIndex = 0;
    this.numFrames = 3;
    this.bombs = [];
    this.pos = options.pos;
    this.game = options.game;
  }

  move(timeChange, dir) {
    const normalizedFrame = timeChange / (1000 / 60);
    this.frameIndex = this.frameIndex % this.numFrames;

    switch (dir) {
      case "right":
      this.sy = (playerSheetImage.height / 37 * 30);
      this.sx = (playerSheetImage.width / 14 * 7) + (this.frameIndex * this.sWidth);
      this.pos[0] += 4 * normalizedFrame;
        break;
      case "left":
      this.sy = playerSheetImage.height / 37 * 29;
      this.sx = playerSheetImage.width / 14 * 7 + (this.frameIndex * this.sWidth);
      this.pos[0] -= 4 * normalizedFrame;
        break;
      case "down":
      this.sy = playerSheetImage.height / 37 * 29;
      this.sx = playerSheetImage.width / 14 * 0 + (this.frameIndex * this.sWidth);
      this.pos[1] += 4 * normalizedFrame;
        break;
      case "up":
      this.sy = playerSheetImage.height / 37 * 30;
      this.sx = playerSheetImage.width / 14 * 0 + (this.frameIndex * this.sWidth);
      this.pos[1] -= 4 * normalizedFrame;
        break;
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
    this.bombs.push(bomb);
    bomb.draw();
  }
}

export default Player;
