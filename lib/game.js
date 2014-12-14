(function(){
  window.Asteroids = window.Asteroids || {};

  var Game = Asteroids.Game = function() {
    this.DIM_X = 1000;
    this.DIM_Y =  500;
    this.NUM_ASTEROIDS = 5;

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

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

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
    this.asteroids.forEach(function (asteroid){
      asteroid.move();
      asteroid.pos = that.wrap(asteroid.pos);
    });
  };

})();
