import Player from './player';
import Bomb from './bomb';
import Blast from './blast';
import Block from './blocks';

class Game {
  constructor() {
    this.bombs = [];
    this.players = [];
    this.blasts = [];
    this.blocks = [];

    this.addWalls();
    this.addPlayer1();
  }

  add(object) {
    if (object instanceof Player) {
      this.players.push(object);
    } else if (object instanceof Bomb) {
      this.bombs.push(object);
    } else if (object instanceof Blast) {
      this.blasts.push(object);
    } else if (object instanceof Block) {
      this.blocks.push(object);
    }
  }

  remove(object) {
    if (object instanceof Player) {
      this.players.splice(this.players.indexOf(object), 1);
    } else if (object instanceof Bomb) {
      this.bombs.splice(this.bombs.indexOf(object), 1);
    } else if (object instanceof Blast) {
      this.blasts.splice(this.blasts.indexOf(object), 1);
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((object) => {
      if (object instanceof Blast) {
        object.radius.forEach((section) => {
          section.draw(ctx);
        });
      } else {
        object.draw(ctx);
      }
    });
  }

  allObjects() {
    return [].concat(this.blasts, this.bombs, this.players, this.blocks);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1 instanceof Blast) {
          this.checkBlastCollisions(obj2);
        } else if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      }
    }
  }

  checkBlastCollisions(otherObj) {
    let allBlasts = [];
    this.blasts.forEach((blast) => {
      allBlasts = allBlasts.concat(blast.radius);
    });

    allBlasts.forEach((blast) => {
      if (otherObj.isCollidedWith(blast)) {
        otherObj.collideWith(blast);
      }
    });
  }

  isOutOfBounds(pos) {
    return (pos[0] < 50) || (pos[1] < 50) || (pos[0] > (Game.DIM_X - 50)) ||
      (pos[1] > (Game.DIM_Y - 50));
  }

  addPlayer1() {
    const player1 = new Player ({
      game: this,
      sy: 1101 / 37 * 29,
      pos: [55, 55],
      dWidth: 40,
      dHeight: 45,
    });

    this.add(player1);
  }

  step(delta) {
    this.movePlayer(delta);
    this.updateBomb();
    this.updateBlast();
    this.checkCollisions();
  }

  updateBomb() {
    this.bombs.forEach((bomb) => {
      bomb.update();
    });
  }

  updateBlast() {
    this.blasts.forEach((blast) => {
      blast.update();
    });
  }

  movePlayer(delta) {
    if (Object.values(this.players[0].moveDirs).includes(true)) {
      this.players[0].move(delta);
    }
  }

  addWalls() {
    this.addHorizontalWalls();
    this.addVerticalWalls();
    this.addOnFieldWalls();
  }

  addHorizontalWalls() {
    let displayPosX = 0;
    let displayPosY = 0;
    for (let i = 0; i < 30; i++) {
      const wall = new Block({
        game: this,
        pos: [displayPosX, displayPosY],
      });

      this.add(wall);
      displayPosX += 50;
      if (displayPosX === 750) {
        displayPosX = 0;
        displayPosY = 600;
      }
    }
  }

  addVerticalWalls() {
    let displayPosX = 0;
    let displayPosY = 50;
    for (let i = 0; i < 22; i++) {
      const wall = new Block({
        game: this,
        pos: [displayPosX, displayPosY],
      });

      this.add(wall);
      displayPosY += 50;
      if (displayPosY === 600) {
        displayPosX = 700;
        displayPosY = 50;
      }
    }
  }

  addOnFieldWalls() {
    let displayPosX = 100;
    let displayPosY = 100;
    for (let i = 0; i < 30; i++) {
      const wall = new Block({
        game: this,
        pos: [displayPosX, displayPosY],
      });

      this.add(wall);
      displayPosY += 100;
      if (displayPosY === 600) {
        displayPosY = 100;
        displayPosX += 100;
      }
    }
  }
}

Game.DIM_X = 750;
Game.DIM_Y = 650;

export default Game;
