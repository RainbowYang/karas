let o = karas.render(
  <svg width="360" height="360">
    <div style={{height:20,background:'#F00',margin:5}}>1</div>
    <div style={{background:'#0F0',margin:'-8 20 -10'}}></div>
    <div style={{background:'#0F0',margin:'-5 20 -13'}}></div>
    <span style={{display:'inlineBlock',height:20,background:'#00F',margin:10}}>3</span>
  </svg>,
  '#test'
);
var input = document.querySelector('#base64');
input.value = JSON.stringify(o.virtualDom);
