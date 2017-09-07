import Sprite from './sprite';

const brickImage = new Image ();
brickImage.src = "./assets/block.png";

export const brick = new Sprite({
  context: ctx,
  image: brickImage,
  sx: 2,
  sy: 1,
  sWidth: 32,
  sHeight: 32,
  dWidth: 50,
  dHeight: 50,
});

// Play area restrictors:
// ctx.fillStyle = 'grey';
// ctx.fillRect(0, 0, 50, 50);
// ctx.fillRect(50, 0, 50, 50);
// ctx.fillRect(100, 0, 50, 50);
// ctx.fillRect(150, 0, 50, 50);
// ctx.fillRect(200, 0, 50, 50);
// ctx.fillRect(250, 0, 50, 50);
// ctx.fillRect(300, 0, 50, 50);
// ctx.fillRect(350, 0, 50, 50);
// ctx.fillRect(400, 0, 50, 50);
// ctx.fillRect(450, 0, 50, 50);
// ctx.fillRect(500, 0, 50, 50);
// ctx.fillRect(550, 0, 50, 50);
// ctx.fillRect(600, 0, 50, 50);
// ctx.fillRect(650, 0, 50, 50);
// ctx.fillRect(700, 0, 50, 50);
// ctx.fillRect(0, 600, 50, 50);
// ctx.fillRect(50, 600, 50, 50);
// ctx.fillRect(100, 600, 50, 50);
// ctx.fillRect(150, 600, 50, 50);
// ctx.fillRect(200, 600, 50, 50);
// ctx.fillRect(250, 600, 50, 50);
// ctx.fillRect(300, 600, 50, 50);
// ctx.fillRect(350, 600, 50, 50);
// ctx.fillRect(400, 600, 50, 50);
// ctx.fillRect(450, 600, 50, 50);
// ctx.fillRect(500, 600, 50, 50);
// ctx.fillRect(550, 600, 50, 50);
// ctx.fillRect(600, 600, 50, 50);
// ctx.fillRect(650, 600, 50, 50);
// ctx.fillRect(700, 600, 50, 50);
//
// ctx.fillRect(0, 50, 50, 50);
// ctx.fillRect(0, 100, 50, 50);
// ctx.fillRect(0, 150, 50, 50);
// ctx.fillRect(0, 200, 50, 50);
// ctx.fillRect(0, 250, 50, 50);
// ctx.fillRect(0, 300, 50, 50);
// ctx.fillRect(0, 350, 50, 50);
// ctx.fillRect(0, 400, 50, 50);
// ctx.fillRect(0, 450, 50, 50);
// ctx.fillRect(0, 500, 50, 50);
// ctx.fillRect(0, 550, 50, 50);
//
// ctx.fillRect(700, 50, 50, 50);
// ctx.fillRect(700, 100, 50, 50);
// ctx.fillRect(700, 150, 50, 50);
// ctx.fillRect(700, 200, 50, 50);
// ctx.fillRect(700, 250, 50, 50);
// ctx.fillRect(700, 300, 50, 50);
// ctx.fillRect(700, 350, 50, 50);
// ctx.fillRect(700, 400, 50, 50);
// ctx.fillRect(700, 450, 50, 50);
// ctx.fillRect(700, 500, 50, 50);
// ctx.fillRect(700, 550, 50, 50);
//
// ctx.fillRect(100, 100, 50, 50);
// ctx.fillRect(100, 200, 50, 50);
// ctx.fillRect(100, 300, 50, 50);
// ctx.fillRect(100, 400, 50, 50);
// ctx.fillRect(100, 500, 50, 50);
//
// ctx.fillRect(200, 100, 50, 50);
// ctx.fillRect(200, 200, 50, 50);
// ctx.fillRect(200, 300, 50, 50);
// ctx.fillRect(200, 400, 50, 50);
// ctx.fillRect(200, 500, 50, 50);
//
// ctx.fillRect(300, 100, 50, 50);
// ctx.fillRect(300, 200, 50, 50);
// ctx.fillRect(300, 300, 50, 50);
// ctx.fillRect(300, 400, 50, 50);
// ctx.fillRect(300, 500, 50, 50);
//
// ctx.fillRect(400, 100, 50, 50);
// ctx.fillRect(400, 200, 50, 50);
// ctx.fillRect(400, 300, 50, 50);
// ctx.fillRect(400, 400, 50, 50);
// ctx.fillRect(400, 500, 50, 50);
//
// ctx.fillRect(500, 100, 50, 50);
// ctx.fillRect(500, 200, 50, 50);
// ctx.fillRect(500, 300, 50, 50);
// ctx.fillRect(500, 400, 50, 50);
// ctx.fillRect(500, 500, 50, 50);
//
// ctx.fillRect(600, 100, 50, 50);
// ctx.fillRect(600, 200, 50, 50);
// ctx.fillRect(600, 300, 50, 50);
// ctx.fillRect(600, 400, 50, 50);
// ctx.fillRect(600, 500, 50, 50);
