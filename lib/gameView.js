(function () {
  window.Asteroids = window.Asteroids || {};
  var Game = Asteroids.GameView = function(game, ctx) {

    Game.prototype.start = function(canvasEl) {
      window.setInterval((function(){
        this.moveObjects();
        this.draw(ctx);
      }).bind(game), 1000/100);
    };
  };

})();
