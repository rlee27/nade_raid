class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 39:
        this.game.players[0].dir = "right";
        this.game.players[0].moveDirs.right = true;
        break;
        case 37:
        this.game.players[0].dir = "left";
        this.game.players[0].moveDirs.left = true;
        break;
        case 40:
        this.game.players[0].dir = "down";
        this.game.players[0].moveDirs.down = true;
        break;
        case 38:
        this.game.players[0].dir = "up";
        this.game.players[0].moveDirs.up = true;
        break;
        case 32:
        this.game.players[0].placeBomb();
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.keyCode) {
        case 39:
        this.game.players[0].moveDirs.right = false;
        break;
        case 37:
        this.game.players[0].moveDirs.left = false;
        break;
        case 40:
        this.game.players[0].moveDirs.down = false;
        break;
        case 38:
        this.game.players[0].moveDirs.up = false;
        break;
      }
    });

    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeChange = time - this.lastTime;

    this.game.step(timeChange);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {

};

export default GameView;
