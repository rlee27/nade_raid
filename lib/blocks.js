import Sprite from './sprite';

const brickImage = new Image ();
brickImage.src = "./assets/tile_sheet.png";

class Block extends Sprite {
  constructor(options) {
    super(options);
    this.image = brickImage;
    this.sx = 29;
    this.sWidth = 15;
    this.sHeight = 15;
    this.dWidth = 50;
    this.dHeight = 50;
    this.counter = 81;
  }
}

export default Block;
