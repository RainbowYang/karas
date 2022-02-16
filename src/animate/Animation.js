import css from '../style/css';
import unit from '../style/unit';
import tf from '../style/transform';
import abbr from '../style/abbr';
import enums from '../util/enums';
import util from '../util/util';
import Event from '../util/Event';
import inject from '../util/inject';
import frame from './frame';
import easing from './easing';
import change from '../refresh/change';
import key from './key';
import mx from '../math/matrix';

const {
  STYLE_KEY: {
    FILTER,
    TRANSFORM_ORIGIN,
    PERSPECTIVE_ORIGIN,
    BACKGROUND_CLIP,
    BACKGROUND_POSITION_X,
    BACKGROUND_POSITION_Y,
    BOX_SHADOW,
    TRANSLATE_X,
    TRANSLATE_Y,
    TRANSLATE_Z,
    BACKGROUND_SIZE,
    FONT_SIZE,
    FLEX_BASIS,
    FLEX_DIRECTION,
    WIDTH,
    HEIGHT,
    TOP,
    BOTTOM,
    LINE_HEIGHT,
    OPACITY,
    Z_INDEX,
    TRANSFORM,
    COLOR,
    FONT_WEIGHT,
    FONT_STYLE,
    FONT_FAMILY,
    TEXT_ALIGN,
    MATRIX,
    ROTATE_3D,
    TRANSLATE_PATH,
    TEXT_STROKE_COLOR,
    TEXT_STROKE_OVER,
  },
  UPDATE_KEY: {
    UPDATE_NODE,
    UPDATE_STYLE,
    UPDATE_KEYS,
    UPDATE_CONFIG,
  },
  KEY_FRAME_KEY: {
    FRAME_STYLE,
    FRAME_TIME,
    FRAME_EASING,
    FRAME_TRANSITION,
  },
  ANIMATE_KEY: {
    I_ASSIGNING,
    I_IN_FPS,
    I_IS_DELAY,
    I_BEGIN,
    I_END,
    I_FINISHED,
    I_NEXT_END,
    I_FIRST_PLAY,
    I_PLAY_CB,
    I_TARGET,
    I_ROOT,
    I_FRAMES,
    I_FRAMES_R,
    I_CURRENT_TIME,
    I_NEXT_TIME,
    I_STYLE,
    I_DURATION,
    I_ITERATIONS,
    I_FILL,
    I_PLAYBACK_RATE,
    I_PLAY_COUNT,
    I_PLAY_STATE,
    I_DESTROYED,
    I_START_TIME,
    I_FPS_TIME,
    I_EASING,
    I_ENTER_FRAME,
    I_DELAY,
    I_END_DELAY,
    I_KEYS,
    I_ORIGIN_STYLE,
    I_CURRENT_FRAMES,
    I_CURRENT_FRAME,
    I_SPF_LIMIT,
    I_FPS,
    I_DIRECTION,
    I_FIRST_ENTER,
    I_STAY_BEGIN,
    I_STAY_END,
    I_IS2,
    I_END_TIME,
    I_NODE_CONFIG,
    I_ROOT_CONFIG,
    I_OUT_BEGIN_DELAY,
    I_TIME_STAMP,
  },
} = enums;
const { AUTO, PX, PERCENT, INHERIT, RGBA, STRING, NUMBER, REM, VW, VH, VMAX, VMIN, calUnit } = unit;
const { isNil, isFunction, isNumber, isObject, isString, clone, equalArr } = util;
const { linear } = easing;
const { cloneStyle } = css;
const { isGeom, GEOM } = change;

const {
  COLOR_HASH,
  LENGTH_HASH,
  RADIUS_HASH,
  GRADIENT_HASH,
  EXPAND_HASH,
  GRADIENT_TYPE,
} = key;

const NUM_CAL_HASH = {
};
Object.assign(NUM_CAL_HASH, LENGTH_HASH);
Object.assign(NUM_CAL_HASH, EXPAND_HASH);

function unify(frames, target) {
  let hash = {};
  let keys = [];
  // 获取所有关键帧的属性
  frames.forEach(item => {
    let style = item[FRAME_STYLE];
    Object.keys(style).forEach(k => {
      let v = style[k];
      // 未定义的过滤掉，null空有意义
      if(v !== undefined && !hash.hasOwnProperty(k)) {
        hash[k] = true;
        // geom为属性字符串，style都为枚举int
        if(!GEOM.hasOwnProperty(k)) {
          k = parseInt(k);
        }
        // path动画要转为translateXY，所以手动添加，使2帧之间存在过渡，有可能之前已存在这个动画，可忽视
        if(k === TRANSLATE_PATH) {
          if(!hash.hasOwnProperty(TRANSLATE_X)) {
            keys.push(TRANSLATE_X);
          }
          if(!hash.hasOwnProperty(TRANSLATE_Y)) {
            keys.push(TRANSLATE_Y);
          }
          hash[TRANSLATE_X] = hash[TRANSLATE_Y] = true;
        }
        keys.push(k);
      }
    });
  });
  // 添补没有声明完全的关键帧属性为节点当前值
  frames.forEach(item => {
    let style = item[FRAME_STYLE];
    keys.forEach(k => {
      if(!style.hasOwnProperty(k) || isNil(style[k])) {
        if(GEOM.hasOwnProperty(k)) {
          style[k] = target.getProps(k);
        }
        else {
          style[k] = target.currentStyle[k];
        }
      }
    });
  });
  return keys;
}

// 每次初始化时处理继承值，以及转换transform为单matrix矩阵
function inherit(frames, keys, target) {
  let computedStyle = target.computedStyle;
  frames.forEach(item => {
    let style = item[FRAME_STYLE];
    keys.forEach(k => {
      let v = style[k];
      // geom的属性可能在帧中没有
      if(isNil(v)) {
        return;
      }
      if(k === TRANSFORM) {
        let ow = target.outerWidth;
        let oh = target.outerHeight;
        let m = tf.calMatrix(v, ow, oh);
        style[k] = [[MATRIX, m]];
      }
      else if(v[1] === INHERIT) {
        if(k === COLOR || k === TEXT_STROKE_COLOR) {
          style[k] = [util.rgba2int(computedStyle[k]), RGBA];
        }
        else if(LENGTH_HASH.hasOwnProperty(k)) {
          style[k] = [computedStyle[k], PX];
        }
        else if(k === FONT_WEIGHT) {
          style[k] = [computedStyle[k], NUMBER];
        }
        else if(k === FONT_STYLE || k === FONT_FAMILY || k === TEXT_ALIGN || k === TEXT_STROKE_OVER) {
          style[k] = [computedStyle[k], STRING];
        }
      }
    });
  });
}

/**
 * 通知root更新当前动画，需要根据frame的状态来决定是否是同步插入
 * 在异步时，因为动画本身是异步，需要addRefreshTask
 * 而如果此时frame在执行before过程中，说明帧动画本身是在before计算的，需要同步插入
 * @param style
 * @param keys 样式所有的key
 * @param __config
 * @param root
 * @param node
 */
function genBeforeRefresh(style, keys, __config, root, node) {
  let res = {};
  res[UPDATE_NODE] = node;
  res[UPDATE_STYLE] = style;
  res[UPDATE_KEYS] = keys;
  res[UPDATE_CONFIG] = __config[I_NODE_CONFIG];
  root.__addUpdate(node, __config[I_NODE_CONFIG], root, __config[I_ROOT_CONFIG], res);
  __config[I_STYLE] = style;
  __config[I_ASSIGNING] = true;
  // frame每帧回调时，下方先执行计算好变更的样式，这里特殊插入一个hook，让root增加一个刷新操作
  // 多个动画调用因为相同root也只会插入一个，这样在所有动画执行完毕后frame里检查同步进行刷新，解决单异步问题
  root.__frameHook();
}

/**
 * 将每帧的样式格式化，提取出offset属性并转化为时间，提取出缓动曲线easing
 * @param style 关键帧样式
 * @param duration 动画时间长度
 * @param es options的easing曲线控制，frame没有自定义则使用全局的
 * @returns {{style: *, time: number, easing: *, transition: []}}
 */
function framing(style, duration, es) {
  let { offset, easing } = style;
  // 这两个特殊值提出来存储不干扰style
  delete style.offset;
  delete style.easing;
  // translatePath特殊对待，ae的曲线运动动画
  let translatePath = style.translatePath;
  style = css.normalize(style);
  if(Array.isArray(translatePath) && [6, 8].indexOf(translatePath.length) > -1) {
    style[TRANSLATE_PATH] = translatePath.map(item => calUnit(item));
  }
  let res = [];
  res[FRAME_STYLE] = style;
  res[FRAME_TIME] = offset * duration;
  res[FRAME_EASING] = easing || es;
  res[FRAME_TRANSITION] = [];
  return res;
}

