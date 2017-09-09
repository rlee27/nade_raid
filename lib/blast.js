import Sprite from './sprite';

const bombSheetImage = new Image (391, 91);
bombSheetImage.src = "./assets/bomb_sheet.png";

class Blast extends Sprite {
  constructor(options) {
    super(options);
    this.image = bombSheetImage;
    this.sWidth = 16;
    this.sHeight = 16;
    this.dWidth = 50;
    this.dHeight = 50;

    this.allSides = [];

    this.addCenter();
  }

  addSides() {

  }

  addUp() {

  }

  addCenter() {
    this.allSides.push(Blast.SPRITES.center[0]);
  }

  addDown() {

  }

  addLeft() {

  }

  addRight() {

  }

  addX() {

  }

  addY() {

  }

  drawAll(ctx) {
    this.allSides.forEach((spritePiece) => {
      ctx.drawImage(
        this.image,
        spritePiece.sx,
        spritePiece.sy,
        this.sWidth,
        this.sHeight,
        this.dx,
        this.dy,
        this.dWidth,
        this.dHeight
      );
    });
  }

  draw(ctx) {
    this.drawAll(ctx);
  }
}

let first, second, third, fourth;

Blast.SPRITES = {
  yExtensions: [
    first = { sx: 367, sy: 7 },
    second = { sx: 277, sy: 7 },
    third = { sx: 187, sy: 7 },
    fourth = { sx: 97, sy: 7 },
  ],

  xExtensions: [
    first = { sx: 367, sy: 67 },
    second = { sx: 277, sy: 67 },
    third = { sx: 187, sy: 67 },
    fourth = { sx: 97, sy: 67 },
  ],

  center: [
    first = { sx: 337, sy: 37 },
    second = { sx: 247, sy: 37 },
    third = { sx: 157, sy: 37 },
    fourth = { sx: 67, sy: 37 },
  ],

  left: [
    first = { sx: 307, sy: 37 },
    second = { sx: 217, sy: 37 },
    third = { sx: 127, sy: 37 },
    fourth = { sx: 37, sy: 37 },
  ],

  up: [
    first = { sx: 337, sy: 7 },
    second = { sx: 247, sy: 7 },
    third = { sx: 157, sy: 7 },
    fourth = { sx: 67, sy: 7 },
  ],

  down: [
    first = { sx: 337, sy: 67 },
    second = { sx: 247, sy: 67 },
    third = { sx: 157, sy: 68 },
    fourth = { sx: 67, sy: 69 },
  ],

  right: [
    first = { sx: 367, sy: 37 },
    second = { sx: 277, sy: 37 },
    third = { sx: 188, sy: 37 },
    fourth = { sx: 99, sy: 37 },
  ],
};

export default Blast;
