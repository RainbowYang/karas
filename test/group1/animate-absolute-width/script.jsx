let o = karas.render(
  <canvas width="360" height="360">
    <span ref="t" style={{position:'absolute'}}>123</span>
  </canvas>,
  '#test'
);
let input = document.querySelector('input');
let t = o.ref.t;
input.value += t.getComputedStyle().width;
let animation = t.animate([
  {
    width: 0,
  },
  {
    width: 100,
  }
], {
  duration: 200,
  fill: 'forwards',
});
let n = 0;
animation.on(karas.Event.FRAME, () => {
  if(n++ === 0) {
    input.value += '/' + t.getComputedStyle().width;
  }
});
animation.on(karas.Event.FINISH, () => {
  input.value += '/' + t.getComputedStyle().width;
});
