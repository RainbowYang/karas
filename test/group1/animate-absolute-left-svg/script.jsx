let o = karas.render(
  <svg width="360" height="360">
    <span ref="t" style={{position:'absolute'}}>123</span>
  </svg>,
  '#test'
);
let t = o.ref.t;
let animation = t.animate([
  {
    left: 0,
  },
  {
    left: 100,
  }
], {
  duration: 200,
  fill: 'forwards',
});
animation.on(karas.Event.FINISH, () => {
  let input = document.querySelector('input');
  input.value = JSON.stringify(o.virtualDom);
});