function calByUnit(p, n, container, root) {
  if(p[1] === PX) {
    if(n[1] === PERCENT) {
      return n[0] * 0.01 * container - p[0];
    }
    else if(n[1] === REM) {
      return n[0] * root.computedStyle[FONT_SIZE] - p[0];
    }
    else if(n[1] === VW) {
      return n[0] * root.width * 0.01 - p[0];
    }
    else if(n[1] === VH) {
      return n[0] * root.height * 0.01 - p[0];
    }
    else if(n[1] === VMAX) {
      return n[0] * Math.max(root.width, root.height) * 0.01 - p[0];
    }
    else if(n[1] === VMIN) {
      return n[0] * Math.min(root.width, root.height) * 0.01 - p[0];
    }
  }
  else if(p[1] === PERCENT) {
    if(n[1] === PX) {
      return n[0] * 100 / container - p[0];
    }
    else if(n[1] === REM) {
      return n[0] * root.computedStyle[FONT_SIZE] * 100 / container - p[0];
    }
    else if(n[1] === VW) {
      return n[0] * root.width / container - p[0];
    }
    else if(n[1] === VH) {
      return n[0] * root.height / container - p[0];
    }
    else if(n[1] === VMAX) {
      return n[0] * Math.max(root.width, root.height) / container - p[0];
    }
    else if(n[1] === VMIN) {
      return n[0] * Math.min(root.width, root.height) / container - p[0];
    }
  }
  else if(p[1] === REM) {
    if(n[1] === PX) {
      return n[0] / root.computedStyle[FONT_SIZE] - p[0];
    }
    else if(n[1] === PERCENT) {
      return n[0] * 0.01 * container / root.computedStyle[FONT_SIZE] - p[0];
    }
    else if(n[1] === VW) {
      return n[0] * root.width * 0.01 / root.computedStyle[FONT_SIZE] - p[0];
    }
    else if(n[1] === VH) {
      return n[0] * root.height * 0.01 / root.computedStyle[FONT_SIZE] - p[0];
    }
    else if(n[1] === VMAX) {
      return n[0] * Math.max(root.width, root.height) * 0.01 / root.computedStyle[FONT_SIZE] - p[0];
    }
    else if(n[1] === VMIN) {
      return n[0] * Math.min(root.width, root.height) * 0.01 / root.computedStyle[FONT_SIZE] - p[0];
    }
  }
  else if(p[1] === VW) {
    if(n[1] === PX) {
      return n[0] * 100 / root.width - p[0];
    }
    else if(n[1] === REM) {
      return n[0] * 100 * root.computedStyle[FONT_SIZE] / root.width - p[0];
    }
    else if(n[1] === PERCENT) {
      return n[0] * container / root.width - p[0];
    }
    else if(n[1] === VH) {
      return n[0] * root.height / root.width - p[0];
    }
    else if(n[1] === VMAX) {
      return n[0] * Math.max(root.width, root.height) / root.width - p[0];
    }
    else if(n[1] === VMIN) {
      return n[0] * Math.min(root.width, root.height) / root.width - p[0];
    }
  }
  else if(p[1] === VH) {
    if(n[1] === PX) {
      return n[0] * 100 / root.height - p[0];
    }
    else if(n[1] === REM) {
      return n[0] * 100 * root.computedStyle[FONT_SIZE] / root.height - p[0];
    }
    else if(n[1] === VW) {
      return n[0] * root.width / root.height - p[0];
    }
    else if(n[1] === PERCENT) {
      return n[0] * container / root.height - p[0];
    }
    else if(n[1] === VMAX) {
      return n[0] * Math.max(root.width, root.height) / root.height - p[0];
    }
    else if(n[1] === VMIN) {
      return n[0] * Math.min(root.width, root.height) / root.height - p[0];
    }
  }
  else if(p[1] === VMAX) {
    if(n[1] === PX) {
      return n[0] * 100 / Math.max(root.width, root.height) - p[0];
    }
    else if(n[1] === REM) {
      return n[0] * 100 * root.computedStyle[FONT_SIZE] / Math.max(root.width, root.height) - p[0];
    }
    else if(n[1] === PERCENT) {
      return n[0] * container / Math.max(root.width, root.height) - p[0];
    }
    else if(n[1] === VW) {
      return n[0] * root.width / Math.max(root.width, root.height) - p[0];
    }
    else if(n[1] === VH) {
      return n[0] * root.height / Math.max(root.width, root.height) - p[0];
    }
    else if(n[1] === VMIN) {
      return n[0] * Math.min(root.width, root.height) / Math.max(root.width, root.height) - p[0];
    }
  }
  else if(p[1] === VMIN) {
    if(n[1] === PX) {
      return n[0] * 100 / Math.min(root.width, root.height) - p[0];
    }
    else if(n[1] === REM) {
      return n[0] * 100 * root.computedStyle[FONT_SIZE] / Math.min(root.width, root.height) - p[0];
    }
    else if(n[1] === PERCENT) {
      return n[0] * container / Math.min(root.width, root.height) - p[0];
    }
    else if(n[1] === VW) {
      return n[0] * root.width / Math.min(root.width, root.height) - p[0];
    }
    else if(n[1] === VH) {
      return n[0] * root.height / Math.min(root.width, root.height) - p[0];
    }
    else if(n[1] === VMAX) {
      return n[0] * Math.max(root.width, root.height) / Math.min(root.width, root.height) - p[0];
    }
  }
}

/**
 * 计算两帧之间的差，单位不同的以后面为准，返回的v表示差值
 * 没有变化返回空
 * auto等无法比较的不参与计算，不返回来标识无过度效果
 * @param prev 上一帧样式
 * @param next 下一帧样式
 * @param k 比较的样式名
 * @param target dom对象
 * @param tagName dom名
 * @returns {{k: *, v: *}}
 */
