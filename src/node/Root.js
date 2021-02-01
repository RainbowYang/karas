import Dom from './Dom';
import Text from './Text';
import Xom from './Xom';
import Component from './Component';
import Defs from './Defs';
import mode from './mode';
import Geom from '../geom/Geom';
import builder from '../util/builder';
import updater from '../util/updater';
import util from '../util/util';
import domDiff from '../util/diff';
import css from '../style/css';
import unit from '../style/unit';
import enums from '../util/enums';
import inject from '../util/inject';
import Event from '../util/Event';
import frame from '../animate/frame';
import Controller from '../animate/Controller';
import change from '../refresh/change';
import level from '../refresh/level';
import struct from '../refresh/struct';

const {
  STYLE_KEY: {
    TOP,
    RIGHT,
    BOTTOM,
    LEFT,
    POSITION,
    DISPLAY,
    VISIBILITY,
    COLOR,
    WIDTH,
    HEIGHT,
    Z_INDEX,
    MARGIN_TOP,
    MARGIN_LEFT,
    MARGIN_BOTTOM,
    PADDING_TOP,
    PADDING_LEFT,
    PADDING_BOTTOM,
    BORDER_TOP_WIDTH,
    BORDER_LEFT_WIDTH,
    BORDER_BOTTOM_WIDTH,
  },
  UPDATE_KEY: {
    UPDATE_NODE,
    UPDATE_STYLE,
    UPDATE_KEYS,
    UPDATE_COMPONENT,
    UPDATE_FOCUS,
    UPDATE_IMG,
    UPDATE_MEASURE,
    UPDATE_OVERWRITE,
    UPDATE_LIST,
    UPDATE_CONFIG,
  },
  NODE_KEY: {
    NODE_TAG_NAME,
    NODE_CACHE_STYLE,
    NODE_CACHE_PROPS,
    NODE_CURRENT_STYLE,
    NODE_COMPUTED_STYLE,
    NODE_CURRENT_PROPS,
    NODE_DOM_PARENT,
    NODE_IS_MASK,
    NODE_REFRESH_LV,
    NODE_IS_DESTROYED,
    NODE_STYLE,
    NODE_UPDATE_HASH,
    NODE_UNIQUE_UPDATE_ID,
    NODE_CACHE,
    NODE_CACHE_TOTAL,
    NODE_CACHE_FILTER,
    NODE_CACHE_OVERFLOW,
    NODE_CACHE_MASK,
    NODE_STRUCT,
  },
  STRUCT_KEY: {
    STRUCT_INDEX,
    STRUCT_TOTAL,
    STRUCT_NODE,
  }
} = enums;
const DIRECTION_HASH = {
  [TOP]: true,
  [RIGHT]: true,
  [BOTTOM]: true,
  [LEFT]: true,
};
const { isNil, isObject, isFunction } = util;
const { AUTO, PX, PERCENT, INHERIT } = unit;
const { calRelative, isRelativeOrAbsolute, equalStyle } = css;
const { contain, getLevel, isRepaint, NONE, FILTER, REPAINT, REFLOW } = level;
const { isIgnore, isGeom, isMeasure } = change;

function getDom(dom) {
  if(util.isString(dom) && dom) {
    let o = document.querySelector(dom);
    if(!o) {
      throw new Error('Can not find dom of selector: ' + dom);
    }
    return o;
  }
  if(!dom) {
    throw new Error('Can not find dom: ' + dom);
  }
  return dom;
}

function renderProp(k, v) {
  let s = Array.isArray(v) ? util.joinSourceArray(v) : util.stringify(v);
  if(k === 'className') {
    k = 'class';
  }
  else if(k === 'style') {
    return '';
  }
  return ' ' + k + '="' + util.encodeHtml(s, true) + '"';
}

function initEvent(dom, Root) {
  ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseup', 'touchstart', 'touchmove', 'touchend', 'touchcancel'].forEach(type => {
    dom.addEventListener(type, e => {
      let root = dom.__root;
      if(root && root instanceof Root) {
        if(['touchend', 'touchcancel', 'touchmove'].indexOf(type) > -1) {
          root.__touchstartTarget && root.__touchstartTarget.__emitEvent(root.__wrapEvent(e), true);
        }
        else {
          root.__cb(e);
        }
      }
    });
  });
}

// 提取出对比节点尺寸是否固定非AUTO
function isFixedWidthOrHeight(node, k) {
  let c = node.currentStyle[k];
  // let v = node.computedStyle[k];
  // if(c[1] === PX) {
  //   return c[0] === v;
  // }
  // if(c[1] === PERCENT) {
  //   let parent = node.domParent;
  //   let s = parent.__layoutData[k === WIDTH ? 'w' : 'h'];
  //   return c[0] * s * 0.01 === v;
  // }
  return c[1] !== AUTO;
}
// 除了固定尺寸，父级也不能是flex或变化flex
function isFixedSize(node, includeParentFlex) {
  let res = isFixedWidthOrHeight(node, WIDTH) && isFixedWidthOrHeight(node, HEIGHT);
  if(res && includeParentFlex) {
    let parent = node.domParent;
    if(parent) {
      if(parent.currentStyle[DISPLAY] === 'flex' || parent.computedStyle[DISPLAY] === 'flex') {
        return false;
      }
    }
  }
  return res;
}

const OFFSET = 0;
const LAYOUT = 1;
function isLAYOUT(node, hash) {
  return node.hasOwnProperty('__uniqueReflowId') && hash[node.__uniqueReflowId] >= LAYOUT;
}

function setLAYOUT(node, hash, component) {
  addLAYOUT(node, hash, component);
  hash[node.__uniqueReflowId].lv |= LAYOUT;
}

let __uniqueReflowId = 0;
function addLAYOUT(node, hash, component) {
  if(!node.hasOwnProperty('__uniqueReflowId')) {
    node.__uniqueReflowId = __uniqueReflowId;
    hash[__uniqueReflowId++] = {
      node,
      lv: LAYOUT,
      component,
    };
  }
}

/**
 * 单独提出共用检测影响的函数，从节点本身开始向上分析影响，找到最上层的影响节点设置其重新布局
 * 过程及__checkReflow中所提及的，各种情况
 * 将影响升至最近的父级节点，并添加布局标识，这样后面的深度遍历会以父级为准忽略本身
 * 如果最终是root，则返回true标识，直接整个重新开始布局
 * @returns {boolean}
 */
function checkInfluence(root, reflowHash, node, component) {
  let target = node;
  // inline新老都影响，节点变为最近的父非inline
  if(node.currentStyle[DISPLAY] === 'inline' || node.computedStyle[DISPLAY] === 'inline') {
    let parent = node.domParent;
    do {
      target = parent;
      // 父到root提前跳出
      if(parent === root) {
        return true;
      }
      // 父已有LAYOUT跳出防重
      if(isLAYOUT(parent, reflowHash)) {
        return;
      }
      // 遇到absolute跳出，设置其布局；如果absolute不变化普通处理，如果absolute发生变化，一定会存在于列表中，不用考虑
      if(parent.currentStyle[POSITION] === 'absolute' || parent.computedStyle[POSITION] === 'absolute') {
        setLAYOUT(parent, reflowHash, component);
        return;
      }
      // 父固定宽高跳出直接父进行LAYOUT即可，不影响上下文，但不能是flex孩子，此时固定尺寸无用
      if(isFixedSize(parent, true)) {
        setLAYOUT(parent, reflowHash, component);
        return;
      }
      // 继续向上
      parent = parent.domParent;
    }
    while(parent && (parent.currentStyle[DISPLAY] === 'inline' || parent.computedStyle[DISPLAY] === 'inline'));
    // 结束后target至少是node的flow的parent且非inline，如果固定尺寸提前跳出
    if(isFixedSize(target, true)) {
      setLAYOUT(target, reflowHash, component);
      return;
    }
  }
  // 此时target指向node，如果原本是inline则是其flow的非inline父
  let parent = target.domParent;
  if(!parent) {
    return;
  }
  // parent有LAYOUT跳出，已被包含
  if(isLAYOUT(parent, reflowHash)) {
    return;
  }
  // parent是root的flex/absolute特殊处理
  if(parent === root
    && (parent.computedStyle[DISPLAY] === 'flex'
      || parent.currentStyle[DISPLAY] === 'flex'
      || parent.computedStyle[POSITION] === 'absolute'
      || parent.currentStyle[POSITION] === 'absolute')) {
    return true;
  }
  // 向上检查flex，如果父级中有flex，以最上层的flex视作其更改，node本身flex不进入
  let topFlex;
  do {
    // 父到root提前跳出
    if(parent === root) {
      break;
    }
    // 父已有LAYOUT跳出防重
    if(isLAYOUT(parent, reflowHash)) {
      return;
    }
    // 遇到absolute跳出，如果absolute不变化普通处理，如果absolute发生变化，一定会存在于列表中，不用考虑
    if(parent.currentStyle[POSITION] === 'absolute' || parent.computedStyle[POSITION] === 'absolute') {
      break;
    }
    // 父固定宽高跳出
    if(isFixedSize(parent, true)) {
      break;
    }
    // flex相关，包含变化或不变化
    if(parent.computedStyle[DISPLAY] === 'flex' || parent.currentStyle[DISPLAY] === 'flex') {
      topFlex = parent;
    }
    parent = parent.domParent;
  }
  while(parent);
  // 找到最上层flex，视作其更改
  if(topFlex) {
    target = topFlex;
  }
  if(target === root) {
    return true;
  }
  // 向上检查非固定尺寸的absolute，找到则视为其变更，上面过程中一定没有出现absolute
  while(parent) {
    // 无论新老absolute，不变化则设置，变化一定会出现在列表中
    if(parent.currentStyle[POSITION] === 'absolute' || parent.computedStyle[POSITION] === 'absolute') {
      // 固定尺寸的不用设置，需要跳出循环
      if(isFixedSize(parent)) {
        break;
      }
      else {
        setLAYOUT(parent, reflowHash, component);
        return;
      }
    }
    parent = parent.domParent;
  }
  // 向上查找了并且没提前跳出的target如果不等于自身则重新布局，自身外面设置过了
  if(target !== node) {
    setLAYOUT(target, reflowHash, component);
  }
}

