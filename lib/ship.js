(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  function randomColor () {
    var hexDigits = "0123456789ABCDEF";
    var color = "#";

    for (var i = 0; i < 3; i ++) {
      color += hexDigits[Math.round((Math.random() * 16))];
    }

    return color;
  };

  var Ship = Asteroids.Ship = function(options) {
    options.radius = 15;
    options.vel = options.vel || [0, 0];
    options.color = options.color || randomColor();

    Asteroids.MovingObject.call(this, options)
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };
})();
