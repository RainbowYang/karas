let o = karas.render(
  <canvas width="360" height="360">
    <$rect ref="t" rx="0.5" ry="0.5" style={{width:100,height:100}}/>
  </canvas>,
  '#test'
);
let t = o.ref.t;
let animation = t.animate([
  {
    rx: 0.5,
    ry: 0.5,
  },
  {
    rx: 0,
    ry: 0,
  }
], {
  duration: 200,
  fill: 'forwards',
});
let input = document.querySelector('input');
animation.on(karas.Event.FINISH, () => {
  input.value = t.rx + ',' + t.ry;
});
