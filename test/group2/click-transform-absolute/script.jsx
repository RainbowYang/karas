let count = 0;

function cb(v) {
  document.getElementById('base64').value = v;
}

karas.render(
  <canvas width="360" height="360">
    <div style={{position:'absolute',left:100,top:100,width:50,height:100,background:'#F00',transformOrigin:0,transform:'rotate(90deg)'}} onClick={()=>cb(count++)}>1</div>
  </canvas>,
  '#test'
);
