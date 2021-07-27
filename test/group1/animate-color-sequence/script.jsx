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
let n = 0;
let res = true;
o.on(karas.Event.REFRESH, () => {
  if(n !== 0) {
    res = false;
  }
  n++;
});
animation.on(karas.Event.FRAME, () => {
  if(n !== 1) {
    res = false;
  }
  n--;
});
animation.on(karas.Event.FINISH, () => {
  let input = document.querySelector('input');
  input.value = res;
});
