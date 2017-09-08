/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Sprite {
  constructor(options) {
    this.image = options.image;
    this.pos = options.pos;
    this.sx = options.sx || 0;
    this.sy = options.sy || 0;
    this.sWidth = options.sWidth || options.width;
    this.sHeight = options.sHeight || options.height;
    this.dx = this.pos[0] || 0;
    this.dy = this.pos[1] || 0;
    this.dWidth = options.dWidth || options.width;
    this.dHeight = options.dHeight || options.height;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.sx,
      this.sy,
      this.sWidth,
      this.sHeight,
      this.dx,
      this.dy,
      this.dWidth,
      this.dHeight
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Sprite);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(0);


const bombSheetImage = new Image (391, 91);
bombSheetImage.src = "./assets/bomb_sheet.png";
const bombWidth = bombSheetImage.width / 13;
const bombHeight = bombSheetImage.height / 3;

class Bomb extends __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */] {
  constructor(options) {
    super(options);
    this.image = bombSheetImage;
    this.sx = 0;
    this.sy = 0;
    this.sWidth = bombWidth;
    this.sHeight = bombHeight;
    this.frameIndex = 0;
    this.numFrames = 3;
    this.counter = 2.5;
  }

  update() {
    if (this.counter > 0) {
      this.context.clearRect(
        this.dx,
        this.dy,
        this.dWidth,
        this.dHeight
      );

      this.frameIndex = this.frameIndex % this.numFrames;

      this.sx = 0;
      this.sy = (this.frameIndex * this.sHeight);

      this.draw();
    } else {
      this.context.clearRect(
        this.dx,
        this.dy,
        this.dWidth,
        this.dHeight
      );
      this.bombBlast();
    }
  }

  bombBlast() {
    this.context.drawImage(
      this.image,
      bombWidth * 2,
      bombHeight * 1,
      this.sWidth,
      this.sHeight,
      this.dx,
      this.dy,
      this.dWidth,
      this.dHeight
    );
    this.context.drawImage(
      this.image,
      bombWidth * 3,
      bombHeight * 1,
      this.sWidth,
      this.sHeight,
      this.dx + 25,
      this.dy,
      this.dWidth,
      this.dHeight
    );
    this.context.drawImage(
      this.image,
      bombWidth * 2,
      bombHeight * 0,
      this.sWidth,
      this.sHeight,
      this.dx,
      this.dy - 25,
      this.dWidth,
      this.dHeight
    );
    this.context.drawImage(
      this.image,
      bombWidth * 2,
      bombHeight * 2,
      this.sWidth,
      this.sHeight,
      this.dx,
      this.dy + 25,
      this.dWidth,
      this.dHeight
    );
    this.context.drawImage(
      this.image,
      bombWidth * 1,
      bombHeight * 1,
      this.sWidth,
      this.sHeight,
      this.dx - 25,
      this.dy,
      this.dWidth,
      this.dHeight
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Bomb);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view__ = __webpack_require__(5);


// import Player from './player';
// import { Bomb } from './bomb';
// import Sprite from './sprite';
// import { brick } from './blocks';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('game-container');
  // canvas.width = Game.DIM_X;
  // canvas.height = Game.DIM_Y;

  const ctx = canvas.getContext('2d');
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
  new __WEBPACK_IMPORTED_MODULE_1__game_view__["a" /* default */](game, ctx).start();

  document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 39: // right
      game.players[0].dir = "right";
      game.players[0].moveDirs.right = true;
      break;
      case 37: // left
      game.players[0].dir = "left";
      game.players[0].moveDirs.left = true;
      break;
      case 40: // down
      game.players[0].dir = "down";
      game.players[0].moveDirs.down = true;
      break;
      case 38: // up
      game.players[0].dir = "up";
      game.players[0].moveDirs.up = true;
      break;
      case 32: // space
      game.players[0].placeBomb();
    }
  });

  document.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
      case 39: // right
      game.players[0].moveDirs.right = false;
      break;
      case 37: // left
      game.players[0].moveDirs.left = false;
      break;
      case 40: // down
      game.players[0].moveDirs.down = false;
      break;
      case 38: // up
      game.players[0].moveDirs.up = false;
      break;
    }
  });

  // const brickImage = new Image ();
  // brickImage.src = "./assets/block.png";
  //
  // const brick = new Sprite({
  //   context: ctx,
  //   image: brickImage,
  //   sx: 2,
  //   sy: 1,
  //   sWidth: 32,
  //   sHeight: 32,
  //   dWidth: 50,
  //   dHeight: 50,
  // });
  //
  // const playerSheetImage = new Image (412, 1101);
  // playerSheetImage.src = "./assets/player_white.png";
  //
  // const player1 = new Player ({
  //   context: ctx,
  //   image: playerSheetImage,
  //   sx: 0,
  //   sy: playerSheetImage.height / 37 * 29,
  //   dx: 55,
  //   dy: 55,
  //   dWidth: 40,
  //   dHeight: 45,
  // });
  //
  // player1.render();
  //
  // window.setInterval(() => {
  //   player1.frameIndex += 1;
  //   if (Object.values(player1.moveDirs).some((move) => move === true )) {
  //     player1.update(player1.dir);
  //   }
  //
  //   player1.bombs.forEach((bomb) => {
  //     bomb.draw();
  //   });
  // }, 65);
  //
  // window.setInterval(() => {
  //   player1.bombs.forEach((bomb) => {
  //     bomb.frameIndex += 1;
  //     bomb.counter -= 0.5;
  //     bomb.update();
  //   });
  // }, 1000);
  //
  // document.addEventListener("keydown", (e) => {
  //   switch (e.keyCode) {
  //     case 39: // right
  //     player1.dir = "right";
  //     player1.moveDirs.right = true;
  //     break;
  //     case 37: // left
  //     player1.dir = "left";
  //     player1.moveDirs.left = true;
  //     break;
  //     case 40: // down
  //     player1.dir = "down";
  //     player1.moveDirs.down = true;
  //     break;
  //     case 38: // up
  //     player1.dir = "up";
  //     player1.moveDirs.up = true;
  //     break;
  //     case 32: // space
  //     player1.placeBomb();
  //   }
  // });
  //
  // document.addEventListener("keyup", (e) => {
  //   switch (e.keyCode) {
  //     case 39: // right
  //     player1.moveDirs.right = false;
  //     break;
  //     case 37: // left
  //     player1.moveDirs.left = false;
  //     break;
  //     case 40: // down
  //     player1.moveDirs.down = false;
  //     break;
  //     case 38: // up
  //     player1.moveDirs.up = false;
  //     break;
  //   }
  // });
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bomb__ = __webpack_require__(1);



