import Sprite from './sprite';
import Blast from './blast';

const brickImage = new Image ();
brickImage.src = "./assets/tile_sheet.png";

class Block extends Sprite {
  constructor(options) {
    super(options);
    this.image = brickImage;
    this.sWidth = 15;
    this.sHeight = 15;
    this.dWidth = 50;
    this.dHeight = 50;
    this.counter = 81;
    this.isDestructable = options.isDestructable || false;
    this.isHit = false;
    this.frameIndex = 0;
    this.numFrames = 6;
    this.frameCounter = 0;
  }

  collideWith(otherObj) {
    if (otherObj instanceof Blast && this.isDestructable) {
      this.isHit = true;
    }
  }

  checkTimer() {
    if (this.frameIndex === 5) {
      this.game.remove(this);
    }
  }

  update() {
    if (this.isHit) {
      this.frameCounter += 1;
      if (this.frameCounter % 10 === 0) {
        this.frameCounter = 1;
        this.frameIndex += 1;
        this.sx += 30;
      }
    }
    this.checkTimer();
  }
}

export default Block;
