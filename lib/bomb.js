import Sprite from './sprite';

const bombSheetImage = new Image (391, 91);
bombSheetImage.src = "./assets/bomb_sheet.png";
const bombWidth = bombSheetImage.width / 13;
const bombHeight = bombSheetImage.height / 3;

class Bomb extends Sprite {
  constructor(options) {
    super(options);
    this.image = bombSheetImage;
    this.sx = 0;
    this.sy = 0;
    this.sWidth = bombWidth;
    this.sHeight = bombHeight;
    this.frameIndex = 0;
    this.numFrames = 3;
    this.counter = 5;
  }

  update() {
    this.context.clearRect(
      this.dx,
      this.dy,
      this.dWidth,
      this.dHeight
    );

    this.frameIndex = this.frameIndex % this.numFrames;

    this.sx = 0;
    this.sy = (this.frameIndex * this.sHeight);

    this.draw();
  }
}

export default Bomb;
