function Laser(ctx, x, y) {
    this.ctx = ctx;
  
    
    this.x = x || 800;
    this.y = y || 800;
  
    this.vx = 0;
    this.vy = 0;
  
   
  
    this.setListeners();
  }

  Laser.prototype.setListeners = function() {
    document.onkeydown = this.onKeyDown.bind(this);
  }

  Laser.prototype.onKeyDown = function(event) {
    if (event.keyCode === KEY_SPACE) {
      this.vy -= 10;
    }
  }

  Laser.prototype.draw = function() {
    this.ctx.fillStyle = "yelow";
    ctx.rect(800,800,1,10);
    ctx.stroke();
  }

  Laser.prototype.move = function() {
   
    this.y += this.vy;
  }