function calDiff(prev, next, k, target, tagName) {
  let res = [k];
  let p = prev[k];
  let n = next[k];
  if(k === TRANSFORM) {
    // transform因默认值null很特殊，不存在时需给默认矩阵
    if(!p && !n) {
      return;
    }
    let pm, nm;
    if(p) {
      pm = p[0][1];
    }
    else {
      pm = mx.identity();
    }
    if(n) {
      nm = n[0][1];
    }
    else {
      nm = mx.identity();
    }
    // transform特殊被初始化转成matrix矩阵，直接计算差值
    if(equalArr(pm, nm)) {
      return;
    }
    res[1] = [
      nm[0] - pm[0],
      nm[1] - pm[1],
      nm[2] - pm[2],
      nm[3] - pm[3],
      nm[4] - pm[4],
      nm[5] - pm[5],
      nm[6] - pm[6],
      nm[7] - pm[7],
      nm[8] - pm[8],
      nm[9] - pm[9],
      nm[10] - pm[10],
      nm[11] - pm[11],
      nm[12] - pm[12],
      nm[13] - pm[13],
      nm[14] - pm[14],
      nm[15] - pm[15],
    ];
    return res;
  }
  else if(k === ROTATE_3D) {
    if(equalArr(p, n)) {
      return;
    }
    res[1] = [n[0] - n[0], n[1] - p[1], n[2] - p[2], [n[3][0] - p[3][0], n[3][1]]];
  }
  else if(k === FILTER) {
    // filter很特殊，里面有多个滤镜，忽视顺序按hash计算，为空视为默认值，如blur默认0，brightness默认1
    let pHash = {}, nHash = {}, keyHash = {};
    if(p) {
      p.forEach(item => {
        keyHash[item[0]] = true;
        pHash[item[0]] = item[1];
      });
    }
    if(n) {
      n.forEach(item => {
        keyHash[item[0]] = true;
        nHash[item[0]] = item[1];
      })
    }
    let v = {}, hasChange;
    // 只有blur支持px/rem/vw/vh/vmax/vmin，其余都是特殊固定单位
    Object.keys(keyHash).forEach(k => {
      if(k === 'blur') {
        if(!pHash[k]) {
          v[k] = nHash[k].slice(0);
          hasChange = true;
        }
        else if(!nHash[k]) {
          v[k] = [-pHash[k][0], pHash[k][1]];
          hasChange = true;
        }
        else {
          let v2 = calByUnit(pHash[k], nHash[k], 0, target.root);
          v[k] = [v2, pHash[k][1]];
          hasChange = true;
        }
      }
      else if(k === 'hue-rotate') {
        let nv = isNil(nHash[k]) ? 0 : nHash[k][0];
        let pv = isNil(pHash[k]) ? 0 : pHash[k][0];
        if(pv !== nv) {
          v[k] = [nv - pv, PERCENT];
          hasChange = true;
        }
      }
      else if(k === 'saturate' || k === 'brightness' || k === 'contrast' || k === 'sepia') {
        let nv = isNil(nHash[k]) ? 100 : nHash[k][0];
        let pv = isNil(pHash[k]) ? 100 : pHash[k][0];
        if(pv !== nv) {
          v[k] = [nv - pv, PERCENT];
          hasChange = true;
        }
      }
      else if(k === 'grayscale') {
        let nv = isNil(nHash[k]) ? 0 : nHash[k][0];
        let pv = isNil(pHash[k]) ? 0 : pHash[k][0];
        if(pv !== nv) {
          v[k] = [nv - pv, PERCENT];
          hasChange = true;
        }
      }
    });
    if(!hasChange) {
      return;
    }
    res[1] = v;
  }
  else if(k === TRANSFORM_ORIGIN || k === PERSPECTIVE_ORIGIN) {
    res[1] = [];
    for(let i = 0; i < 2; i++) {
      let pi = p[i];
      let ni = n[i];
      if(pi[1] === ni[1]) {
        res[1].push(ni[0] - pi[0]);
      }
      else {
        let v = calByUnit(pi, ni, target[i ? 'outerHeight' : 'outerWidth'], target.root);
        res[1].push(v || 0);
      }
    }
    if(equalArr(res[1], [0, 0])) {
      return;
    }
  }
  else if(k === BACKGROUND_POSITION_X || k === BACKGROUND_POSITION_Y) {
    res[1] = [];
    let length = Math.min(p.length, n.length);
    for(let i = 0; i < length; i++) {
      let pi = p[i], ni = n[i];
      if(!pi || !ni) {
        res[1].push(null);
        continue;
      }
      if(pi[1] === ni[1]) {
        let v = ni[0] - pi[0];
        if(!v) {
          res[1].push(null);
          return;
        }
        res[1].push(v);
      }
      else {
        let k2 = k === BACKGROUND_POSITION_X ? 'offsetWidth' : 'offsetHeight';
        if(['padding-box', 'paddingBox'].indexOf(target.computedStyle[BACKGROUND_CLIP]) > -1) {
          k2 = k === BACKGROUND_POSITION_X ? 'clientWidth' : 'clientHeight';
        }
        else if(['content-box', 'contentBox'].indexOf(target.computedStyle[BACKGROUND_CLIP]) > -1) {
          k2 = k === BACKGROUND_POSITION_X ? 'width' : 'height';
        }
        let v = calByUnit(pi, ni, target[k2], target.root);
        if(!v) {
          res[1].push(null);
          return;
        }
        res[1].push(v);
      }
    }
  }
  else if(k === BOX_SHADOW) {
    res[1] = [];
    for(let i = 0, len = Math.min(p.length, n.length); i < len; i++) {
      let a = p[i];
      let b = n[i];
      let v = [];
      // x/y/blur/spread
      for(let j = 0; j < 4; j++) {
        v.push(b[j] - a[j]);
      }
      // rgba
      let c = [];
      for(let j = 0; j < 4; j++) {
        c.push(b[4][j] - a[4][j]);
      }
      v.push(c);
      res[1].push(v);
    }
  }
  else if(EXPAND_HASH.hasOwnProperty(k)) {
    if(p[1] === n[1]) {
      let v = n[0] - p[0];
      if(v === 0) {
        return;
      }
      res[1] = v;
    }
    else {
      let v = calByUnit(p, n, target[k === TRANSLATE_X || k === TRANSLATE_Z ? 'outerWidth' : 'outerHeight'], target.root);
      if(!v) {
        return;
      }
      res[1] = v;
    }
  }
  else if(k === BACKGROUND_SIZE) {
    res[1] = [];
    let length = Math.min(p.length, n.length);
    let has;
    for(let i = 0; i < length; i++) {
      let pi = p[i], ni = n[i];
      if(!pi || !ni) {
        res[1].push(null);
        continue;
      }
      let temp = [];
      for(let j = 0; j < 2; j++) {
        let pp = pi[j], nn = ni[j];
        if(pp[1] === nn[1]) {
          temp.push(nn[0] - pp[0]);
        }
        else {
          let k2 = i ? 'offsetWidth' : 'offsetHeight';
          if(['padding-box', 'paddingBox'].indexOf(target.computedStyle[BACKGROUND_CLIP]) > -1) {
            k2 = i ? 'clientWidth' : 'clientHeight';
          }
          else if(['content-box', 'contentBox'].indexOf(target.computedStyle[BACKGROUND_CLIP]) > -1) {
            k2 = i ? 'width' : 'height';
          }
          let v = calByUnit(pp, nn, target[k2], target.root);
          temp.push(v || 0);
        }
      }
      if(equalArr(temp, [0, 0])) {
        res[1].push(null);
      }
      else {
        res[1].push(temp);
        has = true;
      }
    }
    if(!has) {
      return;
    }
  }
  else if(GRADIENT_HASH.hasOwnProperty(k)) {
    // backgroundImage发生了渐变色和图片的变化，fill发生渐变色和纯色的变化等
    res[1] = [];
    let length = Math.min(p.length, n.length);
    for(let i = 0; i < length; i++) {
      let pi = p[i], ni = n[i];
      if(!pi || !ni || isString(pi) || isString(ni)) {
        res[1].push(null);
        continue;
      }
      if(pi.k !== ni.k) {
        res[1].push(null);
        continue;
      }
      let temp = [];
      // 渐变
      if(pi.k === 'linear' || pi.k === 'radial' || pi.k === 'conic') {
        let pv = pi.v;
        let nv = ni.v;
        temp[0] = [];
        let { clientWidth } = target;
        let eq = equalArr(pv, nv);
        for(let i = 0, len = Math.min(pv.length, nv.length); i < len; i++) {
          let a = pv[i];
          let b = nv[i];
          let t = [];
          t.push([
            b[0][0] - a[0][0],
            b[0][1] - a[0][1],
            b[0][2] - a[0][2],
            b[0][3] - a[0][3],
          ]);
          if(a[1] && b[1]) {
            if(a[1][1] === b[1][1]) {
              t.push(b[1][0] - a[1][0]);
            }
            else {
              let v = calByUnit(a[1], b[1], clientWidth, target.root);
              t.push(v || 0);
            }
          }
          temp[0].push(t);
        }
        // 线性渐变有角度差值变化
        if(pi.k === 'linear') {
          let isArrP = Array.isArray(pi.d);
          let isArrN = Array.isArray(ni.d);
          if(isArrN !== isArrP) {
            res[1].push(null);
            continue;
          }
          if(isArrP) {
            let v = [ni.d[0] - pi.d[0], ni.d[1] - pi.d[1], ni.d[2] - pi.d[2], ni.d[3] - pi.d[3]];
            if(eq && equalArr(v, [0, 0, 0, 0])) {
              res[1].push(null);
              continue;
            }
            temp[1] = v;
          }
          else {
            let v = ni.d - pi.d;
            if(eq && v === 0) {
              res[1].push(null);
              continue;
            }
            temp[1] = v;
          }
        }
        // 径向渐变的位置
        else if(pi.k === 'radial') {
          let isArrP = Array.isArray(pi.z);
          let isArrN = Array.isArray(ni.z);
          if(isArrN !== isArrP) {
            res[1].push(null);
            continue;
          }
          if(isArrP) {
            temp[2] = [];
            for(let i = 0; i < 5; i++) {
              let pz = pi.z[i];
              // 半径比例省略为1
              if(pz === undefined) {
                pz = 1;
              }
              let nz = ni.z[i];
              if(nz === undefined) {
                nz = 1;
              }
              temp[2].push(nz - pz);
            }
            if(eq && equalArr(res[4], [0, 0, 0, 0, 0])) {
              res[1].push(null);
            }
          }
          else {
            temp[2] = [];
            for(let i = 0; i < 2; i++) {
              let pp = pi.p[i];
              let np = ni.p[i];
              if(pp[1] === np[1]) {
                temp[2].push(np[0] - pp[0]);
              }
              else {
                let v = calByUnit(pp, np, target[i ? 'clientWidth' : 'clientHeight'], target.root);
                temp[2].push(v || 0);
              }
            }
            if(eq && equalArr(res[3], [0, 0])) {
              res[1].push(null);
            }
          }
        }
        else if(pi.k === 'conic') {
          temp[1].push(n.d - p.d);
          temp[2] = [];
          for(let i = 0; i < 2; i++) {
            let pp = p.p[i];
            let np = n.p[i];
            if(pp[1] === np[1]) {
              temp[2].push(np[0] - pp[0]);
            }
            else {
              let v = calByUnit(pp, np, target[i ? 'clientWidth' : 'clientHeight'], target.root);
              temp[2].push(v || 0);
            }
          }
          if(eq && res[2] !== 0 && equalArr(res[3], [0, 0])) {
            res[1].push(null);
          }
        }
      }
      // 纯色
      else {
        if(equalArr(n, pi)) {
          res[1].push(null);
        }
        temp[0] = [
          ni[0] - pi[0],
          ni[1] - pi[1],
          ni[2] - pi[2],
          ni[3] - pi[3]
        ];
      }
      res[1].push(temp);
    }
  }
  else if(COLOR_HASH.hasOwnProperty(k)) {
    n = n[0];
    p = p[0];
    if(equalArr(n, p) || n[3] === 0 && p[3] === 0) {
      return;
    }
    res[1] = [
      n[0] - p[0],
      n[1] - p[1],
      n[2] - p[2],
      n[3] - p[3]
    ];
  }
  else if(RADIUS_HASH.hasOwnProperty(k)) {
    // x/y都相等无需
    if(n[0][0] === p[0][0] && n[0][1] === p[0][1]
      && n[1][0] === p[1][0] && n[1][1] === p[1][1]) {
      return;
    }
    res[1] = [];
    for(let i = 0; i < 2; i++) {
      if(n[i][1] === p[i][1]) {
        res[1].push(n[i][0] - p[i][0]);
      }
      else {
        let v = calByUnit(p[i], n[i], target[i ? 'outerHeight' : 'outerWidth'], target.root);
        res[1].push(v || 0);
      }
    }
  }
  else if(LENGTH_HASH.hasOwnProperty(k)) {
    // auto不做动画
    if(p[1] === AUTO || n[1] === AUTO) {
      return;
    }
    let computedStyle = target.computedStyle;
    let parentComputedStyle = (target.domParent || target).computedStyle;
    let diff = 0;
    if(p[1] === n[1]) {
      diff = n[0] - p[0];
    }
    // lineHeight奇怪的单位变化，%相对于fontSize
    else if(k === LINE_HEIGHT) {
      diff = calByUnit(p, n, computedStyle[FONT_SIZE], target.root);
    }
    // fontSize的%相对于parent的
    else if(k === FONT_SIZE) {
      diff = calByUnit(p, n, parentComputedStyle[FONT_SIZE], target.root);
    }
    // 相对于父height的特殊属性
    else if(k === FLEX_BASIS
      && ['column', 'column-reverse', 'columnReverse'].indexOf(computedStyle[FLEX_DIRECTION]) > -1
      || [HEIGHT, TOP, BOTTOM].indexOf(k) > -1) {
      if(p[1] !== AUTO && n[1] !== AUTO) {
        diff = calByUnit(p, n, parentComputedStyle[HEIGHT], target.root);
      }
    }
    // 其余都是相对于父width的
    else {
      if(p[1] !== AUTO && n[1] !== AUTO) {
        diff = calByUnit(p, n, parentComputedStyle[WIDTH], target.root);
      }
    }
    // 兜底NaN非法
    if(diff === 0 || isNaN(diff)) {
      return;
    }
    res[1] = diff;
  }
  else if(GEOM.hasOwnProperty(k)) {
    if(isNil(p)) {
      return;
    }
    else if(GEOM[k][tagName] && isFunction(GEOM[k][tagName].calDiff)) {
      let fn = GEOM[k][tagName].calDiff;
      if(target.isMulti) {
        let arr = [];
        for(let i = 0, len = Math.min(p.length, n.length); i < len; i++) {
          arr.push(fn(p[i], n[i]));
        }
        return arr;
      }
      else {
        res[1] = fn(p, n);
      }
    }
    // 特殊处理multi
    else if(target.isMulti) {
      if(k === 'points' || k === 'controls') {
        if(isNil(n) || !n.length || isNil(p) || !p.length || equalArr(p, n)) {
          return;
        }
        res[1] = [];
        for(let i = 0, len = Math.min(p.length, n.length); i < len; i++) {
          let pv = p[i];
          let nv = n[i];
          if(isNil(pv) || !pv.length || isNil(nv) || !nv.length) {
            res[1].push(null);
          }
          else {
            let v2 = [];
            for(let j = 0, len2 = Math.min(pv.length, nv.length); j < len2; j++) {
              let pv2 = pv[j];
              let nv2 = nv[j];
              if(isNil(pv2) || isNil(nv2)) {
                v2.push(null);
              }
              else {
                let v3 = [];
                for(let k = 0, len3 = Math.max(pv2.length, nv2.length); k < len3; k++) {
                  let pv3 = pv2[k];
                  let nv3 = nv2[k];
                  // control由4点变2点
                  if(isNil(pv3) || isNil(nv3)) {
                    v3.push(0);
                  }
                  else {
                    v3.push(nv3 - pv3);
                  }
                }
                v2.push(v3);
              }
            }
            res[1].push(v2);
          }
        }
      }
      else if(k === 'controlA' || k === 'controlB') {
        if(isNil(n) || !n.length || isNil(p) || !p.length || equalArr(p, n)) {
          return;
        }
        res[1] = [];
        for(let i = 0, len = Math.min(p.length, n.length); i < len; i++) {
          let pv = p[i];
          let nv = n[i];
          if(isNil(pv) || !pv.length || isNil(nv) || !nv.length) {
            res[1].push(null);
          }
          else {
            res[1].push([
              nv[0] - pv[0],
              nv[1] - pv[1],
            ]);
          }
        }
      }
      else {
        if(n === p || equalArr(n, p) || k === 'edge' || k === 'closure' || k === 'booleanOperations') {
          return;
        }
        let v = [];
        for(let i = 0, len = Math.min(p.length, n.length); i < len; i++) {
          let pv = p[i];
          let nv = n[i];
          if(isNil(pv) || isNil(nv)) {
            v.push(0);
          }
          v.push(nv - pv);
        }
        res[1] = v;
      }
    }
    // 非multi特殊处理这几类数组类型数据
    else if(k === 'points' || k === 'controls') {
      if(isNil(n) || !n.length || isNil(p) || !p.length || equalArr(p, n)) {
        return;
      }
      res[1] = [];
      for(let i = 0, len = Math.min(p.length, n.length); i < len; i++) {
        let pv = p[i];
        let nv = n[i];
        if(isNil(pv) || !pv.length || isNil(nv) || !nv.length) {
          res[1].push(null);
        }
        else {
          let v2 = [];
          for(let j = 0, len2 = Math.max(pv.length, nv.length); j < len2; j++) {
            let pv2 = pv[j];
            let nv2 = nv[j];
            // control由4点变2点
            if(isNil(pv2) || isNil(nv2)) {
              v2.push(0);
            }
            else {
              v2.push(nv2 - pv2);
            }
          }
          res[1].push(v2);
        }
      }
    }
    else if(k === 'controlA' || k === 'controlB') {
      if(isNil(n) || !n.length || isNil(p) || !p.length || equalArr(p, n)) {
        return;
      }
      res[1] = [
        n[0] - p[0],
        n[1] - p[1],
      ];
    }
    // 其它简单数据，除了edge/closure/booleanOperations没有增量
    else {
      if(n === p || k === 'edge' || k === 'closure' || k === 'booleanOperations') {
        return;
      }
      else {
        res[1] = n - p;
      }
    }
  }
  else if(k === OPACITY || k === Z_INDEX) {
    if(n === p) {
      return;
    }
    res[1] = n - p;
  }
  // 特殊的path，不存在style中但在动画某帧中，不会统一化所以可能反向计算frameR时后一帧没有
  else if(k === TRANSLATE_PATH && p) {
    let k1 = 'offsetWidth', k2 = 'offsetHeight';
    if(['padding-box', 'paddingBox'].indexOf(target.computedStyle[BACKGROUND_CLIP]) > -1) {
      k1 = 'clientWidth';
      k2 = 'clientHeight';
    }
    else if(['content-box', 'contentBox'].indexOf(target.computedStyle[BACKGROUND_CLIP]) > -1) {
      k1 = 'width';
      k2 = 'height';
    }
    res[1] = p.map((item, i) => {
      let [v, u] = item;
      if(u === PERCENT) {
        if(i % 2 === 0) {
          return [(parseFloat(v) || 0) * 0.01 * target[k1], PX];
        }
        else {
          return [(parseFloat(v) || 0) * 0.01 * target[k2], PX];
        }
      }
      else if(u === REM) {
        return [(parseFloat(v) || 0) * root.computedStyle[FONT_SIZE] * 100, PX];
      }
      else if(u === VW) {
        return [(parseFloat(v) || 0) * 0.01 * root.width, PX];
      }
      else if(u === VH) {
        return [(parseFloat(v) || 0) * 0.01 * root.height, PX];
      }
      else if(u === VMAX) {
        return [(parseFloat(v) || 0) * 0.01 * Math.max(root.width, root.height), PX];
      }
      else if(u === VMIN) {
        return [(parseFloat(v) || 0) * 0.01 * Math.min(root.width, root.height), PX];
      }
      else {
        return [parseFloat(v) || 0, PX];
      }
    });
  }
  // display等不能有增量过程的
  else {
    return;
  }
  return res;
}

