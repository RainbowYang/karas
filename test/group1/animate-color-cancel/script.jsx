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
animation.on(karas.Event.FRAME, () => {
  n++;
});
animation.on(karas.Event.CANCEL, () => {
  input.value = t.getComputedStyle().color + '/' + n;
});
animation.cancel(function(isChange) {
  input.value += '/' + isChange;
});
