let o = karas.render(
  <svg width="360" height="360">
    <img src="../image.png" style={{transform:'translate(50,50)'}}/>
  </svg>,
  '#test'
);
var input = document.querySelector('#base64');
input.value = JSON.stringify(o.virtualDom);
