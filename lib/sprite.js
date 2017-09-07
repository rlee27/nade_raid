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

export default Sprite;
