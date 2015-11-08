(function() {
  'use strict';
  
  // Replay button
  $("button").button();
  $("#replay").click(function() { location.reload(); });

  // Setup canvas
  var canvasEl = $("canvas")[0];
  canvasEl.width = Asteroids.Game.DIM_X;
  canvasEl.height = Asteroids.Game.DIM_Y;

  // Start game
  var ctx = canvasEl.getContext("2d");
  var game = new Asteroids.Game();
  new Asteroids.GameView(game, ctx).start();
}());
