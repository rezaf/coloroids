(function(){
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {};

  var dir = Util.dir = function (vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  };

  var dist = Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  var norm = Util.norm = function (vec) {
    return Util.dist([0, 0], vec);
  };

  var randomVec = Util.randomVec = function (length) {
    var deg = 2 * Math.PI * Math.random();
    return scale([Math.sin(deg), Math.cos(deg)], length);
  };

  var scale = Util.scale = function (vec, m) {
    return [vec[0] * m, vec[1] * m];
  };

  var inherits = Util.inherits = function (subClass, superClass) {
    function Surrogate () { this.constructor = subClass };
    Surrogate.prototype = superClass.prototype;
    subClass.prototype = new Surrogate();
  };
})();
