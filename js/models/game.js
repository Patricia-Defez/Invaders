function Game(canvasElement) {
    this.ctx = canvasElement.getContext("2d");

    this.intervalId = undefined;
    this.background = new Background(this.ctx);
    this.cannon = new Cannon(this.ctx);
    this.ufo = undefined;

    this.backgroundSong = new Audio('audio/backgroundSong.mp3'); 

    this.troopers = [];
    this.troopersArsenal = [];
    // this.ufoArsenal = [];

    this.score = 0;

    this.drawCount = 0;

    this.addEnemies();
}



Game.prototype.start = function () {
    this.intervalId = setInterval(function () {
        this.clear();
        this.drawAll();
        this.shootDetection();
        this.drawScore();
        this.checkGameOver();
        this.moveAll();
        this.invaderShoot();
        // this.cleanArsenal();
        if (this.drawCount % 300 === 0) {
            if (!this.ufo) {
                this.ufo = new Ufo(this.ctx);
               
            }
            this.drawCount = 0;
        }
    }.bind(this), DRAW_INTERVAL_MS);
};

Game.prototype.backgroundSong = function (){
    this.backgroundSong.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    this.backgroundSong.play();
};

Game.prototype.addEnemies = function () {
    for (var i = 0; i < 1; i++) {
        var row = [];
        for (var j = 0; j < 10; j++) {
            row.push(new Squid(this.ctx, 200 + j * 75, 50 + i * 75));
        }
        this.troopers.push(row);
    }
    for (var i = 1; i < 3; i++) {
        var row = [];
        for (var j = 0; j < 10; j++) {
            row.push(new Crab(this.ctx, 200 + j * 75, 50 + i * 75));
        }
        this.troopers.push(row);
    }
    for (var i = 3; i < 5; i++) {
        var row = [];
        for (var j = 0; j < 10; j++) {
            row.push(new Octopus(this.ctx, 200 + j * 75, 50 + i * 75));
        }
        this.troopers.push(row);
    }
};

Game.prototype.getRandomTrooper = function() {
    var aliveTroopers = [];
    this.troopers.forEach(function(row) {
        row.forEach(function(trooper) {
            if (trooper.alive) {
                aliveTroopers.push(trooper);
            }
        })
    });
    return aliveTroopers[Math.floor(Math.random() * aliveTroopers.length)];
}

Game.prototype.invaderShoot = function () {   
    if (this.drawCount % 50 === 0) {
        console.log('Shooting start...')
        var trooper = this.getRandomTrooper();
        if (trooper !== undefined) {
            console.log('Shooting with', )
            this.troopersArsenal.push(trooper.shoot());
        }
    } 

    if (this.drawCount % 100 === 0) {
        if (this.ufo) {
            var burst = this.ufo.shoot();
            burst.forEach(function (bomb) {
                this.troopersArsenal.push(bomb);
            }.bind(this));
        }
    }
    
};
Game.prototype.cleanArsenal = function() {
    this.troopersArsenal.forEach(function(bomb){
        if(bomb.y + bomb.h > this.ctx.canvas.height){
            this.enemy.deleteShoot(bomb);
        }
    }.bind(this));
    
};    

Game.prototype.shootDetection = function () { 
    this.cannon.laserShoots.forEach(function (shoot) {
        this.troopers.forEach(function (row) {
            row.forEach(function (invader) {
                if (shoot.collideWith(invader) && invader.alive) {
                    invader.alive = false;
                    this.score += 30;
                    this.cannon.deleteShoot(shoot);
                }
            }.bind(this));
        }.bind(this));
    }.bind(this));
    this.cannon.laserShoots.forEach(function (shoot) {
        if (this.ufo ) {
            if (shoot.collideWith(this.ufo)) {
                this.ufo = null;
                this.score += 500;
                this.cannon.deleteShoot(shoot);
            }
        }
    }.bind(this));
};

Game.prototype.drawScore = function () {
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Score: "+this.score, 8, 20);
}

Game.prototype.drawAll = function (action) {
    this.background.draw();
    if (this.ufo) {
        this.ufo.draw();
    }
    this.cannon.draw();
    this.troopers.forEach(function (row) {
        row.forEach(function (octopus) {
            octopus.draw();
        })
    })
    this.troopersArsenal.forEach(function(missile) {
        missile.draw();
    });

    this.drawCount++;
};



Game.prototype.moveTroopers = function () {
    this.troopers.forEach(function (row) {
        row.forEach(function (octopus) {
            octopus.move();
        })
    })
}


Game.prototype.moveAll = function (action) {
    this.background.move();
    this.cannon.move();
    if (this.ufo) {
        this.ufo.move();
    }
    this.moveTroopers();
    this.troopersArsenal.forEach(function(missile) {
        missile.move();
    })
};

Game.prototype.checkGameOver = function () {
   
    this.troopers.forEach(function (row) {
        row.forEach(function (invader) {
            if(this.cannon.collideWith(invader)&& invader.alive){
                this.gameOver();
            }
        }.bind(this));
    }.bind(this));
    this.troopersArsenal.forEach(function(missile){
        if(this.cannon.collideWith(missile)){
            this.gameOver();
        }
    }.bind(this));
    

};

Game.prototype.gameOver = function () {
    clearInterval(this.intervalId);

    if (confirm("GAME OVER! Play again?")) {
        location.reload();
    }
};

Game.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};