let uniqueUpdateId = 0;
function parseUpdate(renderMode, root, target, reflowList, measureList, cacheHash, cacheList, zHash, zList) {
  let {
    [UPDATE_NODE]: node,
    [UPDATE_STYLE]: style,
    [UPDATE_OVERWRITE]: overwrite,
    [UPDATE_FOCUS]: focus,
    [UPDATE_IMG]: img,
    [UPDATE_COMPONENT]: component,
    [UPDATE_MEASURE]: measure,
    [UPDATE_LIST]: list,
    [UPDATE_KEYS]: keys,
    [UPDATE_CONFIG]: __config,
  } = target;
  if(__config[NODE_IS_DESTROYED]) {
    return;
  }
  // updateStyle()这样的调用需要覆盖原有样式，因为是按顺序遍历，后面的优先级自动更高不怕重复
  if(overwrite) {
    Object.assign(__config[NODE_STYLE], overwrite);
  }
  // 多次调用更新才会有list，一般没有，优化；component无需，因为多次都是它自己
  if(list && !component) {
    keys = (keys || []).slice(0); // 防止原始值被更改
    let hash = {};
    keys.forEach(k => {
      hash[k] = true;
    });
    list.forEach(item => {
      let { [UPDATE_STYLE]: style2, [UPDATE_OVERWRITE]: overwrite, [UPDATE_KEYS]: keys2 } = item;
      (keys2 || []).forEach(k2 => {
        if(!hash.hasOwnProperty(k2)) {
          hash[k2] = true;
          keys.push(k2);
        }
      });
      if(overwrite) {
        Object.assign(__config[NODE_STYLE], overwrite);
      }
      if(style2) {
        if(style) {
          Object.assign(style, style2);
        }
        else {
          style = style2;
        }
      }
    });
  }
  // 按节点合并完style后判断改变等级
  let {
    [NODE_TAG_NAME]: tagName,
    [NODE_CACHE_STYLE]: __cacheStyle,
    [NODE_CACHE_PROPS]: __cacheProps,
    [NODE_CURRENT_STYLE]: currentStyle,
    [NODE_COMPUTED_STYLE]: computedStyle,
    [NODE_CURRENT_PROPS]: currentProps,
    [NODE_DOM_PARENT]: domParent,
    [NODE_IS_MASK]: isMask,
  } = __config;
  let lv = focus || NONE;
  let hasMeasure = measure;
  let hasZ, hasVisibility, hasColor, hasDisplay;
  // component无需遍历直接赋值，img重新加载等情况没有样式更新
  if(!component && style && keys) {
    for(let i = 0, len = keys.length; i < len; i++) {
      let k = keys[i];
      let v = style[k];
      // 只有geom的props和style2种可能
      if(node instanceof Geom && isGeom(tagName, k)) {
        if(!equalStyle(k, v, currentProps[k], node)) {
          lv |= REPAINT;
          __cacheProps[k] = undefined;
          currentProps[k] = v;
        }
      }
      else {
        // 需和现在不等，且不是pointerEvents这种无关的
        if(!equalStyle(k, v, currentStyle[k], node)) {
          // pointerEvents这种无关的只需更新
          if(isIgnore(k)) {
            __cacheStyle[k] = undefined;
            currentStyle[k] = v;
          }
          else {
            // TRBL变化只对relative/absolute起作用，其它忽视
            if(DIRECTION_HASH.hasOwnProperty(k)) {
              let position = currentStyle[POSITION];
              if(position !== 'relative' && position !== 'absolute') {
                delete style[k];
                continue;
              }
            }
            else if(k === DISPLAY) {
              hasDisplay = true;
            }
            // repaint细化等级，reflow在checkReflow()
            lv |= getLevel(k);
            if(isMeasure(k)) {
              hasMeasure = true;
            }
            // repaint置空，如果reflow会重新生成空的
            __cacheStyle[k] = undefined;
            currentStyle[k] = v;
            if(k === Z_INDEX && node !== root) {
              hasZ = true;
            }
            if(k === VISIBILITY) {
              hasVisibility = true;
            }
            if(k === COLOR) {
              hasColor = true;
            }
          }
        }
      }
    }
  }
  // 无任何改变处理的去除记录，如pointerEvents、无效的left
  if(lv === NONE && !component) {
    delete __config[NODE_UNIQUE_UPDATE_ID];
    return;
  }
  // 记录下来清除parent的zIndexChildren缓存
  if(hasZ && domParent) {
    delete domParent.__zIndexChildren;
  }
  // visibility/color变化，影响子继承
  if(hasVisibility || hasColor) {
    for(let __structs = root.__structs, __struct = node.__config[NODE_STRUCT], i = __struct[STRUCT_INDEX] + 1, len = i + __struct[STRUCT_TOTAL]; i < len; i++) {
      let {
        [STRUCT_NODE]: node,
        [STRUCT_TOTAL]: total,
      } = __structs[i];
      let __config = node.__config;
      let currentStyle = __config[NODE_CURRENT_STYLE];
      let need;
      // text的style指向parent，因此text一定变更
      if(hasVisibility && (node instanceof Text || currentStyle[VISIBILITY][1] === INHERIT)) {
        need = true;
      }
      if(hasColor && (node instanceof Text || currentStyle[COLOR][1] === INHERIT)) {
        need = true;
      }
      if(need) {
        __config[NODE_REFRESH_LV] |= REPAINT;
        if(node instanceof Xom) {
          node.__cancelCache();
        }
      }
      else {
        i += total || 0;
      }
    }
  }
  // mask需清除遮罩对象的缓存
  if(isMask) {
    let prev = node.prev;
    while(prev && (prev.isMask)) {
      prev = prev.prev;
    }
    if(prev && prev.__config[NODE_CACHE_MASK]) {
      prev.__config[NODE_CACHE_MASK].release();
      prev.__config[NODE_CACHE_MASK] = null;
    }
  }
  // reflow/repaint/measure相关的记录下来
  let isRp = !component && isRepaint(lv);
  if(isRp) {
    // zIndex变化需清空svg缓存
    if(hasZ && renderMode === mode.SVG) {
      lv |= REPAINT;
      domParent && cleanSvgCache(domParent);
    }
    // z改变影响struct局部重排，它的数量不会变因此不影响外围，此处先收集，最后统一对局部根节点进行更新
    if(hasZ && !component && zHash) {
      if(domParent && !domParent.hasOwnProperty('__uniqueZId')) {
        zHash[uniqueUpdateId] = true;
        domParent.__uniqueZId = uniqueUpdateId++;
        zList.push(domParent);
      }
    }
  }
  // reflow在root的refresh中做
  else {
    reflowList.push({
      node,
      style,
      img,
      component,
    });
    // measure需要提前先处理
    if(hasMeasure) {
      measureList.push(node);
    }
  }
  // 这里也需|运算，每次刷新会置0，但是如果父元素进行继承变更，会在此元素分析前更改，比如visibility，此时不能直接赋值
  __config[NODE_REFRESH_LV] |= lv;
  // dom在>=REPAINT时total失效，svg的Geom比较特殊，任何改变都失效
  let need = lv >= REPAINT || renderMode === mode.SVG && node instanceof Geom;
  if(need) {
    if(__config[NODE_CACHE]) {
      __config[NODE_CACHE].release();
    }
    if(__config[NODE_CACHE_TOTAL]) {
      __config[NODE_CACHE_TOTAL].release();
    }
    if(__config[NODE_CACHE_MASK]) {
      __config[NODE_CACHE_MASK].release();
      __config[NODE_CACHE_MASK] = null;
    }
    if(__config[NODE_CACHE_OVERFLOW]) {
      __config[NODE_CACHE_OVERFLOW].release();
      __config[NODE_CACHE_OVERFLOW] = null;
    }
  }
  if((need || contain(lv, FILTER)) && __config[NODE_CACHE_FILTER]) {
    __config[NODE_CACHE_FILTER].release();
    __config[NODE_CACHE_FILTER] = null;
  }
  // 由于父节点中有display:none，一些子节点也为none，执行普通动画是无效的，此时lv<REFLOW
  if(computedStyle[DISPLAY] === 'none' && lv < REFLOW) {
    return false;
  }
  // 特殊情况，父节点中有display:none，子节点进行display变更，应视为无效
  let parent = domParent;
  if(hasDisplay) {
    while(parent) {
      let __config = parent.__config;
      if(__config[NODE_COMPUTED_STYLE][DISPLAY] === 'none') {
        computedStyle[DISPLAY] = 'none';
        return false;
      }
      parent = __config[NODE_DOM_PARENT];
    }
  }
  // 向上清除等级>=REPAINT的汇总缓存信息，过程中可能会出现重复，因此节点上记录一个临时标防止重复递归
  parent = domParent;
  while(parent) {
    let __config = parent.__config;
    // 向上查找，出现重复跳出
    if(__config.hasOwnProperty(NODE_UNIQUE_UPDATE_ID)) {
      let id = __config[NODE_UNIQUE_UPDATE_ID];
      if(cacheHash.hasOwnProperty(id)) {
        break;
      }
      cacheHash[id] = true;
    }
    // 没有的需要设置一个标识
    else {
      cacheHash[uniqueUpdateId] = true;
      __config[NODE_UNIQUE_UPDATE_ID] = uniqueUpdateId++;
      cacheList.push(parent);
    }
    let lv = __config[NODE_REFRESH_LV];
    let need = lv >= REPAINT;
    if(need && __config[NODE_CACHE]) {
      __config[NODE_CACHE].release();
    }
    // 前面已经过滤了无改变NONE的，只要孩子有任何改变父亲就要清除
    if(__config[NODE_CACHE_TOTAL]) {
      __config[NODE_CACHE_TOTAL].release();
    }
    if(__config[NODE_CACHE_FILTER]) {
      __config[NODE_CACHE_FILTER].release();
      __config[NODE_CACHE_FILTER] = null;
    }
    if(__config[NODE_CACHE_MASK]) {
      __config[NODE_CACHE_MASK].release();
      __config[NODE_CACHE_MASK] = null;
    }
    if(__config[NODE_CACHE_OVERFLOW]) {
      __config[NODE_CACHE_OVERFLOW].release();
      __config[NODE_CACHE_OVERFLOW] = null;
    }
    parent = __config[NODE_DOM_PARENT];
  }
  return true;
}

