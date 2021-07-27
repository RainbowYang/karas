let o = karas.render(
  <canvas width="360" height="360">
    <span ref="t">123</span>
  </canvas>,
  '#test'
);
let t = o.ref.t;
let animation = t.animate([
  {
    color: '#F00',
  },
  {
    color: '#00F',
  }
], {
  duration: 200,
});
let input = document.querySelector('input');
let n = 0;
animation.on(karas.Event.CANCEL, function() {
  input.value += 'cancel0';
});
animation.cancel(function() {
  input.value += 'cancel1';
});
animation.cancel(function() {
  input.value += 'cancel2';
});
animation.on(karas.Event.FRAME, () => {
  if(n++ === 0) {
    input.value += '/a' + t.getComputedStyle().color;
  }
});
animation.on(karas.Event.FINISH, () => {
  input.value += '/f' + t.getComputedStyle().color;
});