// 计算两帧之间不相同的变化，存入transition，相同的忽略
function calFrame(prev, next, keys, target, tagName) {
  keys.forEach(k => {
    let ts = calDiff(prev[FRAME_STYLE], next[FRAME_STYLE], k, target, tagName);
    // 可以形成过渡的才会产生结果返回
    if(ts) {
      prev[FRAME_TRANSITION].push(ts);
    }
  });
  return next;
}

function binarySearch(i, j, time, frames) {
  if(i === j) {
    let frame = frames[i];
    if(frame[FRAME_TIME] > time) {
      return i - 1;
    }
    return i;
  }
  else {
    let middle = i + ((j - i) >> 1);
    let frame = frames[middle];
    if(frame[FRAME_TIME] === time) {
      return middle;
    }
    else if(frame[FRAME_TIME] > time) {
      return binarySearch(i, Math.max(middle - 1, i), time, frames);
    }
    else {
      return binarySearch(Math.min(middle + 1, j), j, time, frames);
    }
  }
}

function getEasing(ea) {
  let timingFunction;
  if(ea) {
    if((timingFunction = /^\s*steps\s*\(\s*(\d+)(?:\s*,\s*(\w+))?\s*\)/i.exec(ea))) {
      let steps = parseInt(timingFunction[1]);
      let stepsD = timingFunction[2];
      timingFunction = function(percent) {
        // steps有效定义正整数
        if(steps && steps > 0) {
          let per = 1 / steps;
          let n = stepsD === 'start' ? Math.ceil(percent / per) : Math.floor(percent / per);
          return n / steps;
        }
        return percent;
      };
    }
    else {
      timingFunction = easing.getEasing(ea);
    }
  }
  return timingFunction;
}

/**
 * 根据百分比和缓动函数计算中间态样式
 * 当easing定义为steps时，优先计算
 * @param frame 当前帧
 * @param keys 所有样式key
 * @param percent 到下一帧时间的百分比
 * @param target vd
 * @returns {*}
 */
