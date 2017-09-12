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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// const distance = (obj1, obj2) => {
//   return Math.sqrt(
//     Math.pow(obj1.dx - obj2.dx, 2) +
//     Math.pow(obj1.dy - obj2.dy, 2)
//   );
// };

class Sprite {
  constructor(options) {
    this.image = options.image;
    this.game = options.game;
    this.pos = options.pos || [options.dx, options.dy];
    this.sx = options.sx || 0;
    this.sy = options.sy || 0;
    this.sWidth = options.sWidth || options.width;
    this.sHeight = options.sHeight || options.height;
    this.dx = options.dx || this.pos[0];
    this.dy = options.dy || this.pos[1];
    this.dWidth = options.dWidth || options.width;
    this.dHeight = options.dHeight || options.height;
  }

  isCollidedWith(otherObj) {
    if (this.dx < otherObj.dx + otherObj.dWidth &&
        this.dx + this.dWidth > otherObj.dx &&
        this.dy < otherObj.dy + otherObj.dHeight &&
        this.dy + this.dHeight > otherObj.dy) {
          return true;
        } else {
          return false;
        }
  }

  collideWith(otherObj) {

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

  nearestCell() {
    const cellCoords = [];
    const maxX = Math.round((this.dx + this.dWidth) / 50) * 50;
    const maxY =  Math.round((this.dy + this.dHeight) / 50) * 50;
    const minX = maxX - 50;
    const minY = maxY - 50;
    const xCoord = maxX - this.dx < this.dx - minX ? maxX : minX;
    const yCoord = maxY - this.dy < this.dy - minY ? maxY : minY;

    return [xCoord, yCoord];
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

class Blast extends __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */] {
  constructor(options) {
    super(options);
    this.image = bombSheetImage;
    this.sWidth = 16;
    this.sHeight = 16;
    this.dWidth = 50;
    this.dHeight = 50;
    this.frameIndex = 0;
    this.frameCounter = 0;

    this.radius = [];
  }

  addSides() {
    this.addUp();
    this.addCenter();
    this.addDown();
    this.addLeft();
    this.addRight();
  }

  addUp() {
    const options = Blast.SPRITES.up[this.frameIndex];
    options.game = this.game;
    options.dx = this.dx + options.offsetX;
    options.dy = this.dy + options.offsetY;
    const blast = new Blast(options);
    this.radius.push(blast);
  }

  addCenter() {
    const options = Blast.SPRITES.center[this.frameIndex];
    options.game = this.game;
    options.dx = this.dx + options.offsetX;
    options.dy = this.dy + options.offsetY;
    const blast = new Blast(options);
    this.radius.push(blast);
  }

  addDown() {
    const options = Blast.SPRITES.down[this.frameIndex];
    options.game = this.game;
    options.dx = this.dx + options.offsetX;
    options.dy = this.dy + options.offsetY;
    const blast = new Blast(options);
    this.radius.push(blast);
  }

  addLeft() {
    const options = Blast.SPRITES.left[this.frameIndex];
    options.game = this.game;
    options.dx = this.dx + options.offsetX;
    options.dy = this.dy + options.offsetY;
    const blast = new Blast(options);
    this.radius.push(blast);
  }

  addRight() {
    const options = Blast.SPRITES.right[this.frameIndex];
    options.game = this.game;
    options.dx = this.dx + options.offsetX;
    options.dy = this.dy + options.offsetY;
    const blast = new Blast(options);
    this.radius.push(blast);
  }

  addX() {

  }

  addY() {

  }

  update() {
    this.frameCounter += 1;
    if (this.frameCounter % 10 === 0) {
      this.frameCounter = 1;
      this.frameIndex += 1;
      if (this.frameIndex > 3) {
        this.game.remove(this);
      } else {
        this.radius = [];
        this.addSides();
      }
    }
  }
}

let first, second, third, fourth;

Blast.SPRITES = {
  yExtensions: [
    first = { sx: 367, sy: 7, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    second = { sx: 277, sy: 7, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    third = { sx: 187, sy: 7, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    fourth = { sx: 97, sy: 7, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
  ],

  xExtensions: [
    first = { sx: 367, sy: 67, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    second = { sx: 277, sy: 67, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    third = { sx: 187, sy: 67, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    fourth = { sx: 97, sy: 67, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
  ],

  center: [
    first = { sx: 337, sy: 37, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    second = { sx: 247, sy: 37, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    third = { sx: 157, sy: 37, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    fourth = { sx: 67, sy: 37, offsetX: 0, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
  ],

  left: [
    first = { sx: 307, sy: 37, offsetX: -48.5, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    second = { sx: 217, sy: 37, offsetX: -49, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    third = { sx: 127, sy: 37, offsetX: -42, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    fourth = { sx: 37, sy: 37, offsetX: -42, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
  ],

  up: [
    first = { sx: 337, sy: 7, offsetX: 0, offsetY: -48.5, dx: undefined, dy: undefined, game: undefined },
    second = { sx: 247, sy: 7, offsetX: 0, offsetY: -49, dx: undefined, dy: undefined, game: undefined },
    third = { sx: 157, sy: 7, offsetX: 0, offsetY: -42, dx: undefined, dy: undefined, game: undefined },
    fourth = { sx: 67, sy: 7, offsetX: 0, offsetY: -42, dx: undefined, dy: undefined, game: undefined },
  ],

  down: [
    first = { sx: 337, sy: 67, offsetX: 0, offsetY: 48.5, dx: undefined, dy: undefined, game: undefined },
    second = { sx: 247, sy: 67, offsetX: 0, offsetY: 49, dx: undefined, dy: undefined, game: undefined },
    third = { sx: 157, sy: 67, offsetX: 0, offsetY: 42, dx: undefined, dy: undefined, game: undefined },
    fourth = { sx: 67, sy: 67, offsetX: 0, offsetY: 42, dx: undefined, dy: undefined, game: undefined },
  ],

  right: [
    first = { sx: 367, sy: 37, offsetX: 48.5, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    second = { sx: 277, sy: 37, offsetX: 49, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    third = { sx: 187, sy: 37, offsetX: 42, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
    fourth = { sx: 97, sy: 37, offsetX: 42, offsetY: 0, dx: undefined, dy: undefined, game: undefined },
  ],
};

/* harmony default export */ __webpack_exports__["a"] = (Blast);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blast__ = __webpack_require__(1);



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

    blast.addSides();
    this.game.add(blast);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Bomb);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blast__ = __webpack_require__(1);



const brickImage = new Image ();
brickImage.src = "./assets/tile_sheet.png";

class Block extends __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */] {
  constructor(options) {
    super(options);
    this.image = brickImage;
    this.sWidth = 15;
    this.sHeight = 15;
    this.dWidth = 50;
    this.dHeight = 50;
    this.counter = 81;
    this.isDestructable = options.isDestructable || false;
    this.isHit = false;
    this.frameIndex = 0;
    this.numFrames = 6;
    this.frameCounter = 0;
  }

  collideWith(otherObj) {
    if (otherObj instanceof __WEBPACK_IMPORTED_MODULE_1__blast__["a" /* default */] && this.isDestructable) {
      this.isHit = true;
    }
  }

  checkTimer() {
    if (this.frameIndex === 5) {
      this.game.remove(this);
    }
  }

  update() {
    if (this.isHit) {
      this.frameCounter += 1;
      if (this.frameCounter % 10 === 0) {
        this.frameCounter = 1;
        this.frameIndex += 1;
        this.sx += 30;
      }
    }
    this.checkTimer();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Block);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view__ = __webpack_require__(7);


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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bomb__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blast__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__blocks__ = __webpack_require__(3);





class Game {
  constructor() {
    this.bombs = [];
    this.players = [];
    this.blasts = [];
    this.blocks = [];

    this.addWalls();
    this.addBricks();
    this.addPlayer1();
  }

  add(object) {
    if (object instanceof __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */]) {
      this.players.push(object);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_1__bomb__["a" /* default */]) {
      this.bombs.push(object);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_2__blast__["a" /* default */]) {
      this.blasts.push(object);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_3__blocks__["a" /* default */]) {
      this.blocks.push(object);
    }
  }

  remove(object) {
    if (object instanceof __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */]) {
      this.players.splice(this.players.indexOf(object), 1);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_1__bomb__["a" /* default */]) {
      this.bombs.splice(this.bombs.indexOf(object), 1);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_2__blast__["a" /* default */]) {
      this.blasts.splice(this.blasts.indexOf(object), 1);
    } else if (object instanceof __WEBPACK_IMPORTED_MODULE_3__blocks__["a" /* default */]) {
      this.blocks.splice(this.blocks.indexOf(object), 1);
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((object) => {
      if (object instanceof __WEBPACK_IMPORTED_MODULE_2__blast__["a" /* default */]) {
        object.radius.forEach((section) => {
          section.draw(ctx);
        });
      } else {
        object.draw(ctx);
      }
    });
  }

  allObjects() {
    return [].concat(this.blasts, this.bombs, this.players, this.blocks);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1 instanceof __WEBPACK_IMPORTED_MODULE_2__blast__["a" /* default */]) {
          this.checkBlastCollisions(obj2);
        } else if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      }
    }
  }

  checkBlastCollisions(otherObj) {
    let allBlasts = [];
    this.blasts.forEach((blast) => {
      allBlasts = allBlasts.concat(blast.radius);
    });

    allBlasts.forEach((blast) => {
      if (otherObj.isCollidedWith(blast)) {
        otherObj.collideWith(blast);
      }
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
    this.checkCollisions();
    this.movePlayer(delta);
    this.updateBomb();
    this.updateBlast();
    this.updateBlocks();
  }

  updateBlocks() {
    this.blocks.forEach((block) => {
      block.update();
    });
  }

  updateBomb() {
    this.bombs.forEach((bomb) => {
      bomb.update();
    });
  }

  updateBlast() {
    this.blasts.forEach((blast) => {
      blast.update();
    });
  }

  movePlayer(delta) {
    if (this.players[0].playerMoving()) {
      this.players[0].move(delta);
    }
  }

  addWalls() {
    this.addHorizontalWalls();
    this.addVerticalWalls();
    this.addOnFieldWalls();
  }

  addHorizontalWalls() {
    let displayPosX = 0;
    let displayPosY = 0;
    for (let i = 0; i < 30; i++) {
      const wall = new __WEBPACK_IMPORTED_MODULE_3__blocks__["a" /* default */]({
        game: this,
        pos: [displayPosX, displayPosY],
        sx: 29,
      });

      this.add(wall);
      displayPosX += 50;
      if (displayPosX === 750) {
        displayPosX = 0;
        displayPosY = 600;
      }
    }
  }

  addVerticalWalls() {
    let displayPosX = 0;
    let displayPosY = 50;
    for (let i = 0; i < 22; i++) {
      const wall = new __WEBPACK_IMPORTED_MODULE_3__blocks__["a" /* default */]({
        game: this,
        pos: [displayPosX, displayPosY],
        sx: 29,
      });

      this.add(wall);
      displayPosY += 50;
      if (displayPosY === 600) {
        displayPosX = 700;
        displayPosY = 50;
      }
    }
  }

  addOnFieldWalls() {
    let displayPosX = 100;
    let displayPosY = 100;
    for (let i = 0; i < 30; i++) {
      const wall = new __WEBPACK_IMPORTED_MODULE_3__blocks__["a" /* default */]({
        game: this,
        sx: 29,
        pos: [displayPosX, displayPosY],
      });

      this.add(wall);
      displayPosY += 100;
      if (displayPosY === 600) {
        displayPosY = 100;
        displayPosX += 100;
      }
    }
  }

  addBricks() {
    this.possibleBrickPos().forEach((pos) => {
      const brick = new __WEBPACK_IMPORTED_MODULE_3__blocks__["a" /* default */] ({
        game: this,
        sx: 59,
        pos: pos,
        isDestructable: true,
      });

      this.add(brick);
    });
  }

  getRandomPos(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min) * 50;
  }

  restrictedBrickPos() {
    return [
      [50, 50],
      [50, 100],
      [100, 50],
      [50, 550],
      [50, 500],
      [100, 550],
      [650, 50],
      [650, 100],
      [600, 50],
      [650, 550],
      [650, 500],
      [600, 550]
    ];
  }

  allPos() {
    let positions = [];
    const xCoords = this.possibleXCoords();

    this.allObjects().forEach((obj) => {
      positions.push(obj.pos);
    });

    positions = positions.concat(this.restrictedBrickPos());

    positions.forEach((pos) => {
      xCoords[pos[0]].push(pos[1]);
    });

    return xCoords;
  }

  takenPos(pos) {
    return this.allPos()[pos[0]].includes(pos[1]);
  }

  possibleBrickPos() {
    const possiblePos = [];
    const usedPos = this.possibleXCoords();

    while (possiblePos.length < 80) {
      const pos = [this.getRandomPos(1, 14), this.getRandomPos(1, 12)];
      if (this.takenPos(pos) === false && !usedPos[pos[0]].includes(pos[1])) {
        usedPos[pos[0]].push(pos[1]);
        possiblePos.push(pos);
      }
    }

    return possiblePos;
  }

  possibleXCoords() {
    const xCoords = {};
    let counter = 0;

    while (counter < 750) {
      xCoords[counter] = [];
      counter += 50;
    }

    return xCoords;
  }
}

Game.DIM_X = 750;
Game.DIM_Y = 650;

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bomb__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blast__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__blocks__ = __webpack_require__(3);





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
      if ((this.pos[0] + 2 * normalizedFrame) < 660) {
        this.pos[0] += 2 * normalizedFrame;
      }
        break;
      case "left":
      this.sy = playerSheetImage.height / 37 * 29;
      this.sx = playerSheetImage.width / 14 * 7 + (this.frameIndex * this.sWidth);
      if ((this.pos[0] - 2 * normalizedFrame) > 45) {
        this.pos[0] -= 2 * normalizedFrame;
      }
        break;
      case "down":
      this.sy = playerSheetImage.height / 37 * 29;
      this.sx = -5 + (playerSheetImage.width / 14 * 0) + (this.frameIndex * this.sWidth);
      if ((this.pos[1] + 2 * normalizedFrame) < 550) {
        this.pos[1] += 2 * normalizedFrame;
      }
        break;
      case "up":
      this.sy = playerSheetImage.height / 37 * 30;
      this.sx = -5 + (playerSheetImage.width / 14 * 0) + (this.frameIndex * this.sWidth);
      if ((this.pos[1] - 2 * normalizedFrame) > 50) {
        this.pos[1] -= 2 * normalizedFrame;
      }
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

  collideWith(otherObj) {
    if (otherObj instanceof __WEBPACK_IMPORTED_MODULE_2__blast__["a" /* default */]) {
      this.remove();
    } else if (otherObj instanceof __WEBPACK_IMPORTED_MODULE_3__blocks__["a" /* default */]) {
      this.wallCollision(otherObj);
    }
  }

  wallCollision(otherObj) {
    const wallLeft = otherObj.dx;
    const wallRight = otherObj.dx + otherObj.dWidth;
    const wallTop = otherObj.dy;
    const wallBot = otherObj.dy + otherObj.dHeight;
    const playerLeft = this.dx;
    const playerRight = this.dx + this.dWidth;
    const playerTop = this.dy;
    const playerBot = this.dy + this.dHeight;

    if (playerRight > wallLeft && playerRight / 2 < wallRight / 2) {
      if (playerBot > wallTop && playerBot < wallBot) {
        if (Math.round(playerRight) <= wallLeft + 2) {
          this.pos[0] = wallLeft - this.dWidth;
          if (this.playerMoving()) {
            this.pos[1] -= 2;
          }
        } else {
          if (this.playerMoving()) {
            this.pos[0] -= 2;
          }
          this.pos[1] = wallTop - this.dHeight;
        }
      } else {
        if (Math.round(playerRight) <= wallLeft + 2) {
          this.pos[0] = wallLeft - this.dWidth;
          if (this.playerMoving()) {
            this.pos[1] += 2;
          }
        } else {
          if (this.playerMoving()) {
            this.pos[0] -= 2;
          }
          this.pos[1] = wallBot;
        }
      }
    } else if (playerLeft < wallRight && playerRight > wallRight) {
      if (playerBot > wallTop && playerBot < wallBot) {
        if (Math.round(playerLeft) >= wallRight - 2) {
          this.pos[0] = wallRight;
          if (this.playerMoving()) {
            this.pos[1] -= 2;
          }
        } else {
          if (this.playerMoving()) {
            this.pos[0] += 2;
          }
          this.pos[1] = wallTop - this.dHeight;
        }
      } else {
        if (Math.round(playerLeft) >= wallRight - 2) {
          this.pos[0] = wallRight;
          if (this.playerMoving()) {
            this.pos[1] += 2;
          }
        } else {
          if (this.playerMoving()) {
            this.pos[0] += 2;
          }
          this.pos[1] = wallBot;
        }
      }
    }
  }

  remove() {
    this.game.remove(this);
  }

  placeBomb() {
    const bomb = new __WEBPACK_IMPORTED_MODULE_1__bomb__["a" /* default */] ({
      pos: this.nearestCell(),
      game: this.game,
    });
    this.game.add(bomb);
  }

  playerMoving() {
    return Object.values(this.moveDirs).includes(true);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 7 */
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