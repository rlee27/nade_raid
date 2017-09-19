import Game from './game';
import GameView from './game_view';
// import Player from './player';
// import { Bomb } from './bomb';
// import Sprite from './sprite';
// import { brick } from './blocks';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('game-container');

  const ctx = canvas.getContext('2d');
  window.startGame = (e) => {
    if (e.keyCode === 13) {
      document.removeEventListener('keypress', window.startGame);
      const game = new Game();
      new GameView(game, ctx).start();
    }
  };

  document.addEventListener('keypress', window.startGame);

});
