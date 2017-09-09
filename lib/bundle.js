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
    this.game = options.game;
    this.pos = options.pos;
    this.sx = options.sx || 0;
    this.sy = options.sy || 0;
    this.sWidth = options.sWidth || options.width;
    this.sHeight = options.sHeight || options.height;
    this.dx = options.dx || this.pos[0];
    this.dy = options.dy || this.pos[1];
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blast__ = __webpack_require__(5);



const bombSheetImage = new Image (391, 91);
bombSheetImage.src = "./assets/bomb_sheet.png";
const bombWidth = bombSheetImage.width / 13;
const bombHeight = bombSheetImage.height / 3;

class Bomb extends __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */] {
  constructor(options) {
    super(options);
    this.image = bombSheetImage;
    this.sWidth = bombWidth;
    this.sHeight = bombHeight;
    this.dWidth = 50;
    this.dHeight = 50;
    this.frameIndex = 0;
    this.numFrames = 3;
    this.frameCounter = 0;
    this.timer = 10;
  }

  update() {
    this.frameCounter += 1;
    if (this.frameCounter % 15 === 0) {
      this.frameCounter = 1;
      this.frameIndex += 1;
      this.timer -= 1;
      this.frameIndex = this.frameIndex % 3;
    }

    this.sx = 0;
    this.sy = (this.frameIndex * this.sHeight);

    this.checkTimer();
  }

  checkTimer() {
    if (this.timer === 0) {
      this.game.remove(this);
      this.explode();
    }
  }

  explode() {
    const blast = new __WEBPACK_IMPORTED_MODULE_1__blast__["a" /* default */]({
      game: this.game,
      dx: this.dx,
      dy: this.dy,
    });

    this.game.add(blast);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Bomb);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view__ = __webpack_require__(6);


// import Player from './player';
// import { Bomb } from './bomb';
// import Sprite from './sprite';
// import { brick } from './blocks';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('game-container');

  const ctx = canvas.getContext('2d');
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
  new __WEBPACK_IMPORTED_MODULE_1__game_view__["a" /* default */](game, ctx).start();
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bomb__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blast__ = __webpack_require__(5);



// import { brick } from './blocks';

class Game {
  constructor() {
    this.bombs = [];
    this.players = [];
    this.blasts = [];

    this.addPlayer1();
    // this.addBlast();
  }

  add(object) {
    if (object instanceof __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */]) {
      this.players.push(object);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_1__bomb__["a" /* default */]) {
      this.bombs.push(object);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_2__blast__["a" /* default */]) {
      this.blasts.push(object);
    }
  }

  addBlast() {
    const blasts = new __WEBPACK_IMPORTED_MODULE_2__blast__["a" /* default */] ({
      game: this,
    });
    blasts.allSides.forEach((section) => {
      this.add(section);
    });
  }

  isOutOfBounds(pos) {
    return (pos[0] < 50) || (pos[1] < 50) || (pos[0] > (Game.DIM_X - 50)) ||
      (pos[1] > (Game.DIM_Y - 50));
  }

  addPlayer1() {
    const player1 = new __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */] ({
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
  }

  allObjects() {
    return [].concat(this.blasts, this.bombs, this.players);
  }

  updateBomb() {
    this.bombs.forEach((bomb) => {
      bomb.update();
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
    if (object instanceof __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */]) {
      this.players.splice(this.players.indexOf(object), 1);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_1__bomb__["a" /* default */]) {
      this.bombs.splice(this.bombs.indexOf(object), 1);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_2__blast__["a" /* default */]) {
      this.blasts.splice(this.blasts.indexOf(object), 1);
    }
  }
}

Game.DIM_X = 750;
Game.DIM_Y = 650;

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 4 */
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
    this.sx = -5;
    this.sWidth = 412 / 14;
    this.sHeight = 1101 / 38;
    this.moveDirs = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.dir = "";
    this.frameCounter = 0;
    this.frameIndex = 0;
    this.numFrames = 3;
    this.pos = options.pos;
  }

  move(timeChange) {
    const normalizedFrame = timeChange / (1000 / 60);

    this.checkFrame();

    switch (this.dir) {
      case "right":
      this.sy = (playerSheetImage.height / 37 * 30);
      this.sx = (playerSheetImage.width / 14 * 7) + (this.frameIndex * this.sWidth);
      this.pos[0] += 2 * normalizedFrame;
        break;
      case "left":
      this.sy = playerSheetImage.height / 37 * 29;
      this.sx = playerSheetImage.width / 14 * 7 + (this.frameIndex * this.sWidth);
      this.pos[0] -= 2 * normalizedFrame;
        break;
      case "down":
      this.sy = playerSheetImage.height / 37 * 29;
      this.sx = -5 + (playerSheetImage.width / 14 * 0) + (this.frameIndex * this.sWidth);
      this.pos[1] += 2 * normalizedFrame;
        break;
      case "up":
      this.sy = playerSheetImage.height / 37 * 30;
      this.sx = -5 + (playerSheetImage.width / 14 * 0) + (this.frameIndex * this.sWidth);
      this.pos[1] -= 2 * normalizedFrame;
        break;
    }

    this.dx = this.pos[0];
    this.dy = this.pos[1];
  }

