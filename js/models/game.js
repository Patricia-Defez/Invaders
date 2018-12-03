function Game(canvasElement) {
    this.ctx = canvasElement.getContext("2d");

    this.intervalId = undefined;
    this.background = new Background(this.ctx);
    this.cannon = new Cannon(this.ctx);

    this.troopers = [];
    this.troopersArsenal = [];

    this.drawCount = 0;

    this.addOctopuses();
}

Game.prototype.start = function () {
    this.intervalId = setInterval(function () {
        this.clear();
        this.drawAll();
        this.shootDetection();
        this.checkGameOver();
        this.moveAll();
        this.invaderShoot();
    }.bind(this), DRAW_INTERVAL_MS);
};

Game.prototype.addOctopuses = function () {
    for (var i = 0; i < 2; i++) {
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
        this.drawCount = 0;
    } 
};
// Game.prototype.deleteMissile = function(missile) {
//     this.troopersArsenal = this.troopersArsenal.filter(function(s) {
//       return s !== missile;
//     })
// };    

Game.prototype.shootDetection = function () { 
    this.cannon.laserShoots.forEach(function (shoot) {
        this.troopers.forEach(function (row) {
            row.forEach(function (invader) {
                if (shoot.collideWith(invader) && invader.alive) {
                    invader.alive = false;
                    this.cannon.deleteShoot(shoot);
                }
            }.bind(this));
        }.bind(this));
    }.bind(this));
};

Game.prototype.drawAll = function (action) {
    this.background.draw();
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
