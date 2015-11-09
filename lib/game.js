(function() {
  'use strict';

  if (typeof Asteroids === "undefined") window.Asteroids = {};

  // Setup game
  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    this.addAsteroids();
  };

  Game.BG_COLOR = "#fff";
  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 32;
  Game.NUM_ASTEROIDS = 5;

  // Add object to array of instances
  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.push(object);
    } else {
      throw "Error";
    }
  };

  Game.prototype.addAsteroids = function(numAsteroids) {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({ game: this }));
    }
  };

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship({
      pos: this.randomPosition(),
      game: this
    });
    this.add(ship);
    ship.lives = 3;
    $("#lives").html("Lives left: 3");
    return ship;
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.ships).concat(this.asteroids).concat(this.bullets);
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 == obj2) return;
        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  // Game over display
  Game.prototype.over = function ($canvasEl) {
    var ctx = $canvasEl[0].getContext("2d");
    $("#hud").remove();
    $("#replay").attr("top", "800px");
    $canvasEl.replaceWith('<div id="game-over">GAME OVER!!</div>');
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    // Game over sound
    new Howl({ urls: ['sounds/over.mp3'] }).play();
  };

  // Game won display
  Game.prototype.won = function () {
    var ctx = $("canvas")[0].getContext("2d");
    $("#hud").remove();
    $("#replay").attr("top", "800px");
    $("canvas").replaceWith('<div id="game-won">YOU WIN!!!</div>');
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    $("#target").addClass("animated flip");

    // Game won sound
    new Howl({ urls: ['sounds/win.mp3'] }).play();
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) || (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function(object) {
      object.move();
    });
  };

  Game.prototype.randomPosition = function () {
    return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
  };

  // Remove object
  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Asteroid) {
      var index = this.asteroids.indexOf(object);
      this.asteroids.splice(index, 1);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else {
      throw "Error";
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  // Wrap object around the game display if is is wrappable
  Game.prototype.wrap = function (pos) {
    return [wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)];

    function wrap (coord, max) {
      if (coord < 0) {
        return max - (coord % max);
      } else if (coord > max) {
        return coord % max;
      } else {
        return coord;
      }
    }
  };
})();