function calIntermediateStyle(frame, keys, percent, target) {
  let style = cloneStyle(frame[FRAME_STYLE], keys);
  let timingFunction = getEasing(frame[FRAME_EASING]);
  if(timingFunction && timingFunction !== linear) {
    percent = timingFunction(percent);
  }
  let transition = frame[FRAME_TRANSITION];
  for(let i = 0, len = transition.length; i < len; i++) {
    let [k, v] = transition[i];
    let st = style[k];
    // transform特殊处理，只有1个matrix，有可能不存在，需给默认矩阵
    if(k === TRANSFORM) {
      if(!st) {
        st = style[k] = [[MATRIX, mx.identity()]];
      }
      for(let i = 0; i < 16; i++) {
        st[0][1][i] += v[i] * percent;
      }
    }
    // 特殊的曲线运动计算，转换为translateXY，出现在最后一定会覆盖原本的translate防重
    else if(k === TRANSLATE_PATH) {
      let t = 1 - percent;
      if(v.length === 8) {
        style[TRANSLATE_X] = [
          v[0][0] * t * t * t
          + 3 * v[2][0] * percent * t * t
          + 3 * v[4][0] * percent * percent * t
          + v[6][0] * percent * percent * percent,
          PX,
        ];
        style[TRANSLATE_Y] = [
          v[1][0] * t * t * t
          + 3 * v[3][0] * percent * t * t
          + 3 * v[5][0] * percent * percent * t
          + v[7][0] * percent * percent * percent,
          PX,
        ];
      }
      else if(v.length === 6) {
        style[TRANSLATE_X] = [
          v[0][0] * t * t
          + 2 * v[2][0] * percent * t
          + v[4][0] * percent * percent,
          PX,
        ];
        style[TRANSLATE_Y] = [
          v[1][0] * t * t
          + 3 * v[3][0] * percent * t
          + v[5][0] * percent * percent,
          PX,
        ];
      }
    }
    else if(k === ROTATE_3D) {
      st[0] += v[0] * percent;
      st[1] += v[1] * percent;
      st[2] += v[2] * percent;
      st[3][0] += v[3][0] * percent;
    }
    else if(NUM_CAL_HASH.hasOwnProperty(k)) {
      if(v) {
        st[0] += v * percent;
      }
    }
    else if(k === FILTER) {
      // 只有1个样式声明了filter另外一个为空，会造成无样式，需初始化数组并在下面计算出样式存入
      if(!st) {
        st = style[k] = [];
      }
      // 将已有的样式按key存入引用来操作
      let hash = {};
      st.forEach(item => {
        hash[item[0]] = item[1];
      });
      Object.keys(v).forEach(k => {
        if(hash.hasOwnProperty(k)) {
          hash[k][0] += v[k][0] * percent;
        }
        else {
          // 2个关键帧中有1个未声明，需新建样式存入
          if(k === 'blur' || k === 'hue-rotate' || k === 'grayscale') {
            let n = v[k].slice(0);
            n[0] *= percent;
            st.push([k, n]);
          }
          // 默认值是1而非0
          else if(k === 'saturate' || k === 'brightness' || k === 'contrast' || k === 'sepia') {
            let n = v[k].slice(0);
            n[0] = 100 + n[0] * percent;
            st.push([k, n]);
          }
        }
      });
    }
    else if(RADIUS_HASH.hasOwnProperty(k)) {
      for(let i = 0; i < 2; i++) {
        st[i][0] += v[i] * percent;
      }
    }
    else if(k === TRANSFORM_ORIGIN || k === PERSPECTIVE_ORIGIN) {
      if(v[0] !== 0) {
        st[0][0] += v[0] * percent;
      }
      if(v[1] !== 0) {
        st[1][0] += v[1] * percent;
      }
    }
    else if(k === BOX_SHADOW) {
      for(let i = 0, len = Math.min(st.length, v.length); i < len; i++) {
        // x/y/blur/spread
        for(let j = 0; j < 4; j++) {
          st[i][j] += v[i][j] * percent;
        }
        // rgba
        for(let j = 0; j < 4; j++) {
          st[i][4][j] += v[i][4][j] * percent;
        }
      }
    }
    else if(k === BACKGROUND_SIZE) {
      st.forEach((item, i) => {
        if(v[i]) {
          item[0][0] += v[i][0] * percent;
          item[1][0] += v[i][1] * percent;
        }
      });
    }
    else if(k === BACKGROUND_POSITION_X || k === BACKGROUND_POSITION_Y) {
      st.forEach((item, i) => {
        if(v[i]) {
          item[0] += v[i] * percent;
        }
      });
    }
    else if(GRADIENT_HASH.hasOwnProperty(k)) {
      st.forEach((st2, i) => {
        let v2 = v[i];
        if(!v2) {
          return;
        }
        let [c, d, p, z] = v2;
        if(GRADIENT_TYPE.hasOwnProperty(st2.k)) {
          for(let i = 0, len = Math.min(st2.v.length, c.length); i < len; i++) {
            let a = st2.v[i];
            let b = c[i];
            a[0][0] += b[0][0] * percent;
            a[0][1] += b[0][1] * percent;
            a[0][2] += b[0][2] * percent;
            a[0][3] += b[0][3] * percent;
            if(a[1] && b[1]) {
              a[1][0] += b[1] * percent;
            }
          }
          if(st2.k === 'linear' && st2.d !== undefined && d !== undefined) {
            if(Array.isArray(d)) {
              st2.d[0] += d[0] * percent;
              st2.d[1] += d[1] * percent;
              st2.d[2] += d[2] * percent;
              st2.d[3] += d[3] * percent;
            }
            else {
              st2.d += d * percent;
            }
          }
          if(st2.k === 'radial') {
            if(st2.z !== undefined && z !== undefined) {
              st2.z[0] += z[0] * percent;
              st2.z[1] += z[1] * percent;
              st2.z[2] += z[2] * percent;
              st2.z[3] += z[3] * percent;
              st2.z[4] += z[4] * percent;
            }
            else if(st2.p !== undefined && p !== undefined) {
              st2.p[0][0] += p[0] * percent;
              st2.p[1][0] += p[1] * percent;
            }
          }
          else if(st2.k === 'conic' && st2.d !== undefined && d !== undefined) {
            st2.d += d * percent;
            st2.p[0][0] += p[0] * percent;
            st2.p[1][0] += p[1] * percent;
          }
        }
        // fill纯色
        else {
          st2[0] += c[0] * percent;
          st2[1] += c[1] * percent;
          st2[2] += c[2] * percent;
          st2[3] += c[3] * percent;
        }
      });
    }
    // color可能超限[0,255]，但浏览器已经做了限制，无需关心
    else if(COLOR_HASH.hasOwnProperty(k)) {
      st = st[0];
      st[0] += v[0] * percent;
      st[1] += v[1] * percent;
      st[2] += v[2] * percent;
      st[3] += v[3] * percent;
    }
    else if(GEOM.hasOwnProperty(k)) {
      let st = style[k];
      let tagName = target.tagName;
      if(GEOM[k][tagName] && isFunction(GEOM[k][tagName].calIncrease)) {
        let fn = GEOM[k][tagName].calIncrease;
        if(target.isMulti) {
          style[k] = st.map((item, i) => {
            return fn(item, v[i], percent);
          });
        }
        else {
          style[k] = fn(st, v, percent);
        }
      }
      else if(target.isMulti) {
        if(k === 'points' || k === 'controls') {
          for(let i = 0, len = Math.min(st.length, v.length); i < len; i++) {
            let o = st[i];
            let n = v[i];
            if(!isNil(o) && !isNil(n)) {
              for(let j = 0, len2 = Math.min(o.length, n.length); j < len2; j++) {
                let o2 = o[j];
                let n2 = n[j];
                if(!isNil(o2) && !isNil(n2)) {
                  for(let k = 0, len3 = Math.min(o2.length, n2.length); k < len3; k++) {
                    if(!isNil(o2[k]) && !isNil(n2[k])) {
                      o2[k] += n2[k] * percent;
                    }
                  }
                }
              }
            }
          }
        }
        else if(k === 'controlA' || k === 'controlB') {
          v.forEach((item, i) => {
            let st2 = st[i];
            if(!isNil(item) && !isNil(st2)) {
              for(let i = 0, len = Math.min(st2.length, item.length); i < len; i++) {
                let o = st2[i];
                let n = item[i];
                if(!isNil(o) && !isNil(n)) {
                  st2[i] += n * percent;
                }
              }
            }
          });
        }
        else {
          v.forEach((item, i) => {
            if(!isNil(item) && !isNil(st[i])) {
              st[i] += item * percent;
            }
          });
        }
      }
      else {
        if(k === 'points' || k === 'controls') {
          for(let i = 0, len = Math.min(st.length, v.length); i < len; i++) {
            let o = st[i];
            let n = v[i];
            if(!isNil(o) && !isNil(n)) {
              for(let j = 0, len2 = Math.min(o.length, n.length); j < len2; j++) {
                if(!isNil(o[j]) && !isNil(n[j])) {
                  o[j] += n[j] * percent;
                }
              }
            }
          }
        }
        else if(k === 'controlA' || k === 'controlB') {
          if(!isNil(st[0]) && !isNil(v[0])) {
            st[0] += v[0] * percent;
          }
          if(!isNil(st[1]) && !isNil(v[1])) {
            st[1] += v[1] * percent;
          }
        }
        else {
          if(!isNil(st) && !isNil(v)) {
            style[k] += v * percent;
          }
        }
      }
    }
    else if(k === OPACITY || k === Z_INDEX) {
      style[k] += v * percent;
      // 精度问题可能会超过[0,1]区间
      if(k === OPACITY) {
        if(style[k] < 0) {
          style[k] = 0;
        }
        else if(style[k] > 1) {
          style[k] = 1;
        }
      }
    }
  }
  return style;
}

function gotoOverload(options, cb) {
  if(isFunction(options)) {
    cb = options;
    options = {};
  }
  return [options || {}, cb];
}

function calDiffTime(__config, diff) {
  let playbackRate = __config[I_PLAYBACK_RATE];
  let spfLimit = __config[I_SPF_LIMIT];
  let fps = __config[I_FPS];
  let v = __config[I_CURRENT_TIME] = __config[I_NEXT_TIME];
  // 定帧限制每帧时间间隔最大为spf
  if(spfLimit) {
    if(spfLimit === true) {
      diff = Math.min(diff, 1000 / fps);
    }
    else if(spfLimit > 0) {
      diff = Math.min(diff, spfLimit);
    }
  }
  // 播放时间累加，并且考虑播放速度加成
  if(playbackRate !== 1 && playbackRate > 0) {
    diff *= playbackRate;
  }
  __config[I_NEXT_TIME] += diff;
  return [v, diff];
}

function frameCb(self, __config, diff, isDelay) {
  self.emit(Event.FRAME, diff, isDelay);
  if(__config[I_FIRST_PLAY]) {
    __config[I_FIRST_PLAY] = false;
    self.emit(Event.PLAY);
  }
  let cb = __config[I_PLAY_CB];
  if(isFunction(cb)) {
    cb.call(self, diff, isDelay);
    // 清理要检查，gotoAndStop()这种cb回调中直接再次调用goto的话cb会不一致不能删除
    if(__config[I_PLAY_CB] === cb) {
      __config[I_PLAY_CB] = null;
    }
  }
}

let uuid = 0;

class Animation extends Event {
  constructor(target, list, options) {
    super();
    this.__id = uuid++;
    list = clone(list || []);
    if(Array.isArray(list)) {
      list = list.filter(item => item && isObject(item));
    }
    // 动画过程另外一种形式，object描述k-v形式
    else if(list && isObject(list)) {
      let nl = [];
      Object.keys(list).forEach(k => {
        let v = list[k];
        if(Array.isArray(v)) {
          for(let i = 0, len = v.length; i < len; i++) {
            let o = nl[i] = nl[i] || {
              offset: i / (len - 1),
            };
            o[k] = v[i];
          }
        }
      });
      list = nl;
    }
    else {
      list = [];
    }
    if(isNumber(options)) {
      this.__options = {
        duration: options,
      };
      options = this.__options;
    }
    let op = this.__options = options || {
      duration: 0,
    };
    let root = target.root;
    let config = this.__config = [
      false, // assigning
      false, // inFps
      false, // isDelay
      false, // begin
      false, // end
      false, // finished
      false, // nextBegin
      true, // firstPlay
      null, // playCb
      target,
      root,
      null, // frames
      null, // framesR
      0, // currentTime
      0, // nextTime
      {}, // style
      0, // duration
      1, // iterations
      'none', // fill
      1, // playbackRate
      0, // playCount
      'idle',
      false, // destroy
      0, // startTime
      0, // fpsTime
      op.easing,
      false, // enterFrame
      0, // delay
      0, // endDelay
      null, // keys,
      null, // originStyle,
      null, // currentFrames
      null, // currentFrame
      false, // spfLimit
      60, // fps
      'normal', // direction
      true, // firstEnter,
      false, // stayBegin
      false, // stayEnd
      false, // is2
      0, // endTime
      target.__config, // nodeConfig
      root && root.__config, // rootConfig，destroy后root可能为空
      false, // outBeginDelay
    ];
    let iterations = this.iterations = op.iterations;
    let duration = this.duration = op.duration;
    let [frames, framesR, keys, originStyle] = this.__init(list, iterations, duration, op.easing, target);
    config[I_FRAMES] = frames;
    config[I_FRAMES_R] = framesR;
    config[I_KEYS] = keys;
    config[I_ORIGIN_STYLE] = originStyle;
    if(frames.length === 2) {
      config[I_IS2] = true;
      config[I_END_TIME] = frames[1][FRAME_TIME];
    }
    let fps = parseInt(op.fps) || 0;
    if(fps <= 0) {
      fps = 60;
    }
    this.fps = fps;
    this.spfLimit = op.spfLimit;
    this.delay = op.delay;
    this.endDelay = op.endDelay;
    this.playbackRate = op.playbackRate;
    this.fill = op.fill;
    this.iterations = op.iterations;
    this.direction = op.direction;
    config[I_CURRENT_FRAMES] = {
      reverse: true,
      'alternate-reverse': true,
    }.hasOwnProperty(op.direction) ? framesR : frames;
    // 时间戳
    config[I_TIME_STAMP] = frame.__now;
    // 性能优化访问
    this[0] = this.__before;
    this[1] = this.__after;
  }