const playerSheetImage = new Image (412, 1101);
playerSheetImage.src = "./assets/player_white.png";

class Player extends __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */] {
  constructor(options) {
    super(options);
    this.image = playerSheetImage;
    this.sWidth = 412 / 14;
    this.sHeight = 1101 / 38;
    this.moveDirs = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.dir = "down";
    this.frameIndex = 0;
    this.numFrames = 3;
    this.bombs = [];
    this.pos = options.pos;
    this.game = options.game;
  }

  move(timeChange, dir) {
    const normalizedFrame = timeChange / (1000 / 60);
    this.frameIndex = this.frameIndex % this.numFrames;

    switch (dir) {
      case "right":
      this.sy = (playerSheetImage.height / 37 * 30);
      this.sx = (playerSheetImage.width / 14 * 7) + (this.frameIndex * this.sWidth);
      this.pos[0] += 4 * normalizedFrame;
        break;
      case "left":
      this.sy = playerSheetImage.height / 37 * 29;
      this.sx = playerSheetImage.width / 14 * 7 + (this.frameIndex * this.sWidth);
      this.pos[0] -= 4 * normalizedFrame;
        break;
      case "down":
      this.sy = playerSheetImage.height / 37 * 29;
      this.sx = playerSheetImage.width / 14 * 0 + (this.frameIndex * this.sWidth);
      this.pos[1] += 4 * normalizedFrame;
        break;
      case "up":
      this.sy = playerSheetImage.height / 37 * 30;
      this.sx = playerSheetImage.width / 14 * 0 + (this.frameIndex * this.sWidth);
      this.pos[1] -= 4 * normalizedFrame;
        break;
    }
  }

  remove() {
    this.game.remove(this);
  }

  placeBomb() {
    const bomb = new __WEBPACK_IMPORTED_MODULE_1__bomb__["a" /* default */] ({
      context: this.context,
      dx: this.pos[0],
      dy: this.pos[1],
      dWidth: 50,
      dHeight: 50,
    });
    this.bombs.push(bomb);
    bomb.draw();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bomb__ = __webpack_require__(1);


// import { brick } from './blocks';

class Game {
  constructor() {
    this.players = [];
    this.bombs = [];

    this.addPlayer1();
  }

  add(object) {
    if (object instanceof __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */]) {
      this.players.push(object);
    }
  }

  isOutOfBounds(pos) {
    return (pos[0] < 50) || (pos[1] < 50) || (pos[0] > (Game.DIM_X - 50)) ||
      (pos[1] > (Game.DIM_Y - 50));
  }

  addPlayer1() {
    const player1 = new __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */] ({
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
    this.players[0].move(delta);
  }

  draw(ctx) {
    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

  remove(object) {
    if (object instanceof __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */]) {
      this.players.splice(this.players.indexOf(object), 1);
    }
  }
}

Game.DIM_X = 750;
Game.DIM_Y = 650;

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
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

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map