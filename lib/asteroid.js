(function(){
  window.Asteroids = window.Asteroids || {};

  var Asteroid = Asteroids.Asteroid = function (pos) {
    this.pos = pos || pos.game.randomPosition();
    this.vel = Asteroids.Util.randomVec();
    this.radius = 30;
    this.color = this.randomColor();
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };
})();
