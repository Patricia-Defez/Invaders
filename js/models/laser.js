function Laser(ctx, x, y, vy, color) {
  this.ctx = ctx;


  this.x = x || 800;
  this.y = y || 800;

  this.w = 2;
  this.h = 30;

  
  this.color = color;

  this.vx = 0;
  this.vy = vy;
}

Laser.prototype.collideWith = function (invader) {
  return this.x < invader.x + invader.w &&
    this.x + this.w > invader.x &&
    this.y < invader.y + invader.h &&
    this.h + this.y > invader.y
}

Laser.prototype.draw = function () {
  this.ctx.save();
  this.ctx.beginPath();
  
  this.ctx.lineWidth = "1";
  this.ctx.strokeStyle = this.color;
  this.ctx.rect(this.x, this.y, this.w, this.h);
  this.ctx.stroke();
  
  this.ctx.closePath();
  this.ctx.restore();
}

Laser.prototype.move = function () {
  this.y += this.vy ;
}
