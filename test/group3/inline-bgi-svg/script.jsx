let o = karas.render(
  <svg width="360" height="360">
    <div style={{margin:10,width:50,background:'#CCC'}}>
      <span style={{background:'url(../../image.png) no-repeat center'}}>22222<strong style={{fontSize:50,padding:3}}>33</strong>2</span>
    </div>
  </svg>,
  '#test'
);

var input = document.querySelector('#base64');
input.value = document.querySelector('svg').innerHTML;
