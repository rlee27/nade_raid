import Sprite from './sprite';

const monsterImage = new Image (406, 136);
monsterImage.src = "./assets/monsters.png";

class Monster extends Sprite {
  constructor(options) {
    super(options);

    this.image = monsterImage;
    this.sWidth = 406 / 14;
    this.sHeight = 136 / 5;
    this.dWidth = 50;
    this.dHeight = 50;
    this.frameIndex = 0;
    this.numFrames = 6;
    this.frameCounter = 0;
  }

}

export default Monster;