function cleanSvgCache(node, child) {
  let __config = node.__config;
  if(child) {
    __config[NODE_REFRESH_LV] |= REPAINT;
  }
  else {
    __config[NODE_CACHE_TOTAL].release();
  }
  if(Array.isArray(node.children)) {
    node.children.forEach(child => {
      if(child instanceof Component) {
        child = child.shadowRoot;
      }
      if(!(child instanceof Text)) {
        cleanSvgCache(child, true);
      }
    });
  }
}

let uuid = 0;

class Root extends Dom {
  constructor(tagName, props, children) {
    super(tagName, props);
    this.__cd = children || []; // 原始children，再初始化过程中生成真正的dom
    this.__dom = null; // 真实DOM引用
    this.__mw = 0; // 记录最大宽高，防止尺寸变化清除不完全
    this.__mh = 0;
    // this.__scx = 1; // 默认缩放，css改变canvas/svg缩放后影响事件坐标，有值手动指定，否则自动计算
    // this.__scy = 1;
    this.__task = [];
    this.__taskCp = [];
    this.__ref = {};
    this.__updateHash = {};
    this.__reflowList = [{ node: this }]; // 初始化填自己，第一次布局时复用逻辑完全重新布局
    this.__animateController = new Controller();
    Event.mix(this);
    this.__config[NODE_UPDATE_HASH] = this.__updateHash;
  }

  __initProps() {
    let w = this.props.width;
    if(!isNil(w)) {
      let value = parseFloat(w) || 0;
      if(value > 0) {
        this.__width = value;
      }
    }
    let h = this.props.height;
    if(!isNil(h)) {
      let value = parseFloat(h) || 0;
      if(value > 0) {
        this.__height = value;
      }
    }
  }

  __genHtml() {
    let res = `<${this.tagName}`;
    // 拼接处理属性
    Object.keys(this.props).forEach(k => {
      let v = this.props[k];
      // 忽略事件
      if(!/^on[a-zA-Z]/.test(k)) {
        res += renderProp(k, v);
      }
    });
    res += `></${this.tagName}>`;
    return res;
  }

  __wrapEvent(e) {
    let x, y;
    // 触摸结束取消特殊没有touches
    if(['touchend', 'touchcancel'].indexOf(e.type) === -1) {
      let { dom, __scx, __scy } = this;
      let { x: x2, y: y2, left, top, width, height } = dom.getBoundingClientRect();
      x = x2 || left || 0;
      y = y2 || top || 0;
      let { clientX, clientY } = e.touches ? e.touches[0] : e;
      x = clientX - x;
      y = clientY - y;
      // 外边的scale影响元素事件响应，根据倍数计算真实的坐标，优先手动指定，否则自动计算
      if(!isNil(__scx)) {
        x /= __scx;
      }
      else {
        x *= this.width / width;
      }
      if(!isNil(__scy)) {
        y /= __scy;
      }
      else {
        y *= this.height / height;
      }
    }
    return {
      event: e,
      stopPropagation() {
        this.__stopPropagation = true;
        e.stopPropagation();
      },
      stopImmediatePropagation() {
        this.__stopPropagation = true;
        this.__stopImmediatePropagation = true;
        e.stopImmediatePropagation();
      },
      preventDefault() {
        e.preventDefault();
      },
      x,
      y,
      __hasEmitted: false,
    };
  }

  // 类似touchend/touchcancel/touchmove这种无需判断是否发生于元素上，直接响应
  __cb(e) {
    if(e.type === 'touchmove' && !this.__touchstartTarget) {
      return;
    }
    let data = this.__wrapEvent(e);
    this.__emitEvent(data);
    return data;
  }

  appendTo(dom) {
    dom = getDom(dom);
    this.__children = builder.initRoot(this.__cd, this);
    this.__initProps();
    this.__root = this;
    this.cache = !!this.props.cache;
    // 已有root节点
    if(dom.nodeName.toUpperCase() === this.tagName.toUpperCase()) {
      this.__dom = dom;
      if(this.width) {
        dom.setAttribute('width', this.width);
      }
      if(this.height) {
        dom.setAttribute('height', this.height);
      }
    }
    // 没有canvas/svg节点则生成一个新的
    else {
      this.__dom = dom.querySelector(this.tagName);
      if(!this.__dom) {
        dom.innerHTML = this.__genHtml();
        this.__dom = dom.querySelector(this.tagName);
      }
    }
    this.__uuid = isNil(this.__dom.__uuid) ? uuid++ : this.__dom.__uuid;
    this.__defs = this.dom.__defs || Defs.getInstance(this.__uuid);
    // 没有设置width/height则采用css计算形式
    if(!this.width || !this.height) {
      let css = window.getComputedStyle(dom, null);
      if(!this.width) {
        this.__width = parseFloat(css.getPropertyValue('width')) || 0;
        dom.setAttribute('width', this.width);
      }
      if(!this.height) {
        this.__height = parseFloat(css.getPropertyValue('height')) || 0;
        dom.setAttribute('height', this.height);
      }
    }
    // 只有canvas有ctx，svg用真实dom
    if(this.tagName === 'canvas') {
      this.__ctx = this.__dom.getContext('2d');
      this.__renderMode = mode.CANVAS;
    }
    else if(this.tagName === 'svg') {
      this.__renderMode = mode.SVG;
    }
    this.refresh(null, true);
    // 第一次节点没有__root，渲染一次就有了才能diff
    if(this.dom.__root) {
      this.dom.__root.destroy();
    }
    else {
      initEvent(this.dom, Root);
      this.dom.__uuid = this.__uuid;
    }
    this.dom.__root = this;
  }

