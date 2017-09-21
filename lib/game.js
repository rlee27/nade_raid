import Player from './player';
import Bomb from './bomb';
import Blast from './blast';
import Block from './blocks';
import Monster from './monster';

class Game {
  constructor() {
    this.bombs = [];
    this.players = [];
    this.blasts = [];
    this.blocks = [];
    this.monsters = [];
    this.gameOver = false;

    this.addWalls();
    this.addBricks();
    this.addMonster();
    this.addPlayer1();
  }

  add(object) {
    if (object instanceof Player) {
      this.players.push(object);
    } else if (object instanceof Bomb) {
      this.bombs.push(object);
    } else if (object instanceof Blast) {
      this.blasts.push(object);
    } else if (object instanceof Block) {
      this.blocks.push(object);
    } else if (object instanceof Monster) {
      this.monsters.push(object);
    }
  }

  remove(object) {
    if (object instanceof Player) {
      this.players.splice(this.players.indexOf(object), 1);
    } else if (object instanceof Bomb) {
      this.bombs.splice(this.bombs.indexOf(object), 1);
    } else if (object instanceof Blast) {
      this.blasts.splice(this.blasts.indexOf(object), 1);
    } else if (object instanceof Block) {
      this.blocks.splice(this.blocks.indexOf(object), 1);
    } else if (object instanceof Monster) {
      this.monsters.splice(this.monsters.indexOf(object), 1);
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((object) => {
      if (object instanceof Blast) {
        object.radius.forEach((section) => {
          section.draw(ctx);
        });
      } else {
        object.draw(ctx);
      }
    });
  }

  allObjects() {
    return [].concat(this.blasts, this.bombs, this.monsters, this.players, this.blocks);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1 instanceof Blast) {
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
      if (otherObj instanceof Player) {
        if (otherObj.isCollidedWith(blast)) {
          blast.collideWith(otherObj);
        }
      } else {
        if (blast.isCollidedWith(otherObj)) {
          blast.collideWith(otherObj);
        }
      }
    });
  }

  isOutOfBounds(pos) {
    return (pos[0] < 50) || (pos[1] < 50) || (pos[0] > (Game.DIM_X - 50)) ||
      (pos[1] > (Game.DIM_Y - 50));
  }

  addPlayer1() {
    const player1 = new Player ({
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
    this.moveMonster();
    this.checkGameOver();
  }

  checkGameOver() {
    if (this.players[0].isAlive === false || this.monsters.length === 0) {
      this.gameOver = true;
    }
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

  moveMonster(delta) {
    this.monsters.forEach((monster) => {
      monster.move(delta);
    });
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
      const wall = new Block({
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
      const wall = new Block({
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
      const wall = new Block({
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
      const brick = new Block ({
        game: this,
        sx: 59,
        pos: pos,
        isDestructable: true,
      });

      this.add(brick);
    });
  }

  addMonster() {
    this.possibleMonsterPos().forEach((pos) => {
      const monster = new Monster ({
        game: this,
        sx: -5,
        sy: -5,
        pos: pos,
      });

      this.add(monster);
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

  possibleMonsterPos() {
    const possiblePos = [];
    const usedPos = this.possibleXCoords();

    while (possiblePos.length < 3) {
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

export default Game;
