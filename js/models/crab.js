function Crab(ctx, x, y) {
    Enemy.call(this, ctx, x, y, "img/crab.png")
}

Crab.prototype = Object.assign(Enemy.prototype);
Crab.prototype.constructor = Crab;

Crab.prototype.shoot = function() {
    return new Laser(this.ctx, this.x + this.w /2, this.y + this.h, 10, "#6FFA53");
};