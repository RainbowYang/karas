let o = karas.render(
  <canvas width="360" height="360">
    <span ref="t">123</span>
  </canvas>,
  '#test'
);
let t = o.ref.t;
let animation = t.animate([
  {
    lineHeight: 2,
  },
  {
    lineHeight: 3,
  }
], {
  duration: 200,
  fill: 'forwards',
});
let input = document.querySelector('input');
animation.on(karas.Event.FINISH, () => {
  input.value = t.getComputedStyle().fontSize + ',' + t.getComputedStyle().lineHeight;
});
