import Player from './player';
import { Bomb } from "./bomb";
import { brick } from './block';

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

  addPlayer1() {
    const player1 = new Player ({
      context: ctx,
      image: playerSheetImage,
      sx: 0,
      sy: playerSheetImage.height / 37 * 29,
      sWidth: playerWidth,
      sHeight: playerHeight,
      dx: 55,
      dy: 55,
      dWidth: 40,
      dHeight: 45,
    });

    this.add(player1);

    player1.render();
  }

  allObjects() {
    return [].concat(this.players, this.bombs);
  }

  draw(ctx) {
    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }
}

Game.DIM_X = 750;
Game.DIM_Y = 650;

export default Game;
