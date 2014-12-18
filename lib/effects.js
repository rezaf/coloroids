// var elems = [];
//
// init();
// animate();
//
// function init() {
//   elems = [];
//   for(var i = 0; i < 100; i++) {
//     var startValue = 700 + (Math.random() - Math.random()) * 700;
//     var endValue = 300 + (Math.random() - Math.random()) * 700;
//     var domElement = document.createElement('div');
//     var bg = (Math.random() * 0xffffff) >> 0;
//     domElement.style.position = 'absolute';
//     domElement.style.top = 10 + (Math.random() * 590) + 'px';
//     domElement.style.left = startValue + 'px';
//     domElement.style.background = '#' + bg.toString(16);
//     domElement.style.width = '100px';
//     domElement.style.height = '20px';
//     var elem = { x: startValue, domElement: domElement };
//     var updateCallback = function() {
//       this.domElement.style.left = this.x + 'px';
//     }
//     var tween = new TWEEN.Tween(elem)
//                 .to({ x: endValue }, 4000)
//                 .delay(Math.random() * 1000)
//                 .onUpdate(updateCallback)
//                 .easing(TWEEN.Easing.Back.Out)
//                 .start();
//     var tweenBack = new TWEEN.Tween(elem, false)
//                 .to({ x: startValue}, 4000)
//                 .delay(Math.random() * 1000)
//                 .onUpdate(updateCallback)
//                 .easing(TWEEN.Easing.Elastic.InOut);
//     tween.chain(tweenBack);
//     tweenBack.chain(tween);
//     document.body.appendChild(elem.domElement);
//     elems.push(elem);
//   }
// }
// function animate( time ) {
//   requestAnimationFrame( animate );
//   TWEEN.update( time );
// }


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
