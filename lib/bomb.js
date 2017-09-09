import Sprite from './sprite';

const bombSheetImage = new Image (391, 91);
bombSheetImage.src = "./assets/bomb_sheet.png";
const bombWidth = bombSheetImage.width / 13;
const bombHeight = bombSheetImage.height / 3;

class Bomb extends Sprite {
  constructor(options) {
    super(options);
    this.image = bombSheetImage;
    this.sWidth = bombWidth;
    this.sHeight = bombHeight;
    this.dWidth = 50;
    this.dHeight = 50;
    this.frameIndex = 0;
    this.numFrames = 3;
    this.frameCounter = 0;
    this.timer = 10;
  }

  update() {
    this.frameCounter += 1;
    if (this.frameCounter % 15 === 0) {
      this.frameCounter = 1;
      this.frameIndex += 1;
      this.timer -= 1;
      this.frameIndex = this.frameIndex % 3;
    }

    this.sx = 0;
    this.sy = (this.frameIndex * this.sHeight);

    this.checkTimer();
  }

  checkTimer() {
    if (this.timer === 0) {
      this.game.remove(this);
    }
  }
}

export default Bomb;
