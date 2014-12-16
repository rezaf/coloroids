(function(){
  window.Asteroids = window.Asteroids || {};

  var Asteroid = Asteroids.Asteroid = function (options) {
    options.pos = options.pos || options.game.randomPosition();
    options.vel = options.vel || Asteroids.Util.randomVec(4);
    options.radius = 30;
    options.color = "#942";
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };
})();
