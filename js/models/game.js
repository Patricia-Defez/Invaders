function Game(canvasElement) {
    this.ctx = canvasElement.getContext("2d");

    this.intervalId = undefined;
    this.background = new Background(this.ctx);
    this.cannon = new Cannon(this.ctx);

    this.troopers = [];

    this.addOctopuses();
}

Game.prototype.start = function () {
    this.intervalId = setInterval(function () {
        this.clear();
        this.drawAll();
        this.shootDetection();
        this.checkGameOver();
        this.moveAll();
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
    // console.log(this.troopers);
};

Game.prototype.shootDetection = function () {
    
    this.cannon.laserShoots.forEach(function (shoot) {
        this.troopers.forEach(function (row) {
            row.forEach(function (invader) {
                if (shoot.collideWith(invader)) {
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


};

// Game.prototype.drawTroopers = function() {
//     this.troopers.forEach(function(row) {
//         row.forEach(function(octopus) {
//             if(octopus.alive){
//             octopus.draw();
//             }else{
//                 ctx.fillStyle = "black";
//                 ctx.fillRect(this.x, this.y, this.width, this.height);

//             }


//         })
//     })
// };

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
};

Game.prototype.checkGameOver = function () {
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
