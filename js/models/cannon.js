function Cannon(ctx) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "img/Laser_Cannon.png";

  //this.shootAudio = new sound("audio/shoot.wav");

  this.x = 800;
  this.y = 800;
  this.w = 50;
  this.h = 50;

  this.vx = 0;
  this.vy = 0;

  this.shootV = -10;

  this.laserShoots = [];

  this.setListeners();
}

Cannon.prototype.setListeners = function () {
  document.onkeydown = this.onKeyDown.bind(this);
  document.onkeyup = this.onKeyUp.bind(this);
};

Cannon.prototype.onKeyDown = function (e) {
  switch (e.keyCode) {
    case KEY_RIGHT:
      this.vx = 10;
      break;
    case KEY_LEFT:
      this.vx = -10;
      break;
  }
};

Cannon.prototype.onKeyUp = function (e) {
  switch (e.keyCode) {
    case KEY_RIGHT:
      this.vx = 0;
      break;
    case KEY_LEFT:
      this.vx = 0;
      break;
    case KEY_SPACE:
      this.shoot();
      break;
  }
};


Cannon.prototype.draw = function () {
  // console.log(this.x)
  this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h
  );

  this.laserShoots.forEach(function (laserShoot) {
    laserShoot.draw();
  })


};

Cannon.prototype.move = function () {

  this.x += this.vx;

  
  if (this.x > this.ctx.canvas.width - this.w) {
    this.x = this.ctx.canvas.width - this.w;
  } else if (this.x <= 0) {
    this.x = 0
  }

  

  this.laserShoots.forEach(function (laserShoot) {
    laserShoot.move();
  })
};

Cannon.prototype.collideWith = function (obstacle) {
  return this.x < obstacle.x + obstacle.w &&
    this.x + this.w > obstacle.x &&
    this.y < obstacle.y + obstacle.h &&
    this.h + this.y > obstacle.y
}

Cannon.prototype.shoot = function () {
  var laserShoot = new Laser(this.ctx, this.x + this.w / 2, this.y - this.h, this.shootV, "yellow");
  this.laserShoots.push(laserShoot);
  //this.shootAudio.play();
};

Cannon.prototype.deleteShoot = function(shoot) {
  this.laserShoots = this.laserShoots.filter(function(s) {
    return s !== shoot;
  })
};

