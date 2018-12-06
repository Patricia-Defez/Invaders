function Squid(ctx, x, y) {
    Enemy.call(this, ctx, x, y, "img/squid.png")
}

Squid.prototype = Object.create(Enemy.prototype);
Squid.prototype.constructor = Squid;

Squid.prototype.shoot = function() {
    return new Laser(this.ctx, this.x + this.w /2, this.y + this.h, 10, "#F57CF1");
};