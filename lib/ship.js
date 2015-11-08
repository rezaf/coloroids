(function() {
  'use strict';

  if (typeof Asteroids === "undefined") window.Asteroids = {};

  // Setup our ship
  var Ship = Asteroids.Ship = function (options) {
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = "#0ea";

    Asteroids.MovingObject.call(this, options);
  };

  Ship.RADIUS = 20;

  // Random color for bullets
  function randomColor() {
    var hexDigits = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 3; i++) {
      color += hexDigits[Math.round((Math.random() * 16))];
    }
    return color;
  }

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  // Generate bullets
  Ship.prototype.fireBullet = function () {
    var norm = Asteroids.Util.norm(this.vel);

    if (norm === 0) return;

    var relVel = Asteroids.Util.scale(
      Asteroids.Util.dir(this.vel),
      Asteroids.Bullet.SPEED
    );

    var bulletVel = [relVel[0] + this.vel[0], relVel[1] + this.vel[1]];

    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      vel: bulletVel,
      color: randomColor(),
      game: this.game
    });

    this.game.add(bullet);
  };

  // Update ship velocity
  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  // New ship from remaining lives
  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
    this.lives -= 1;
    if (this.lives < 0) this.game.over($("canvas"));
    $("#lives").html("Lives left: " + this.lives);
  };
})();
