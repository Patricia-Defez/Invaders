function Laser(ctx, x, y) {
    this.ctx = ctx;
  
    
    this.x = x || 800;
    this.y = y || 800;
  
    this.vx = 0;
    this.vy = -10;  
  }

  Laser.prototype.draw = function() {
    this.ctx.beginPath();
    this.ctx.lineWidth = "1";
    this.ctx.strokeStyle  = "yellow";
    this.ctx.rect(this.x,this.y,2,30);
    this.ctx.stroke();
 
  }

  Laser.prototype.move = function() {
   
    this.y += this.vy;
  }