  refresh(cb, isFirst) {
    this.__hookTask = null;
    let { isDestroyed, renderMode, ctx, defs, width, height } = this;
    if(isDestroyed) {
      return;
    }
    defs.clear();
    // 首次递归测量整树的继承，后续更改各自更新机制做，防止每次整树遍历；root检查首次直接做，后续在checkUpdate()中插入
    if(isFirst) {
      this.__checkRoot(width, height);
      this.__computeMeasure(renderMode, ctx);
    }
    // 非首次刷新如果没有更新则无需继续
    else if(!this.__checkUpdate(renderMode, ctx, width, height)) {
      return;
    }
    // 获取所有字体和大小测量，仅svg需要，canvas直接做
    inject.measureText();
    this.__checkReflow(width, height);
    if(renderMode === mode.CANVAS) {
      this.__clear(ctx);
      // 利用list循环代替tree递归快速渲染
      if(this.cache) {
        struct.renderCacheCanvas(renderMode, ctx, defs, this);
      }
      else {
        struct.renderCanvas(renderMode, ctx, defs, this);
      }
    }
    // svg的特殊diff需要
    else if(renderMode === mode.SVG) {
      struct.renderSvg(renderMode, ctx, defs, this, isFirst);
      let nvd = this.virtualDom;
      nvd.defs = defs.value;
      if(this.dom.__root) {
        // console.log(this.dom.__vd);
        // console.log(nvd);
        domDiff(this.dom, this.dom.__vd, nvd);
      }
      else {
        this.dom.innerHTML = util.joinVirtualDom(nvd);
      }
      this.dom.__vd = nvd;
      this.dom.__defs = defs;
    }
    // 特殊cb，供小程序绘制完回调使用
    if(isFunction(cb)) {
      cb();
    }
    this.emit(Event.REFRESH);
  }

  destroy() {
    this.__destroy();
    let n = this.dom;
    if(n) {
      n.__root = null;
    }
  }

  scale(x = 1, y = x) {
    this.__scx = x;
    this.__scy = y;
  }

  resize(w, h, cb) {
    if(w !== this.width || h !== this.height) {
      this.__width = w;
      this.__hegiht = h;
      this.addRefreshTask(cb || function() {});
    }
  }

  addRefreshTask(cb) {
    if(!cb) {
      return;
    }
    let { task } = this;
    // 第一个添加延迟侦听，后续放队列等待一并执行
    if(!task.length) {
      let clone;
      frame.nextFrame({
        __before: diff => {
          clone = task.splice(0);
          // 前置一般是动画计算此帧样式应用，然后刷新后出发frame事件，图片加载等同
          if(clone.length) {
            clone.forEach((item, i) => {
              if(isObject(item) && isFunction(item.__before)) {
                item.__before(diff);
              }
            });
          }
        },
        __after: diff => {
          clone.forEach(item => {
            if(isObject(item) && isFunction(item.__after)) {
              item.__after(diff);
            }
            else if(isFunction(item)) {
              item(diff);
            }
          });
        }
      });
      this.__frameHook();
    }
    if(task.indexOf(cb) === -1) {
      task.push(cb);
    }
  }

  delRefreshTask(cb) {
    if(!cb) {
      return;
    }
    let { task } = this;
    for(let i = 0, len = task.length; i < len; i++) {
      if(task[i] === cb) {
        task.splice(i, 1);
        break;
      }
    }
  }

  /**
   * 为component的setState更新专门开辟个独立的流水线，root/frame中以taskCp存储更新列表
   * 普通的动画、img加载等都走普通的refresh的task，component走这里，frame中的结构同样
   * 在frame的每帧调用中，先执行普通的动画task，再执行component的task
   * 这样动画执行完后，某个cp的sr及子节点依旧先进行了动画变更，进入__addUpdate()环节
   * 然后此cp再更新sr及子节点，这样会被__addUpdate()添加到尾部，依赖目前浏览器默认实现
   * 上一行cp更新过程中是updater.check()进行的，如果有新老交换且有动画，动画的assigning是true，进行继承
   * root刷新parseUpdate()时，老的sr及子节点先进行，随后新的sr后进行且有component标识，sr子节点不会有更新
   * @param cb
   */
  addRefreshCp(cb) {
    let { taskCp } = this;
    if(!taskCp.length) {
      let clone;
      frame.__nextFrameCp({
        __before: diff => {
          clone = taskCp.splice(0);
          if(clone.length) {
            clone.forEach(item => {
              item.__before(diff);
            });
            updater.check(this);
            let len = updater.updateList.length;
            if(len) {
              updater.updateList.forEach(cp => {
                let sr = cp.shadowRoot;
                // 可能返回text，需视为其parentNode
                if(sr instanceof Text) {
                  sr = sr.domParent;
                }
                let res = {};
                res[UPDATE_NODE] = sr;
                res[UPDATE_STYLE] = sr.currentStyle;
                res[UPDATE_FOCUS] = REFLOW;
                res[UPDATE_MEASURE] = true;
                res[UPDATE_COMPONENT] = cp;
                res[UPDATE_CONFIG] = sr.__config;
                this.__addUpdate(sr, sr.__config, this, this.__config, res);
              });
            }
          }
        },
        __after: diff => {
          clone.forEach(item => {
            item.__after(diff);
          });
          // 触发didUpdate
          updater.did();
        },
      });
      this.__frameHook();
    }
    if(taskCp.indexOf(cb) === -1) {
      taskCp.push(cb);
    }
  }

  /**
   * 每次刷新前检查root节点的样式，有些固定的修改无效，有些继承的作为根初始化
   * @param width
   * @param height
   * @private
   */
  __checkRoot(width, height) {
    let { currentStyle, computedStyle } = this;
    // canvas/svg作为根节点一定是block或flex，不会是inline
    if(['flex', 'block'].indexOf(currentStyle[DISPLAY]) === -1) {
      computedStyle[DISPLAY] = currentStyle[DISPLAY] = 'block';
    }
    // 同理position不能为absolute
    if(currentStyle[POSITION] === 'absolute') {
      computedStyle[POSITION] = currentStyle[POSITION] = 'static';
    }
    // 根节点满宽高
    currentStyle[WIDTH] = [width, PX];
    currentStyle[HEIGHT] = [height, PX];
    computedStyle[WIDTH] = width;
    computedStyle[HEIGHT] = height;
  }

  /**
   * 添加更新入口，按节点汇总更新信息
   * @private
   */
  __addUpdate(node, nodeConfig, root, rootConfig, o) {
    let updateHash = rootConfig[NODE_UPDATE_HASH];
    // root特殊处理，检查变更时优先看继承信息
    if(node === root) {
      updateHash = root.__updateRoot;
      if(updateHash) {
        if(o[UPDATE_IMG]) {
          updateHash[UPDATE_IMG] = o[UPDATE_IMG];
        }
        if(o[UPDATE_FOCUS]) {
          updateHash[UPDATE_FOCUS] |= o[UPDATE_FOCUS];
        }
        if(o[UPDATE_MEASURE]) {
          updateHash[UPDATE_MEASURE] = true;
        }
        // 后续存在新建list上，需增加遍历逻辑
        if(o[UPDATE_STYLE]) {
          let list = updateHash[UPDATE_LIST] = updateHash[UPDATE_LIST] || [];
          list.push({
            [UPDATE_STYLE]: o[UPDATE_STYLE],
            [UPDATE_OVERWRITE]: o[UPDATE_OVERWRITE],
            [UPDATE_KEYS]: o[UPDATE_KEYS],
          });
        }
      }
      else {
        root.__updateRoot = o;
      }
    }
    else if(!nodeConfig.hasOwnProperty(NODE_UNIQUE_UPDATE_ID)) {
      nodeConfig[NODE_UNIQUE_UPDATE_ID] = uniqueUpdateId;
      // 大多数情况节点都只有一次更新，所以优化首次直接存在style上，后续存在list
      updateHash[uniqueUpdateId++] = o;
    }
    else if(updateHash.hasOwnProperty(nodeConfig[NODE_UNIQUE_UPDATE_ID])) {
      let target = updateHash[nodeConfig[NODE_UNIQUE_UPDATE_ID]];
      if(o[UPDATE_IMG]) {
        target[UPDATE_IMG] = o[UPDATE_IMG];
      }
      if(o[UPDATE_FOCUS]) {
        target[UPDATE_FOCUS] |= o[UPDATE_FOCUS];
      }
      if(o[UPDATE_MEASURE]) {
        target[UPDATE_MEASURE] = true;
      }
      // 后续存在新建list上，需增加遍历逻辑
      if(o[UPDATE_STYLE]) {
        let list = target[UPDATE_LIST] = target[UPDATE_LIST] || [];
        list.push({
          [UPDATE_STYLE]: o[UPDATE_STYLE],
          [UPDATE_OVERWRITE]: o[UPDATE_OVERWRITE],
          [UPDATE_KEYS]: o[UPDATE_KEYS],
        });
      }
    }
    else {
      inject.error('Update process miss uniqueUpdateId');
    }
  }

