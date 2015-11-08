(function() {
  'use strict';

  if (typeof Asteroids === "undefined") window.Asteroids = {};

  // Return random asteroid size
  function randomSize() {
    return Asteroid.SIZES[Math.round((Math.random() * 2))];
  }

  // Return random asteroid color
  function randomColor() {
    return Asteroid.COLORS[Math.round((Math.random() * 2))];
  }

  // Setup asteroid
  var Asteroid = Asteroids.Asteroid = function (options) {
    options.color = options.color || randomColor();
    options.pos = options.pos || options.game.randomPosition();
    options.radius = options.radius || randomSize();
    options.vel = options.vel || Asteroids.Util.randomVec(Asteroid.SPEED);
    Asteroids.MovingObject.call(this, options);
  };

  Asteroid.SIZES = [20, 25, 30];
  Asteroid.COLORS = ["#B20051", "#FFE60F", "#00D9FF"];
  Asteroid.SPEED = 3;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  // Handle collisions with player ship
  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };
})();
