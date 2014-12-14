(function(){
  window.Asteroids = window.Asteroids || {};

  Asteroids.Util = Asteroids.Util || {};

  Asteroids.Util.inherits = function (subClass, superClass) {
    var Surrogate = function () {};
    Surrogate.prototype = superClass.prototype;
    subClass.prototype = new Surrogate();
  };

  Asteroids.Util.randomVec = function() {
    return [ Math.random() * 20 - 10, Math.random() * 20 - 10 ];
  };

})();