  /**
   * 除首次外每次刷新前检查更新列表，计算样式变化，以及测量信息
   * @private
   */
  __checkUpdate(renderMode, ctx, width, height) {
    let root = this;
    let measureList = [];
    let reflowList = [];
    let cacheHash = {};
    let cacheList = [];
    let zHash = {};
    let zList = [];
    let updateRoot = root.__updateRoot;
    let updateHash = root.__updateHash;
    let hasUpdate;
    // root更新特殊提前，因为有继承因素
    if(updateRoot) {
      root.__updateRoot = null;
      hasUpdate = parseUpdate(renderMode, root, updateRoot,
        reflowList, measureList, cacheHash, cacheList);
      // 此时做root检查，防止root出现继承等无效样式
      root.__checkRoot(width, height);
    }
    // 汇总处理每个节点，k是递增数字直接循环遍历
    let keys = Object.keys(updateHash);
    for(let i = 0, len = keys.length; i < len; i++) {
      let t = parseUpdate(renderMode, root, updateHash[keys[i]],
        reflowList, measureList, cacheHash, cacheList, zHash, zList);
      hasUpdate = hasUpdate || t;
    }
    // 先做一部分reset避免下面measureList干扰，cacheList的是专门收集新增的额外节点
    root.__reflowList = reflowList;
    uniqueUpdateId = 0;
    root.__updateHash = root.__config[NODE_UPDATE_HASH] = {};
    cacheList.forEach(item => {
      delete item.__config[NODE_UNIQUE_UPDATE_ID];
    });
    // zIndex改变的汇总修改，防止重复操作
    zList.forEach(item => {
      if(item.hasOwnProperty('__uniqueZId')) {
        delete item.__uniqueZId;
        item.__updateStruct(root.__structs);
      }
    });
    /**
     * 遍历每项节点，计算测量信息，节点向上向下查找继承信息，如果parent也是继承，先计算parent的
     * 过程中可能会出现重复，因此节点上记录一个临时标防止重复递归
     */
    let measureHash = {};
    measureList.forEach(node => {
      let { __config:{ [NODE_UNIQUE_UPDATE_ID]: __uniqueUpdateId, }, domParent: parent } = node;
      if(measureHash.hasOwnProperty(__uniqueUpdateId)) {
        return;
      }
      measureHash[__uniqueUpdateId] = true;
      let last = node;
      // 检查measure的属性是否是inherit
      let isInherit = change.isMeasureInherit(updateHash[__uniqueUpdateId][UPDATE_STYLE]);
      // 是inherit，需要向上查找，从顶部向下递归计算继承信息
      if(isInherit) {
        while(parent && parent !== root) {
          let { __config:{ [NODE_UNIQUE_UPDATE_ID]: __uniqueUpdateId, }, currentStyle } = parent;
          let isInherit;
          if(parent.__config.hasOwnProperty(NODE_UNIQUE_UPDATE_ID)) {
            let style = updateHash[__uniqueUpdateId][UPDATE_STYLE];
            measureHash[__uniqueUpdateId] = true;
            let temp = change.measureInheritList(style);
            isInherit = !!temp.length;
          }
          else {
            isInherit = change.isMeasureInherit(currentStyle);
          }
          // 如果parent有inherit存入列表且继续向上，否则跳出循环
          if(isInherit) {
            last = parent;
          }
          else {
            break;
          }
          // 考虑component下的继续往上继承
          parent = parent.domParent;
        }
      }
      // 自顶向下查找inherit的，利用已有的方法+回调，当递归包含重复时标记防止重复
      last.__computeMeasure(renderMode, ctx, function(target) {
        if(target.__config.hasOwnProperty(NODE_UNIQUE_UPDATE_ID)) {
          measureHash[target.__config[NODE_UNIQUE_UPDATE_ID]] = true;
        }
      });
    });
    // 做完清空留待下次刷新重来
    for(let i = 0, len = keys.length; i < len; i++) {
      delete updateHash[keys[i]][UPDATE_CONFIG][NODE_UNIQUE_UPDATE_ID];
    }
    return hasUpdate;
  }

