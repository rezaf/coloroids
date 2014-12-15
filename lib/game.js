(function(){
  window.Asteroids = window.Asteroids || {};

  var Game = Asteroids.Game = function() {
    this.DIM_X = 1000;
    this.DIM_Y =  500;
    this.NUM_ASTEROIDS = 5;
    this.FPS = 32;
    this.BACKGROUND = "#fff"
    this.asteroids = [];
    this.addAsteroids();
  }

  Game.prototype.randomPos = function() {
    return [ Math.random() * this.DIM_X, Math.random() * this.DIM_Y ];
  };

  Game.prototype.addAsteroids = function() {
    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.asteroids.push(
        Asteroids.Asteroid.randomAsteroid([1000, 500], [0.1, 0.1]));
    };
  };

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship({
      pos: this.randomPos(),
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
      game.allObjects().forEach(function (astr2) {
        if (astr1 == astr2) {
          return;
        }
        if (astr1).isCollidedWith(astr2)) {
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
    var that = this;
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
      asteroid.pos = that.wrap(asteroid.pos);
    });
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
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
