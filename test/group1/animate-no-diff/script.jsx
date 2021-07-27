let o = karas.render(
  <canvas width="360" height="360">
    <span ref="t">123</span>
  </canvas>,
  '#test'
);
let t = o.ref.t;
let animation = t.animate([
  {
    fontSize: 16,
  },
  {
    fontSize: 60,
  }
], {
  duration: 1000,
  fill: 'forwards',
});
let o2 = karas.render(
  <canvas width="360" height="360">
    <span ref="t">123</span>
  </canvas>,
  '#test2'
);
let t2 = o2.ref.t;
let animation2 = t2.animate([
  {
    fontSize: 16,
  },
  {
    fontSize: 16,
    offset: 0.5,
  },
  {
    fontSize: 60,
  }
], {
  duration: 1000,
  fill: 'forwards',
});
let input = document.querySelector('input');
let n = 0;
let nf = 0;
let n2 = 0;
let nf2 = 0;
animation.on(karas.Event.FRAME, () => {
  n++;
});
o.on(karas.Event.REFRESH, () => {
  nf++;
});
animation2.on(karas.Event.FRAME, () => {
  n2++;
});
o2.on(karas.Event.REFRESH, () => {
  nf2++;
});
animation2.on(karas.Event.FINISH, () => {
  input.value = (n === nf) + '/' + (n === n2) + '/' + (n2 > nf2);
});
