let o = karas.render(
  <canvas width="360" height="360" cache={true}>
    <div ref="div" style={{position:'absolute',left:50,top:50,background:'#CCC',width:50}}>
      <span ref="span" style={{background:'rgba(255,0,0,0.3)'}}>22<strong ref="strong" style={{fontSize:30,background:'rgba(0,0,255,0.3)'}}>33</strong>222</span>
    </div>
    <div ref="div" style={{position:'absolute',left:50,top:150,background:'#CCC',width:50,textAlign:'center'}}>
      <span ref="span" style={{background:'rgba(255,0,0,0.3)'}}>22<strong ref="strong" style={{fontSize:30,background:'rgba(0,0,255,0.3)'}}>33</strong>222</span>
    </div>
  </canvas>,
  '#test'
);
