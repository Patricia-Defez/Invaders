function Game(canvasElement) {
    this.ctx = canvasElement.getContext("2d");
  
    this.intervalId = undefined;
    this.background = new Background(this.ctx);
    this.cannon = new Cannon(this.ctx);
    this.octopus = new Octopus(this.ctx);
  }
  
  Game.prototype.start = function() {
    this.intervalId = setInterval(function() {
      this.clear();
      this.drawAll();
      this.checkGameOver();
      this.moveAll();
    }.bind(this), DRAW_INTERVAL_MS);
  };
  
  Game.prototype.drawAll = function(action) {
    this.background.draw();
    this.cannon.draw();
    this.octopus.drawTroopers();

    //this.octopus.draw();
  };
  
  Game.prototype.moveAll = function(action) {
    this.background.move(); 
    this.cannon.move();
    this.octopus.move();
  };
  
  Game.prototype.checkGameOver = function() {
  };
  
  Game.prototype.gameOver = function() {
    clearInterval(this.intervalId);
  
    if (confirm("GAME OVER! Play again?")) {
      location.reload();
    }
  };
  
  Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  };
  