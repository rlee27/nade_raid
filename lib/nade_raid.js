import Game from './game';
import GameView from './game_view';
// import Player from './player';
// import { Bomb } from './bomb';
// import Sprite from './sprite';
// import { brick } from './blocks';


document.addEventListener("DOMContentLoaded", () => {
  const storyModal = document.getElementById('story-modal');
  const lostModal = document.getElementById('game-lost-modal');
  const btn = document.getElementById('story-btn');
  const canvas = document.getElementById('game-canvas');
  const closer = document.getElementsByClassName('close');

  lostModal.style.display = "none";

  btn.onclick = function() {
    if (storyModal.style.display === "none") {
      storyModal.style.display = "block";
    } else {
      storyModal.style.display = "none";
    }
  };

  storyModal.children[0].onclick = function(e) {
    storyModal.style.display = "none";
  };

  storyModal.onclick = function(e) {
    if (e.target === storyModal) {
      storyModal.style.display = "none";
    }
  };

  closer[0].onclick = function() {
    storyModal.style.display = "none";
  };

  const ctx = canvas.getContext('2d');
  window.startGame = (e) => {
    if (e.keyCode === 13 &&
        storyModal.style.display === "none" &&
        lostModal.style.display === "none") {
          document.removeEventListener('keypress', window.startGame);
          const game = new Game();
          new GameView(game, ctx).start();
    }
  };

  document.addEventListener('keypress', window.startGame);

});
