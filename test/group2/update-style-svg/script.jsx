let o = karas.render(
  <svg width="360" height="360">
    <div ref="div" style={{color: '#F00'}}>1</div>
  </svg>,
  '#test'
);
let input = document.querySelector('#base64');
o.ref.div.updateStyle({
  color: '#00F'
}, function() {
  input.value = o.ref.div.getComputedStyle().color;
});
