import Xom from '../node/Xom';
import css from '../style/css';
import unit from '../style/unit';
import mode from '../mode';

const REGISTER = {};

class Geom extends Xom {
  constructor(tagName, props) {
    super(tagName, props);
  }

  __initStyle() {
    css.normalize(this.style);
  }

  __tryLayInline(w, total) {
    // 无children，直接以style的width为宽度，不定义则为0
    let { style: { width } } = this;
    if(width.unit === unit.PX) {
      return w - width.value;
    }
    else if(width.unit === unit.PERCENT) {
      return w - total * width.value * 0.01;
    }
    return w;
  }

  __calAutoBasis(isDirectionRow, w, h) {
    let b = 0;
    let min = 0;
    let max = 0;
    let { style } = this;
    // 计算需考虑style的属性
    let {
      width,
      height,
      borderTopWidth,
      borderRightWidth,
      borderBottomWidth,
      borderLeftWidth,
    } = style;
    let main = isDirectionRow ? width : height;
    if(main.unit !== unit.AUTO) {
      b = max += main.value;
    }
    // border也得计算在内
    if(isDirectionRow) {
      let w = borderRightWidth.value + borderLeftWidth.value;
      b += w;
      max += w;
      min += w;
    }
    else {
      let h = borderTopWidth.value + borderBottomWidth.value;
      b += h;
      max += h;
      min += h;
    }
    return { b, min, max };
  }

  __layoutBlock(data) {
    let { fixedHeight, w, h } = this.__preLayout(data);
    this.__width = w;
    this.__height = fixedHeight ? h : 0;
  }

  __layoutFlex(data) {
    // 无children所以等同于block
    this.__layoutBlock(data);
  }

  __layoutInline(data) {
    let { fixedWidth, fixedHeight, x, y, w, h } = this.__preLayout(data);
    // 元素的width不能超过父元素w
    this.__width = fixedWidth ? w : x - data.x;
    this.__height = fixedHeight ? h : y - data.y;
  }

  __calAbs() {
    return 0;
  }

  render(renderMode) {
    super.render(renderMode);
    if(renderMode === mode.SVG) {
      this.__virtualDom = {
        ...super.virtualDom,
        type: 'geom',
      };
    }
  }

  addLine(props) {
    this.virtualDom.children.push({
      type: 'item',
      tagName: 'path',
      props,
    });
  }

  addCircle(props) {
    this.virtualDom.children.push({
      type: 'item',
      tagName: 'circle',
      props,
    });
  }

  addEllipse(props) {
    this.virtualDom.children.push({
      type: 'item',
      tagName: 'ellipse',
      props,
    });
  }

  get tagName() {
    return this.__tagName;
  }
  get baseLine() {
    return this.__height;
  }

  static getRegister(name) {
    if(!REGISTER.hasOwnProperty(name)) {
      throw new Error(`Geom has not register: ${name}`);
    }
    return REGISTER[name];
  }
  static register(name, obj) {
    if(Geom.hasRegister(name)) {
      throw new Error(`Geom has already register: ${name}`);
    }
    REGISTER[name] = obj;
  }
  static hasRegister(name) {
    return REGISTER.hasOwnProperty(name);
  }
}

export default Geom;
