let o = karas.render(
  <canvas width="360" height="360">
    <$rect
      ref="t"
      style={{width:50,height:50,strokeWidth:0,fill:'#F00'}}/>
  </canvas>,
  '#test'
);
let t = o.ref.t;
let animation = t.animate([
  {
    transform: 'translateX(0)',
  },
  {
    transform: 'translateX(300px)',
  }
], {
  duration: 1000,
  fill: 'forwards',
});

let o2 = karas.render(
  <canvas width="360" height="360">
    <$rect
      ref="t"
      style={{width:50,height:50,strokeWidth:0,fill:'#F00'}}/>
  </canvas>,
  '#test2'
);
let t2 = o2.ref.t;
let animation2 = t2.animate([
  {
    transform: 'translateX(0)',
    easing: 'ease',
  },
  {
    transform: 'translateX(300px)',
  }
], {
  duration: 1000,
  fill: 'forwards',
});

let input = document.querySelector('input');
let n = 0;
animation2.on(karas.Event.FRAME, () => {
  if(n++ === 1) {
    let a = parseFloat(t.getComputedStyle().transform[12]);
    let b = parseFloat(t2.getComputedStyle().transform[12]);
    input.value = a > b;
  }
});
animation2.on(karas.Event.FINISH, () => {
  let a = t.getComputedStyle().transform[12];
  let b = t2.getComputedStyle().transform[12];
  input.value += '/' + (a === b);
});
