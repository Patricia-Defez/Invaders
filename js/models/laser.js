function Laser(ctx, x, y) {
  this.ctx = ctx;


  this.x = x || 800;
  this.y = y || 800;

  this.w = 2;
  this.h = 30;

  this.vx = 0;
  this.vy = -10;
}

Laser.prototype.collideWith = function (invader) {
  return this.x < invader.x + invader.w &&
    this.x + this.w > invader.x &&
    this.y < invader.y + invader.h &&
    this.h + this.y > invader.y
}

Laser.prototype.draw = function () {
  this.ctx.beginPath();
  this.ctx.lineWidth = "1";
  this.ctx.strokeStyle = "yellow";
  this.ctx.rect(this.x, this.y, this.w, this.h);
  this.ctx.stroke();
}

Laser.prototype.move = function () {
  this.y += this.vy;
}
