function Octopus(ctx) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = "img/octopus.png";
   
  
    this.x = 50;
    this.y = 50;
    this.w = 50;
    this.h = 50;


    
    this.vx = 0;
    this.vy = 0;

    this.img.frames = 2;
    this.img.frameIndex = 0;

    this.drawCount = 0;

    this.troopers = [];
}


Octopus.prototype.draw = function() {
    this.drawCount++;
  
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

  
    if (this.drawCount % 20 === 0) {
      this.drawCount = 0;
      this.animate();
    }
};

Octopus.prototype.troop = function() {
    for(var i=0; i<2; i++){
        for(var j=0; j<10; j++){
            this.troopers.push(this.img);
        }
    }
}

Octopus.prototype.drawTroopers = function(){
    this.troopers.forEach(function() {
        this.draw();
    })
}

// Octopus.prototype.drawTroopers = function(){
//     for(var i=0; i<this.troopers.length; i++){
//         this.troopers[i].
//     }

// }

Octopus.prototype.move = function() {

    this.y += this.vy;

//         if (this.x > this.ctx.canvas.width - this.w || this.x <= 0 ){
//           this.vx = 0;
          
//         }

 };
 Octopus.prototype.animate = function() {
    if(++this.img.frameIndex > 1){
      this.img.frameIndex = 0;
    }
  
  
  
  };