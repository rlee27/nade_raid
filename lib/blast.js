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
    this.frameIndex = 0;
    this.frameCounter = 0;

    this.allSides = [];

    this.addSides();
  }

  addSides() {
    this.addUp();
    this.addCenter();
    this.addDown();
    this.addLeft();
    this.addRight();
  }

  addUp() {
    this.allSides.push(Blast.SPRITES.up[this.frameIndex]);
  }

  addCenter() {
    this.allSides.push(Blast.SPRITES.center[this.frameIndex]);
  }

  addDown() {
    this.allSides.push(Blast.SPRITES.down[this.frameIndex]);
  }

  addLeft() {
    this.allSides.push(Blast.SPRITES.left[this.frameIndex]);
  }

  addRight() {
    this.allSides.push(Blast.SPRITES.right[this.frameIndex]);
  }

  addX() {

  }

  addY() {

  }

  update() {
    this.frameCounter += 1;
    if (this.frameCounter % 10 === 0) {
      this.frameCounter = 1;
      this.frameIndex += 1;
      this.allSides = [];
      this.addSides();
    }

    if (this.frameIndex > 3) {
      this.game.remove(this);
    }
  }

  drawAll(ctx) {
    this.allSides.forEach((spritePiece) => {
      ctx.drawImage(
        this.image,
        spritePiece.sx,
        spritePiece.sy,
        this.sWidth,
        this.sHeight,
        this.dx + spritePiece.offsetX,
        this.dy + spritePiece.offsetY,
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
    first = { sx: 367, sy: 7, offsetX: 0, offsetY: 0 },
    second = { sx: 277, sy: 7, offsetX: 0, offsetY: 0 },
    third = { sx: 187, sy: 7, offsetX: 0, offsetY: 0 },
    fourth = { sx: 97, sy: 7, offsetX: 0, offsetY: 0 },
  ],

  xExtensions: [
    first = { sx: 367, sy: 67, offsetX: 0, offsetY: 0 },
    second = { sx: 277, sy: 67, offsetX: 0, offsetY: 0 },
    third = { sx: 187, sy: 67, offsetX: 0, offsetY: 0 },
    fourth = { sx: 97, sy: 67, offsetX: 0, offsetY: 0 },
  ],

  center: [
    first = { sx: 337, sy: 37, offsetX: 0, offsetY: 0 },
    second = { sx: 247, sy: 37, offsetX: 0, offsetY: 0 },
    third = { sx: 157, sy: 37, offsetX: 0, offsetY: 0 },
    fourth = { sx: 67, sy: 37, offsetX: 0, offsetY: 0 },
  ],

  left: [
    first = { sx: 307, sy: 37, offsetX: -48.5, offsetY: 0 },
    second = { sx: 217, sy: 37, offsetX: -49, offsetY: 0 },
    third = { sx: 127, sy: 37, offsetX: -42, offsetY: 0 },
    fourth = { sx: 37, sy: 37, offsetX: -42, offsetY: 0 },
  ],

  up: [
    first = { sx: 337, sy: 7, offsetX: 0, offsetY: -48.5 },
    second = { sx: 247, sy: 7, offsetX: 0, offsetY: -49 },
    third = { sx: 157, sy: 7, offsetX: 0, offsetY: -42 },
    fourth = { sx: 67, sy: 7, offsetX: 0, offsetY: -42 },
  ],

  down: [
    first = { sx: 337, sy: 67, offsetX: 0, offsetY: 48.5 },
    second = { sx: 247, sy: 67, offsetX: 0, offsetY: 49 },
    third = { sx: 157, sy: 67, offsetX: 0, offsetY: 42 },
    fourth = { sx: 67, sy: 67, offsetX: 0, offsetY: 42 },
  ],

  right: [
    first = { sx: 367, sy: 37, offsetX: 48.5, offsetY: 0 },
    second = { sx: 277, sy: 37, offsetX: 49, offsetY: 0 },
    third = { sx: 187, sy: 37, offsetX: 42, offsetY: 0 },
    fourth = { sx: 97, sy: 37, offsetX: 42, offsetY: 0 },
  ],
};

export default Blast;
