(function(){ 
  window.Asteroids = window.Asteroids || {};

  var Asteroid = Asteroids.Asteroid = function (pos) {
    this.pos = pos;
    this.vel = Asteroids.Util.randomVec();
    this.radius = 60;
    this.color = "#ff0000";
  };
  
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);
  
  Asteroid.randomAsteroid = function (maxP, maxV) {
    return new Asteroid(
      [(maxP[0] * Math.random()), (maxP[1] * Math.random())]
    );
  };
})();