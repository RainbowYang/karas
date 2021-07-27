let o = karas.parse({
  tagName: 'svg',
  props: {
    width: 360,
    height: 360,
  },
  children: [
    {
      tagName: 'span',
      props: {},
      animate: {
        value: [
          {
            color: '#F00',
          },
          {
            color: '#00F',
          }
        ],
        options: {
          duration: 200,
          fill: 'both',
          'var-iterations': {
            id: 'a'
          }
        },
      },
      children: [123]
    }
  ],
}, '#test', {
  vars: {
    a: 2,
  },
});
let input = document.querySelector('input');
let animate = o.animateController.list[0];
let n = 0;
let b = 0;
animate.on('begin', function() {
  b++;
});
animate.on('frame', function() {
  n++;
});
animate.on('finish', function() {
  input.value = (n < 30) + '/' + b;
});
