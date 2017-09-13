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
    this.moveDirs = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.dir = "";
    this.frameIndex = 0;
    this.numFrames = 4;
    this.frameCounter = 0;
  }

  changeFrame(timeChange) {
    this.frameCounter += 1;
    if (this.frameCounter % 25 === 0) {
      this.frameCounter = 1;
      this.frameIndex += 1;
      this.frameIndex = this.frameIndex % 3;
      this.getDir();
    }
  }

  getDir() {
    const min = 0;
    const max = 4;
    const randomGen = Math.floor(Math.random() * (max - min)) + min;
    const moveDirs = Object.keys(this.moveDirs);
    const dir = Object.keys(this.moveDirs)[randomGen];

    moveDirs.forEach((dir) => {
      this.moveDirs[dir] = false;
    });


    this.moveDirs[dir] = true;
    this.dir = dir;
  }

  move(timeChange) {
    const normalizedFrame = timeChange / (1000 / 60);

    this.changeFrame();

    switch (this.dir) {
      case "right":
      if ((this.pos[0] + 2 * normalizedFrame) < 660) {
        this.pos[0] += 2 * normalizedFrame;
      }
        break;
      case "left":
      if ((this.pos[0] - 2 * normalizedFrame) > 45) {
        this.pos[0] -= 2 * normalizedFrame;
      }
        break;
      case "down":
      if ((this.pos[1] + 2 * normalizedFrame) < 550) {
        this.pos[1] += 2 * normalizedFrame;
      }
        break;
      case "up":
      if ((this.pos[1] - 2 * normalizedFrame) > 50) {
        this.pos[1] -= 2 * normalizedFrame;
      }
        break;
    }

    this.dx = this.pos[0];
    this.dy = this.pos[1];
  }
}

export default Monster;
