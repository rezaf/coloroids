(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.timerId = null;
  };

  GameView.MOVES = {
    "w": [ 0, -1], up: [ 0, -1],
    "a": [-1,  0], left: [-1, 0],
    "s": [ 0,  1], down: [0, 1],
    "d": [ 1,  0], right: [1, 0]
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { ship.power(move); });
    });
    key("space", function () { ship.fireBullet(); });
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.ctx.globalCompositeOperation = "darker";
    this.timer = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
      }, 1000 / Asteroids.Game.FPS
    );
    this.bindKeyHandlers();
  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };
})();
