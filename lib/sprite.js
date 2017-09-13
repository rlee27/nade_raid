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

export default Sprite;