  /**
   * 除首次外每次刷新前检查reflow列表，计算需要reflow的节点局部重新布局
   * 当一个元素absolute不变时，其变化不会影响父元素和兄弟元素，直接自己重新局部LAYOUT包含子节点
   * 当absolute发生改变时，其变化会影响父和兄弟，视作父重新布局
   * 当inline变化时，视为其最近block/flex父变化
   * 当block变化时，往上查找最上层flex视为其变化，如不是则影响后面兄弟offset和父resize
   * 当flex变化时，往上查找最上层flex视为其变化，如不是则影响所有递归子节点layout和父resize
   * 以上3种情况向上查找时遇到absolute父均提前跳出，并标记absolute父LAYOUT
   * 上面所有情况即便结束还得额外看是否处于absolute中，是还是标记absolute重新布局
   * 当relative只变化left/top/right/bottom时，自己重新layout
   * 检测节点时记录影响的所有节点，最终形成一棵或n棵局部树
   * 需要重新布局的记作LAYOUT，被兄弟影响只需偏移的记作OFFSET，OFFSET可能会重复变为LAYOUT
   * 上述情况倘若发生包含重复，去掉子树，因子树视为被包含的重新布局
   * 如果有从root开始的，直接重新布局像首次那样即可
   * 如果非root，所有树根按先根顺序记录下来，依次执行局部布局
   * @private
   */
  __checkReflow(width, height) {
    let { __reflowList: reflowList } = this;
    if(!reflowList.length) {
      return;
    }
    let root = this;
    let hasRoot;
    __uniqueReflowId = 0;
    let reflowHash = {};
    // 遍历检查发生布局改变的节点列表，此时computedStyle还是老的，currentStyle是新的
    for(let i = 0, len = reflowList.length; i < len; i++) {
      let { node, style, img, component } = reflowList[i];
      // root提前跳出，完全重新布局
      if(node === this) {
        hasRoot = true;
        break;
      }
      let { currentStyle, computedStyle } = node;
      // 每个节点生成唯一的布局识别id存入hash防止重复
      if(!node.hasOwnProperty('__uniqueReflowId')) {
        node.__uniqueReflowId = __uniqueReflowId;
        reflowHash[__uniqueReflowId++] = {
          node,
          lv: OFFSET,
          img,
          component,
        };
      }
      let o = reflowHash[node.__uniqueReflowId];
      // absolute无变化，只影响自己
      if(currentStyle[POSITION] === 'absolute' && computedStyle[POSITION] === 'absolute') {
        o.lv = LAYOUT;
      }
      // absolute和非absolute互换
      else if(currentStyle[POSITION] !== computedStyle[POSITION]) {
        o.lv = LAYOUT;
        if(checkInfluence(root, reflowHash, node, component)) {
          hasRoot = true;
          break;
        }
      }
      // 所有其它变化
      else {
        let onlyXY = true;
        if(style) {
          let keys = Object.keys(style);
          for(let i = 0, len = keys.length; i < len; i++) {
            let k = keys[i];
            if(!DIRECTION_HASH.hasOwnProperty(k)) {
              onlyXY = false;
              break;
            }
          }
        }
        // relative只有x/y变化时特殊只进行OFFSET，非relative的忽视掉这个无用影响
        // img和component加载特殊进到这里强制LAYOUT
        if(onlyXY && !img && !component) {
          if(computedStyle[POSITION] === 'relative') {
            o.lv |= OFFSET;
          }
        }
        // 剩余的其它变化
        else {
          o.lv = LAYOUT;
          if(checkInfluence(root, reflowHash, node, component)) {
            hasRoot = true;
            break;
          }
        }
      }
    }
    __uniqueReflowId = 0;
    this.__reflowList = [];
    // 有root提前跳出
    if(hasRoot) {
      reflowList.forEach(item => delete item.node.__uniqueReflowId);
      // 布局分为两步，普通流和定位流，互相递归
      this.__layout({
        x: 0,
        y: 0,
        w: width,
        h: height,
      });
      // 绝对布局需要从根开始保存相对坐标系的容器引用，并根据relative/absolute情况变更
      this.__layoutAbs(this, {
        x: 0,
        y: 0,
        w: width,
        h: height,
      });
      this.__structs = this.__structure(0, 0);
      return true;
    }
    /**
     * 修剪树，自顶向下深度遍历
     * LAYOUT节点作为局部根，其递归子节点无需重复任何操作，直接去重
     * OFFSET节点作为局部根，其递归子节点先执行任何操作，后续根节点再偏移一次
     */
    else {
      let uniqueList = [];
      this.__deepScan(function(node, options) {
        if(node.hasOwnProperty('__uniqueReflowId')) {
          let o = reflowHash[node.__uniqueReflowId];
          // delete node.__uniqueReflowId; // 清除掉
          if(o.lv >= LAYOUT) {
            options.uniqueList.push(o);
          }
          else {
            // OFFSET的话先递归看子节点，本身改变放在最后
            let uniqueList = [];
            node.__deepScan(function(child, uniqueList) {}, { uniqueList });
            uniqueList.forEach(item => {
              options.uniqueList.push(item);
            });
            options.uniqueList.push(o);

          }
          // 返回true即可提前结束深度遍历，在reflowHash有记录时提前跳出，子节点交由上面逻辑执行
          return true;
        }
        // reflowHash没有记录则无返回继续递归执行
      }, { uniqueList });
      /**
       * 按顺序执行列表即可，上层LAYOUT先执行且停止递归子节点，上层OFFSET后执行等子节点先LAYOUT/OFFSET
       * 同级按先后顺序排列，过程中记录diff在结束后进行structs更新
       * 这里要注意margin合并的逻辑，因为最终都是block（flex等同），需要进行合并
       * 在处理一个block时，先判断是否是空block，同时看后面紧邻的有没有在uniqueList的下一个
       * 单独空block处理、2个相邻的非block处理直接可以进行判断
       * 中间的空block（即非空block的下一个是空block，且下一个不是最后一个），先记录下来list，合并后一并offset
       * 合并margin和Dom的逻辑一样，抽离共有方法
       **/
      let diffList = [];
      let diffI = 0;
      let mergeOffsetList = [];
      let __uniqueMergeOffsetId = 0;
      uniqueList.forEach(item => {
        let { node, lv, component } = item;
        // 重新layout的w/h数据使用之前parent暂存的，x使用parent，y使用prev或者parent的
        if(lv >= LAYOUT) {
          let cps = node.computedStyle, cts = node.currentStyle;
          let zIndex = cps[Z_INDEX], position = cps[POSITION], display = cps[DISPLAY];
          let isLastAbs = position === 'absolute';
          let isNowAbs = cts[POSITION] === 'absolute';
          let isLastNone = display === 'none';
          let isNowNone = cts[DISPLAY] === 'none';
          // none不可见布局无效可以无视
          if(isLastNone && isNowNone) {
            return;
          }
          let parent = node.domParent;
          let { __layoutData: { x, y, h }, width, computedStyle } = parent;
          let current = node;
          // cp的shadowRoot要向上到cp本身
          while(component && current.isShadowRoot) {
            current = current.host;
          }
          // y使用prev或者parent的，首个节点无prev
          let ref = current.prev;
          if(ref) {
            y = ref.y;
            y += ref.outerHeight;
          }
          else {
            y = parent.y;
            y += computedStyle[MARGIN_TOP] + computedStyle[BORDER_TOP_WIDTH] + computedStyle[PADDING_TOP];
          }
          x += computedStyle[MARGIN_LEFT] + computedStyle[BORDER_LEFT_WIDTH] + computedStyle[PADDING_LEFT];
          let { outerHeight } = node;
          let change2Abs;
          // 找到最上层容器，如果是组件的子节点，以sr为container，sr本身往上找
          let container = node;
          if(isNowAbs) {
            container = container.domParent;
            while(container && container !== root) {
              if(isRelativeOrAbsolute) {
                break;
              }
              // 不能用domParent，必须在组件环境内
              if(container.parent) {
                container = container.parent;
              }
              else if(container.host) {
                break;
              }
            }
            if(!container) {
              container = root;
            }
            // 由setState引发的传入component自身，layout引发的传入sr
            if(component) {
              parent.__layoutAbs(container, null, component);
            }
            else {
              parent.__layoutAbs(container, null, node);
            }
            // 前后都是abs无需偏移后面兄弟和parent调整，component变化节点需更新struct
            if(isLastAbs) {
              if(component) {
                let arr = node.__modifyStruct(root, diffI);
                diffI += arr[1];
                diffList.push(arr);
                if((position !== cts[POSITION] && (position === 'static' || cts[POSITION] === 'static'))
                  || zIndex !== cts[Z_INDEX]) {
                  parent.__updateStruct(root.__structs);
                  if(this.renderMode === mode.SVG) {
                    cleanSvgCache(parent);
                  }
                }
              }
              else if(isLastNone || isNowNone) {
                node.__zIndexChildren = null;
                let arr = node.__modifyStruct(root, diffI);
                diffI += arr[1];
                diffList.push(arr);
              }
              return;
            }
            parent.__updateStruct(root.__structs);
            change2Abs = true;
          }
          // 现在是普通流，不管之前是啥直接布局
          else {
            node.__layout({
              x,
              y,
              w: width,
              h,
            });
            if(node instanceof Dom) {
              if(!node.parent && node.host) {
                container = node; // 特殊判断component的sr为container
              }
              else {
                while(container && container !== root) {
                  if(isRelativeOrAbsolute) {
                    break;
                  }
                  // 不能用domParent，必须在组件环境内
                  if(container.parent) {
                    container = container.parent;
                  }
                  else if(container.host) {
                    break;
                  }
                }
                if(!container) {
                  container = root;
                }
              }
              node.__layoutAbs(container, {
                x,
                y,
                w: width,
                h,
              });
            }
          }
          // 向上查找最近的parent是relative，需再次累加ox/oy，无需继续向上递归，因为parent已经递归包含了
          // 这样node重新布局后再次设置其使用parent的偏移
          let p = node;
          while(p && p !== root) {
            p = p.domParent;
            computedStyle = p.computedStyle;
            if(computedStyle[POSITION] === 'relative') {
              let { ox, oy } = p;
              ox && node.__offsetX(ox);
              oy && node.__offsetY(oy);
              break;
            }
          }

          // 去重防止abs并记录parent，整个结束后按先序顺序进行margin合并以及偏移，
          if(!change2Abs && !parent.hasOwnProperty('__uniqueMergeOffsetId')) {
            parent.__uniqueMergeOffsetId = __uniqueMergeOffsetId++;
            mergeOffsetList.push(parent);
          }

          // 记录重新布局引发的差值w/h，注意abs到非abs的切换情况，此时更新完毕，computedStyle是新的
          // abs没有变化前面会跳出，这里一定是发生了变化或者非abs不变化
          let fromAbs = isLastAbs;
          let dy;
          if(change2Abs) {
            dy = -outerHeight;
          }
          else {
            let { outerHeight: oh } = node;
            // 由非abs变为abs纯增加
            if(fromAbs) {
              dy = oh;
            }
            else {
              dy = oh - outerHeight;
            }
          }

          // 这里尝试判断是否需要合并margin，然后综合对偏移的dy产生影响
          // 新布局时因为是以prev/parent的y为开始，所有新的是不考虑之前的margin合并的
          // let isEmptyBlock;
          // if(node.flowChildren && node.flowChildren.length === 0) {
          //   let {
          //     [MARGIN_TOP]: marginTop,
          //     [MARGIN_BOTTOM]: marginBottom,
          //     [PADDING_TOP]: paddingTop,
          //     [PADDING_BOTTOM]: paddingBottom,
          //     [HEIGHT]: height,
          //     [BORDER_TOP_WIDTH]: borderTopWidth,
          //     [BORDER_BOTTOM_WIDTH]: borderBottomWidth,
          //   } = node.computedStyle;
          //   // 无内容高度为0的空block特殊情况，记录2个margin下来等后续循环判断处理
          //   if(paddingTop <= 0 && paddingBottom <= 0 && height <= 0 && borderTopWidth <= 0 && borderBottomWidth <= 0) {
          //     mergeMarginBottomList.push(marginBottom);
          //     mergeMarginTopList.push(marginTop);
          //     isEmptyBlock = true;
          //   }
          // }
          // let isNextReflow = uniqueList[i + 1] && uniqueList[i + 1] === node.next;
          // // 空block比较麻烦，分支较多
          // if(isEmptyBlock) {
          //   let next = node.next;
          //   let { [MARGIN_TOP]: marginTop, [MARGIN_BOTTOM]: marginBottom } = cps;
          //   // 空block是最后一个没有next兄弟，直接处理
          //   if(!next) {
          //     mergeMarginTopList.push(marginTop);
          //     mergeMarginBottomList.push(marginBottom);
          //     let diff = util.getMergeMarginTB(mergeMarginTopList, mergeMarginBottomList);
          //     if(diff) {
          //       node.__offsetY(diff, true);
          //       dy += diff;
          //     }
          //     mergeMarginTopList = [];
          //     mergeMarginBottomList = [];
          //   }
          //   // 有next兄弟的空block
          //   else {
          //     // 下个也在reflow列表里，记录下来等下个处理，因为紧邻，所以一定是i+1个
          //     if(next === uniqueList[i + 1]) {
          //       mergeMarginTopList.push(marginTop);
          //       mergeMarginBottomList.push(marginBottom);
          //     }
          //     // 下个不在reflow列表里
          //     else {
          //       if(next instanceof Component) {
          //         next = next.shadowRoot;
          //       }
          //       let isBlock;
          //       if(!(next instanceof Text)) {
          //         isBlock = next.computedStyle[DISPLAY] !== 'inline';
          //       }
          //     }
          //   }
          // }
          // // 本次非空，看有无记录，有则合并，无则不处理，需要将前面的block的mb和自己的mt放入，前面的重复放入不影响
          // else {
          //   let prev = node.prev;
          //   if(prev instanceof Component) {
          //     prev = prev.shadowRoot;
          //   }
          //   // 即便重复也无所谓，不影响计算
          //   if(prev instanceof Xom) {
          //     let marginBottom = prev.computedStyle[MARGIN_BOTTOM];
          //     mergeMarginBottomList.push(marginBottom);
          //   }
          //   mergeMarginTopList.push(cps[MARGIN_TOP]);
          //   if(mergeMarginTopList.length && mergeMarginBottomList.length) {
          //     let diff = util.getMergeMarginTB(mergeMarginTopList, mergeMarginBottomList);
          //     if(diff) {
          //       node.__offsetY(diff, true);
          //       dy += diff;
          //     }
          //   }
          //   mergeMarginTopList = [];
          //   mergeMarginBottomList = [];
          // }

          // 如果有差值，偏移next兄弟，同时递归向上所有parent扩充和next偏移，直到absolute或者固定高度的中止
          if(dy) {
            let p = node;
            let last;
            do {
              // component的sr没有next兄弟，视为component的next
              while(p.isShadowRoot) {
                p = p.host;
              }
              last = p;
              let isContainer, resizeAbsList = [];
              if(p.parent) {
                let cs = p.parent.computedStyle;
                let ps = cs[POSITION];
                isContainer = p.parent === root || ps === 'relative' || ps === 'absolute';
              }
              // 先偏移next，忽略有定位的absolute或LAYOUT，本身非container也忽略
              let next = p.next;
              while(next) {
                if(next.currentStyle[POSITION] === 'absolute') {
                  if(isContainer) {
                    let { [TOP]: top, [BOTTOM]: bottom, [HEIGHT]: height } = next.currentStyle;
                    if(top[1] === AUTO) {
                      if(bottom[1] === AUTO || bottom[1] === PX) {
                        next.__offsetY(dy, true, REFLOW);
                        next.__cancelCache();
                      }
                      else if(bottom[1] === PERCENT) {
                        let v = (1 - bottom[0] * 0.01) * dy;
                        next.__offsetY(v, true, REFLOW);
                        next.__cancelCache();
                      }
                    }
                    else if(top[1] === PERCENT) {
                      let v = top[0] * 0.01 * dy;
                      next.__offsetY(v, true, REFLOW);
                      next.__cancelCache();
                    }
                    // height为百分比的记录下来后面重新布局
                    if(height[1] === PERCENT) {
                      resizeAbsList.push(next);
                    }
                  }
                }
                else if(!next.hasOwnProperty('__uniqueReflowId') || reflowHash[next.__uniqueReflowId] < LAYOUT) {
                  next.__offsetY(dy, true, REFLOW);
                  next.__cancelCache();
                }
                next = next.next;
              }
              // 要么一定有parent，因为上面向上循环排除了cp返回cp的情况；要么就是root本身
              p = p.parent;
              if(!p) {
                break;
              }
              // parent判断是否要resize
              let { currentStyle } = p;
              let isAbs = currentStyle[POSITION] === 'absolute';
              let need;
              if(isAbs) {
                if(currentStyle[HEIGHT][1] === AUTO
                  && (currentStyle[TOP][1] === AUTO || currentStyle[BOTTOM][1] === AUTO)) {
                  need = true;
                }
              }
              // height不定则需要
              else if(currentStyle[HEIGHT][1] === AUTO) {
                need = true;
              }
              if(need) {
                p.__resizeY(dy, REFLOW);
                p.__cancelCache();
                // 因调整导致的abs尺寸变化，注意排除本身有布局更新的
                resizeAbsList.forEach(item => {
                  if(!item.hasOwnProperty('__uniqueReflowId') || reflowHash[item.__uniqueReflowId] < LAYOUT) {
                    p.__layoutAbs(p, null, item);
                  }
                });
              }
              // abs或者高度不需要继续向上调整提前跳出
              else {
                break;
              }
              if(p === root) {
                break;
              }
            }
            while(true);
            // 最后一个递归向上取消总缓存，防止过程中重复next多次无用递归
            while(last) {
              last.__cancelCache(true);
              last = last.domParent;
            }
          }

          // component未知dom变化，所以强制重新struct，text为其父节点，同时防止zIndex变更影响父节点
          if(component) {
            let arr = node.__modifyStruct(root, diffI);
            diffI += arr[1];
            diffList.push(arr);
            if((position !== cts[POSITION] && (position === 'static' || cts[POSITION] === 'static'))
              || zIndex !== cts[Z_INDEX]) {
              node.domParent.__updateStruct(root.__structs);
              if(this.renderMode === mode.SVG) {
                cleanSvgCache(node.domParent);
              }
            }
          }
          // display有none变化，重置struct和zc
          else if(isLastNone || isNowNone) {
            node.__zIndexChildren = null;
            let arr = node.__modifyStruct(root, diffI);
            diffI += arr[1];
            diffList.push(arr);
          }
        }
        // OFFSET操作的节点都是relative，要考虑auto变化
        else {
          let {
            currentStyle: { [TOP]: top, [RIGHT]: right, [BOTTOM]: bottom, [LEFT]: left }, currentStyle,
            computedStyle: { [TOP]: t, [RIGHT]: r, [BOTTOM]: b, [LEFT]: l }, computedStyle,
          } = node;
          let parent;
          if(node === this) {
            parent = node;
          }
          else {
            parent = node.domParent;
          }
          let newY = 0;
          if(top[1] !== AUTO) {
            newY = calRelative(currentStyle, 'top', top, parent);
            computedStyle[TOP] = newY;
            computedStyle[BOTTOM] = 'auto';
          }
          else if(bottom[1] !== AUTO) {
            newY = -calRelative(currentStyle, 'bottom', bottom, parent);
            computedStyle[BOTTOM] = -newY;
            computedStyle[TOP] = 'auto';
          }
          else {
            computedStyle[TOP] = computedStyle[BOTTOM] = 'auto';
          }
          let oldY = 0;
          if(t !== 'auto') {
            oldY = t;
          }
          else if(b !== 'auto') {
            oldY = -b;
          }
          if(newY !== oldY) {
            node.__offsetY(newY - oldY, false, REFLOW);
          }
          let newX = 0;
          if(left[1] !== AUTO) {
            newX = calRelative(currentStyle, 'left', left, parent);
            computedStyle[LEFT] = newX;
            computedStyle[RIGHT] = 'auto';
          }
          else if(right[1] !== AUTO) {
            newX = -calRelative(currentStyle, 'right', right, parent);
            computedStyle[RIGHT] = -newX;
            computedStyle[LEFT] = 'auto';
          }
          else {
            computedStyle[LEFT] = computedStyle[RIGHT] = 'auto';
          }
          let oldX = 0;
          if(l !== 'auto') {
            oldX = l;
          }
          else if(r !== 'auto') {
            oldX = -r;
          }
          if(newX !== oldX) {
            node.__offsetX(newX - oldX, false, REFLOW);
          }
        }
      });
      /**
       * mergeMargin后续调整，记录的是变更节点的父节点，因此每个节点内部直接遍历孩子进行
       * 由于保持先根遍历的顺序，因此会从最上最里的节点开始，且不会有abs节点的父节点
       * 完成后对此父节点的后续兄弟节点进行调整，多次不会干扰影响
       * 然后继续往上循环，直到root结束
       */
      mergeOffsetList.forEach(parent => {return;
        delete parent.__uniqueMergeOffsetId;
        let flowChildren = parent.flowChildren, absChildren = parent.absChildren;
        let mergeMarginBottomList = [], mergeMarginTopList = [];
        let length = flowChildren.length;
        let isStart, startIndex, diffTotal = 0;
        // 遍历flow孩子，从开始变化的节点开始，看变化造成的影响，对其后面节点进行偏移，并统计总偏移量
        for(let i = 0; i < length; i++) {
          let item = flowChildren[i];
          if(item instanceof Component) {
            item = item.shadowRoot;
          }
          let isXom = item instanceof Xom;
          // 忽略掉前面没有变更的节点，不能合并
          if(!isStart && isXom) {
            if(item.hasOwnProperty('__uniqueReflowId')) {
              isStart = true;
              startIndex = i;
            }
          }
          // 开始变更的节点，至少不是第0个
          let isInline = isXom && item.currentStyle[DISPLAY] === 'inline';
          // 每次循环开始前，这次不是block的话，看之前遗留的，可能是以空block结束，需要特殊处理，单独一个空block也包含
          if((!isXom || isInline)) {
            if(mergeMarginBottomList.length && mergeMarginTopList.length && isStart) {
              let diff = util.getMergeMarginTB(mergeMarginTopList, mergeMarginBottomList);
              if(diff) {
                diffTotal += diff;
                for(let j = Math.max(startIndex, i - mergeMarginBottomList.length + 1); j < length; j++) {
                  flowChildren[j].__offsetY(diff, true, REFLOW);
                  flowChildren[j].__cancelCache();
                }
              }
            }
            mergeMarginTopList = [];
            mergeMarginBottomList = [];
          }
          // 和普通布局类似，只是不用重新布局只需处理合并margin再根据差值偏移
          if(isXom && !isInline) {
            let isEmptyBlock;
            if(item.flowChildren && item.flowChildren.length === 0) {
              let {
                [MARGIN_TOP]: marginTop,
                [MARGIN_BOTTOM]: marginBottom,
                [PADDING_TOP]: paddingTop,
                [PADDING_BOTTOM]: paddingBottom,
                [HEIGHT]: height,
                [BORDER_TOP_WIDTH]: borderTopWidth,
                [BORDER_BOTTOM_WIDTH]: borderBottomWidth,
              } = item.computedStyle;
              // 无内容高度为0的空block特殊情况，记录2个margin下来等后续循环判断处理
              if(paddingTop <= 0 && paddingBottom <= 0 && height <= 0 && borderTopWidth <= 0 && borderBottomWidth <= 0) {
                mergeMarginBottomList.push(marginBottom);
                mergeMarginTopList.push(marginTop);
                isEmptyBlock = true;
              }
            }
            // 空block要留下轮循环看，除非是最后一个，非空本轮处理掉看是否要合并
            if(!isEmptyBlock) {
              let { [MARGIN_TOP]: marginTop, [MARGIN_BOTTOM]: marginBottom } = item.computedStyle;
              // 有bottom值说明之前有紧邻的block，任意个甚至空block，自己有个top所以无需判断top
              // 如果是只有紧邻的2个非空block，也被包含在情况内，取上下各1合并
              if(mergeMarginBottomList.length) {
                mergeMarginTopList.push(marginTop);
                if(isStart) {
                  let diff = util.getMergeMarginTB(mergeMarginTopList, mergeMarginBottomList);
                  // 需要合并的情况，根据记录数和索引向上向下遍历节点设置偏移，同时设置总偏移量供父级使用
                  if(diff) {
                    diffTotal += diff;
                    for(let j = Math.max(startIndex, i - mergeMarginBottomList.length + 1); j < length; j++) {
                      flowChildren[j].__offsetY(diff, true, REFLOW);
                      flowChildren[j].__cancelCache();
                    }
                  }
                }
              }
              // 同时自己保存bottom，为后续block准备
              mergeMarginTopList = [];
              mergeMarginBottomList = [marginBottom];
            }
            // 最后一个空block当是正正和负负时要处理，正负在outHeight处理了结果是0，最后一个一定有不必判断isStart
            else if(i === length - 1) {
              let diff = util.getMergeMarginTB(mergeMarginTopList, mergeMarginBottomList);
              if(diff) {
                diffTotal += diff;
                for(let j = Math.max(startIndex, i - mergeMarginBottomList.length + 1); j < length; j++) {
                  flowChildren[j].__offsetY(diff, true, REFLOW);
                  flowChildren[j].__cancelCache();
                }
              }
            }
          }
        }
        // 有偏移才进行absChildren和parent的next以及向上递归偏移
        if(diffTotal) {
          let { sy, clientHeight } = parent;
          // 遍历abs，如果top/bottom不固定也需发生偏移
          for(let i = 0, len = absChildren.length; i < len; i++) {
            let item = absChildren[i];
            let { [TOP]: top, [BOTTOM]: bottom } = item.currentStyle;
            // 分几种情况，除非top固定PX，否则都要偏移
            if(top[1] === AUTO) {
              if(bottom[1] === AUTO) {
                let { sy: oldY, prev } = item;
                let newY = sy;
                while(prev) {
                  if(prev instanceof Text || prev.computedStyle[POSITION] !== 'absolute') {
                    newY = prev.y + prev.outerHeight;
                    break;
                  }
                  prev = prev.prev;
                }
                if(oldY !== newY) {
                  item.__offsetY(diffTotal, true, REFLOW);
                  item.__cancelCache();
                }
              }
              else if(bottom[1] === PERCENT) {
                let t = (1 - bottom[0] * 0.01);console.log(t,bottom);
                let v = t * clientHeight - t * (clientHeight - diffTotal);
                console.log(v);
              }
              else {}
            }
            else if(top[1] === PERCENT) {
              let { sy: oldY } = item;
            }
          }
        }
        // // 对parent本身进行缩放，后面兄弟进行偏移，完成后继续向上，除非遇到固定尺寸或abs
        // if(parent && diffTotal && !isFixedWidthOrHeight(parent, HEIGHT)) {
        //   parent.__resizeY(diffTotal, REFLOW);
        //   let isAbs = parent.computedStyle[POSITION] === 'absolute';
        //   if(isAbs) {
        //     // break;
        //   }
        //   let next = parent.next;
        //   while(next) {
        //     // absolute的孩子特殊判断，属于parent容器的需要，不属于的auto的也需要
        //     let isAbs = next.computedStyle[POSITION] === 'absolute';
        //     if(isAbs) {
        //       if(isContainer) {
        //         next.__offsetY(diffTotal, true, REFLOW);
        //       }
        //       else {
        //         //
        //       }
        //     }
        //     else {
        //       next.__offsetY(diffTotal, true, REFLOW);
        //     }
        //     next = next.next;
        //   }
        //   parent = parent.domParent;
        // }
      });

      // 调整因reflow造成的原struct数据索引数量偏差，纯zIndex的已经在repaint里面重新生成过了
      // 这里因为和update保持一致的顺序，因此一定是先根顺序且互不包含
      let diff = 0, lastIndex = 0, isFirst = true, structs = root.__structs;
      diffList.forEach(item => {
        let [ns, d] = item;
        // 第一个有变化的，及后面无论有无变化都需更新
        // 第1个变化区域无需更改前面一段
        if(isFirst) {
          isFirst = false;
          lastIndex = ns[STRUCT_INDEX] + (ns[STRUCT_TOTAL] || 0) + 1;
          diff += d;
        }
        // 第2+个变化区域看是否和前面一个相连，有不变的段则先偏移它，然后再偏移自己
        else {
          let j = ns[STRUCT_INDEX] + (ns[STRUCT_TOTAL] || 0) + 1 + diff;
          for(let i = lastIndex; i < j; i++) {
            structs[i][STRUCT_INDEX] += diff;
          }
          lastIndex = j;
          diff += d;
        }
      });
      // 后面的要根据偏移量校正索引
      if(diff) {
        for(let i = lastIndex, len = structs.length; i < len; i++) {
          structs[i][STRUCT_INDEX] += diff;
        }
      }
      // 清除id
      reflowList.forEach(item => delete item.node.__uniqueReflowId);
    }
  }