  __init(list, iterations, duration, easing, target) {
    if(list.length < 1) {
      return [[], [], [], {}];
    }
    // 过滤时间非法的，过滤后续offset<=前面的
    let offset = -1;
    let tagName = target.tagName;
    for(let i = 0, len = list.length; i < len; i++) {
      let current = list[i];
      if(current.hasOwnProperty('offset')) {
        current.offset = parseFloat(current.offset) || 0;
        current.offset = Math.max(0, current.offset);
        current.offset = Math.min(1, current.offset);
        // 超过区间[0,1]
        if(isNaN(current.offset) || current.offset < 0 || current.offset > 1) {
          list.splice(i, 1);
          i--;
          len--;
          continue;
        }
        // <=前面的
        else if(current.offset <= offset) {
          list.splice(i, 1);
          i--;
          len--;
          continue;
        }
      }
      // 缩写处理
      Object.keys(current).forEach(k => {
        if(abbr.hasOwnProperty(k)) {
          abbr.toFull(current, k);
        }
      });
      // 检查key合法性
      Object.keys(current).forEach(k => {
        if(k !== 'easing' && k !== 'offset' && !change.isValid(tagName, k)) {
          delete current[k];
        }
      });
    }
    // 只有1帧复制出来变成2帧方便运行
    if(list.length === 1) {
      list[0] = clone(list[0]);
      if(list[0].offset === 1) {
        list.unshift({
          offset: 0,
        });
      }
      else {
        let copy = clone(list[0]);
        copy.offset = 1;
        list.push(copy);
      }
    }
    // 强制clone防止同引用
    else {
      list.forEach((item, i) => {
        list[i] = clone(item);
      });
    }
    // 首尾时间偏移强制为[0, 1]，不是的话前后加空帧
    let first = list[0];
    if(first.hasOwnProperty('offset') && first.offset > 0) {
      first = {
        offset: 0,
      };
      list.unshift(first);
    }
    else {
      first.offset = 0;
    }
    let last = list[list.length - 1];
    if(last.hasOwnProperty('offset') && last.offset < 1) {
      last = {
        offset: 1,
      };
      list.push(last);
    }
    else {
      last.offset = 1;
    }
    // 计算没有设置offset的时间
    for(let i = 1, len = list.length; i < len; i++) {
      let start = list[i];
      // 从i=1开始offset一定>0，找到下一个有offset的，均分中间无声明的
      if(!start.hasOwnProperty('offset')) {
        let end;
        let j = i + 1;
        for(; j < len; j++) {
          end = list[j];
          if(end.hasOwnProperty('offset')) {
            break;
          }
        }
        let num = j - i + 1;
        start = list[i - 1];
        let per = (end.offset - start.offset) / num;
        for(let k = i; k < j; k++) {
          let item = list[k];
          item.offset = start.offset + per * (k + 1 - i);
        }
        i = j;
      }
    }
    let frames = [];
    // 换算每一关键帧样式标准化
    list.forEach(item => {
      frames.push(framing(item, duration, easing));
    });
    // 为方便两帧之间计算变化，强制统一所有帧的css属性相同，没有写的为节点的当前样式currentStyle
    let keys = unify(frames, target);
    inherit(frames, keys, target);
    let framesR = clone(frames).reverse();
    // 存储原本样式以便恢复用
    let { style, props } = target;
    let originStyle = {};
    keys.forEach(k => {
      if(isGeom(tagName, k)) {
        originStyle[k] = props[k];
      }
      originStyle[k] = style[k];
    });
    // 再计算两帧之间的变化，存入transition属性
    let length = frames.length;
    let prev = frames[0];
    for(let i = 1; i < length; i++) {
      let next = frames[i];
      prev = calFrame(prev, next, keys, target, tagName);
    }
    // 反向存储帧的倒排结果
    framesR.forEach(item => {
      item[FRAME_TIME] = duration - item[FRAME_TIME];
      item[FRAME_TRANSITION] = [];
    });
    prev = framesR[0];
    for(let i = 1; i < length; i++) {
      let next = framesR[i];
      prev = calFrame(prev, next, keys, target, tagName);
    }
    return [frames, framesR, keys, originStyle];
  }

  __clean(isFinish) {
    let __config = this.__config;
    this.__cancelTask();
    __config[I_NEXT_TIME] = 0;
    let restore;
    let style = __config[I_STYLE];
    let keys = __config[I_KEYS];
    let target = __config[I_TARGET];
    if(isFinish) {
      // gotoAndStop到一个很大的时间的话，也需要防止超过
      __config[I_CURRENT_TIME] = __config[I_DELAY] + __config[I_DURATION] * __config[I_ITERATIONS] + __config[I_END_DELAY];
      if(__config[I_PLAY_STATE] === 'finish') {
        return;
      }
      __config[I_PLAY_STATE] = 'finish';
      // cancel需要清除finish根据情况保留
      if(!__config[I_STAY_END]) {
        __config[I_STYLE] = {};
        restore = true;
      }
    }
    else {
      __config[I_PLAY_COUNT] = __config[I_CURRENT_TIME] = 0;
      if(__config[I_PLAY_STATE] === 'idle') {
        return;
      }
      __config[I_PLAY_STATE] = 'idle';
      __config[I_STYLE] = {};
      restore = true;
    }
    // 动画取消结束不停留在最后一帧需要还原target原本的样式，需要对比目前是否是由本动画赋值的
    if(restore) {
      keys.forEach(k => {
        if(GEOM.hasOwnProperty(k)) {
          if(target.__currentProps[k] === style[k]) {
            target.__currentProps[k] = target.props[k];
          }
        }
        else {
          if(target.__currentStyle[k] === style[k]) {
            target.__currentStyle[k] = target.style[k];
          }
        }
      });
    }
  }

  play(cb) {
    let __config = this.__config;
    let isDestroyed = __config[I_DESTROYED];
    let duration = __config[I_DURATION];
    let playState = __config[I_PLAY_STATE];
    let frames = __config[I_FRAMES];
    if(isDestroyed || duration <= 0 || frames.length < 1) {
      return this;
    }
    if(playState === 'running') {
      return this;
    }
    this.__cancelTask();
    __config[I_PLAY_CB] = cb;
    __config[I_PLAY_STATE] = 'running';
    // 每次play调用标识第一次运行，需响应play事件和回调
    __config[I_FIRST_PLAY] = true;
    // 防止finish/cancel事件重复触发，每次播放重置
    this.__hasFin = false;
    this.__hasCancel = false;
    // 只有第一次调用会进初始化，另外finish/cancel视为销毁也会重新初始化
    if(!__config[I_ENTER_FRAME]) {
      __config[I_ENTER_FRAME] = true;
      let framesR = __config[I_FRAMES_R];
      let direction = __config[I_DIRECTION];
      // 初始化根据方向确定帧序列
      __config[I_CURRENT_FRAMES] = {
        reverse: true,
        'alternate-reverse': true,
      }.hasOwnProperty(direction) ? framesR : frames;
      __config[I_CURRENT_TIME] = __config[I_NEXT_TIME] = __config[I_FPS_TIME] = 0;
    }
    // 添加每帧回调且立刻执行，本次执行调用refreshTask也是下一帧再渲染，frame的每帧都是下一帧
    // frame.offFrame(this);
    frame.onFrame(this);
    __config[I_START_TIME] = frame.__now;
    __config[I_END] = false;
    return this;
  }

