let o = karas.parse({
  tagName: 'canvas',
  props: {
    width: 360,
    height: 360,
  },
  children: [
    {
      tagName: 'div',
      props: {},
      animate: {
        value: [
          {
            tx: 0,
          },
          {
            tx: 100,
            "var-translateX": {
              id: 'aaa'
            }
          }
        ],
        options: {
          duration: 200,
          fill: 'both',
        },
      },
      children: [123]
    }
  ],
}, '#test', {
  vars: {
    aaa: 200,
  },
});
let t = o.children[0];
t.animationList[0].on(karas.Event.FINISH, () => {
  let input = document.querySelector('input');
  input.value = t.getComputedStyle().translateX;
});
