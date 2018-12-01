function Octopus(ctx, x, y) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "img/octopus.png";
   
  
    this.x = x;
    this.x0 = x;
    this.y = y;
    this.y0 = y;

    this.w = 50;
    this.h = 50;

    this.alive = true;
    
    this.vx = this.w;
    this.vy = this.h;

    this.img.frames = 2;
    this.img.frameIndex = 0;

    this.drawCount = 0;

    // this.arsenal = [];

    
}
// console.log(arsenal);

Octopus.prototype.draw = function() {
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

    // this.arsenal.forEach(function(missile) {
    //     missile.draw();
    // })
};

// Octopus.prototype.troop = function() {
//     for(var i=0; i<2; i++){
//         for(var j=0; j<10; j++){
//             this.troopers.push(this.img);
//         }
//     }
// }

Octopus.prototype.move = function() { 

    if (this.drawCount % 40 === 0) {
        this.drawCount = 0;

        this.x += this.vx;

        if (this.x >= (this.x0 + 700) || this.x <= this.x0 - 150) {
            this.vx *= -1;
            this.y += this.vy;
        }
    }

    // this.arsenal.forEach(function(missile) {
    //     missile.move();
       
    // })
};

Octopus.prototype.animate = function() {
    if(++this.img.frameIndex > 1){
      this.img.frameIndex = 0;
    }
  
};

// Octopus.prototype.shoot = function() {
//     var missile = new Bomb(this.ctx, this.x + this.w /2, this.y + this.h);
//     this.arsenal.push(missile);
// }; 