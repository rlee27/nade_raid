import Sprite from './sprite';
import Block from './blocks';

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

    this.radius = [];
  }

  addSides() {
    this.addUp();
    this.addCenter();
    this.addDown();
    this.addLeft();
    this.addRight();
  }

  addUp() {
    const options = Blast.SPRITES.up[this.frameIndex];
    options.game = this.game;
    options.dx = this.dx + options.offsetX;
    options.dy = this.dy + options.offsetY;
    const blast = new Blast(options);
    this.radius.push(blast);
  }

  addCenter() {
    const options = Blast.SPRITES.center[this.frameIndex];
    options.game = this.game;
    options.dx = this.dx + options.offsetX;
    options.dy = this.dy + options.offsetY;
    const blast = new Blast(options);
    this.radius.push(blast);
  }

  addDown() {
    const options = Blast.SPRITES.down[this.frameIndex];
    options.game = this.game;
    options.dx = this.dx + options.offsetX;
    options.dy = this.dy + options.offsetY;
    const blast = new Blast(options);
    this.radius.push(blast);
  }

  addLeft() {
    const options = Blast.SPRITES.left[this.frameIndex];
    options.game = this.game;
    options.dx = this.dx + options.offsetX;
    options.dy = this.dy + options.offsetY;
    const blast = new Blast(options);
    this.radius.push(blast);
  }

  addRight() {
    const options = Blast.SPRITES.right[this.frameIndex];
    options.game = this.game;
    options.dx = this.dx + options.offsetX;
    options.dy = this.dy + options.offsetY;
    const blast = new Blast(options);
    this.radius.push(blast);
  }

  collideWith(otherObj) {
    if (otherObj instanceof Block) {
      otherObj.collideWith(this);
      this.remove(this);
    }
  }

  remove(object) {
    this.radius.splice(this.radius.indexOf(object), 1);
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
      if (this.frameIndex > 3) {
        this.game.remove(this);
      } else {
        this.radius = [];
        this.addSides();
      }
    }
  }
}

let first, second, third, fourth;

Blast.SPRITES = {
  yExtensions: [
    first = { sx: 367, sy: 7, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    second = { sx: 277, sy: 7, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    third = { sx: 187, sy: 7, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    fourth = { sx: 97, sy: 7, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
  ],

  xExtensions: [
    first = { sx: 367, sy: 67, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    second = { sx: 277, sy: 67, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    third = { sx: 187, sy: 67, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    fourth = { sx: 97, sy: 67, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
  ],

  center: [
    first = { sx: 337, sy: 37, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    second = { sx: 247, sy: 37, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    third = { sx: 157, sy: 37, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    fourth = { sx: 67, sy: 37, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
  ],

  left: [
    first = { sx: 307, sy: 37, offsetX: -48.5, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    second = { sx: 217, sy: 37, offsetX: -49, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    third = { sx: 127, sy: 37, offsetX: -42, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    fourth = { sx: 37, sy: 37, offsetX: -42, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
  ],

  up: [
    first = { sx: 337, sy: 7, offsetX: 0, offsetY: -48.5, dx: undefined, dy: undefined, game: undefined },
    second = { sx: 247, sy: 7, offsetX: 0, offsetY: -49, dx: undefined, dy: undefined, game: undefined },
    third = { sx: 157, sy: 7, offsetX: 0, offsetY: -42, dx: undefined, dy: undefined, game: undefined },
    fourth = { sx: 67, sy: 7, offsetX: 0, offsetY: -42, dx: undefined, dy: undefined, game: undefined },
  ],

  down: [
    first = { sx: 337, sy: 67, offsetX: 0, offsetY: 48.5, dx: undefined, dy: undefined, game: undefined },
    second = { sx: 247, sy: 67, offsetX: 0, offsetY: 49, dx: undefined, dy: undefined, game: undefined },
    third = { sx: 157, sy: 67, offsetX: 0, offsetY: 42, dx: undefined, dy: undefined, game: undefined },
    fourth = { sx: 67, sy: 67, offsetX: 0, offsetY: 42, dx: undefined, dy: undefined, game: undefined },
  ],

  right: [
    first = { sx: 367, sy: 37, offsetX: 48.5, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    second = { sx: 277, sy: 37, offsetX: 49, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    third = { sx: 187, sy: 37, offsetX: 42, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    fourth = { sx: 97, sy: 37, offsetX: 42, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
  ],
};

export default Blast;
