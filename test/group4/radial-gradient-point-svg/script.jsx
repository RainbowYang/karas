let o = karas.render(
  <svg width="360" height="360">
    <div style={{position:'absolute',left:50,top:20,width:100,height:200,background:'radial-gradient(0.6 0.1 0.7 0.5 0.3, #F00, #00F)'}}/>
  </svg>,
  '#test'
);
var input = document.querySelector('#base64');
input.value = JSON.stringify(o.virtualDom);
