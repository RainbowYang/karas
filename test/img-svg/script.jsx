let o = karas.render(
  <svg width="360" height="360">
    <img src="../image.png"/>
  </svg>,
  '#test'
);
var input = document.querySelector('#base64');
input.value = JSON.stringify(o.virtualDom);
