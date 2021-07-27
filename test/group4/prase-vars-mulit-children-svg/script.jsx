let o = karas.parse({
  tagName: 'svg',
  props: {
    width: 360,
    height: 360,
  },
  children: [
    {
      tagName: 'span',
      props: {
        style: {
          display: 'inlineBlock'
        }
      },
      animate: {
        value: [
          {
            translateX: 0,
          },
          {
            translateX: 100,
          }
        ],
        options: {
          duration: 200,
          fill: 'both',
        },
      },
      children: [123,456],
      "var-children.0": {
        id: 'aaa'
      },
      "var-children.1": {
        id: 'bbb'
      },
    }
  ],
}, '#test', {
  vars: {
    aaa: 200,
    bbb: 'abc'
  },
});
let t = o.children[0];
t.animationList[0].on(karas.Event.FINISH, () => {
  let input = document.querySelector('input');
  input.value = document.querySelector('svg').outerHTML;
});
