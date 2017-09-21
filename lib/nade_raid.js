import Game from './game';
import GameView from './game_view';
// import Player from './player';
// import { Bomb } from './bomb';
// import Sprite from './sprite';
// import { brick } from './blocks';


document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById('story-modal');
  const btn = document.getElementById('story-btn');
  const canvas = document.getElementById('game-canvas');
  const closer = document.getElementsByClassName('close');

  btn.onclick = function() {
    if (modal.style.display === "block") {
      modal.style.display = "none";
    } else {
      modal.style.display = "block";
    }
  };

  window.onclick = function(e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };

  closer[0].onclick = function() {
    modal.style.display = "none";
  };

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