  // 特殊覆盖方法，不需要super()计算自己，因为放在每次checkRoot()做过了
  __computeMeasure(renderMode, ctx) {
    css.computeMeasure(this, true);
    this.children.forEach(item => {
      item.__computeMeasure(renderMode, ctx);
    });
  }

  // 每个root拥有一个刷新hook，多个root塞到frame的__hookTask里
  // frame在所有的帧刷新逻辑执行后检查hook列表，进行root刷新操作
  __frameHook() {
    if(!this.__hookTask) {
      let r = this.__hookTask = (() => {
        this.refresh();
      });
      frame.__hookTask.push(r);
    }
  }

  __clear(ctx) {
    // 可能会调整宽高，所以每次清除用最大值
    this.__mw = Math.max(this.__mw, this.width);
    this.__mh = Math.max(this.__mh, this.height);
    // 清除前得恢复默认matrix，防止每次布局改变了属性
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.__mw, this.__mh);
  }

  get dom() {
    return this.__dom;
  }

  get renderMode() {
    return this.__renderMode;
  }

  get ctx() {
    return this.__ctx;
  }

  get defs() {
    return this.__defs;
  }

  get task() {
    return this.__task;
  }

  get taskCp() {
    return this.__taskCp;
  }

  get ref() {
    return this.__ref;
  }

  get animateController() {
    return this.__animateController;
  }
}

export default Root;
