let o = karas.render(
  <svg width="360" height="360">
    <div style={{marginBottom:5,height:50,background:`linear-gradient(#0F0, #00F)`}}/>
    <div style={{marginBottom:5,height:50,background:`linear-gradient(#0F0, #000, #00F)`}}/>
    <div style={{marginBottom:5,height:50,background:`linear-gradient(#0F0, #000, #F00, #00F)`}}/>
  </svg>,
  '#test'
);
var input = document.querySelector('#base64');
input.value = JSON.stringify(o.virtualDom);
