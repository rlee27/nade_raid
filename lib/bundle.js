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
    this.context = options.context;
    this.image = options.image;
    this.sx = options.sx || 0;
    this.sy = options.sy || 0;
    this.sWidth = options.sWidth || options.width;
    this.sHeight = options.sHeight || options.height;
    this.dx = options.dx || 0;
    this.dy = options.dy || 0;
    this.dWidth = options.dWidth || options.width;
    this.dHeight = options.dHeight || options.height;
  }

  draw() {
    this.context.drawImage(
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

  render() {
    this.image.onload = () => {
      this.draw();
    };
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
    this.counter = 5;
  }

  update() {
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
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Bomb);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bomb__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sprite__ = __webpack_require__(0);
// import Game from './game';
// import GameView from './game_view';



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

  const brick = new __WEBPACK_IMPORTED_MODULE_2__sprite__["a" /* default */]({
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

  const player1 = new __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */] ({
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
  }

  update(dir) {
    this.context.clearRect(
      this.dx,
      this.dy,
      this.dWidth,
      this.dHeight
    );

    this.frameIndex = this.frameIndex % this.numFrames;

    switch (dir) {
      case "right":
      this.sy = (playerSheetImage.height / 37 * 30);
      this.sx = (playerSheetImage.width / 14 * 7) + (this.frameIndex * this.sWidth);
      this.dx += 4;
        break;
      case "left":
      this.sy = playerSheetImage.height / 37 * 29;
      this.sx = playerSheetImage.width / 14 * 7 + (this.frameIndex * this.sWidth);
      this.dx -= 4;
        break;
      case "down":
      this.sy = playerSheetImage.height / 37 * 29;
      this.sx = playerSheetImage.width / 14 * 0 + (this.frameIndex * this.sWidth);
      this.dy += 4;
        break;
      case "up":
      this.sy = playerSheetImage.height / 37 * 30;
      this.sx = playerSheetImage.width / 14 * 0 + (this.frameIndex * this.sWidth);
      this.dy -= 4;
        break;
    }


    this.draw();
  }

  placeBomb() {
    const bomb = new __WEBPACK_IMPORTED_MODULE_1__bomb__["a" /* default */] ({
      context: this.context,
      dx: this.dx,
      dy: this.dy,
      dWidth: 50,
      dHeight: 50,
    });
    this.bombs.push(bomb);
    bomb.draw();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map