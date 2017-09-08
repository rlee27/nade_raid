import Player from './player';
import { Bomb } from "./bomb";
// import { brick } from './blocks';

class Game {
  constructor() {
    this.players = [];
    this.bombs = [];

    this.addPlayer1();
  }

  add(object) {
    if (object instanceof Player) {
      this.players.push(object);
    }
  }

  isOutOfBounds(pos) {
    return (pos[0] < 50) || (pos[1] < 50) || (pos[0] > (Game.DIM_X - 50)) ||
      (pos[1] > (Game.DIM_Y - 50));
  }

  addPlayer1() {
    const player1 = new Player ({
      game: this,
      sx: 0,
      sy: 1101 / 37 * 29,
      pos: [55, 55],
      dWidth: 40,
      dHeight: 45,
    });

    this.add(player1);
  }

  step(delta) {
    this.movePlayer(delta);
  }

  allObjects() {
    return [].concat(this.players, this.bombs);
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
    }
  }
}

Game.DIM_X = 750;
Game.DIM_Y = 650;

export default Game;
