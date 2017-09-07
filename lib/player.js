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
  }

  update(dir) {
    this.context.clearRect(
      this.dx,
      this.dy,
      this.dWidth,
      this.dHeight
    );

    this.frameIndex = this.frameIndex % this.numFrames;

    switch (dir) {
      case "right":
      this.sy = (playerSheetImage.height / 37 * 30);
      this.sx = (playerSheetImage.width / 14 * 7) + (this.frameIndex * this.sWidth);
      this.dx += 4;
        break;
      case "left":
      this.sy = playerSheetImage.height / 37 * 29;
      this.sx = playerSheetImage.width / 14 * 7 + (this.frameIndex * this.sWidth);
      this.dx -= 4;
        break;
      case "down":
      this.sy = playerSheetImage.height / 37 * 29;
      this.sx = playerSheetImage.width / 14 * 0 + (this.frameIndex * this.sWidth);
      this.dy += 4;
        break;
      case "up":
      this.sy = playerSheetImage.height / 37 * 30;
      this.sx = playerSheetImage.width / 14 * 0 + (this.frameIndex * this.sWidth);
      this.dy -= 4;
        break;
    }


    this.draw();
  }

  placeBomb() {
    const bomb = new Bomb ({
      context: this.context,
      dx: this.dx,
      dy: this.dy,
      dWidth: 50,
      dHeight: 50,
    });
    this.bombs.push(bomb);
    bomb.draw();
  }
}

export default Player;
