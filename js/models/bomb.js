function Bomb(ctx, x, y) {
    this.ctx = ctx;
  
    this.r = 3;
    this.x = x || 100;
    this.y = y || 100;
  
    this.vx = 0;
    this.vy = 10;  
  }

Bomb.prototype.draw = function() {
    
    this.ctx.beginPath();
    this.ctx.fillStyle = "red";
    this.ctx.arc(this.x, this.y, this.r,0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
}

Bomb.prototype.move = function() {
   
    this.y += this.vy;
  }