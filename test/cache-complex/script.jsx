let o = karas.render(
  <canvas width="360" height="360" cache={true}>
    <div style={{position:'relative',background:'#F00',width:40}} ref="div">
      <span ref="span" style={{padding:2,background:'#00F',translateX:-10,translateY:10}}>123</span>
    </div>
  </canvas>,
  '#test'
);
