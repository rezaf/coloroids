(function() {
  'use strict';

  if (typeof Asteroids === "undefined") window.Asteroids = {};

  var Util = Asteroids.Util = {};

  // Calculate bullet movement vector
  var dir = Util.dir = function (vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  };

  // Calculate pythagorean distance
  var dist = Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  // Calculate movement speed
  var norm = Util.norm = function (vec) {
    return Util.dist([0, 0], vec);
  };

  // Generate random vector
  var randomVec = Util.randomVec = function (length) {
    var deg = 2 * Math.PI * Math.random();
    return scale([Math.sin(deg), Math.cos(deg)], length);
  };

  // Scale bullet velocity
  var scale = Util.scale = function (vec, m) {
    return [vec[0] * m, vec[1] * m];
  };

  // Use surrogate method for classical-like inheritance
  var inherits = Util.inherits = function (ChildClass, BaseClass) {
    function Surrogate() { this.constructor = ChildClass; }
    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  };
})();
