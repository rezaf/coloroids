(function () {
  window.Asteroids = window.Asteroids || {};

  var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color, game) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.game = game;
  };

  MovingObject.randomAsteroid = function(maxP, maxV) {
    return new MovingObject(
      [(maxP[0] * Math.random()), (maxP[1] * Math.random())],
      [(maxV[0] * Math.random()), (maxV[1] * Math.random())],
      10 * Math.random(),
      Asteroid.randomColor()
    );
  };

  var HEX_DIGITS = "0123456789ABCDEF";
  MovingObject.prototype.randomColor = function() {
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += HEX_DIGITS[Math.floor((Math.random() * 16))];
    }

    return color;
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    game.wrap(this.pos[0]);
    game.wrap(this.pos[1]);
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {

  };

})();
