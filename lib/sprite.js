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
}

export default Sprite;
