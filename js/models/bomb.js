function Bomb(ctx, x, y, color) {
    Laser.call(this, ctx, x, y, 10, color)
    this.r = 5;
}

Bomb.prototype = Object.create(Laser.prototype);
Bomb.prototype.constructor = Bomb;

Bomb.prototype.draw = function () {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
}