  checkFrame(timeChange) {
    this.frameCounter += 1;
    if (this.frameCounter % 6 === 0) {
      this.frameCounter = 1;
      this.frameIndex += 1;
      this.frameIndex = this.frameIndex % 3;
    }
  }

  remove() {
    this.game.remove(this);
  }

  placeBomb() {
    const bomb = new __WEBPACK_IMPORTED_MODULE_1__bomb__["a" /* default */] ({
      pos: this.pos,
      game: this.game,
    });
    this.game.add(bomb);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(0);


const bombSheetImage = new Image (391, 91);
bombSheetImage.src = "./assets/bomb_sheet.png";

class Blast extends __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */] {
  constructor(options) {
    super(options);
    this.image = bombSheetImage;
    this.sWidth = 16;
    this.sHeight = 16;
    this.dWidth = 50;
    this.dHeight = 50;

    this.allSides = [];

    this.addCenter();
  }

  addSides() {

  }

  addUp() {

  }

  addCenter() {
    this.allSides.push(Blast.SPRITES.center[0]);
  }

  addDown() {

  }

  addLeft() {

  }

  addRight() {

  }

  addX() {

  }

  addY() {

  }

  drawAll(ctx) {
    this.allSides.forEach((spritePiece) => {
      ctx.drawImage(
        this.image,
        spritePiece.sx,
        spritePiece.sy,
        this.sWidth,
        this.sHeight,
        this.dx,
        this.dy,
        this.dWidth,
        this.dHeight
      );
    });
  }

  draw(ctx) {
    this.drawAll(ctx);
  }
}

let first, second, third, fourth;

Blast.SPRITES = {
  yExtensions: [
    first = { sx: 367, sy: 7 },
    second = { sx: 277, sy: 7 },
    third = { sx: 187, sy: 7 },
    fourth = { sx: 97, sy: 7 },
  ],

  xExtensions: [
    first = { sx: 367, sy: 67 },
    second = { sx: 277, sy: 67 },
    third = { sx: 187, sy: 67 },
    fourth = { sx: 97, sy: 67 },
  ],

  center: [
    first = { sx: 337, sy: 37 },
    second = { sx: 247, sy: 37 },
    third = { sx: 157, sy: 37 },
    fourth = { sx: 67, sy: 37 },
  ],

  left: [
    first = { sx: 307, sy: 37 },
    second = { sx: 217, sy: 37 },
    third = { sx: 127, sy: 37 },
    fourth = { sx: 37, sy: 37 },
  ],

  up: [
    first = { sx: 337, sy: 7 },
    second = { sx: 247, sy: 7 },
    third = { sx: 157, sy: 7 },
    fourth = { sx: 67, sy: 7 },
  ],

  down: [
    first = { sx: 337, sy: 67 },
    second = { sx: 247, sy: 67 },
    third = { sx: 157, sy: 68 },
    fourth = { sx: 67, sy: 69 },
  ],

  right: [
    first = { sx: 367, sy: 37 },
    second = { sx: 277, sy: 37 },
    third = { sx: 188, sy: 37 },
    fourth = { sx: 99, sy: 37 },
  ],
};

/* harmony default export */ __webpack_exports__["a"] = (Blast);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 39: // right
        this.game.players[0].dir = "right";
        this.game.players[0].moveDirs.right = true;
        break;
        case 37: // left
        this.game.players[0].dir = "left";
        this.game.players[0].moveDirs.left = true;
        break;
        case 40: // down
        this.game.players[0].dir = "down";
        this.game.players[0].moveDirs.down = true;
        break;
        case 38: // up
        this.game.players[0].dir = "up";
        this.game.players[0].moveDirs.up = true;
        break;
        case 32: // space
        this.game.players[0].placeBomb();
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.keyCode) {
        case 39: // right
        this.game.players[0].moveDirs.right = false;
        break;
        case 37: // left
        this.game.players[0].moveDirs.left = false;
        break;
        case 40: // down
        this.game.players[0].moveDirs.down = false;
        break;
        case 38: // up
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

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map