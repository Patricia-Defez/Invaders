function Ufo(ctx, x, y) {
    //Enemy.call(this, ctx, x, y, "img/ufo.png")
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "img/redufo.png";

    // this.alive = true;

    this.x = 1;
    this.y = 40;
    this.w = 95;
    this.h = 70;

    this.vx = 4;
    this.vy = 0;
}

Ufo.prototype.draw = function () {
    this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
    );
};

Ufo.prototype.move = function () {
    if (this.x > this.ctx.canvas.width - this.w || this.x <= 0) {
        this.vx *= -1;
    }

    this.x += this.vx;
};

Ufo.prototype.shoot = function() {
    return [
        new Bomb(this.ctx, this.x + this.w /2, this.y + this.h, "red"),
        new Bomb(this.ctx, this.x + this.w /2, this.y + this.h * 2 + 10, "red"),
        new Bomb(this.ctx, this.x + this.w /2, this.y + this.h * 3 + 10, "red")
    ];
};