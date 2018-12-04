function Octopus(ctx, x, y) {
    Enemy.call(this, ctx, x, y, "img/octopus.png")
}

Octopus.prototype = Object.assign(Enemy.prototype);
Octopus.prototype.constructor = Octopus;

Octopus.prototype.shoot = function() {
    return new Laser(this.ctx, this.x + this.w /2, this.y + this.h, 10, "#FF9E3D");
};