let o = karas.parse({
  tagName: 'svg',
  props: {},
  children: [
    {
      library: [{
        id: 'a',
        tagName: 'span',
        children: [0],
      }],
      tagName: 'div',
      props: {
        style: {
          color: '#999',
          'var-color': {
            id: 'red',
          },
        },
      },
      children: [{
        libraryId: 'a',
      }],
    },
    {
      library: [{
        id: 'a',
        tagName: 'span',
        props: {
          style: {
            color: '#999',
            'var-color': {
              id: 'blue',
            },
          },
        },
        children: [1],
      }],
      tagName: 'div',
      props: {
        style: {
          color: '#999',
          'var-color': {
            id: 'red',
          },
        },
      },
      children: [{
        libraryId: 'a',
      }],
    },
    karas.parse({
      library: [{
        id: 'a',
        tagName: 'span',
        props: {
          style: {
            color: '#999',
            'var-color': {
              id: 'green',
            },
          },
        },
        children: [2],
      }],
      tagName: 'div',
      props: {},
      children: [{
        libraryId: 'a',
      }],
    }),
    karas.parse({
      library: [{
        id: 'a',
        tagName: 'span',
        props: {
          style: {
            color: '#999',
            'var-color': {
              id: 'blue',
            },
          },
        },
        children: [3],
      }],
      tagName: 'div',
      props: {},
      children: [{
        libraryId: 'a',
      }],
    }, {
      vars: {
        blue: '#99F',
      },
    })
  ],
}, '#test', {
  vars: {
    red: '#F00',
    green: '#0F0',
    blue: '#00F',
  },
});
var input = document.querySelector('#base64');
input.value = JSON.stringify(o.virtualDom);
