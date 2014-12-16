(function(){
  window.Asteroids = window.Asteroids || {};

  var Asteroid = Asteroids.Asteroid = function (options) {
    options.color = "#942";
    options.pos = options.pos || options.game.randomPosition();
    options.radius = 30;
    options.vel = options.vel || Asteroids.Util.randomVec(4);

    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };
})();
