class Sprite {
  constructor(options) {
    this.image = options.image;
    this.game = options.game;
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

export default Sprite;
