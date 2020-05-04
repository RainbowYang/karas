karas.inject.measureImg('../image.png', function() {
  let o = karas.render(
    <svg width="360" height="360">
      <img src="../image.png" style={{width:50,height:50}}/>
    </svg>,
    '#test'
  );
  let input = document.querySelector('#base64');
  input.value = document.querySelector('svg').outerHTML;
  o.on('refresh', function(lv) {
    input.value += lv;
  });
});

