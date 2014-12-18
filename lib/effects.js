// adapted and customized for this site from tween.js library

init();
animate();
function init() {
  var target = document.getElementById('target');
  var t = document.createElement('table');
  var index = 0;
  for(var i = 0; i < 21; i++) {
    var tr = t.insertRow(-1);
    for(var j = 0; j < 35; j++) {
      var td = tr.insertCell(-1);
      td.style.background = '#fff';
      var x = (i+j) * 0.1;
      var cell = { 'td': td, value : 0 };
      var tween = new TWEEN.Tween(cell)
                  .to({ value: 1 }, 8000)
                  .delay((0.001 * index + Math.random()) * 5000)
                  .easing(TWEEN.Easing.Elastic.InOut)
                  .onUpdate(function() {
                    var c = Math.floor(this.value * 0xff);
                    this.td.style.background = 'rgb(' + c + ', 100, 0)';
                  });
      var tweenBack = new TWEEN.Tween(cell)
                  .to({ value: 0 }, 4000)
                  .delay((0.001*index + Math.random()) * 5000)
                  .easing(TWEEN.Easing.Elastic.InOut)
                  .onUpdate(function() {
                    var c = Math.floor(this.value * 0xff);
                    this.td.style.background = 'rgb(' + c + ', 0, 0)';
                  });
      tween.chain(tweenBack);
      tweenBack.chain(tween);
      tween.start();
      index++;
    }
  }
  target.appendChild(t);
}
function animate( time ) {
  requestAnimationFrame( animate );
  TWEEN.update( time );
}
