karas.render(
  <canvas width="360" height="360">
    <div style={{position:'absolute',left:0,top:0,width:100,height:100,background:'#F00'}}/>
    <$rect clip="1"
           style={{position:'absolute',left:10,top:10,width:50,height:50,strokeWidth:0,fill:'#FFF'}}/>
  </canvas>,
  '#test'
);
