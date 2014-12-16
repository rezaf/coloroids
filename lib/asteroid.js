(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  function randomSize () {
    var sizes = [20, 25, 30];
    var size = sizes[Math.round((Math.random() * 2))];
    return size;
  };

  function randomColor () {
    color = Asteroid.COLORS[Math.round((Math.random() * 2))];
    return color;
  };

  var Asteroid = Asteroids.Asteroid = function (options) {
    options.color = options.color || randomColor();
    options.pos = options.pos || options.game.randomPosition();
    options.radius = options.radius || randomSize();
    options.vel = options.vel || Asteroids.Util.randomVec(Asteroid.SPEED);

    Asteroids.MovingObject.call(this, options);
  };

  Asteroid.COLORS = ["#B20051", "#FFE60F", "#00D9FF"];
  Asteroid.SPEED = 3;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };
})();
