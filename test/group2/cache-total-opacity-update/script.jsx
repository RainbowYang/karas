let o = karas.render(
  <canvas width="360" height="360">
    <div cacheAsBitmap={1} style={{position:'absolute',background:'#F00'}} ref="div">123</div>
  </canvas>,
  '#test'
);

o.ref.div.updateStyle({
  opacity: 0.5,
}, function() {
  let input = document.querySelector('input');
  input.value = document.querySelector('canvas').toDataURL();
});
