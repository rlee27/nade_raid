// import Game from './game';
// import GameView from './game_view';
import Player from './player';
import { Bomb } from './bomb';
import Sprite from './sprite';
// import { brick } from './blocks';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('game-container');
  // canvas.width = Game.DIM_X;
  // canvas.height = Game.DIM_Y;

  const ctx = canvas.getContext('2d');
  // const game = new Game();
  // new GameView(game, ctx).start();

  const brickImage = new Image ();
  brickImage.src = "./assets/block.png";

  const brick = new Sprite({
    context: ctx,
    image: brickImage,
    sx: 2,
    sy: 1,
    sWidth: 32,
    sHeight: 32,
    dWidth: 50,
    dHeight: 50,
  });

  const playerSheetImage = new Image (412, 1101);
  playerSheetImage.src = "./assets/player_white.png";

  const player1 = new Player ({
    context: ctx,
    image: playerSheetImage,
    sx: 0,
    sy: playerSheetImage.height / 37 * 29,
    dx: 55,
    dy: 55,
    dWidth: 40,
    dHeight: 45,
  });

  player1.render();

  window.setInterval(() => {
    player1.frameIndex += 1;
    if (Object.values(player1.moveDirs).some((move) => move === true )) {
      player1.update(player1.dir);
    }

    player1.bombs.forEach((bomb) => {
      bomb.draw();
    });
  }, 65);

  window.setInterval(() => {
    player1.bombs.forEach((bomb) => {
      bomb.frameIndex += 1;
      bomb.counter -= 0.5;
      bomb.update();
    });
  }, 1000);

  document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 39: // right
      player1.dir = "right";
      player1.moveDirs.right = true;
      break;
      case 37: // left
      player1.dir = "left";
      player1.moveDirs.left = true;
      break;
      case 40: // down
      player1.dir = "down";
      player1.moveDirs.down = true;
      break;
      case 38: // up
      player1.dir = "up";
      player1.moveDirs.up = true;
      break;
      case 32: // space
      player1.placeBomb();
    }
  });

  document.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
      case 39: // right
      player1.moveDirs.right = false;
      break;
      case 37: // left
      player1.moveDirs.left = false;
      break;
      case 40: // down
      player1.moveDirs.down = false;
      break;
      case 38: // up
      player1.moveDirs.up = false;
      break;
    }
  });
});
