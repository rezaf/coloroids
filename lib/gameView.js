(function () {
  window.Asteroids = window.Asteroids || {};
  var Game = Asteroids.GameView = function(game, ctx) {
    Game.prototype.start = function(canvasEl) {
      window.setInterval((function() {
        this.moveObjects();
        this.draw(ctx);
      }).bind(game), 20);
    };
  };

  GameView.prototype.start = function() {
    var gameView = this;
    this.timer = setInterval(
      function() {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
      }, 1000 / Asteroids.Game.FPS
    );
  };
})();
