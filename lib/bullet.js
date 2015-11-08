(function() {
  'use strict';

  if (typeof Asteroids === "undefined") window.Asteroids = {};

  // Setup bullet
  var Bullet = Asteroids.Bullet = function (options) {
    options.radius = Bullet.RADIUS;
    options.speed = Bullet.SPEED;
    Asteroids.MovingObject.call(this, options);
  };

  Bullet.RADIUS = 5;
  Bullet.SPEED = 20;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  // Handle bullet hits
  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.remove();
      otherObject.remove();
      if (this.game.asteroids.length < 1) {
        this.game.won();
      }
    }
  };

  Bullet.prototype.isWrappable = false;
})();
