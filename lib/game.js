(function(){
  window.Asteroids = window.Asteroids || {};

  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    this.addAsteroids();
  };

  Game.BG_COLOR = "#fff";
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 32;
  Game.NUM_ASTEROIDS = 5;

  Game.prototype.randomPos = function() {
    return [ Math.random() * this.DIM_X, Math.random() * this.DIM_Y ];
  };

  Game.prototype.addAsteroids = function(numAsteroids) {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({ game: this }));
    }
  };

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship({
      pos: this.randomPosition(),
      game: this
    });
    this.add(ship);
    return ship;
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.ships).concat(this.asteroids).concat(this.bullets);
  };

  Game.prototype.checkCollisions = function () {
    var that = this;

    this.allObjects().forEach(function (astr1) {
      that.allObjects().forEach(function (astr2) {
        if (astr1 == astr2) {
          return;
        }
        if (astr1.isCollidedWith(astr2)) {
          astr1.collideWith(astr2);
        }
      });
    });
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.fillStyle = this.BG_COLOR;
    ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);

    this.asteroids.forEach(function (asteroid){
      asteroid.draw(ctx);
    });
  };

  Game.prototype.wrap = function(pos) {
    if (pos[0] > this.DIM_X) {
      pos[0] -= this.DIM_X;
    } else if (pos[1] > this.DIM_Y) {
      pos[1] -= this.DIM_Y;
    }
    return pos;
  };

  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function(object) {
      object.move();
    });
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.randomPosition = function () {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  };

  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.push(object);
    } else {
      throw "Error!";
    }
  };

  Game.prototype.remove = function(object) {
    if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Asteroid) {
      var index = this.asteroids.indexOf(object);
      this.asteroids[index] = new Asteroids.Asteroid({ game: this });
    } else if (object instanceof Asteroids.Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else {
      throw "Error!";
    }
  };
})();
