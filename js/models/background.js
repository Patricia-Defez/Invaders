function Background(ctx) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = 'img/bg.jpg';

  this.x = 0;
  this.y = 0;
  this.w = this.ctx.canvas.width;
  this.h = this.ctx.canvas.height;

  this.vx = 0;
  this.vy = 0.5;

}

Background.prototype.draw = function () {
  this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h
  )
  this.ctx.drawImage(
    this.img,
    this.x,
    this.y - this.h,
    this.w,
    this.h
  )
};

Background.prototype.move = function () {

  this.y += this.vy;

  if (this.y === 900) {
    this.y = 0;
  }
};
