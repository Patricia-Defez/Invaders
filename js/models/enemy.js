function Enemy(ctx, x, y, sprite, spriteHFrames, w, h) {
    this.ctx = ctx;

    this.x = x;
    this.x0 = x;
    this.y = y;
    this.y0 = y;

    this.w = w || 50;
    this.h = h || 50;

    this.alive = true;

    this.vx = this.w;
    this.vy = this.h;

    this.img = new Image();
    this.img.src = sprite;

    this.img.frames = spriteHFrames || 2;
    this.img.frameIndex = 0;

    this.drawCount = 0;
}


Enemy.prototype.draw = function () {
    this.drawCount++;

    if (this.alive) {
        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
            0,
            this.img.width / this.img.frames,
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
        );
    }

    if (this.drawCount % 30 === 0) {
        this.drawCount = 0;
        this.animate();

    }
};


Enemy.prototype.move = function () {
    if (this.drawCount % 40 === 0) {
        this.drawCount = 0;

        this.x += this.vx;

        if (this.x >= (this.x0 + 700) || this.x <= this.x0 - 150) {
            this.vx *= -1;
            this.y += this.vy;
        }
    }

};

Enemy.prototype.animate = function () {
    if (++this.img.frameIndex > 1) {
        this.img.frameIndex = 0;
    }
};

Enemy.prototype.shoot = function () {
    return new Laser(this.ctx, this.x + this.w / 2, this.y + this.h, 10, "red");
}; 

Enemy.prototype.deleteShoot = function(shoot) {
    this.laserShoots = this.laserShoots.filter(function(s) {
      return s !== shoot;
    })
};