  __before(diff) {
    let __config = this.__config;
    __config[I_TIME_STAMP] = frame.__now;
    let target = __config[I_TARGET];
    let fps = __config[I_FPS];
    let playCount = 0;
    let currentFrames = __config[I_CURRENT_FRAMES];
    let iterations = __config[I_ITERATIONS];
    let stayBegin = __config[I_STAY_BEGIN];
    let stayEnd = __config[I_STAY_END];
    let delay = __config[I_DELAY];
    let root = __config[I_ROOT];
    let is2 = __config[I_IS2];
    let endTime = __config[I_END_TIME];
    let duration = __config[I_DURATION];
    let endDelay = __config[I_END_DELAY];
    let length = currentFrames.length;
    // 用本帧和上帧时间差，计算累加运行时间currentTime，以便定位当前应该处于哪个时刻
    let [currentTime, d] = calDiffTime(__config, diff);
    diff = d;
    // 增加的fps功能，当<60时计算跳帧，每帧运行依旧累加时间，达到fps时重置，第一帧强制不跳
    if(!__config[I_FIRST_ENTER] && fps < 60) {
      diff = __config[I_FPS_TIME] += diff;
      if(diff < 1000 / fps) {
        __config[I_IN_FPS] = true;
        return;
      }
      __config[I_FPS_TIME] = 0;
    }
    __config[I_FIRST_ENTER] = false;
    // delay仅第一次生效等待
    if(currentTime < delay) {
      if(stayBegin) {
        let currentFrame = __config[I_CURRENT_FRAME] = currentFrames[0];
        let current = currentFrame[FRAME_STYLE];
        genBeforeRefresh(current, __config[I_KEYS], __config, root, target);
      }
      // 即便不刷新，依旧执行帧回调，同时标明让后续第一帧响应begin
      __config[I_OUT_BEGIN_DELAY] = true;
      __config[I_IS_DELAY] = true;
      return;
    }
    // 减去delay，计算在哪一帧
    currentTime -= delay;
    if(currentTime === 0 || __config[I_OUT_BEGIN_DELAY]) {
      __config[I_OUT_BEGIN_DELAY] = false;
      __config[I_BEGIN] = true;
    }
    // 超过duration非尾轮需处理回到开头，触发新一轮动画事件，这里可能时间间隔非常大直接跳过几轮
    let round;
    while(currentTime >= duration && playCount < iterations - 1) {
      currentTime -= duration;
      playCount++;
    }
    if(__config[I_PLAY_COUNT] < playCount) {
      __config[I_BEGIN] = true;
      round = true;
    }
    __config[I_PLAY_COUNT] = playCount;
    // 如果发生轮换，需重新确定正反向
    if(round) {
      let direction = __config[I_DIRECTION];
      let frames = __config[I_FRAMES];
      let framesR = __config[I_FRAMES_R];
      let isAlternate = {
        alternate: true,
        'alternate-reverse': true,
      }.hasOwnProperty(direction);
      // 有正反向播放需要重设帧序列
      if(isAlternate) {
        let isEven = playCount % 2 === 0;
        if(direction === 'alternate') {
          currentFrames = __config[I_CURRENT_FRAMES] = isEven ? frames : framesR;
        }
        else {
          currentFrames = __config[I_CURRENT_FRAMES] = isEven ? framesR : frames;
        }
      }
    }
    let isLastCount = playCount >= iterations - 1;
    // 只有2帧可优化，否则2分查找当前帧
    let i, frameTime;
    if(is2) {
      i = currentTime < endTime ? 0 : 1;
      frameTime = endTime;
    }
    else {
      i = binarySearch(0, length - 1, currentTime, currentFrames);
      frameTime = currentFrames[i][FRAME_TIME];
    }
    // 最后一帧结束动画，仅最后一轮才会进入，需处理endDelay
    let isLastFrame = isLastCount && i === length - 1;
    let percent = 0;
    if(isLastFrame) {
      // 无需任何处理
    }
    // 否则根据目前到下一帧的时间差，计算百分比，再反馈到变化数值上
    else if(is2) {
      percent = currentTime / duration;
    }
    else {
      let total = currentFrames[i + 1][FRAME_TIME] - frameTime;
      percent = (currentTime - frameTime) / total;
    }
    let inEndDelay, currentFrame = currentFrames[i], current;
    __config[I_CURRENT_FRAME] = currentFrame;
    /** 这里要考虑全几种场景：
     * 1. 单次播放无endDelay且fill不停留（有/无差异，下同）
     * 2. 单次播放无endDelay且fill停留
     * 3. 单次播放有endDelay且fill不停留
     * 4. 单次播放有endDelay且fill停留
     * 5. 多次播放无endDelay且fill不停留（尾次/非尾次，下同）
     * 6. 多次播放无endDelay且fill停留
     * 7. 多次播放有endDelay且fill不停留
     * 8. 多次播放有endDelay且fill停留
     */
    let needClean;
    if(isLastFrame) {
      inEndDelay = currentTime < duration + endDelay;
      // 停留对比最后一帧，endDelay可能会多次进入这里，第二次进入样式相等不再重绘
      if(stayEnd) {
        current = cloneStyle(currentFrame[FRAME_STYLE], __config[I_KEYS]);
      }
      // 不停留或超过endDelay则计算还原，有endDelay且fill模式不停留会再次进入这里
      else {
        current = cloneStyle(__config[I_ORIGIN_STYLE], __config[I_KEYS]);
      }
      // 进入endDelay或结束阶段触发end事件，注意只触发一次，防重在触发的地方做
      __config[I_NEXT_END] = true;
      if(!inEndDelay) {
        __config[I_PLAY_COUNT]++;
        __config[I_FINISHED] = true;
        frame.offFrame(this);
        needClean = true;
        __config[I_NEXT_TIME] = 0;
      }
    }
    else {
      current = calIntermediateStyle(currentFrame, __config[I_KEYS], percent, target);
    }
    // 无论两帧之间是否有变化，都生成计算结果赋给style，去重在root做
    genBeforeRefresh(current, __config[I_KEYS], __config, root, target);
    if(needClean) {
      let playCb = __config[I_PLAY_CB];
      this.__clean(true);
      // 丑陋的做法，防止gotoAndStop()这样的cb被clean()掉
      if(playCb) {
        __config[I_PLAY_CB] = playCb;
      }
    }
  }

  __after(diff) {
    let __config = this.__config;
    __config[I_ASSIGNING] = false;
    if(__config[I_IN_FPS]) {
      __config[I_IN_FPS] = false;
      return;
    }
    frameCb(this, __config, diff, __config[I_IS_DELAY]);
    __config[I_IS_DELAY] = false;
    if(__config[I_BEGIN]) {
      __config[I_BEGIN] = false;
      this.emit(Event.BEGIN, __config[I_PLAY_COUNT]);
    }
    // end事件只触发一次，末轮进入endDelay或直接结束时
    if(__config[I_NEXT_END] && !__config[I_END]) {
      __config[I_END] = true;
      this.emit(Event.END, __config[I_PLAY_COUNT] - 1);
    }
    if(__config[I_FINISHED]) {
      __config[I_BEGIN] = __config[I_END] = __config[I_IS_DELAY] = __config[I_FINISHED]
        = __config[I_IN_FPS] = __config[I_ENTER_FRAME] = false;
      __config[I_PLAY_STATE] = 'finished';
      this.emit(Event.FINISH);
    }
  }

  pause(silence) {
    let __config = this.__config;
    let isDestroyed = __config[I_DESTROYED];
    let duration = __config[I_DURATION];
    let { pending } = this;
    if(isDestroyed || duration <= 0 || pending) {
      return this;
    }
    __config[I_PLAY_STATE] = 'paused';
    this.__cancelTask();
    if(!silence) {
      this.emit(Event.PAUSE);
    }
    return this;
  }

  resume(cb) {
    let __config = this.__config;
    let isDestroyed = __config[I_DESTROYED];
    let duration = __config[I_DURATION];
    let playState = __config[I_PLAY_STATE];
    if(isDestroyed || duration <= 0 || playState !== 'paused') {
      return this;
    }
    return this.play(cb);
  }

  finish(cb) {
    let self = this;
    let __config = self.__config;
    let isDestroyed = __config[I_DESTROYED];
    let duration = __config[I_DURATION];
    let playState = __config[I_PLAY_STATE];
    let frames = __config[I_FRAMES];
    if(isDestroyed || duration <= 0 || frames.length < 1 || playState === 'finished' || playState === 'idle') {
      return self;
    }
    // 先清除所有回调任务，多次调用finish也会清除只留最后一次
    self.__cancelTask();
    let root = __config[I_ROOT];
    let originStyle = __config[I_ORIGIN_STYLE];
    if(root) {
      let current;
      // 停留在最后一帧
      if(__config[I_STAY_END]) {
        __config[I_CURRENT_FRAME] = frames[frames.length - 1];
        current = frames[frames.length - 1][FRAME_STYLE];
      }
      else {
        current = originStyle;
      }
      root.addRefreshTask({
        __before() {
          __config[I_ASSIGNING] = true;
          genBeforeRefresh(current, __config[I_KEYS], __config, root, __config[I_TARGET]);
          self.__clean(true);
        },
        __after(diff) {
          if(!self.__hasFin) {
            self.__hasFin = true;
            __config[I_ASSIGNING] = false;
            frameCb(self, __config, diff);
            __config[I_BEGIN] = __config[I_END] = __config[I_IS_DELAY] = __config[I_FINISHED]
              = __config[I_IN_FPS] = __config[I_ENTER_FRAME] = false;
            self.emit(Event.FINISH);
          }
          if(isFunction(cb)) {
            cb.call(self, diff);
          }
        },
      });
    }
    return self;
  }

  cancel(cb) {
    let self = this;
    let __config = self.__config;
    let isDestroyed = __config[I_DESTROYED];
    let duration = __config[I_DURATION];
    let playState = __config[I_PLAY_STATE];
    let frames = __config[I_FRAMES];
    if(isDestroyed || duration <= 0 || playState === 'idle' || frames.length < 1) {
      return self;
    }
    self.__cancelTask();
    let root = __config[I_ROOT];
    let originStyle = __config[I_ORIGIN_STYLE];
    if(root) {
      root.addRefreshTask({
        __before() {
          __config[I_ASSIGNING] = true;
          genBeforeRefresh(originStyle, __config[I_KEYS], __config, root, __config[I_TARGET]);
          self.__clean();
        },
        __after(diff) {
          if(!self.__hasCancel) {
            self.__hasCancel = true;
            __config[I_ASSIGNING] = false;
            frameCb(self, __config, diff);
            __config[I_BEGIN] = __config[I_END] = __config[I_IS_DELAY] = __config[I_FINISHED]
              = __config[I_IN_FPS] = __config[I_ENTER_FRAME] = false;
            self.emit(Event.CANCEL);
          }
          if(isFunction(cb)) {
            cb.call(self, diff);
          }
        },
      });
    }
    return self;
  }

  gotoAndPlay(v, options, cb) {
    let __config = this.__config;
    let isDestroyed = __config[I_DESTROYED];
    let duration = __config[I_DURATION];
    let frames = __config[I_FRAMES];
    let delay = __config[I_DELAY];
    let endDelay = __config[I_END_DELAY];
    if(isDestroyed || duration <= 0 || frames.length < 1) {
      return this;
    }
    [options, cb] = gotoOverload(options, cb);
    // 计算出时间点直接累加播放
    this.__goto(v, options.isFrame, options.excludeDelay);
    if(v > duration + delay + endDelay) {
      return this.finish(cb);
    }
    return this.play(cb);
  }

