let o = karas.render(
  <canvas width="360" height="360">
    <div>looooooooooooooong</div>
    <div ref="d"
      style={{position:'absolute',left:5,top:10,display:'none',width:100,height:100,background:'#F00'}}>123</div>
    <$polygon
      ref="t"
      mask="true"
      points={[
        [0, 0],
        [1, 1],
        [0, 1]
      ]}
      style={{position:'absolute',left:0,top:0,width:100,height:100,strokeWidth:0,fill:'#EEE'}}/>
  </canvas>,
  '#test'
);
o.ref.d.updateStyle({
  display: 'block',
});
let t = o.ref.t;
let animation = t.animate([
  {
    left: 0,
  },
  {
    left: 50,
  }
], {
  duration: 200,
  fill: 'forwards',
});
let input = document.querySelector('input');
animation.on(karas.Event.FINISH, () => {
  input.value = document.querySelector('canvas').toDataURL();
});
