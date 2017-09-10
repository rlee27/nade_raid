import Player from './player';
import Bomb from './bomb';
import Blast from './blast';
// import { brick } from './blocks';

class Game {
  constructor() {
    this.bombs = [];
    this.players = [];
    this.blasts = [];

    this.addPlayer1();
  }

  add(object) {
    if (object instanceof Player) {
      this.players.push(object);
    } else if (object instanceof Bomb) {
      this.bombs.push(object);
    } else if (object instanceof Blast) {
      this.blasts.push(object);
    }
  }

  isOutOfBounds(pos) {
    return (pos[0] < 50) || (pos[1] < 50) || (pos[0] > (Game.DIM_X - 50)) ||
      (pos[1] > (Game.DIM_Y - 50));
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      }
    }
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

  allObjects() {
    return [].concat(this.blasts, this.bombs, this.players);
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

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
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
}

Game.DIM_X = 750;
Game.DIM_Y = 650;

export default Game;