  gotoAndStop(v, options, cb) {
    let __config = this.__config;
    let isDestroyed = __config[I_DESTROYED];
    let duration = __config[I_DURATION];
    let frames = __config[I_FRAMES];
    let delay = __config[I_DELAY];
    let endDelay = __config[I_END_DELAY];
    if(isDestroyed || duration <= 0 || frames.length < 1) {
      return this;
    }
    [options, cb] = gotoOverload(options, cb);
    v = this.__goto(v, options.isFrame, options.excludeDelay);
    if(v > duration + delay + endDelay) {
      return this.finish(cb);
    }
    // 先play一帧，回调里模拟暂停
    return this.play(diff => {
      __config[I_PLAY_STATE] = 'paused';
      this.__cancelTask();
      if(isFunction(cb)) {
        cb.call(this, diff);
      }
    });
  }

  // 同步赋予，用在extendAnimate
  assignCurrentStyle() {
    let __config = this.__config;
    let style = __config[I_STYLE];
    let target = __config[I_TARGET];
    let keys = __config[I_KEYS];
    keys.forEach(i => {
      if(style.hasOwnProperty(i)) {
        let v = style[i];
        // geom的属性变化
        if(GEOM.hasOwnProperty(i)) {
          target.currentProps[i] = v;
        }
        // 样式
        else {
          // 将动画样式直接赋给currentStyle
          target.currentStyle[i] = v;
        }
      }
    });
  }

  // 返回不包含delay且去除多轮的时间
  __goto(v, isFrame, excludeDelay) {
    let __config = this.__config;
    let iterations = __config[I_ITERATIONS];
    let duration = __config[I_DURATION];
    __config[I_PLAY_STATE] = 'paused';
    // this.__cancelTask(); // 应该不需要，gotoAndXxx都会调用play()，里面有
    if(isNaN(v) || v < 0) {
      throw new Error('Param of gotoAnd(Play/Stop) is illegal: ' + v);
    }
    if(isFrame) {
      v = (v - 1) / this.spf;
    }
    if(excludeDelay) {
      v += __config[I_DELAY];
    }
    // 在时间范围内设置好时间，复用play直接跳到播放点
    __config[I_NEXT_TIME] = v;
    v -= __config[I_DELAY];
    // 超过时间长度需要累加次数，这里可以超过iterations，因为设定也许会非常大
    let playCount = 0;
    while(v >= duration && playCount < iterations - 1) {
      playCount++;
      v -= duration;
    }
    __config[I_PLAY_COUNT] = playCount;
    // 防止play()重置时间和当前帧组，提前计算好
    __config[I_ENTER_FRAME] = true;
    let frames = __config[I_FRAMES];
    let framesR = __config[I_FRAMES_R];
    let direction = __config[I_DIRECTION];
    if({
      alternate: true,
      'alternate-reverse': true,
    }.hasOwnProperty(direction)) {
      let isEven = playCount % 2 === 0;
      if(direction === 'alternate') {
        __config[I_CURRENT_FRAMES] = isEven ? frames : framesR;
      }
      else {
        __config[I_CURRENT_FRAMES] = isEven ? framesR : frames;
      }
    }
    return v;
  }

  addControl() {
    let ac = this.root.animateController;
    if(ac) {
      ac.add(this);
    }
  }

  removeControl() {
    let ac = this.root.animateController;
    if(ac) {
      ac.remove(this);
    }
  }

  __stayBegin() {
    return {
      backwards: true,
      both: true,
    }.hasOwnProperty(this.fill);
  }

  __stayEnd() {
    return {
      forwards: true,
      both: true,
    }.hasOwnProperty(this.fill);
  }

  __setTarget(target) {
    this.__target = target;
    this.__config[I_TARGET] = target;
    this.__config[I_NODE_CONFIG] = target.__config;
  }

  __cancelTask() {
    frame.offFrame(this);
    this.__config[I_PLAY_CB] = null;
  }

  __destroy(sync) {
    let self = this;
    let __config = self.__config;
    if(__config[I_DESTROYED]) {
      return;
    }
    self.removeControl();
    // clean异步执行，因为里面的样式还原需要等到下一帧，否则同步执行清除后，紧接着的新同步动画获取不到currentStyle
    if(sync) {
      self.__clean();
      __config[I_TARGET] = null;
    }
    else {
      frame.nextFrame({
        __before() {
          self.__clean();
          __config[I_TARGET] = null;
        },
      });
    }
    __config[I_START_TIME] = 0;
    __config[I_DESTROYED] = true;
  }

  __checkModify() {
    let __config = this.__config;
    if(__config[I_PLAY_STATE] !== 'idle' && __config[I_PLAY_STATE] !== 'finished') {
      inject.warn('Modification will not come into effect when animation is running');
    }
  }

  get id() {
    return this.__id;
  }

  get target() {
    return this.__config[I_TARGET];
  }

  get root() {
    return this.__config[I_ROOT];
  }

  get keys() {
    return this.__config[I_KEYS];
  }

  get style() {
    return this.__config[I_STYLE];
  }

  get options() {
    return this.__options;
  }

  get duration() {
    return this.__config[I_DURATION];
  }

  set duration(v) {
    v = Math.max(0, parseFloat(v) || 0);
    let __config = this.__config;
    if(__config[I_DURATION] !== v) {
      __config[I_DURATION] = v;
      __config[I_END_TIME] = v;
      this.__checkModify();
    }
    return v;
  }

  get delay() {
    return this.__config[I_DELAY];
  }

  set delay(v) {
    v = Math.max(0, parseFloat(v) || 0);
    let __config = this.__config;
    if(__config[I_DELAY] !== v) {
      __config[I_DELAY] = v;
      this.__checkModify();
    }
    return v;
  }

  get endDelay() {
    return this.__config[I_END_DELAY];
  }

  set endDelay(v) {
    v = Math.max(0, parseFloat(v) || 0);
    let __config = this.__config;
    if(__config[I_END_DELAY] !== v) {
      __config[I_END_DELAY] = v;
      this.__checkModify();
    }
    return v;
  }

  get fps() {
    return this.__config[I_FPS];
  }

  set fps(v) {
    v = parseInt(v) || 60;
    let __config = this.__config;
    if(__config[I_FPS] !== v) {
      if(v <= 0) {
        v = 60;
      }
      __config[I_FPS] = v;
    }
    return v;
  }

  get spf() {
    return 1 / this.fps;
  }

  get iterations() {
    return this.__config[I_ITERATIONS];
  }

  set iterations(v) {
    if(v === Infinity || util.isString(v) && v.toLowerCase() === 'infinity') {
      v = Infinity;
    }
    else {
      v = parseInt(v);
      if(isNaN(v) || v < 0) {
        v = 1;
      }
    }
    let __config = this.__config;
    if(__config[I_ITERATIONS] !== v) {
      __config[I_ITERATIONS] = v;
    }
    return v;
  }

  get fill() {
    return this.__config[I_FILL];
  }

  set fill(v) {
    v = v || 'none';
    let __config = this.__config;
    if(__config[I_FILL] !== v) {
      __config[I_FILL] = v;
      this.__checkModify();
    }
    __config[I_STAY_BEGIN] = {
      backwards: true,
      both: true,
    }.hasOwnProperty(v);
    __config[I_STAY_END] = {
      forwards: true,
      both: true,
    }.hasOwnProperty(v);
    return v;
  }

  get direction() {
    return this.__config[I_DIRECTION];
  }

  set direction(v) {
    v = v || 'normal';
    let __config = this.__config;
    if(__config[I_DIRECTION] !== v) {
      __config[I_DIRECTION] = v;
      this.__checkModify();
    }
    return v;
  }

  get frames() {
    return this.__config[I_FRAMES];
  }

  get framesR() {
    return this.__config[I_FRAMES_R];
  }

  get playbackRate() {
    return this.__config[I_PLAYBACK_RATE];
  }

  set playbackRate(v) {
    v = parseFloat(v) || 1;
    if(v <= 0) {
      v = 1;
    }
    let __config = this.__config;
    if(__config[I_PLAYBACK_RATE] !== v) {
      __config[I_PLAYBACK_RATE] = v;
    }
    return v;
  }

  get easing() {
    return this.__config[I_EASING];
  }

  get startTime() {
    return this.__config[I_START_TIME];
  }

  get currentTime() {
    return this.__config[I_CURRENT_TIME];
  }

  set currentTime(v) {
    v = Math.max(0, parseFloat(v) || 0);
    let __config = this.__config;
    if(__config[I_CURRENT_TIME] !== v) {
      __config[I_CURRENT_TIME] = v;
      __config[I_NEXT_TIME] = v;
    }
    return v;
  }

  get nextTime() {
    return this.__config[I_NEXT_TIME];
  }

  set nextTime(v) {
    v = Math.max(0, parseFloat(v) || 0);
    let __config = this.__config;
    if(__config[I_NEXT_TIME] !== v) {
      __config[I_NEXT_TIME] = v;
    }
    return v;
  }

  get timestamp() {
    return this.__config[I_TIME_STAMP];
  }

  get pending() {
    return this.__config[I_PLAY_STATE] !== 'running';
  }

  get finished() {
    return this.__config[I_PLAY_STATE] === 'finished';
  }

  get playState() {
    return this.__config[I_PLAY_STATE];
  }

  get playCount() {
    return this.__config[I_PLAY_COUNT];
  }

  set playCount(v) {
    v = Math.max(0, parseInt(v) || 0);
    let __config = this.__config;
    if(__config[I_PLAY_COUNT] !== v) {
      __config[I_PLAY_COUNT] = v;
    }
    return v;
  }

  get isDestroyed() {
    return this.__config[I_DESTROYED];
  }

  get animating() {
    let __config = this.__config;
    let playState = __config[I_PLAY_STATE];
    if(playState === 'idle') {
      return false;
    }
    return playState !== 'finished' || __config[I_STAY_END] || __config[I_STAY_BEGIN];
  }

  get spfLimit() {
    let __config = this.__config;
    return __config[I_SPF_LIMIT];
  }

  set spfLimit(v) {
    if(util.isNumber(v) || /^\d/.test(v)) {
      v = Math.max(0, parseInt(v) || 0);
    }
    else {
      v = !!v;
    }
    let __config = this.__config;
    if(__config[I_SPF_LIMIT] !== v) {
      __config[I_SPF_LIMIT] = v;
    }
    return v;
  }

  get assigning() {
    return this.__config[I_ASSIGNING];
  }
}

export default Animation;
