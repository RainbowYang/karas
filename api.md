# 全局
`karas`是暴露在`window`全局下的变量，可以直接访问。当采用模块引入（如ES6或npm）时，它也是作为模块的引用变量。

```js
window.karas; // js
import karas from 'karas';  // es module
var karas = require('karas'); // cjs
```

## karas

<a name="version"></a>
### version
* **类型** `String`
* **说明**  
当前karas的版本，即`package.json`的`version`字段。
* **示例**
```jsx
console.log(karas.version);
```

<a name="render"></a>
### render
* **类型** `Function`
* **参数**
  * root `Root`  
  canvas/svg根节点，VirtualDom的根，类似HTML的body节点。详见[Root](#Root)。
  * dom `DOM/String`
  HTML节点或者SELECTOR选择器，真实DOM，karas将最终渲染在此dom对象上。如果是普通节点（如div）将在其下生成新的root节点（如canvas），如果是canvas/svg节点将直接利用。不存在或者root不匹配会报错。
* **说明**  
入口方法，将需要渲染的数据最终绘制到dom对象上，根据root的tagName自动使用canvas/svg模式。
* **示例**
```jsx
karas.render(
  <canvas>Hello Karas on canvas!</canvas>,
  '#selector'
);
karas.render(
  <svg>Hello Karas on svg!</svg>,
  document.body
);
```

<a name="parse"></a>
### parse
* **类型** `Function`
* **参数**
  * json `JSON`
  对应csx的json数据格式，一般是工具生成，最终会转化为同等csx代码。
  * dom `DOM/String`
  同[render()](#render)的dom参数。
  * options `Object`
  整体动画初始化参数，同[Animation](#Animation)的options。
* **说明**  
入口方法，同[render()](#render)类似，接收的json可以动态化下发，更加灵活，但也缺少了一些编程本身的功能（如不能写逻辑和函数）。
* **示例**
```jsx
karas.parse(
  {
    "tagName": "canvas",
    "props": {
      "width": 100,
      "height": 100
    },
    "children": ["Hello karas!"]
  },
  '#selector'
);
```

<a name="Event"></a>
### Event
* **类型** `class`
* **说明**  
一个简单的事件基类，[Root](#Root)、[Component](#Component)均实现了此类，可以发送和侦听自定义事件。详见[自定义事件](#自定义事件)。

<a name="mode"></a>
### mode
* **类型** `int`
* **枚举**
  * CANVAS `0`
  * SVG `1`
  * WEBGL `2`
* **说明**  
渲染类型的枚举值，在覆盖render()方法时会作为首参传入，标明当前根节点类型。一般在自定义组件、自定义矢量类型时用到。
* **示例**
```jsx
class Component extends karas.Component {
  render(renderMode) {
    if(renderMode === karas.mode.CANVAS) {
      // 处理渲染canvas的逻辑
    }
    else if(renderMode === karas.mode.SVG) {
      // 处理渲染svg的逻辑
    }
    else if(renderMode === karas.mode.WEBGL) {
      // 处理渲染webgl的逻辑
    }
  }
}
```

<a name="Node"></a>

## Node
Xom/Text的基类，抽象共有部分。

### 类属性property

#### x
* **类型** `Number` 只读
* **说明**  
x坐标。

#### y
* **类型** `Number` 只读
* **说明**  
y坐标。

#### ox
* **类型** `Number` 只读
* **说明**  
x偏移坐标，因relative造成。

#### oy
* **类型** `Number` 只读
* **说明**  
y偏移坐标，因relative造成。

#### width
* **类型** `Number` 只读
* **说明**  
宽度。

#### height
* **类型** `Number` 只读
* **说明**  
高度。

#### innerWidth
* **类型** `Number` 只读
* **说明**  
内部宽度，包含padding。注意节点display:none时为0。

#### innerHeight
* **类型** `Number` 只读
* **说明**  
内部高度，包含padding。注意节点display:none时为0。

#### style
* **类型** `Object` 只读
* **说明**  
标签属性中传入的style样式集合。

#### currentStyle
* **类型** `Object` 只读
* **说明**  
当前的style样式集合，格式化后的。如果有动画，更新的样式反应在`currentStyle`上，而不会修改原始`style`引用。

#### computedStyle
* **类型** `Object` 只读
* **说明**  
当前的style样式集合，计算后的，类似window.getComputedStyle()。

#### prev
* **类型** `Xom` 只读
* **说明**  
前面一个相邻的兄弟节点。

#### next
* **类型** `Xom` 只读
* **说明**  
后面一个相邻的兄弟节点。

#### parent
* **类型** `Xom` 只读
* **说明**  
直接父亲节点。

#### domParent
* **类型** `Xom` 只读
* **说明**  
真实父亲节点，[Component](#Component)的[shadowRoot](#shadowRoot)没有`parent`，因此`domParent`会指向`Component`本身的`parent`。

#### root
* **类型** `Root` 只读
* **说明**  
根节点。详见[Root](#Root)。

#### host
* **类型** `Root/Component` 只读
* **说明**  
局部根节点，即ref所属的根节点。当出现在一个组件内部时，通过`Component.ref.a`访问到自己，是属于组件的。当直接出现在Root下时，通过`Root.ref.a`访问到自己，是属于Root。详见[Root](#Root)、[Component](#Component)。

#### bbox
* **类型** `Array<Number>` 只读
* **说明**  
所占矩形坐标框，不包含margin。

#### baseLine
* **类型** `Number` 只读
* **说明**  
baseLine，字母x的下边线位置。

<a name="Text"></a>

## Text
文字类，处理有关文本的数据。[Node](#Node)的派生类。

### 类属性property

#### content
* **类型** `String` 读写
* **说明**  
读取/设置文本的内容。

#### charWidth
* **类型** `Number` 只读
* **说明**  
内容中最大字符宽度。

#### charWidthList
* **类型** `Array<Number>` 只读
* **说明**  
内容的所有字符宽度列表。

#### textWidth
* **类型** `Number` 只读
* **说明**  
内容的字符宽度总和。

<a name="Xom"></a>
## Xom
Dom/Geom的基类，抽象共有部分。[Node](#Node)的派生类。

### 类属性property

#### tagName
* **类型** `String` 只读
* **说明**  
标签名。

#### sx
* **类型** `Number` 只读
* **说明**  
x坐标+偏移坐标。

#### sy
* **类型** `Number` 只读
* **说明**  
y坐标+偏移坐标。

#### outerWidth
* **类型** `Number` 只读
* **说明**  
外部宽度，包含margin、border、padding。注意节点display:none时为0。

#### outerHeight
* **类型** `Number` 只读
* **说明**  
外部高度，包含margin、border、padding。注意节点display:none时为0。

#### listener
* **类型** `Object` 只读
* **说明**  
所有onXxx侦听存储的hash，一般开发用不到。

#### matrix
* **类型** `Array<Number>` 只读
* **说明**  
css标准的transform最终计算值，一维6为数组表达，相对于父元素。

#### matrixEvent
* **类型** `Array<Number>` 只读
* **说明**  
canvas标准的transform最终计算值，一维6为数组表达，相对于根元素。

#### renderMatrix
* **类型** `Array<Number>` 只读
* **说明**  
svg标准的transform最终计算值，一维6为数组表达，相对于父元素。

#### animationList
* **类型** `Array<Animation>` 只读
* **说明**  
当前的动画队列。详见[Animation](#Animation)。

#### availableAnimating
* **类型** `boolean` 只读
* **说明**  
当前的所有动画列表中是否包含有效的。无效的定义是类似`pointer-events`这种对渲染无效的css动画。没有动画也是无效。

#### effectiveAnimating
* **类型** `boolean` 只读
* **说明**  
当前的所有动画列表中是否包含有影响的。影响的定义是`opacity`、`transform`、`filter`、`visibility`这种对渲染缓存有影响的css动画。没有动画也是无效，包含`availableAnimating`。

#### displayAnimating
* **类型** `boolean` 只读
* **说明**  
当前的所有动画列表中是否包含display变化的，且本帧和下一帧有变化。

#### visibilityAnimating
* **类型** `boolean` 只读
* **说明**  
当前的所有动画列表中是否包含visibility变化的，且本帧和下一帧有变化。

#### isShadowRoot
* **类型** `boolean` 只读
* **说明**  
是否是[Component](#Component)的shadowRoot。

#### isDestroyed
* **类型** `boolean` 只读
* **说明**  
是否以被销毁。

### 类方法method

#### animate
* **类型** `Function`
* **参数**
  * list `Array<Object>`
  动画列表
  * options `Object`
  动画参数
* **说明**  
开始执行一段动画并将结果存入animateList中。
* **示例**
```jsx
let root = karas.render(
  <canvas>
    <$rect style={{width: 100, height:100}} ref="rect"/>
  </canvas>,
  '#selector'
);
root.ref.rect.animate([
  {
    "translateX": 0
  },
  {
    "translateX": 100
  },
], {
  duration: 1000,
});
```

#### removeAnimate
* **类型** `Function`
* **参数**
  * target `Animation`
  动画对象
* **说明**  
取消并从animateList中移除一段动画。
* **示例**
```jsx
let root = karas.render(
  <canvas>
    <$rect style={{width: 100, height:100}} ref="rect"/>
  </canvas>,
  '#selector'
);
let animate = root.ref.rect.animate([
  {
    "translateX": 0
  },
  {
    "translateX": 100
  },
], {
  duration: 1000,
});
root.ref.removeAnimate(animate);
```

#### clearAnimate
* **类型** `Function`
* **参数**
  * target `Animation`
  动画对象
* **说明**  
取消所有动画并清空animateList中。

#### updateStyle
* **类型** `Function`
* **参数**
  * style `Object`
  更新的样式inline集合
  * cb `Function`
  更新且刷新后的回调
* **说明**  
异步更新样式。
* **示例**
```jsx
let root = karas.render(
  <canvas>
    <div ref="div">text</div>
  </canvas>,
  '#selector'
);
root.ref.div.updateStyle({
  color: '#F00',
}, function() {
  console.log('updateStyle');
});
```

### html属性attribute

#### onXxx
* **类型** `Function`
* **说明**  
侦听Dom事件，on后面跟驼峰事件名。
* **示例**
```jsx
karas.render(
  <canvas>
    <div onClick={e => conosole.log('click', e)}>click</div>
  </canvas>,
  '#selector'
);
```

#### style
* **类型** `Object`
* **说明**  
css样式，jsx的inline写法。
* **示例**
```jsx
karas.render(
  <canvas>
    <div style={{ color: '#F00' }}>style</div>
  </canvas>,
  '#selector'
);
```

#### ref
* **类型** `String/Function`
* **说明**  
引用标识，可供局部根节点访问到。
* **示例**
```jsx
let div;
let root = karas.render(
  <canvas>
    <div ref="div">ref</div>
    <div ref={ref => div = ref}>ref</div>
  </canvas>,
  '#selector'
);
console.log(root.ref.div === div);
```

<a name="Dom"></a>
### Dom
* **类型** `class`
* **说明**  
VirtualDom的基类，所有非图形vd均是继承或实现了此类。一般情况下开发用不到。详见[虚拟Dom](#虚拟Dom)。

<a name="Root"></a>
### Root
* **类型** `class`
* **说明**  
[Dom](#Dom)的派生类，根节点canvas/svg/webgl实现了此类。一般情况下开发用不到。详见[根节点](#根节点)。
* **示例**
```jsx
let root = karas.render(
  <canvas>Hello Root!</canvas>,
  '#selector'
);
console.log(root);
```

<a name="Geom"></a>
### Geom
* **类型** `class`
* **说明**  
自定义矢量图形，目前内置的有`Circle`、`Ellipse`、`Line`、`Polygon`、`Polyline`、`Rect`、`Sector`几类基本图形。当需要更多的类型时，需继承此类并覆盖render()方法，实现代码复用。详见[自定义图形](#自定义图形)。
* **示例**
```jsx
class Custom extends karas.Geom {
  render(renderMode, lv, ctx, defs) {
    if(renderMode === karas.mode.CANVAS) {
      // canvas下绘制自定义图形
    }
    else if(renderMode === karas.mode.SVG) {
      // svg下绘制自定义图形
    }
    else if(renderMode === karas.mode.WEBGL) {
      // webgl下绘制自定义图形
    }
  }
}
// 需先注册自定义图形
karas.Geom.register('$custom', Custom);
karas.render(
  <$custom/>,
  '#selector'
);
```

<a name="Component"></a>
### Component
* **类型** `class`
* **说明**  
自定义组件，类似React的Component，逻辑和绘制的代码集合，可复用。详见[自定义组件](#自定义组件)。
* **示例**
```jsx
class Component extends karas.Component {
  render() {
    return <div>Hello Component!</div>;
  }
}
karas.render(
  <Component/>,
  '#selector'
);
```

<a name="util"></a>
### util
* **类型** `Object`
* **说明**  
一组工具方法的集合，用以附加处理工具类的方法。一般情况下开发用不到。详见[工具集](#工具集)。

<a name="inject"></a>
### inject
* **类型** `Object`
* **说明**  
一组注入方法的集合，用以注入实现非普通浏览器环境下的必要方法（如小程序、native开发）。一般情况下开发用不到。详见[注入](#注入)。

<a name="style"></a>
### style
* **类型** `Object`
* **说明**  
公开的style包下的对象集合，用以处理样式相关的方法。一般情况下开发用不到。详见[style包](#style包)。

<a name="parser"></a>
### parser
* **类型** `Object`
* **说明**  
公开的parser包下的对象集合，用以处理动态json相关的方法。一般情况下开发用不到。详见[parser包](#parser包)。

<a name="animate"></a>
### animate
* **类型** `Object`
* **说明**  
公开的animate包下的对象集合，用以处理动画相关的方法。一般情况下开发用不到。详见[animate包](#animate包)。

<a name="math"></a>
### math
* **类型** `Object`
* **说明**  
公开的math包下的对象集合，用以处理数学相关的方法。一般情况下开发用不到。详见[math包](#math包)。

<a name="refresh"></a>
### refresh
* **类型** `Object`
* **说明**  
公开的refresh包下的对象集合，用以处理刷新缓存相关的方法。一般情况下开发用不到。详见[refresh包](#refresh包)。

<a name="自定义事件"></a>
## 自定义事件
除了Dom标准事件，自定义事件也很常用，最典型的例子是EventBus。实例化Event类或者继承Event类是普遍的做法，当继承Event类后，可使用其发送侦听注销事件的功能。

### 类方法method

#### on
* **类型** `Function`
* **参数**
  * id `String`
  侦听的事件id。
  * handle `Function`
  处理事件的回调。
* **说明**  
侦听`id`事件，当发生时触发`handle`回调处理。
* **示例**
```jsx
let event = new karas.Event();
event.on('event-id', function() {
  console.log('触发了事件');
});
event.emit('event-id');
```

#### once
* **类型** `Function`
* **参数**
  * id `String`
  侦听的事件id。
  * handle `Function`
  处理事件的回调。
* **说明**  
侦听`id`事件，当发生时仅触发一次`handle`回调处理。
* **示例**
```jsx
let event = new karas.Event();
event.once('event-id', function() {
  console.log('触发了事件');
});
event.emit('event-id');
event.emit('event-id'); // 第2次无效
```

#### off
* **类型** `Function`
* **参数**
  * id `String`
  取消侦听的事件id。
  * handle `Function`
  取消处理事件的回调。可选。
* **说明**  
取消侦听`id`事件的`handle`回调，未声明`handle`时取消全部。
* **示例**
```jsx
let event = new karas.Event();
event.once('event-id', function() {
  console.log('触发了事件');
});
event.off('event-id');
event.emit('event-id'); // 无效
```

#### emit
* **类型** `Function`
* **参数**
  * id `String`
  触发侦听的事件id。
  * ...data `*`
  触发事件的实参。可选多个。
* **说明**  
触发`id`事件的并附带任意多个数据。
* **示例**
```jsx
let event = new karas.Event();
event.once('event-id', function(a, b) {
  console.log('触发了事件', a, b);
});
event.emit('event-id', 'p1', 2);
```

### 静态属性static

#### mix
* **类型** `Function`
* **参数**
  * obj `Object`
  需要混入Event功能的对象。可选多个。
* **说明**  
当一个对象的类无法继承`Event`时，可选择混入实例对象的方式来达到同样的功能。值得注意的时会在对象上生成一个`__eHash`属性，以及上面所有的`Event`类方法。
* **示例**
```jsx
let obj = karas.Event.mix({});
obj.once('event-id', function() {
  console.log('触发了事件');
});
obj.emit('event-id');
```

#### REFRESH
* **类型** `String`
* **值** `refresh`
* **说明**  
枚举变量，一般在侦听[Root](#Root)刷新时使用。
* **示例**
```jsx
let root = karas.render(
  <canvas>Hello Root!</canvas>
);
root.on(karas.Event.REFRESH, function() {
  console.log('refresh');
});
root.appendTo('#selector');
```

#### PAUSE
* **类型** `String`
* **值** `pause`
* **说明**  
枚举变量，一般在侦听[Animation](#Animation)暂停时使用。
* **示例**
```jsx
let root = karas.render(
  <canvas>
    <div ref="div">pause</div>
  </canvas>,
  '#selector'
);
let a = root.ref.div.animate([
  {
    translateX: 0,
  },
  {
    translateX: 100,
  },
], {
  duration: 1000,
});
a.on(karas.Event.PAUSE, function() {
  console.log('pause');
});
a.pause();
```

#### PLAY
* **类型** `String`
* **值** `play`
* **说明**  
枚举变量，一般在侦听[Animation](#Animation)播放时使用。
* **示例**
```jsx
let root = karas.render(
  <canvas>
    <div ref="div">play</div>
  </canvas>,
  '#selector'
);
let a = root.ref.div.animate([
  {
    translateX: 0,
  },
  {
    translateX: 100,
  },
], {
  duration: 1000,
});
a.on(karas.Event.PLAY, function() {
  console.log('play');
});
a.play(); // 手动调用play()可以省略，动画本身就是自动播放
```

#### FRAME
* **类型** `String`
* **说明**  
枚举变量，一般在侦听[Animation](#Animation)播放每帧时使用。
* **示例**
```jsx
let root = karas.render(
  <canvas>
    <div ref="div">frame</div>
  </canvas>,
  '#selector'
);
let a = root.ref.div.animate([
  {
    translateX: 0,
  },
  {
    translateX: 100,
  },
], {
  duration: 1000,
});
a.on(karas.Event.FRAME, function() {
  console.log('frame'); // 每帧都会调用
});
```

#### FINISH
* **类型** `String`
* **说明**  
枚举变量，一般在侦听[Animation](#Animation)完成时使用。
* **示例**
```jsx
let root = karas.render(
  <canvas>
    <div ref="div">pause</div>
  </canvas>,
  '#selector'
);
let a = root.ref.div.animate([
  {
    translateX: 0,
  },
  {
    translateX: 100,
  },
], {
  duration: 1000,
});
a.on(karas.Event.FINISH, function() {
  console.log('finish');
});
```

#### CANCEL
* **类型** `String`
* **说明**  
枚举变量，一般在侦听[Animation](#Animation)取消时使用。
* **示例**
```jsx
let root = karas.render(
  <canvas>
    <div ref="div">cancel</div>
  </canvas>,
  '#selector'
);
let a = root.ref.div.animate([
  {
    translateX: 0,
  },
  {
    translateX: 100,
  },
], {
  duration: 1000,
});
a.on(karas.Event.CANCEL, function() {
  console.log('cancel');
});
```

#### BEGIN
* **类型** `String`
* **说明**  
枚举变量，一般在侦听[Animation](#Animation)每轮开始时使用。
* **示例**
```jsx
let root = karas.render(
  <canvas>
    <div ref="div">begin</div>
  </canvas>,
  '#selector'
);
let a = root.ref.div.animate([
  {
    translateX: 0,
  },
  {
    translateX: 100,
  },
], {
  duration: 1000,
  iterations: 2,
});
a.on(karas.Event.BEGIN, function() {
  console.log('begin'); // 因为播放循环2次，所以有2轮开始。
});
```

#### END
* **类型** `String`
* **说明**  
枚举变量，一般在侦听[Animation](#Animation)每轮结束时使用。
* **示例**
```jsx
let root = karas.render(
  <canvas>
    <div ref="div">end</div>
  </canvas>,
  '#selector'
);
let a = root.ref.div.animate([
  {
    translateX: 0,
  },
  {
    translateX: 100,
  },
], {
  duration: 1000,
  iterations: 2,
});
a.on(karas.Event.END, function() {
  console.log('end'); // 因为播放循环2次，所以有2轮结束。
});
```

<a name="虚拟Dom"></a>
## 虚拟Dom
同React一样，VirtualDom是个很重要的概念。不过karas中的虚拟Dom更加纯粹，因为React最终会映射到真实Dom中，但karas的canvas/svg/webgl根本就没有Dom，VirtualDom是真的虚拟。另见基类[Xom](#Xom)。

### 类属性property

#### children
* **类型** `Array<Dom/Text/Geom>`
* **说明**  
此Dom下的直接孩子，可能是Dom/Text/Geom中的一种。

#### flowChildren
* **类型** `Array<Dom/Text/Geom>`
* **说明**  
此Dom下的直接孩子，且是文档流的孩子，即普通布局。

#### absChildren
* **类型** `Array<Dom/Text/Geom>`
* **说明**  
此Dom下的直接孩子，且是定位流的孩子，即绝对布局。

#### zIndexChildren
* **类型** `Array<Dom/Text/Geom>`
* **说明**  
此Dom下的直接孩子，且按照zIndex属性排好顺序，去除`mask`遮罩孩子。

#### lineGroups
* **类型** `Array<Dom/Text/Geom>`
* **说明**  
此Dom下的块元素组，一组可能是一个块元素，或者若干个没换行行内元素。

#### baseLine
* **类型** `Number`
* **说明**  
此Dom的baseLine，即最后一个lineGroups内容下Dom的baseLine。

#### key
* **类型** `Object`
* **说明**  
svg渲染模式下，DomDiff时唯一特殊对比标识，相同key的优先对比。一般配合在[自定义组件](#自定义组件)中使用，向相同真实Dom进行绘制时也会生效。
* **示例**
```jsx
karas.render(
  <svg>
    <div key="key">a</div>
  </svg>,
  '#selector'
);
karas.render(
  <svg>
    <div key="key">b</div>
  </svg>,
  '#selector'
);
```

<a name="根节点"></a>
## 根节点
karas.render()方法渲染的根节点是个特殊虚拟Dom，它扩展了一些必要的功能。另见基类[Dom](#Dom)。

### 类属性property

#### dom
* **类型** `Dom` 只读
* **说明**  
根节点所对应的真实Dom节点，即appendTo()的节点。

#### renderMode
* **类型** `int` 只读
* **说明**  
当前根节点渲染类型。[karas.mode](#mode)的枚举值。

#### ctx
* **类型** `CanvasRenderingContext2D` 只读
* **说明**  
当渲染类型为canvas时，为canvas的2d上下文；当渲染类型为webgl时，为webgl的3d上下文。

#### defs
* **类型** `Object` 只读
* **说明**  
当渲染类型为svg时，特殊生成的对应svg功能中<defs/>的封装对象。一般开发用不到。

#### task
* **类型** `Object` 只读
* **说明**  
[Root](#Root)异步刷新时保存刷新回调的队列。一般开发用不到。

#### ref
* **类型** `Object` 只读
* **说明**  
同React一样，类似[Component](#Component)的ref功能。获取所包含的虚拟Dom对象引用时用到。

#### animateController
* **类型** `Object` 只读
* **说明**  
配合[karas.parse()](#parse)使用，全局动画控制器，对json中所有动画统一进行控制，方法同[Animation](#Animation)一样。
* **示例**
```jsx
let root = karas.parse(
  {
    "tagName": "canvas",
    "children": [
      {
        "tagName": "div",
        "children": ["a"],
        "animate": {
          "value": [
            {
              "translateX": 0
            },
            {
              "translateX": 100
            }
          ],
          "options": {
            "duration": 1000
          }
        }
      },
      {
        "tagName": "div",
        "children": ["a"],
        "animate": {
          "value": [
            {
              "translateY": 0
            },
            {
              "translateT": 100
            }
          ],
          "options": {
            "duration": 1000
          }
        }
      }
    ]
  }
);
root.animateController.pause(); // 上面2个div动画都会停止
```

### 类方法method

#### appendTo
* **类型** `Function`
* **参数**
  * dom `Dom/String`
  HTML节点或者SELECTOR选择器，真实DOM，karas将最终渲染在此dom对象上。如果是普通节点（如div）将在其下生成新的root节点（如canvas），如果是canvas/svg节点将直接利用。不存在或者root不匹配会报错。
* **说明**  
将根节点真实绘制到对应真实Dom中，karas.render()实际上是生成Root节点后，再调用这个方法。当出现一些想在真实绘制之前插入的操作时，可使用这种拆开的做法，比如侦听首次渲染。
* **示例**
```jsx
let root = karas.render(
  <canvas>Hello Root!</canvas>
);
root.appendTo('#selector');

// 等同于下方

karas.render(
  <canvas>Hello Root!</canvas>,
  '#selector'
);
```
```jsx
let root = karas.render(
  <canvas>Hello Root!</canvas>
);
root.on('refresh', function() {
  console.log('这里会输出首次渲染');
});
root.appendTo('#selector');

// 不等同于下方

karas.render(
  <canvas>Hello Root!</canvas>,
  '#selector'
);
root.on('refresh', function() {
  console.log('这里不会输出首次渲染，因为已经渲染完了，除非首次渲染产生异步不可控情况');
});
```

#### scale
* **类型** `Function`
* **参数**
  * x `Number`
  高清方案下x缩放比例，影响事件响应坐标判断。可选，默认值1。
  * y `Number'
  高清方案下y缩放比例，影响事件响应坐标判断。可选，默认值等于x。
* **说明**  
当根节点的属性的width/height和样式的width/height不同时，需要设置缩放比例。canvas类似一张图片，属性的width/height是图片的真实尺寸，样式的width/height是最终渲染的尺寸。常见高清模式dpr为2时，样式尺寸设置为属性尺寸的一半，达到高清渲染的目的，此时scale要随之设置为2，等于dpr。
* **示例**
```jsx
let root = karas.render(
  <canvas>Hello Root!</canvas>,
  '#selector'
);
root.scale(2, 2);
```

#### addRefreshTask
* **类型** `Function`
* **参数**
  * cb `Function`
  异步刷新整个[Root](#Root)，完成后的回调。一般开发用不到。
* **说明**  
当特殊情况自定义更新但不触发整个Root刷新画布时，使用这个方法。
* **示例**
```jsx
let root = karas.render(
  <canvas>Hello Root!</canvas>,
  '#selector'
);
root.addRefreshTask(function() {
  console.log('refresh');
});
```

#### delRefreshTask
* **类型** `Function`
* **参数**
  * cb `Function`
  取消异步刷新整个[Root](#Root)的回调，找不到则无效。一般开发用不到。
* **说明**  
取消addRefreshTask()的功能。
* **示例**
```jsx
let root = karas.render(
  <canvas>Hello Root!</canvas>,
  '#selector'
);
function cb() {
  console.log('refresh'); // 被取消了不生效
}
root.addRefreshTask(cb);
root.delRefreshTask(cb);
```

### html属性attribute

#### width/height
* **类型** `Number`
* **说明**  
定义画布的尺寸，类似于浏览器body的尺寸。必需。
* **示例**
```jsx
karas.render(
  <canvas width={100} height={100}>Hello karas!</canvas>,
  '#selector'
);
```

#### cache
* **类型** `boolean`
* **说明**  
是否开启缓存功能，仅canvas/webgl生效，提升性能。可选。
* **示例**
```jsx
karas.render(
  <canvas cache={true}>Hello karas!</canvas>,
  '#selector'
);
```

<a name="自定义图形"></a>
## 自定义图形
有时候，内置的矢量图形标签不够用或者不好用，需要继承[Geom](#Geom)来实现。比如要绘制一个田字格，虽然用`$polyline`标签也能做到，但语义表达和数据传入非常不方便，这时候可以自定义来实现。另见基类[Xom](#Xom)。
* **示例**
```jsx
class Grid extends karas.Geom {
  render(renderMode, lv, ctx, defs) {
    let res = super.render(renderMode, lv, ctx, defs);
    // display:none或者有缓存等特殊情况会标识break，此时无需再次绘制
    if(res.break) {
      return res;
    }
    // 基类方法会返回一些已经计算好的属性方便使用
    let {
      originX,
      originY,
      fill,
      stroke,
      strokeWidth,
      strokeDasharrayStr,
      strokeLinecap,
      strokeLinejoin,
      strokeMiterlimit,
      fillRule,
      dx,
      dy,
    } = res;
    let { width, height } = this;
    originX += dx;
    originY += dy;
    if(renderMode === karas.mode.CANVAS) {
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(originX + width, originY);
      ctx.lineTo(originX + width, originY + height);
      ctx.lineTo(originX, originY + height);
      ctx.lineTo(originX, originY);
      ctx.moveTo(originX + width * 0.5, originY);
      ctx.lineTo(originX + width * 0.5, originY + height);
      ctx.moveTo(originX, originY + height * 0.5);
      ctx.lineTo(originX + width, originY + height * 0.5);
      ctx.stroke();
      ctx.closePath();
    }
  }
}
if(!karas.Geom.hasRegister('$grid')) {
  karas.Geom.register('$grid', Grid);
}
karas.render(
  <canvas>
    <$Grid style={{width: 100, height:100}}/>
  </canvas>,
  '#selector'
);
```

### 类属性property

#### isMulti
* **类型** `boolean` 只读
* **说明**  
当前标签属性是否传入了`multi`，表明图形是多个形式，数量是传入属性的数组长度。当为真值时，所有图形的数据均扩展一个维度数组表示。
* **示例**
```jsx
karas.render(
  <canvas>
    <$line x1={0} x2={1} y1={0} y2={1} style={{width: 100, height:100}}/>
    <$line x1={[0, 0.1]} x2={[1, 0.9]} y1={[0, 0.2]} y2={[1, 0.8]} style={{width: 100, height:100}} multi={true}/>
  </canvas>,
  '#selector'
);
```

#### isMask
* **类型** `boolean` 只读
* **说明**  
当前标签属性是否传入了`mask`，表明图形是半透明遮罩。当为真值时，强制没有边线，因此只有封闭图形有效。
* **示例**
```jsx
karas.render(
  <canvas>
    <$rect style={{width: 100, height:100}} mask={true}/>
  </canvas>,
  '#selector'
);
```

#### isClip
* **类型** `boolean` 只读
* **说明**  
当前标签属性是否传入了`clip`，表明图形是无透明遮罩。当为真值时，强制没有边线且没有透明度，因此只有封闭图形有效。
* **示例**
```jsx
karas.render(
  <canvas>
    <$rect style={{width: 100, height:100}} clip={true}/>
  </canvas>,
  '#selector'
);
```

#### currentProps
* **类型** `Object` 只读
* **说明**  
当前标签属性副本，注意和`props`的区别。当有动画不断更改props某个属性时，并不会直接修改props原始值，而是反应在currentProps上。

### 类方法method

#### getProps
* **类型** `Function`
* **参数**
  * k `String`
  键值key。
* **说明**  
返回`currentProps`上的值，如果为空则返回`props`上的值。

### 静态属性static

#### getRegister
* **类型** `Function`
* **参数**
  * name `String`
  返回已注册名字为name的矢量图形对象。
* **说明**  
任何矢量图形都需要先注册，内置的图形已经内置注册，如`$line`对应`Line`类。强制要求矢量图形以`$`开头，保持命名统一是良好的编程习惯。

#### register
* **类型** `Function`
* **参数**
  * name `String`
  * target `class`
  将要注册的矢量图形类。
* **说明**  
注册名字为name的矢量图形对象为target类。

#### hasRegister
* **类型** `Function`
* **参数**
  * name `String`
  返回名字为name是否已经被注册为矢量图形对象。  
* **说明**  
注册前先检查是否已经被注册过。

<a name="自定义组件"></a>
## 自定义组件
同React一样，组件是在VirtualDom之上的一层封装，通过覆盖render()方法实现自定义输出渲染，通过调用setState()方法更新数据，从而完成视图的更新。另外为了贴合`Web Componet`，部分采用了`ShadowDom`的标准设计，详见[ShadowDom](#ShadowDom)。

### 类属性property

#### 代理实现
tagName、root、host、prev、next、parent、isDestroyed、x、y、width、height、innerWidth、innerHeight、outerWidth、outerHeight、style、animationList、currentStyle、computedStyle、currentProps、baseLine、availableAnimating、effectiveAnimating、displayAnimating、visibilityAnimating、bbox，同[Xom](#Xom)或[Dom](#Dom)或[Geom](#Geom)，均为代理。

<a name="shadow"></a>
#### shadow
* **类型** `Object` 只读
* **说明**  
组件的直接Dom子树的根节点，和[shadowRoot](#shadowRoot)不同，当组件的render()方法递归返回组件时，`shadow`指向返回的组件，`shadowRoot`则递归下去直到虚拟Dom。

<a name="shdaowRoot"></a>
#### shadowRoot
* **类型** `Object` 只读
* **说明**  
组件的真实Dom子树的根节点，和[shadow](#shadow)不同。

#### state
* **类型** `Object` 只读
* **说明**  
组件的state，和React一样。

#### host
* **类型** `Root/Component` 只读
* **说明**  
局部根节点，即ref所属的根节点。当组件a出现在另一个组件b内部时，a同时有ref，则可通过b.ref.a访问到a，a是属于b的。当组件a直接出现在Root下时，a属于Root。详见[Root](#Root)。

### 类方法method

#### 代理实现
animate、removeAnimate、clearAnimate、updateStyle，同[Xom](#Xom)或[Dom](#Dom)或[Geom](#Geom)，均为代理。

#### setState
* **类型** `Function`
* **参数**
  * newState `Object`
  混入老的state中的新数据。
  * cb `Function`
  执行并刷新后的回调。
* **说明**  
组件更新state，和React一样。
* **示例**
```jsx
let root = karas.render(
  <canvas>
    <Component ref="cp"/>
  </canvas>,
  '#selector'
);
root.ref.cp.setState({ a: 1 }, function() {
  console.log('setState finish');
});
```

### html属性attribute

#### onXxx/style/ref
* **说明**  
同[Xom](#Xom)。

#### on-xxx
* **类型** `Function`
* **说明**  
侦听自定义事件，on后面跟-再跟事件名。组件本身继承了[Event](#Event)，所以可以触发自定义事件。

<a name="工具集"></a>
## 工具集

### isObject
* **类型** `Function`
* **参数**
  * target `*`
* **说明**  
返回target是否是一个对象。

### isString
* **类型** `Function`
* **参数**
  * target `*`
* **说明**  
返回target是否是一个字符串。

### isFunction
* **类型** `Function`
* **参数**
  * target `*`
* **说明**  
返回target是否是一个函数。

### isNumber
* **类型** `Function`
* **参数**
  * target `*`
* **说明**  
返回target是否是一个数字。

### isBoolean
* **类型** `Function`
* **参数**
  * target `*`
* **说明**  
返回target是否是一个布尔值。

### isDate
* **类型** `Function`
* **参数**
  * target `*`
* **说明**  
返回target是否是一个日期。

### isNil
* **类型** `Function`
* **参数**
  * target `*`
* **说明**  
返回target是否是null或undefined。

### isPrimitive
* **类型** `Function`
* **参数**
  * target `*`
* **说明**  
返回target是否是原始值，即isNil、isBoolean、isString、isNumber。

### isAuto
* **类型** `Function`
* **参数**
  * target `*`
* **说明**  
返回target是否是null或undefined或字符串auto。

### stringify
* **类型** `Function`
* **参数**
  * target `*`
* **说明**  
如果target为null或undefined，返回空字符串，否则返回toString()表达。

### joinSourceArray
* **类型** `Function`
* **参数**
  * target `Array/*`
* **说明**  
如果target为Array，递归遍历每一项相加，且stringify()相连。如果是其它类型，直接调用stringify()。

### encodeHtml
* **类型** `Function`
* **参数**
  * s `String`
  需要格式化的字符串对象
  * isProps `boolean`
  是否是html属性
* **说明**  
编码双引号，当isProps为真时还包含尖括号、连字符。

### rgba2int
* **类型** `Function`
* **参数**
  * s `String`
  rgba值。
* **说明**  
将css格式的rgba颜色转换为一维4长度的int数组表达方式。

### int2rgba
* **类型** `Function`
* **参数**
  * s `Array<int>`
  rgba值。
* **说明**  
将一维4长度的int颜色数组转换为css格式的rgba表达方式。

### equalArr
* **类型** `Function`
* **参数**
  * a `Array<*>`
  * b `Array<*>`
* **说明**  
简化的对比Array的方式，数组中只有原始类型和引用类型，递归对比原始值和引用。

### equal
* **类型** `Function`
* **参数**
  * a `Array<*>`
  * b `Array<*>`
* **说明**  
深度对比对象。

### extend
* **类型** `Function`
* **参数**
  * target `Object`
  * source `Object`
  * keys `Array<String>` 可选
* **说明**  
按顺序继承source对象并生成新的target，当keys存在时只继承keys中的值。

### extend
* **类型** `Function`
* **参数**
  * target `Object`
  * source `Object`
  * keys `Array<String>` 可选
* **说明**  
按顺序继承source对象并生成新的target，当keys存在时只继承keys中的值。

<a name="注入"></a>
## 注入
在小程序、native等特殊环境下，一些必要的属性或方法和浏览器环境下不同，因此抽象出来这一部分作为可注入的实现。此举是面向框架开发维护人员的，普通开发者无需关注。

<a name="style包"></a>
## style包
包含`css`、`reset`、`unit`、`font`子对象。

### css
处理样式的工具集合。此举是面向框架开发维护人员的，普通开发者无需关注。

### reset
存储默认样式。

#### DOM
* **类型** `Object`
* **说明**  
普通Dom的样式hash枚举。

#### DOM_KEY_SET
* **类型** `Array<String>`
* **说明**  
普通Dom的样式键值列表。

#### DOM_ENTRY_SET
* **类型** `Array<Object>`
* **说明**  
普通Dom的样式键值对列表。

#### GEOM
* **类型** `Object`
* **说明**  
Geom矢量几何图形的样式hash枚举。

#### GEOM_KEY_SET
* **类型** `Array<String>`
* **说明**  
Geom矢量几何图形的样式键值列表。

#### GEOM_ENTRY_SET
* **类型** `Array<Object>`
* **说明**  
Geom矢量几何图形的样式键值对列表。

#### INHERIT
* **类型** `Object`
* **说明**  
普通Dom中默认继承的样式键值列表。

#### INHERIT_KEY_SET
* **类型** `Object`
* **说明**  
普通Dom中默认继承的样式hash枚举。

#### isValid
* **类型** `Function`
* **参数**
  * k `String`
  样式键值名
* **说明**  
检测样式名k是否合法是当前支持可用的。

### unit
单位枚举。包含：`AUTO`、`PX`、`PERCENT`、`NUMBER`、`INHERIT`、`DEG`、`STRING`、`RGBA`。

### font
定义字体相关的信息，目前只有arial一种。此举是面向框架开发维护人员的，普通开发者无需关注。

<a name="parser包"></a>
## parser包
包含解析动态json的方法，和简写信息。

### parse
* **类型** `Function`
* **说明**  
实现karas.parse()的逻辑。此举是面向框架开发维护人员的，普通开发者无需关注。

### abbr
定义简写枚举、转换方法。此举是面向框架开发维护人员的，普通开发者无需关注。

<a name="animate包"></a>
## animate包
一系列处理动画相关的程序。

### Animation
详见[Animation](#Animation)。

### Controller
[Root](#Root)的animateController属性的类。此举是面向框架开发维护人员的，普通开发者无需关注。

### easing
贝塞尔曲线缓动计算方法。此举是面向框架开发维护人员的，普通开发者无需关注。

### frame
帧动画工具。详见[frame](#frame)。

<a name="Animation"></a>
## Animation
[Xom](#Xom)执行动画后返回的对象，包含动画数据和控制方法。和`Web Animation Api`保存标准一致，用法相同。

### 类属性property

#### id
* **类型** `String` 只读
* **说明**  
返回动画的唯一id。

#### target
* **类型** `Xom` 只读
* **说明**  
返回动画的[Xom](#Xom)对象。

#### root
* **类型** `Root` 只读
* **说明**  
返回动画的`target`的[Root](#Root)对象。

#### keys
* **类型** `Array<String>` 只读
* **说明**  
返回动画的所有更改样式键值列表。

#### style
* **类型** `Object` 只读
* **说明**  
返回动画当前的样式。

#### list
* **类型** `Array<Object>` 只读
* **说明**  
返回动画的列表。

#### options
* **类型** `Object` 只读
* **说明**  
返回动画的参数。

#### duration
* **类型** `Number` 读写
* **说明**  
返回/设置动画的时长。

#### delay
* **类型** `Number` 读写
* **说明**  
返回/设置动画的开头延时。

#### endDelay
* **类型** `Number` 读写
* **说明**  
返回/设置动画的结尾延时。

#### iterations
* **类型** `int` 读写
* **说明**  
返回/设置动画的播放次数。

#### playbackRate
* **类型** `int` 读写
* **说明**  
返回/设置动画的播放速率，默认`1`。

#### fps
* **类型** `Number` 读写
* **说明**  
返回/设置动画的fps。默认`60`。

#### spf
* **类型** `Number` 只读
* **说明**  
返回动画的spf。

#### easing
* **类型** `String` 只读
* **说明**  
返回动画的贝塞尔缓动。

#### fill
* **类型** `String` 读写
* **说明**  
返回/设置动画的停留模式，有`none`、`forwards`、`backwards`、`both`。默认`none`。

#### direction
* **类型** `String` 读写
* **说明**  
返回/设置动画的方向，有`normal`、`reverse`、`alternate`、`alternate-reverse`。默认`normal`。

#### frames
* **类型** `Array<Object>` 只读
* **说明**  
返回动画的正向播放列表，格式化后的。

#### frames
* **类型** `Array<Object>` 只读
* **说明**  
返回动画的反向播放列表，格式化后的。

#### startTime
* **类型** `int` 只读
* **说明**  
返回动画的开始时间，毫秒级。

#### currentTime
* **类型** `int` 读写
* **说明**  
返回/设置动画的当前时间，毫秒级。

#### pending
* **类型** `boolean` 只读
* **说明**  
返回动画是否处在非播放状态。

#### finished
* **类型** `boolean` 只读
* **说明**  
返回动画是否处在结束状态。

#### playState
* **类型** `String` 只读
* **说明**  
返回动画的详细状态，有`idle`、`running`、`finished`。默认`idle`。

#### playCount
* **类型** `int` 读写
* **说明**  
返回/设置动画的播放次数。

#### isDestroyed
* **类型** `boolean` 只读
* **说明**  
返回动画是否已销毁。

#### animating
* **类型** `boolean` 只读
* **说明**  
返回动画是否处在播放状态，包含`fill`停留区段。

#### spfLimit
* **类型** `int` 只读
* **说明**  
返回/设置spf限制，不能超过此值为最大值。

#### assigning
* **类型** `boolean` 只读
* **说明**  
返回动画是否正在处于赋值给对象过程中，即每帧开始到刷新完成的这段时间。

#### currentFrames
* **类型** `Array<Object>` 只读
* **说明**  
返回动画当前的帧队列，正向为`frames`，反向为`framesR`。

#### currentFrame
* **类型** `Object` 只读
* **说明**  
返回动画的当前帧。

### 类方法method

#### play
* **类型** `Function`
* **参数**
  * cb `Function`
  完成后回调。
* **说明**  
异步开始播放动画。
* **示例**
```jsx
let root = karas.render(
  <canvas>
    <div ref="div">play</div>
  </canvas>,
  '#selector'
);
let a = root.ref.div.animate([
  {
    translateX: 0,
  },
  {
    translateX: 100,
  },
], {
  duration: 1000,
});
a.play(); // 手动调用play()可以省略，动画本身就是自动播放
```

#### pause
* **类型** `Function`
* **参数**
  * cb `Function`
  完成后回调。
* **说明**  
异步暂停播放动画。
* **示例**
```jsx
let root = karas.render(
  <canvas>
    <div ref="div">play</div>
  </canvas>,
  '#selector'
);
let a = root.ref.div.animate([
  {
    translateX: 0,
  },
  {
    translateX: 100,
  },
], {
  duration: 1000,
});
a.pause();
```

#### resume
* **类型** `Function`
* **参数**
  * cb `Function`
  完成后回调。
* **说明**  
异步恢复播放动画。
* **示例**
```jsx
let root = karas.render(
  <canvas>
    <div ref="div">play</div>
  </canvas>,
  '#selector'
);
let a = root.ref.div.animate([
  {
    translateX: 0,
  },
  {
    translateX: 100,
  },
], {
  duration: 1000,
});
a.pause();
a.resume();
```

#### finish
* **类型** `Function`
* **参数**
  * cb `Function`
  完成后回调。
* **说明**  
异步结束播放动画。
* **示例**
```jsx
let root = karas.render(
  <canvas>
    <div ref="div">play</div>
  </canvas>,
  '#selector'
);
let a = root.ref.div.animate([
  {
    translateX: 0,
  },
  {
    translateX: 100,
  },
], {
  duration: 1000,
});
a.finish();
```

#### finish
* **类型** `Function`
* **参数**
  * cb `Function`
  完成后回调。
* **说明**  
异步取消播放动画。
* **示例**
```jsx
let root = karas.render(
  <canvas>
    <div ref="div">play</div>
  </canvas>,
  '#selector'
);
let a = root.ref.div.animate([
  {
    translateX: 0,
  },
  {
    translateX: 100,
  },
], {
  duration: 1000,
});
a.cancel();
```

#### gotoAndPlay
* **类型** `Function`
* **参数**
  * v `Number`
  跳到的播放时间
  * options `Function`
    * isFrame `boolean`
    传入帧数来代替时间毫秒数
    * excludeDelay
    不包含delay时间
  * cb `Function`
  完成后回调。
* **说明**  
异步从某个时间点开始播放动画。
* **示例**
```jsx
let root = karas.render(
  <canvas>
    <div ref="div">play</div>
  </canvas>,
  '#selector'
);
let a = root.ref.div.animate([
  {
    translateX: 0,
  },
  {
    translateX: 100,
  },
], {
  duration: 1000,
});
a.gotoAndPlay(500);
```

#### gotoAndStop
* **类型** `Function`
* **参数**
  * v `Number`
  跳到的播放时间
  * options `Function`
    * isFrame `boolean`
    传入帧数来代替时间毫秒数
    * excludeDelay
    不包含delay时间
  * cb `Function`
  完成后回调。
* **说明**  
异步跳到某个时间点并暂停动画。
* **示例**
```jsx
let root = karas.render(
  <canvas>
    <div ref="div">play</div>
  </canvas>,
  '#selector'
);
let a = root.ref.div.animate([
  {
    translateX: 0,
  },
  {
    translateX: 100,
  },
], {
  duration: 1000,
});
a.gotoAndStop(500);
```

<a name="frame"></a>
## frame
帧动画基础工具集对象，总控。

### 属性property

#### task
* **类型** `Array<Function>`
当前帧动画侦听回调队列。

### 方法method

#### onFrame
* **类型** `Function`
* **参数**
  * handle `Function`
  侦听回调
* **说明**  
开始侦听帧动画，完成后执行回调。
* **示例**
```jsx
karas.animate.frame.onFrame(function() {
  console.log('每帧执行');
});
```

#### onFrame
* **类型** `Function`
* **参数**
  * handle `Function`
  侦听回调
* **说明**  
结束侦听帧动画。
* **示例**
```jsx
function handle() {
  console.log('每帧执行被取消');
}
karas.animate.frame.onFrame(handle);
karas.animate.frame.onFrame(handle);
```

#### nextFrame
* **类型** `Function`
* **参数**
  * handle `Function`
  侦听回调
* **说明**  
开始侦听帧动画，仅一帧，完成后执行回调。
* **示例**
```jsx
karas.animate.frame.nextFrame(function() {
  console.log('下帧执行');
});
```

#### pause
* **类型** `Function`
* **说明**  
全局暂停。
* **示例**
```jsx
karas.animate.frame.pause();
```

#### resume
* **类型** `Function`
* **说明**  
全局恢复暂停。
* **示例**
```jsx
karas.animate.frame.resume();
```

<a name="math包"></a>
## math包
数学工具集，包含`matrix`，`tar`，`geom`3个大类，分别处理矩阵、仿射变换、几何。此举是面向框架开发维护人员的，普通开发者无需关注。

<a name="refresh包"></a>
## refresh包
刷新工具集，包含`level`，`change`，`Page`、`Cache`4个大类，分别处理刷新等级枚举、变更计算、缓存分页算法、渲染缓存逻辑。此举是面向框架开发维护人员的，普通开发者无需关注。

### level
* **说明**  
刷新等级插件开发可能会遇到，render()方法中的第2个参数
* **示例**
```jsx
const ENUM = {
  // 低4位表示repaint级别
  NONE: 0, //                                          0
  TRANSFORM: 1, //                                     1
  OPACITY: 2, //                                      10
  FILTER: 4, //                                      100
  VISIBILITY: 8, //                                 1000
  REPAINT: 16, //                                   10000

  // 高位表示reflow
  REFLOW: 32, // 整体需要重排                        10000
};
```

<a name="ShadowDom"></a>
## ShadowDom
组件的实习部分采用了`ShadowDom`标准，即内部的Dom事件外部不感知，内部的css样式和外部隔离，除非手动指定。
* **示例**
```jsx
class Component extends karas.Component {
  click() {
    console.log('inner click');
  }
  render() {
    return <div onClick={() => this.click}>inner</div>;
  }
}
karas.render(
  <canvas>
    <div style={{color:'#F00'}} onClick={() => console.log('outer click')}>
      <Component/>
    </div>
  </canvas>,
  '#selector'
);
```
上述代码只会响应`inner click`，且文字是reset的黑色，不是红色。
如果想要外部注入组件内部事件或样式，需要组件自身同意，即props传参。css默认直接赋给组件即可。
* **示例**
```jsx
class Component extends karas.Component {
  click() {
    console.log('inner click');
  }
  render() {
    return <div onClick={() => this.click}>inner</div>;
  }
}
karas.render(
  <canvas>
    <div>
      <Component style={{color:'#F00'}} onClick={() => console.log('outer click')}/>
    </div>
  </canvas>,
  '#selector'
);
```
上述代码`outer click`也会响应，且文字是红色。