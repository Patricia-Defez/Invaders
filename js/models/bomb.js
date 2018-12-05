function Bomb(ctx, x, y, color) {
    this.ctx = ctx;

    this.color = color;
    this.r = 3;
    this.x = x || 100;
    this.y = y || 100;

    this.vx = 0;
    this.vy = 10;
}

Bomb.prototype.draw = function () {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
}

Bomb.prototype.move = function () {

    this.y += this.vy;
}