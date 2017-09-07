import Sprite from './sprite';

const bombSheetImage = new Image (376, 76);
bombSheetImage.src = "./assets/bomb_sheet.png";
const bombWidth = bombSheetImage.width / 13;
const bombHeight = bombSheetImage.height / 3;

class Bomb extends Sprite {
  constructor(options) {
    super(options);
    this.image = bombSheetImage;
    this.sWidth = bombWidth;
    this.sHeight = bombHeight;
    this.frameIndex = 0;
    this.numFrames = 3;
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
    this.sy = bombSheetImage.width / 13 + (this.frameIndex);

    this.draw();
  }
}

export default Bomb;