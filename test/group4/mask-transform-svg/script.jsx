let o = karas.render(
  <svg width="360" height="360">
    <div
      ref="t"
      style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',background:'#F00'}}>123</div>
    <$polygon
      mask="true"
      rx={0.1}
      ry={0.1}
      points={[
        [0, 0],
        [1, 1],
        [0, 1]
      ]}
      style={{position:'absolute',left:50,top:50,width:50,height:50,fill:'#fff',transform:'translateX(50px)', strokeWidth: 0,}}/>
  </svg>,
  '#test'
);
var input = document.querySelector('#base64');
input.value = JSON.stringify(o.virtualDom);
