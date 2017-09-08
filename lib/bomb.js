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
    this.frameIndex = 0;
    this.numFrames = 3;
    this.frameCounter = 0;
  }

  update() {
    this.frameCounter += 1;
    if (this.frameCounter % 15 === 0) {
      this.frameCounter = 1;
      this.frameIndex += 1;
      this.frameIndex = this.frameIndex % 3;
    }

    this.sx = 0;
    this.sy = (this.frameIndex * this.sHeight);
  }

  // bombBlast() {
  //   this.context.drawImage(
  //     this.image,
  //     bombWidth * 2,
  //     bombHeight * 1,
  //     this.sWidth,
  //     this.sHeight,
  //     this.dx,
  //     this.dy,
  //     this.dWidth,
  //     this.dHeight
  //   );
  //   this.context.drawImage(
  //     this.image,
  //     bombWidth * 3,
  //     bombHeight * 1,
  //     this.sWidth,
  //     this.sHeight,
  //     this.dx + 25,
  //     this.dy,
  //     this.dWidth,
  //     this.dHeight
  //   );
  //   this.context.drawImage(
  //     this.image,
  //     bombWidth * 2,
  //     bombHeight * 0,
  //     this.sWidth,
  //     this.sHeight,
  //     this.dx,
  //     this.dy - 25,
  //     this.dWidth,
  //     this.dHeight
  //   );
  //   this.context.drawImage(
  //     this.image,
  //     bombWidth * 2,
  //     bombHeight * 2,
  //     this.sWidth,
  //     this.sHeight,
  //     this.dx,
  //     this.dy + 25,
  //     this.dWidth,
  //     this.dHeight
  //   );
  //   this.context.drawImage(
  //     this.image,
  //     bombWidth * 1,
  //     bombHeight * 1,
  //     this.sWidth,
  //     this.sHeight,
  //     this.dx - 25,
  //     this.dy,
  //     this.dWidth,
  //     this.dHeight
  //   );
  // }
}

export default Bomb;
