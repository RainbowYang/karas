import Node from './Node';
import mode from './mode';
import painter from '../util/painter';
import unit from '../style/unit';
import tf from '../style/transform';
import gradient from '../style/gradient';
import border from '../style/border';
import css from '../style/css';
import image from '../style/image';
import enums from '../util/enums';
import util from '../util/util';
import inject from '../util/inject';
import Animation from '../animate/Animation';
import frame from '../animate/frame';
import mx from '../math/matrix';
import geom from '../math/geom';
import change from '../refresh/change';
import level from '../refresh/level';
import Cache from '../refresh/Cache';
import transform from '../style/transform';

const {
  STYLE_KEY,
  STYLE_RV_KEY,
  style2Upper,
  STYLE_KEY: {
    BORDER_TOP_LEFT_RADIUS,
    BORDER_TOP_RIGHT_RADIUS,
    BORDER_BOTTOM_LEFT_RADIUS,
    BORDER_BOTTOM_RIGHT_RADIUS,
    PADDING_LEFT,
    PADDING_RIGHT,
    PADDING_TOP,
    PADDING_BOTTOM,
    MARGIN_LEFT,
    MARGIN_TOP,
    MARGIN_BOTTOM,
    MARGIN_RIGHT,
    BORDER_LEFT_WIDTH,
    BORDER_TOP_WIDTH,
    BORDER_BOTTOM_WIDTH,
    BORDER_RIGHT_WIDTH,
    TOP,
    RIGHT,
    BOTTOM,
    LEFT,
    POSITION,
    DISPLAY,
    WIDTH,
    HEIGHT,
    MATRIX,
    TRANSLATE_X,
    TRANSLATE_Y,
    TRANSFORM,
    SCALE_X,
    SCALE_Y,
    ROTATE_Z,
    SKEW_X,
    SKEW_Y,
    TRANSFORM_ORIGIN,
    BACKGROUND_POSITION_X,
    BACKGROUND_POSITION_Y,
    BACKGROUND_SIZE,
    BACKGROUND_COLOR,
    BACKGROUND_IMAGE,
    BACKGROUND_REPEAT,
    BOX_SHADOW,
    OPACITY,
    Z_INDEX,
    BORDER_TOP_STYLE,
    BORDER_RIGHT_STYLE,
    BORDER_BOTTOM_STYLE,
    BORDER_LEFT_STYLE,
    FILTER,
    OVERFLOW,
    MIX_BLEND_MODE,
    BORDER_TOP_COLOR,
    BORDER_BOTTOM_COLOR,
    BORDER_LEFT_COLOR,
    BORDER_RIGHT_COLOR,
    FONT_STYLE,
    COLOR,
    VISIBILITY,
    POINTER_EVENTS,
    BORDER_TOP,
    BORDER_RIGHT,
    BORDER_BOTTOM,
    BORDER_LEFT,
    BACKGROUND_CLIP,
  },
  UPDATE_KEY: {
    UPDATE_NODE,
    UPDATE_FOCUS,
    UPDATE_STYLE,
    UPDATE_OVERWRITE,
    UPDATE_KEYS,
    UPDATE_CONFIG,
  },
  STRUCT_KEY: {
    STRUCT_HAS_MASK,
  },
  NODE_KEY: {
    NODE_TAG_NAME,
    NODE_CACHE_STYLE,
    NODE_CURRENT_STYLE,
    NODE_COMPUTED_STYLE,
    NODE_STYLE,
    NODE_STRUCT,
    NODE_OPACITY,
    NODE_MATRIX_EVENT,
    NODE_MATRIX,
    NODE_LIMIT_CACHE,
    NODE_BLUR_VALUE,
    NODE_HAS_CONTENT,
    NODE_REFRESH_LV,
    NODE_CACHE,
    NODE_CACHE_TOTAL,
    NODE_CACHE_FILTER,
    NODE_CACHE_MASK,
    NODE_CACHE_OVERFLOW,
    NODE_IS_DESTROYED,
    NODE_DEFS_CACHE,
    NODE_DOM_PARENT,
  }
} = enums;
const { AUTO, PX, PERCENT, STRING, INHERIT } = unit;
const { clone, int2rgba, rgba2int, joinArr, isNil } = util;
const { calRelative } = css;
const { canvasPolygon, svgPolygon } = painter;
const { GEOM } = change;

const {
  contain,
  NONE,
  TRANSFORM_ALL,
  TRANSFORM: TF,
  REFLOW,
  REPAINT,
  TRANSLATE_X: TX,
  TRANSLATE_Y: TY,
  OPACITY: OP,
  FILTER: FT,
} = level;

function renderBorder(renderMode, points, color, ctx, xom, dx, dy) {
  if(renderMode === mode.CANVAS) {
    ctx.beginPath();
    if(ctx.fillStyle !== color) {
      ctx.fillStyle = color;
    }
    points.forEach(point => {
      canvasPolygon(ctx, point, dx, dy);
    });
    ctx.fill();
    ctx.closePath();
  }
  else if(renderMode === mode.SVG) {
    let s = '';
    points.forEach(point => {
      s += svgPolygon(point);
    });
    xom.virtualDom.bb.push({
      type: 'item',
      tagName: 'path',
      props: [
        ['d', s],
        ['fill', color],
      ],
    });
  }
}

function renderBgc(renderMode, color, x, y, w, h, ctx, defs, xom, btlr, btrr, bbrr, bblr, method = 'fill') {
  // radial渐变ellipse形状会有matrix，用以从圆缩放到椭圆
  let matrix, cx, cy;
  if(Array.isArray(color)) {
    matrix = color[1];
    cx = color[2];
    cy = color[3];
    color = color[0];
  }
  // border-radius使用三次贝塞尔曲线模拟1/4圆角，误差在[0, 0.000273]之间
  let list = border.calRadius(x, y, w, h, btlr, btrr, bbrr, bblr);
  if(!list) {
    list = [
      [x, y],
      [x + w, y],
      [x + w, y + h],
      [x, y + h],
      [x, y],
    ];
  }
  // 椭圆有matrix，用逆矩阵变化点来完成
  if(matrix) {
    let tfo = [cx, cy];
    matrix = transform.calMatrixByOrigin(matrix, tfo);
    let t = mx.inverse(matrix);
    list = list.map(item => {
      if(!item || !item.length) {
        return null;
      }
      let arr = [];
      for(let i = 0, len = item.length; i < len; i += 2) {
        let p = mx.calPoint([item[i], item[i + 1]], t);
        arr.push(p[0]);
        arr.push(p[1]);
      }
      return arr;
    });
  }
  if(renderMode === mode.CANVAS) {
    if(matrix) {
      ctx.save();
      let me = xom.matrixEvent;
      matrix = mx.multiply(me, matrix);
      ctx.setTransform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
    }
    ctx.beginPath();
    if(ctx.fillStyle !== color) {
      ctx.fillStyle = color;
    }
    canvasPolygon(ctx, list);
    ctx[method]();
    ctx.closePath();
    if(matrix) {
      ctx.restore();
    }
  }
  else if(renderMode === mode.SVG) {
    let d = svgPolygon(list);
    xom.virtualDom.bb.push({
      type: 'item',
      tagName: 'path',
      props: [
        ['d', d],
        ['fill', color],
      ],
    });
    // 椭圆渐变独有
    if(matrix) {
      let bb = xom.virtualDom.bb;
      bb[bb.length - 1].props.push(['transform', `matrix(${joinArr(matrix, ',')})`]);
    }
  }
}

function renderConic(renderMode, color, x, y, w, h, ctx, defs, xom, btlr, btrr, bbrr, bblr) {
  // border-radius使用三次贝塞尔曲线模拟1/4圆角，误差在[0, 0.000273]之间
  let list = border.calRadius(x, y, w, h, btlr, btrr, bbrr, bblr);
  if(!list) {
    list = [
      [x, y],
      [x + w, y],
      [x + w, y + h],
      [x, y + h],
      [x, y],
    ];
  }
  if(renderMode === mode.CANVAS) {
    let alpha = ctx.globalAlpha;
    ctx.globalAlpha = alpha * 0.5; // 割圆法的叠加会加深色彩，这里还原模拟下透明度
    ctx.save();
    ctx.beginPath();
    canvasPolygon(ctx, list);
    ctx.clip();
    ctx.closePath();
    color.forEach(item => {
      ctx.beginPath();
      canvasPolygon(ctx, item[0]);
      ctx.fillStyle = item[1];
      ctx.fill();
      ctx.closePath();
    });
    ctx.restore();
    ctx.globalAlpha = alpha;
  }
  else if(renderMode === mode.SVG) {
    let v = {
      tagName: 'clipPath',
      children: [{
        tagName: 'path',
        props: [
          ['d', svgPolygon(list)],
          ['fill', '#FFF'],
        ],
      }],
    };
    xom.__config[NODE_DEFS_CACHE].push(v);
    let clip = defs.add(v);
    color.forEach(item => {
      xom.virtualDom.bb.push({
        type: 'item',
        tagName: 'path',
        props: [
          ['d', svgPolygon(item[0])],
          ['fill', item[1]],
          ['clip-path', 'url(#' + clip + ')'],
        ],
      });
    });
  }
}

let borderRadiusKs = [BORDER_TOP_LEFT_RADIUS, BORDER_TOP_RIGHT_RADIUS, BORDER_BOTTOM_RIGHT_RADIUS, BORDER_BOTTOM_LEFT_RADIUS];
function calBorderRadius(w, h, currentStyle, computedStyle) {
  let noRadius = true;
  borderRadiusKs.forEach(k => {
    computedStyle[k] = currentStyle[k].map((item, i) => {
      if(item[0] > 0) {
        noRadius = false;
      }
      else {
        return 0;
      }
      if(item[1] === PX) {
        return Math.max(0, item[0]);
      }
      else {
        return Math.max(0, item[0] * (i ? h : w) * 0.01);
      }
    });
  });
  // 优化提前跳出
  if(noRadius) {
    return;
  }
  // radius限制，相交的2个之和不能超过边长，如果2个都超过中点取中点，只有1个超过取交点，这包含了单个不能超过总长的逻辑
  borderRadiusKs.forEach((k, i) => {
    let j = i % 2 === 0 ? 0 : 1;
    let target = j ? h : w;
    let prev = computedStyle[k];
    let next = computedStyle[borderRadiusKs[(i + 1) % 4]];
    // 相加超过边长则是相交
    if(prev[j] + next[j] > target) {
      let half = target * 0.5;
      // 都超过一半中点取中点
      if(prev[j] >= half && next[j] >= half) {
        prev[j] = next[j] = half;
      }
      // 仅1个超过中点，因相交用总长减去另一方即可
      else if(prev[j] > half) {
        prev[j] = target - next[j];
      }
      else if(next[j] > half) {
        next[j] = target - prev[j];
      }
    }
  });
}

function calBackgroundSize(value, w, h) {
  let res = [];
  value.forEach((item, i) => {
    if(item[1] === PX) {
      res.push(item[0]);
    }
    else if(item[1] === PERCENT) {
      res.push(item[0] * (i ? h : w) * 0.01);
    }
    else if(item[1] === AUTO) {
      res.push(-1);
    }
    else if(item[1] === STRING) {
      res.push(item[0] === 'contain' ? -2 : -3);
    }
  });
  return res;
}

function calBackgroundPosition(position, container, size) {
  if(position[1] === PX) {
    return position[0];
  }
  else if(position[1] === PERCENT) {
    return (container - size) * position[0] * 0.01;
  }
  return 0;
}

function renderBoxShadow(renderMode, ctx, defs, data, xom, x1, y1, x4, y4, outerWidth, outerHeight) {
  let [x, y, blur, spread, color, inset] = data;
  let c = int2rgba(color);
  let n = Math.abs(blur) * 2 + Math.abs(spread) * 2 + Math.abs(x) * 2 + Math.abs(y) * 2;
  // box本身坐标顺时针
  let box = [
    [x1, y1],
    [x4, y1],
    [x4, y4],
    [x1, y4],
    [x1, y1],
  ];
  // 算上各种偏移/扩散的最外层坐标，且逆时针
  let outer = [
    [x1 - n, y1 - n],
    [x1 - n, y4 + n],
    [x4 + n, y4 + n],
    [x4 + n, y1 - n],
    [x1 - n, y1 - n],
  ];
  if(color[3] > 0 && (blur > 0 || spread > 0)) {
    if(renderMode === mode.CANVAS) {
      ctx.save();
      ctx.beginPath();
      // inset裁剪box外面
      if(inset === 'inset') {
        let xa = x1 + x + spread;
        let ya = y1 + y + spread;
        let xb = x4 + x - spread;
        let yb = y4 + y - spread;
        let spreadBox = [
          [xa, ya],
          [xb, ya],
          [xb, yb],
          [xa, yb],
        ];
        // 是否相交判断需要绘制
        let cross = geom.getRectsIntersection(
          [box[0][0], box[0][1], box[2][0], box[2][1]],
          [spreadBox[0][0], spreadBox[0][1], spreadBox[2][0], spreadBox[2][1]]);
        if(!cross) {
          return;
        }
        cross = [
          [cross[0], cross[1]],
          [cross[2], cross[1]],
          [cross[2], cross[3]],
          [cross[0], cross[3]],
          [cross[0], cross[1]],
        ];
        // 扩散区域类似边框填充
        if(spread) {
          canvasPolygon(ctx, cross);
          canvasPolygon(ctx, box.slice(0).reverse());
          ctx.clip();
          ctx.closePath();
          ctx.beginPath();
          if(ctx.fillStyle !== c) {
            ctx.fillStyle = c;
          }
          canvasPolygon(ctx, box);
          ctx.fill();
          ctx.closePath();
          ctx.restore();
          ctx.save();
          ctx.beginPath();
          canvasPolygon(ctx, cross);
          ctx.clip();
          ctx.closePath();
          ctx.beginPath();
          if(ctx.fillStyle !== '#FFF') {
            ctx.fillStyle = '#FFF';
          }
          ctx.shadowColor = c;
          ctx.shadowBlur = blur;
          // 画在外围的空心矩形，宽度要比blur大，n考虑了这一情况取了最大值
          canvasPolygon(ctx, [
            [xa, ya],
            [xb, ya],
            [xb, yb],
            [x1 - n, yb],
            [x1 - n, y4 + n],
            [x4 + n, y4 + n],
            [x4 + n, y1 - n],
            [x1 - n, y1 - n],
            [x1 - n, yb],
            [xa, yb],
            [xa, ya],
          ]);
        }
        else {
          canvasPolygon(ctx, box);
          ctx.clip();
          ctx.closePath();
          ctx.beginPath();
          if(ctx.fillStyle !== '#FFF') {
            ctx.fillStyle = '#FFF';
          }
          ctx.shadowOffsetX = x;
          ctx.shadowOffsetY = y;
          ctx.shadowColor = c;
          ctx.shadowBlur = blur;
          canvasPolygon(ctx, [
            [x1, y1],
            [x4, y1],
            [x4, y4],
            [x1 - n, y4],
            [x1 - n, y4 + n],
            [x4 + n, y4 + n],
            [x4 + n, y1 - n],
            [x1 - n, y1 - n],
            [x1 - n, y4],
            [x1, y4],
            [x1, y1],
          ]);
        }
      }
      // outset需裁减掉box本身的内容，clip()非零环绕显示box外的阴影内容，fill()绘制在内无效
      else {
        let xa = x1 + x - spread;
        let ya = y1 + y - spread;
        let xb = x4 + x + spread;
        let yb = y4 + y + spread;
        let blurBox = [
          [xa, ya],
          [xb, ya],
          [xb, yb],
          [xa, yb],
        ];
        let cross = geom.getRectsIntersection(
          [box[0][0], box[0][1], box[2][0], box[2][1]],
          [blurBox[0][0], blurBox[0][1], blurBox[2][0], blurBox[2][1]]);
        // 分为是否有spread，因模糊成本spread区域将没有模糊
        if(spread) {
          // 扩散区域类似边框填充
          canvasPolygon(ctx, box);
          canvasPolygon(ctx, blurBox.slice(0).reverse());
          ctx.clip();
          ctx.closePath();
          ctx.beginPath();
          if(ctx.fillStyle !== c) {
            ctx.fillStyle = c;
          }
          canvasPolygon(ctx, blurBox);
          ctx.fill();
          ctx.closePath();
          ctx.restore();
          ctx.save();
          ctx.beginPath();
          // 阴影部分看相交情况裁剪，有相交时逆时针绘制相交区域即可排除之
          if(cross) {
            canvasPolygon(ctx, [
              [cross[0], cross[1]],
              [cross[2], cross[1]],
              [cross[2], cross[3]],
              [cross[0], cross[3]],
              [cross[0], cross[1]],
            ].reverse());
          }
          canvasPolygon(ctx, box);
          canvasPolygon(ctx, blurBox);
          canvasPolygon(ctx, outer);
          ctx.clip();
          ctx.closePath();
          ctx.beginPath();
          if(ctx.fillStyle !== '#FFF') {
            ctx.fillStyle = '#FFF';
          }
          ctx.shadowColor = c;
          ctx.shadowBlur = blur;
          canvasPolygon(ctx, blurBox);
        }
        else {
          canvasPolygon(ctx, box);
          canvasPolygon(ctx, outer);
          ctx.clip();
          ctx.closePath();
          ctx.beginPath();
          if(ctx.fillStyle !== '#FFF') {
            ctx.fillStyle = '#FFF';
          }
          ctx.shadowOffsetX = x;
          ctx.shadowOffsetY = y;
          ctx.shadowColor = c;
          ctx.shadowBlur = blur;
          canvasPolygon(ctx, box);
        }
      }
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
    else if(renderMode === mode.SVG) {
      let d = mx.int2convolution(blur);
      if(inset === 'inset') {
        let xa = x1 + x + spread;
        let ya = y1 + y + spread;
        let xb = x4 + x - spread;
        let yb = y4 + y - spread;
        let spreadBox = [
          [xa, ya],
          [xb, ya],
          [xb, yb],
          [xa, yb],
        ];
        let cross = geom.getRectsIntersection(
          [box[0][0], box[0][1], box[2][0], box[2][1]],
          [spreadBox[0][0], spreadBox[0][1], spreadBox[2][0], spreadBox[2][1]]);
        if(!cross) {
          return;
        }
        cross = [
          [cross[0], cross[1]],
          [cross[2], cross[1]],
          [cross[2], cross[3]],
          [cross[0], cross[3]],
          [cross[0], cross[1]],
        ];
        if(spread) {
          let v = {
            tagName: 'filter',
            props: [
              ['x', -d / outerWidth],
              ['y', -d / outerHeight],
              ['width', 1 + d * 2 / outerWidth],
              ['height', 1 + d * 2 / outerHeight],
            ],
            children: [
              {
                tagName: 'feDropShadow',
                props: [
                  ['dx', 0],
                  ['dy', 0],
                  ['stdDeviation', blur * 0.5],
                  ['flood-color', c],
                ],
              },
            ],
          }
          xom.__config[NODE_DEFS_CACHE].push(v);
          let filter = defs.add(v);
          let v2 = {
            tagName: 'clipPath',
            children: [{
              tagName: 'path',
              props: [
                ['d', svgPolygon(cross) + svgPolygon(box.slice(0).reverse())],
                ['fill', '#FFF'],
              ],
            }],
          };
          let clip = defs.add(v2);
          xom.__config[NODE_DEFS_CACHE].push(v2);
          xom.virtualDom.bb.push({
            type: 'item',
            tagName: 'path',
            props: [
              ['d', svgPolygon(box)],
              ['fill', c],
              ['clip-path', 'url(#' + clip + ')'],
            ],
          });
          v = {
            tagName: 'clipPath',
            children: [{
              tagName: 'path',
              props: [
                ['d', svgPolygon(cross)],
                ['fill', '#FFF'],
              ],
            }],
          };
          clip = defs.add(v);
          xom.__config[NODE_DEFS_CACHE].push(v);
          xom.virtualDom.bb.push({
            type: 'item',
            tagName: 'path',
            props: [
              ['d', svgPolygon([
                [xa, ya],
                [xb, ya],
                [xb, yb],
                [x1 - n, yb],
                [x1 - n, y4 + n],
                [x4 + n, y4 + n],
                [x4 + n, y1 - n],
                [x1 - n, y1 - n],
                [x1 - n, yb],
                [xa, yb],
                [xa, ya],
              ])],
              ['fill', '#FFF'],
              ['filter', 'url(#' + filter + ')'],
              ['clip-path', 'url(#' + clip + ')'],
            ],
          });
        }
        else {
          let v = {
            tagName: 'filter',
            props: [
              ['x', -d / outerWidth],
              ['y', -d / outerHeight],
              ['width', 1 + d * 2 / outerWidth],
              ['height', 1 + d * 2 / outerHeight],
            ],
            children: [
              {
                tagName: 'feDropShadow',
                props: [
                  ['dx', x],
                  ['dy', y],
                  ['stdDeviation', blur * 0.5],
                  ['flood-color', c],
                ],
              },
            ],
          }
          let filter = defs.add(v);
          xom.__config[NODE_DEFS_CACHE].push(v);
          v = {
            tagName: 'clipPath',
            children: [{
              tagName: 'path',
              props: [
                ['d', svgPolygon(box)],
                ['fill', '#FFF'],
              ],
            }],
          };
          let clip = defs.add(v);
          xom.__config[NODE_DEFS_CACHE].push(v);
          xom.virtualDom.bb.push({
            type: 'item',
            tagName: 'path',
            props: [
              ['d', svgPolygon([
                [x1, y1],
                [x4, y1],
                [x4, y4],
                [x1 - n, y4],
                [x1 - n, y4 + n],
                [x4 + n, y4 + n],
                [x4 + n, y1 - n],
                [x1 - n, y1 - n],
                [x1 - n, y4],
                [x1, y4],
                [x1, y1],
              ])],
              ['fill', '#FFF'],
              ['filter', 'url(#' + filter + ')'],
              ['clip-path', 'url(#' + clip + ')'],
            ],
          });
        }
      }
      else {
        let xa = x1 + x - spread;
        let ya = y1 + y - spread;
        let xb = x4 + x + spread;
        let yb = y4 + y + spread;
        let blurBox = [
          [xa, ya],
          [xb, ya],
          [xb, yb],
          [xa, yb],
        ];
        let cross = geom.getRectsIntersection(
          [box[0][0], box[0][1], box[2][0], box[2][1]],
          [blurBox[0][0], blurBox[0][1], blurBox[2][0], blurBox[2][1]]);
        if(spread) {
          let v = {
            tagName: 'filter',
            props: [
              ['x', -d / outerWidth],
              ['y', -d / outerHeight],
              ['width', 1 + d * 2 / outerWidth],
              ['height', 1 + d * 2 / outerHeight],
            ],
            children: [
              {
                tagName: 'feDropShadow',
                props: [
                  ['dx', 0],
                  ['dy', 0],
                  ['stdDeviation', blur * 0.5],
                  ['flood-color', c],
                ],
              },
            ],
          };
          let filter = defs.add(v);
          xom.__config[NODE_DEFS_CACHE].push(v);
          v = {
            tagName: 'clipPath',
            children: [{
              tagName: 'path',
              props: [
                ['d', svgPolygon(box) + svgPolygon(blurBox.slice(0).reverse())],
                ['fill', '#FFF'],
              ],
            }],
          };
          let clip = defs.add(v);
          xom.__config[NODE_DEFS_CACHE].push(v);
          xom.virtualDom.bb.push({
            type: 'item',
            tagName: 'path',
            props: [
              ['d', svgPolygon(blurBox)],
              ['fill', c],
              ['clip-path', 'url(#' + clip + ')'],
            ],
          });
          v = {
            tagName: 'clipPath',
            children: [{
              tagName: 'path',
              props: [
                ['d', (cross ? svgPolygon([
                  [cross[0], cross[1]],
                  [cross[2], cross[1]],
                  [cross[2], cross[3]],
                  [cross[0], cross[3]],
                  [cross[0], cross[1]],
                ].reverse()) : '')
                + svgPolygon(box) + svgPolygon(blurBox) + svgPolygon(outer)],
                ['fill', '#FFF'],
              ],
            }],
          };
          clip = defs.add(v);
          xom.__config[NODE_DEFS_CACHE].push(v);
          xom.virtualDom.bb.push({
            type: 'item',
            tagName: 'path',
            props: [
              ['d', svgPolygon(blurBox)],
              ['fill', '#FFF'],
              ['filter', 'url(#' + filter + ')'],
              ['clip-path', 'url(#' + clip + ')'],
            ],
          });
        }
        else {
          let v = {
            tagName: 'filter',
            props: [
              ['x', -d / outerWidth],
              ['y', -d / outerHeight],
              ['width', 1 + d * 2 / outerWidth],
              ['height', 1 + d * 2 / outerHeight],
            ],
            children: [
              {
                tagName: 'feDropShadow',
                props: [
                  ['dx', x],
                  ['dy', y],
                  ['stdDeviation', blur * 0.5],
                  ['flood-color', c],
                ],
              },
            ],
          };
          let filter = defs.add(v);
          xom.__config[NODE_DEFS_CACHE].push(v);
          v = {
            tagName: 'clipPath',
            children: [{
              tagName: 'path',
              props: [
                ['d', svgPolygon(box) + svgPolygon(outer)],
                ['fill', '#FFF'],
              ],
            }],
          };
          let clip = defs.add(v);
          xom.__config[NODE_DEFS_CACHE].push(v);
          xom.virtualDom.bb.push({
            type: 'item',
            tagName: 'path',
            props: [
              ['d', svgPolygon(box)],
              ['fill', '#FFF'],
              ['filter', 'url(#' + filter + ')'],
              ['clip-path', 'url(#' + clip + ')'],
            ],
          });
        }
      }
    }
  }
}

class Xom extends Node {
  constructor(tagName, props = {}) {
    super();
    // 构建工具中都是arr，手写可能出现hash情况
    if(Array.isArray(props)) {
      this.props = util.arr2hash(props);
    }
    else {
      this.props = props;
    }
    this.__tagName = tagName;
    this.__style = this.props.style || {}; // style被解析后的k-v形式
    this.__currentStyle = {}; // 动画过程中绘制一开始会merge动画样式
    this.__computedStyle = {}; // 类似getComputedStyle()将currentStyle计算好数值赋给
    this.__listener = {};
    Object.keys(this.props).forEach(k => {
      let v = this.props[k];
      if(/^on[a-zA-Z]/.test(k)) {
        k = k.slice(2).toLowerCase();
        this.listener[k] = v;
      }
    });
    this.__animationList = [];
    this.__loadBgi = {
      // 刷新回调函数，用以destroy取消用
      cb: function() {
      },
    };
    this.__cacheStyle = {}; // 是否缓存重新计算computedStyle的样式key
    this.__cacheDefs = []; // svg专用，缓存渲染时使用已有的defs，diff过程用，否则会defs被清空
    let config = this.__config;
    config[NODE_TAG_NAME] = tagName;
    config[NODE_CACHE_STYLE] = this.__cacheStyle;
    config[NODE_CURRENT_STYLE] = this.__currentStyle;
    config[NODE_COMPUTED_STYLE] = this.__computedStyle;
    config[NODE_REFRESH_LV] = REFLOW;
    config[NODE_STYLE] = this.__style;
    config[NODE_MATRIX_EVENT] = [];
    config[NODE_DEFS_CACHE] = this.__cacheDefs;
    this.__frameAnimateList = [];
  }

  __structure(i, lv, j) {
    let res = super.__structure(i, lv, j);
    if(this.__hasMask) {
      res[STRUCT_HAS_MASK] = this.__hasMask;
    }
    this.__config[NODE_STRUCT] = res;
    return res;
  }

  // 获取margin/padding的实际值
  __mp(currentStyle, computedStyle, w) {
    [
      'Top',
      'Right',
      'Bottom',
      'Left',
    ].forEach(k => {
      let a = STYLE_KEY[style2Upper('margin' + k)];
      let b = STYLE_KEY[style2Upper('padding' + k)];
      computedStyle[a] = this.__mpWidth(currentStyle[a], w);
      computedStyle[b] = this.__mpWidth(currentStyle[b], w);
    });
  }

  __mpWidth(mp, w) {
    if(mp[1] === PX) {
      return mp[0];
    }
    else if(mp[1] === PERCENT) {
      return mp[0] * w * 0.01;
    }
    return 0;
  }

  __ioSize(w, h) {
    let computedStyle = this.computedStyle;
    this.__clientWidth = w += computedStyle[PADDING_LEFT] + computedStyle[PADDING_RIGHT];
    this.__clientHeight = h += computedStyle[PADDING_TOP] + computedStyle[PADDING_BOTTOM];
    this.__offsetWidth = w += computedStyle[BORDER_LEFT_WIDTH] + computedStyle[BORDER_RIGHT_WIDTH];
    this.__offsetHeight = h += computedStyle[BORDER_TOP_WIDTH] + computedStyle[BORDER_BOTTOM_WIDTH];
    this.__outerWidth = w + computedStyle[MARGIN_LEFT] + computedStyle[MARGIN_RIGHT];
    this.__outerHeight = h + computedStyle[MARGIN_TOP] + computedStyle[MARGIN_BOTTOM];
  }

  // 换算margin/padding为px单位
  __calMp(v, w) {
    let n = 0;
    if(v[1] === PX) {
      n += v[0];
    }
    else if(v[1] === PERCENT) {
      v[0] *= w * 0.01;
      v[1] = PX;
      n += v[0];
    }
    return n;
  }

  // absolute且无尺寸时，isVirtual标明先假布局一次计算尺寸，还有flex列计算时
  // fromAbs为absolute特有
  __layout(data, isVirtual, fromAbs) {
    css.computeReflow(this, this.isShadowRoot);
    let { w } = data;
    let { isDestroyed, currentStyle, computedStyle, __config } = this;
    let {
      [DISPLAY]: display,
    } = computedStyle;
    let {
      [WIDTH]: width,
      [POSITION]: position,
    } = currentStyle;
    this.__cancelCache();
    this.__layoutData = clone(data);
    __config[NODE_REFRESH_LV] = REFLOW;
    __config[NODE_LIMIT_CACHE] = false;
    // 防止display:none不统计mask，virtual也忽略
    if(!isVirtual) {
      let { next } = this;
      // mask关系只有布局才会变更，普通渲染关系不会改变，clip也是mask的一种
      if(!this.isMask && next && (next.isMask)) {
        let count = 0;
        while(next) {
          if(next.isMask) {
            count++;
          }
          else {
            break;
          }
          next = next.next;
        }
        this.__hasMask = count;
      }
    }
    this.__ox = this.__oy = 0;
    if(isDestroyed || display === 'none') {
      this.__width = this.__height
        = this.__clientWidth = this.__clientHeight
        = this.__offsetWidth = this.__offsetHeight
        = this.__outerWidth = this.__outerHeight
        = computedStyle[WIDTH] = computedStyle[HEIGHT] = 0;
      this.__x = data.x;
      this.__y = data.y;
      this.__layoutNone();
      return;
    }
    // margin/padding在abs前已经计算过了，无需二次计算
    if(!fromAbs) {
      this.__mp(currentStyle, computedStyle, w);
    }
    if(width[1] !== AUTO) {
      switch(width[1]) {
        case PX:
          w = width[0];
          break;
        case PERCENT:
          w *= width[0] * 0.01;
          break;
      }
    }
    // 3种布局，默认block
    if(display === 'flex') {
      this.__layoutFlex(data, isVirtual);
    }
    else if(display === 'inline') {
      this.__layoutInline(data, isVirtual);
    }
    else {
      this.__layoutBlock(data, isVirtual);
    }
    // relative渲染时做偏移，百分比基于父元素，若父元素没有定高则为0
    if(position === 'relative') {
      let { [TOP]: top, [RIGHT]: right, [BOTTOM]: bottom, [LEFT]: left } = currentStyle;
      let { parent } = this;
      if(top[1] !== AUTO) {
        let n = calRelative(currentStyle, TOP, top, parent);
        this.__offsetY(n);
        computedStyle[TOP] = n;
        computedStyle[BOTTOM] = 'auto';
      }
      else if(bottom[1] !== AUTO) {
        let n = calRelative(currentStyle, BOTTOM, bottom, parent);
        this.__offsetY(-n);
        computedStyle[BOTTOM] = n;
        computedStyle[TOP] = 'auto';
      }
      else {
        computedStyle[TOP] = computedStyle[BOTTOM] = 'auto';
      }
      if(left[1] !== AUTO) {
        let n = calRelative(currentStyle, LEFT, left, parent, true);
        this.__offsetX(n);
        computedStyle[LEFT] = n;
        computedStyle[RIGHT] = 'auto';
      }
      else if(right[1] !== AUTO) {
        let n = calRelative(currentStyle, RIGHT, right, parent, true);
        this.__offsetX(-n);
        computedStyle[RIGHT] = n;
        computedStyle[LEFT] = 'auto';
      }
      else {
        computedStyle[LEFT] = computedStyle[RIGHT] = 'auto';
      }
    }
    else if(currentStyle[POSITION] !== 'absolute') {
      computedStyle[TOP] = computedStyle[BOTTOM] = computedStyle[LEFT] = computedStyle[RIGHT] = 'auto';
    }
    this.__sx = this.x + this.ox;
    this.__sy = this.y + this.oy;
    // 计算结果存入computedStyle
    let tw = computedStyle[WIDTH] = this.width;
    let th = computedStyle[HEIGHT] = this.height;
    // virtual时计算返回给abs布局用，普通的在各自layout做
    if(isVirtual) {
      this.__ioSize(tw, th);
    }
    // 动态json引用时动画暂存，第一次布局时处理这些动画到root的animateController上
    let ar = this.__animateRecords;
    if(ar) {
      this.__animateRecords = null;
      // parse没有dom时，animate的target引用都是json，vd后生成需重新赋值
      ar.list.forEach(item => {
        if(item.target.vd instanceof Xom) {
          item.target = item.target.vd;
        }
      });
      let ac = ar.controller || this.root.animateController;
      // 不自动播放进入记录列表，等待手动调用
      if(ar.options && ar.options.autoPlay === false) {
        ac.__records = ac.__records.concat(ar.list);
      }
      // 自动播放进入列表开始播放
      else {
        ac.__auto = ac.__auto.concat(ar.list);
        ac.__playAuto();
      }
    }
  }

  __layoutNone() {
    let { computedStyle } = this;
    computedStyle[DISPLAY] = 'none';
    computedStyle[MARGIN_TOP]
      = computedStyle[MARGIN_RIGHT]
      = computedStyle[MARGIN_BOTTOM]
      = computedStyle[MARGIN_LEFT]
      = computedStyle[PADDING_TOP]
      = computedStyle[PADDING_RIGHT]
      = computedStyle[PADDING_BOTTOM]
      = computedStyle[PADDING_LEFT]
      = 0;
  }

  // 预先计算是否是固定宽高，布局点位和尺寸考虑margin/border/padding
  __preLayout(data) {
    let { x, y, w, h, w2, h2 } = data;
    this.__x = x;
    this.__y = y;
    let { currentStyle, computedStyle } = this;
    let {
      [WIDTH]: width,
      [HEIGHT]: height,
    } = currentStyle;
    let {
      [BORDER_TOP_WIDTH]: borderTopWidth,
      [BORDER_RIGHT_WIDTH]: borderRightWidth,
      [BORDER_BOTTOM_WIDTH]: borderBottomWidth,
      [BORDER_LEFT_WIDTH]: borderLeftWidth,
      [MARGIN_TOP]: marginTop,
      [MARGIN_RIGHT]: marginRight,
      [MARGIN_BOTTOM]: marginBottom,
      [MARGIN_LEFT]: marginLeft,
      [PADDING_TOP]: paddingTop,
      [PADDING_RIGHT]: paddingRight,
      [PADDING_BOTTOM]: paddingBottom,
      [PADDING_LEFT]: paddingLeft,
    } = computedStyle;
    // 除了auto外都是固定宽高度
    let fixedWidth;
    let fixedHeight;
    // 绝对定位是left+right这种其实等于定义了width，但不能修改原始style，存入特殊变量标识
    // 垂直嵌套flex时也会用到，子级有grow时，孙子要按它来算
    if(w2 !== undefined) {
      fixedWidth = true;
      w = w2;
    }
    else if(width[1] !== AUTO) {
      fixedWidth = true;
      switch(width[1]) {
        case PX:
          w = width[0];
          break;
        case PERCENT:
          w *= width[0] * 0.01;
          break;
      }
    }
    if(h2 !== undefined) {
      fixedHeight = true;
      h = h2;
    }
    else if(height[1] !== AUTO) {
      fixedHeight = true;
      switch(height[1]) {
        case PX:
          h = height[0];
          break;
        case PERCENT:
          h *= height[0] * 0.01;
          break;
      }
    }
    // margin/padding/border影响x和y和尺寸
    x += borderLeftWidth + marginLeft + paddingLeft;
    data.x = x;
    y += borderTopWidth + marginTop + paddingTop;
    data.y = y;
    if(width[1] === AUTO) {
      w -= borderLeftWidth + borderRightWidth + marginLeft + marginRight + paddingLeft + paddingRight;
    }
    if(height[1] === AUTO) {
      h -= borderTopWidth + borderBottomWidth + marginTop + marginBottom + paddingTop + paddingBottom;
    }
    return {
      fixedWidth,
      fixedHeight,
      x,
      y,
      w,
      h,
    };
  }

  // 处理margin:xx auto居中对齐或右对齐
  __marginAuto(style, data) {
    let {
      [POSITION]: position,
      [MARGIN_LEFT]: marginLeft,
      [MARGIN_RIGHT]: marginRight,
      [WIDTH]: width,
    } = style;
    if(position !== 'absolute' && width !== AUTO && marginLeft[1] === AUTO && marginRight[1] === AUTO) {
      let ow = this.outerWidth;
      if(ow < data.w) {
        this.__offsetX((data.w - ow) * 0.5, true);
      }
    }
  }

  __calMatrix(lv, __cacheStyle, currentStyle, computedStyle, sx1, sy1, offsetWidth, offsetHeight) {
    let matrixCache = __cacheStyle[MATRIX];
    // tx/ty变化特殊优化
    if(matrixCache && lv < REFLOW && !contain(lv, TF)) {
      let x = 0, y = 0;
      if(contain(lv, TX)) {
        let v = currentStyle[TRANSLATE_X];
        if(isNil(v)) {
          v = 0;
        }
        else if(v[1] === PERCENT) {
          v = v[0] * this.offsetWidth * 0.01;
        }
        else {
          v = v[0];
        }
        x = v - (computedStyle[TRANSLATE_X] || 0);
        computedStyle[TRANSLATE_X] = v;
        computedStyle[TRANSFORM][4] += x;
        matrixCache[4] += x;
      }
      if(contain(lv, TY)) {
        let v = currentStyle[TRANSLATE_Y];
        if(isNil(v)) {
          v = 0;
        }
        else if(v[1] === PERCENT) {
          v = v[0] * this.offsetHeight * 0.01;
        }
        else {
          v = v[0];
        }
        y = v - (computedStyle[TRANSLATE_Y] || 0);
        computedStyle[TRANSLATE_Y] = v;
        computedStyle[TRANSFORM][5] += y;
        matrixCache[5] += y;
      }
      __cacheStyle[MATRIX] = matrixCache;
    }
    // 先根据cache计算需要重新计算的computedStyle
    else {
      if(sx1 === undefined) {
        sx1 = this.__sx1;
        sy1 = this.__sy1;
        offsetWidth = this.offsetWidth;
        offsetHeight = this.offsetHeight;
      }
      if(__cacheStyle[TRANSFORM_ORIGIN] === undefined) {
        __cacheStyle[TRANSFORM_ORIGIN] = true;
        matrixCache = null;
        computedStyle[TRANSFORM_ORIGIN] = tf.calOrigin(currentStyle[TRANSFORM_ORIGIN], offsetWidth, offsetHeight);
      }
      if(__cacheStyle[TRANSFORM] === undefined
        || __cacheStyle[TRANSLATE_X] === undefined
        || __cacheStyle[TRANSLATE_Y] === undefined
        || __cacheStyle[ROTATE_Z] === undefined
        || __cacheStyle[SCALE_X] === undefined
        || __cacheStyle[SCALE_Y] === undefined
        || __cacheStyle[SKEW_X] === undefined
        || __cacheStyle[SKEW_Y] === undefined) {
        __cacheStyle[TRANSFORM]
          = __cacheStyle[TRANSLATE_X]
          = __cacheStyle[TRANSLATE_Y]
          = __cacheStyle[ROTATE_Z]
          = __cacheStyle[SCALE_X]
          = __cacheStyle[SCALE_Y]
          = __cacheStyle[SKEW_X]
          = __cacheStyle[SKEW_Y]
          = true;
        matrixCache = null;
        let matrix;
        // transform相对于自身
        if(currentStyle[TRANSFORM]) {
          matrix = tf.calMatrix(currentStyle[TRANSFORM], offsetWidth, offsetHeight);
        }
        // 没有transform则看是否有扩展的css独立变换属性
        else {
          let temp = [];
          [
            TRANSLATE_X,
            TRANSLATE_Y,
            ROTATE_Z,
            SKEW_X,
            SKEW_Y,
            SCALE_X,
            SCALE_Y,
          ].forEach(k => {
            // 删除之前遗留的
            delete computedStyle[k];
            let v = currentStyle[k];
            if(isNil(v)) {
              return;
            }
            computedStyle[k] = v[0];
            // scale为1和其它为0避免计算浪费
            let isScale = k === SCALE_X || k === SCALE_Y;
            if(v[0] === 1 && isScale || !isScale && v[0] === 0) {
              return;
            }
            if(v[1] === PERCENT) {
              if(k === TRANSLATE_X) {
                computedStyle[k] = v[0] * offsetWidth * 0.01;
              }
              else if(k === TRANSLATE_Y) {
                computedStyle[k] = v[0] * offsetHeight * 0.01;
              }
            }
            temp.push([k, v]);
          });
          if(temp.length) {
            matrix = tf.calMatrix(temp, offsetWidth, offsetHeight);
          }
        }
        computedStyle[TRANSFORM] = matrix || [1, 0, 0, 1, 0, 0];
      }
      if(!matrixCache) {
        let tfo = computedStyle[TRANSFORM_ORIGIN].slice(0);
        tfo[0] += sx1 || 0;
        tfo[1] += sy1 || 0;
        matrixCache = __cacheStyle[MATRIX] = tf.calMatrixByOrigin(computedStyle[TRANSFORM], tfo);
      }
    }
    return matrixCache;
  }

  __calCache(renderMode, lv, ctx, defs, parent, __cacheStyle, currentStyle, computedStyle,
             clientWidth, clientHeight, offsetWidth, offsetHeight,
             borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth,
             paddingTop, paddingRight, paddingBottom, paddingLeft,
             x1, x2, x3, x4, x5, x6, y1, y2, y3, y4, y5, y6, bx1, by1, bx2, by2) {
    // this.__calMatrix(lv, __cacheStyle, currentStyle, computedStyle, x1, y1, offsetWidth, offsetHeight);
    if(lv >= REPAINT) {
      if(__cacheStyle[BACKGROUND_POSITION_X] === undefined) {
        __cacheStyle[BACKGROUND_POSITION_X] = true;
        let {
          [BACKGROUND_POSITION_X]: bgX,
        } = currentStyle;
        computedStyle[BACKGROUND_POSITION_X] = (bgX || []).map(item => {
          return item[1] === PX ? item[0] : (item[0] + '%');
        });
      }
      if(__cacheStyle[BACKGROUND_POSITION_Y] === undefined) {
        __cacheStyle[BACKGROUND_POSITION_Y] = true;
        let {
          [BACKGROUND_POSITION_Y]: bgY,
        } = currentStyle;
        computedStyle[BACKGROUND_POSITION_Y] = (bgY || []).map(item => {
          return item[1] === PX ? item[0] : (item[0] + '%');
        });
      }
      if(__cacheStyle[BACKGROUND_SIZE] === undefined) {
        __cacheStyle[BACKGROUND_SIZE] = true;
        computedStyle[BACKGROUND_SIZE] = (currentStyle[BACKGROUND_SIZE] || []).map(item => {
          return calBackgroundSize(item, clientWidth, clientHeight);
        });
      }
      if(__cacheStyle[BACKGROUND_IMAGE] === undefined) {
        let bgI = computedStyle[BACKGROUND_IMAGE] = currentStyle[BACKGROUND_IMAGE];
        __cacheStyle[BACKGROUND_IMAGE] = bgI.map((bgi, i) => {
          if(!bgi) {
            return null;
          }
          // 防止隐藏不加载背景图
          if(util.isString(bgi)) {
            let loadBgi = this.__loadBgi[i] = this.__loadBgi[i] || {};
            let cache = inject.IMG[BACKGROUND_IMAGE];
            if(cache && cache.state === inject.LOADED) {
              loadBgi.url = BACKGROUND_IMAGE;
              loadBgi.source = cache.source;
              loadBgi.width = cache.width;
              loadBgi.height = cache.height;
            }
            else if(loadBgi.url !== bgi) {
              // 可能改变导致多次加载，每次清空，成功后还要比对url是否相同
              loadBgi.url = bgi;
              loadBgi.source = null;
              let node = this;
              let root = node.root;
              inject.measureImg(bgi, data => {
                // 还需判断url，防止重复加载时老的替换新的，失败不绘制bgi
                if(data.success && data.url === loadBgi.url && !this.isDestroyed) {
                  loadBgi.source = data.source;
                  loadBgi.width = data.width;
                  loadBgi.height = data.height;
                  root.delRefreshTask(loadBgi.cb);
                  root.addRefreshTask(loadBgi.cb = {
                    __before() {
                      __cacheStyle[BACKGROUND_IMAGE] = undefined;
                      let res = {};
                      res[UPDATE_NODE] = node;
                      res[UPDATE_FOCUS] = REPAINT;
                      res[UPDATE_CONFIG] = node.__config;
                      root.__addUpdate(node, node.__config, root, root.__config, res);
                    },
                  });
                }
              }, {
                ctx,
                root,
                width: bx2 - bx1,
                height: by2 - by1,
              });
            }
            return true;
          }
          else if(bgi && bgi.k) {
            return this.__gradient(renderMode, ctx, defs, bx1, by1, bx2, by2, bgi);
          }
        });
      }
      if(__cacheStyle[BOX_SHADOW] === undefined) {
        __cacheStyle[BOX_SHADOW] = true;
        computedStyle[BOX_SHADOW] = currentStyle[BOX_SHADOW];
      }
      // 这些直接赋值的不需要再算缓存
      [
        OPACITY,
        Z_INDEX,
        BORDER_TOP_STYLE,
        BORDER_RIGHT_STYLE,
        BORDER_BOTTOM_STYLE,
        BORDER_LEFT_STYLE,
        BACKGROUND_REPEAT,
        FILTER,
        OVERFLOW,
        MIX_BLEND_MODE,
      ].forEach(k => {
        computedStyle[k] = currentStyle[k];
      });
      [
        BACKGROUND_COLOR,
        BORDER_TOP_COLOR,
        BORDER_RIGHT_COLOR,
        BORDER_BOTTOM_COLOR,
        BORDER_LEFT_COLOR,
      ].forEach(k => {
        if(__cacheStyle[k] === undefined) {
          __cacheStyle[k] = int2rgba(computedStyle[k] = currentStyle[k][0]);
        }
      });
      // 圆角边计算
      if(__cacheStyle[BORDER_TOP_LEFT_RADIUS] === undefined
        || __cacheStyle[BORDER_TOP_RIGHT_RADIUS] === undefined
        || __cacheStyle[BORDER_BOTTOM_RIGHT_RADIUS] === undefined
        || __cacheStyle[BORDER_BOTTOM_LEFT_RADIUS] === undefined) {
        __cacheStyle[BORDER_TOP_LEFT_RADIUS]
          = __cacheStyle[BORDER_TOP_RIGHT_RADIUS]
          = __cacheStyle[BORDER_BOTTOM_RIGHT_RADIUS]
          = __cacheStyle[BORDER_BOTTOM_LEFT_RADIUS]
          = true;
        calBorderRadius(offsetWidth, offsetHeight, currentStyle, computedStyle);
      }
      // width/style/radius影响border，color不影响渲染缓存
      let btlr = computedStyle[BORDER_TOP_LEFT_RADIUS];
      let btrr = computedStyle[BORDER_TOP_RIGHT_RADIUS];
      let bbrr = computedStyle[BORDER_BOTTOM_RIGHT_RADIUS];
      let bblr = computedStyle[BORDER_BOTTOM_LEFT_RADIUS];
      ['Top', 'Right', 'Bottom', 'Left'].forEach(k => {
        k = 'border' + k;
        let k2 = STYLE_KEY[style2Upper(k)];
        let kw = STYLE_KEY[style2Upper(k + 'Width')];
        let ks = STYLE_KEY[style2Upper(k + 'Style')];
        // width/style变更影响border重新计算
        if(__cacheStyle[kw] === undefined) {
          __cacheStyle[kw] = true;
          __cacheStyle[k2] = undefined;
        }
        if(__cacheStyle[ks] === undefined) {
          __cacheStyle[ks] = true;
          __cacheStyle[k2] = undefined;
        }
        if(__cacheStyle[k2] === undefined) {
          if(k2 === BORDER_TOP) {
            if(borderTopWidth > 0) {
              let deg1 = Math.atan(borderTopWidth / borderLeftWidth);
              let deg2 = Math.atan(borderTopWidth / borderRightWidth);
              __cacheStyle[k2] = border.calPoints(borderTopWidth, computedStyle[ks], deg1, deg2,
                x1, x2, x5, x6, y1, y2, y5, y6, 0, btlr, btrr);
            }
            else {
              __cacheStyle[k2] = [];
            }
          }
          else if(k2 === BORDER_RIGHT) {
            if(borderRightWidth > 0) {
              let deg1 = Math.atan(borderRightWidth / borderTopWidth);
              let deg2 = Math.atan(borderRightWidth / borderBottomWidth);
              __cacheStyle[k2] = border.calPoints(borderRightWidth, computedStyle[ks], deg1, deg2,
                x1, x2, x5, x6, y1, y2, y5, y6, 1, btrr, bbrr);
            }
            else {
              __cacheStyle[k2] = [];
            }
          }
          else if(k2 === BORDER_BOTTOM) {
            if(borderBottomWidth > 0) {
              let deg1 = Math.atan(borderBottomWidth / borderLeftWidth);
              let deg2 = Math.atan(borderBottomWidth / borderRightWidth);
              __cacheStyle[k2] = border.calPoints(borderBottomWidth, computedStyle[ks], deg1, deg2,
                x1, x2, x5, x6, y1, y2, y5, y6, 2, bblr, bbrr);
            }
            else {
              __cacheStyle[k2] = [];
            }
          }
          else if(k2 === BORDER_LEFT) {
            if(borderLeftWidth > 0) {
              let deg1 = Math.atan(borderLeftWidth / borderTopWidth);
              let deg2 = Math.atan(borderLeftWidth / borderBottomWidth);
              __cacheStyle[k2] = border.calPoints(borderLeftWidth, computedStyle[ks], deg1, deg2,
                x1, x2, x5, x6, y1, y2, y5, y6, 3, btlr, bblr);
            }
            else {
              __cacheStyle[k2] = [];
            }
          }
        }
      });
    }
    else {
      if(contain(lv, OP)) {
        computedStyle[OPACITY] = currentStyle[OPACITY];
      }
      if(contain(lv, FT)) {
        computedStyle[FILTER] = currentStyle[FILTER];
      }
    }
    // 强制计算继承性的
    let parentComputedStyle = parent && parent.computedStyle;
    if(currentStyle[FONT_STYLE][1] === INHERIT) {
      computedStyle[FONT_STYLE] = parent ? parentComputedStyle[FONT_STYLE] : 'normal';
    }
    else if(!__cacheStyle[FONT_STYLE]) {
      computedStyle[FONT_STYLE] = currentStyle[FONT_STYLE][0];
    }
    __cacheStyle[FONT_STYLE] = computedStyle[FONT_STYLE];
    if(currentStyle[COLOR][1] === INHERIT) {
      computedStyle[COLOR] = parent ? parentComputedStyle[COLOR] : [0, 0, 0, 1];
      __cacheStyle[COLOR] = int2rgba(computedStyle[COLOR]);
    }
    else if(!__cacheStyle[COLOR]) {
      computedStyle[COLOR] = rgba2int(currentStyle[COLOR][0]);
      __cacheStyle[COLOR] = int2rgba(computedStyle[COLOR]);
    }
    if(currentStyle[VISIBILITY][1] === INHERIT) {
      computedStyle[VISIBILITY] = parent ? parentComputedStyle[VISIBILITY] : 'visible';
    }
    else if(!__cacheStyle[VISIBILITY]) {
      computedStyle[VISIBILITY] = currentStyle[VISIBILITY][0];
    }
    __cacheStyle[VISIBILITY] = computedStyle[VISIBILITY];
    if(currentStyle[POINTER_EVENTS][1] === INHERIT) {
      computedStyle[POINTER_EVENTS] = parent ? parentComputedStyle[POINTER_EVENTS] : 'auto';
    }
    else if(!__cacheStyle[POINTER_EVENTS]) {
      computedStyle[POINTER_EVENTS] = currentStyle[POINTER_EVENTS][0];
    }
    __cacheStyle[POINTER_EVENTS] = computedStyle[POINTER_EVENTS];
  }

  __calContent(renderMode, lv, currentStyle, computedStyle) {
    if(renderMode === mode.CANVAS) {
      if(lv < REPAINT) {
        return this.__hasContent;
      }
      let visibility = currentStyle[VISIBILITY];
      if(visibility !== 'hidden') {
        let bgI = currentStyle[BACKGROUND_IMAGE];
        if(Array.isArray(bgI)) {
          for(let i = 0, len = bgI.length; i < len; i++) {
            if(bgI[i]) {
              return true;
            }
          }
        }
        if(currentStyle[BACKGROUND_COLOR][0][3] > 0) {
          let width = computedStyle[WIDTH], height = computedStyle[HEIGHT],
            paddingTop = computedStyle[PADDING_TOP], paddingRight = computedStyle[PADDING_RIGHT],
            paddingBottom = computedStyle[PADDING_BOTTOM], paddingLeft = computedStyle[PADDING_LEFT];
          if(width && height || paddingTop || paddingRight || paddingBottom || paddingLeft) {
            return true;
          }
        }
        for(let list = ['Top', 'Right', 'Bottom', 'Left'], i = 0, len = list.length; i < len; i++) {
          let k = list[i];
          if(computedStyle[STYLE_KEY[style2Upper('border' + k + 'Width')]] > 0
            && currentStyle[STYLE_KEY[style2Upper('border' + k + 'Color')]][3] > 0) {
            return true;
          }
        }
        let bs = currentStyle[BOX_SHADOW];
        if(Array.isArray(bs)) {
          for(let i = 0, len = bs.length; i < len; i++) {
            let item = bs[i];
            if(item && (item[2] > 0 || item[3] > 0)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  /**
   * 渲染基础方法，Dom/Geom公用
   * @param renderMode
   * @param lv
   * @param ctx
   * @param defs
   * @param cache 是否开启缓存
   * @return Object
   * x1/x2/x3/x4/y1/y2/y3/y4 坐标
   * break svg判断无变化提前跳出
   * cacheError 离屏申请失败，仅canvas
   * offScreenBlend 无cache时的离屏canvas，仅canvas
   * offScreenFilter 无cache时的离屏canvas，仅canvas
   * offScreenMask 无cache时的离屏canvas，仅canvas
   * offScreenOverflow 无cache时的离屏canvas，仅canvas
   */
  __renderSelf(renderMode, lv, ctx, defs, cache) {
    let {
      isDestroyed,
      root,
      __config,
    } = this;
    let __cache = __config[NODE_CACHE];
    let __cacheStyle = __config[NODE_CACHE_STYLE];
    let currentStyle = __config[NODE_CURRENT_STYLE];
    let computedStyle = __config[NODE_COMPUTED_STYLE];
    // geom特殊处理，每次>=REPAINT重新渲染生成
    this.__renderSelfData = null;
    // 渲染完认为完全无变更，等布局/动画/更新重置
    __config[NODE_REFRESH_LV] = NONE;
    if(isDestroyed) {
      return { isDestroyed, break: true };
    }
    let virtualDom;
    // svg设置vd上的lv属性标明<REPAINT时应用缓存，初始化肯定没有
    if(renderMode === mode.SVG) {
      virtualDom = this.__virtualDom = {
        bb: [],
        children: [],
        visibility: 'visible',
      };
      // svg mock，每次都生成，每个节点都是局部根，更新时自底向上清除
      if(!__config[NODE_CACHE_TOTAL]) {
        __config[NODE_CACHE_TOTAL] = {
          available: true,
          release() {
            this.available = false;
            delete virtualDom.cache;
          },
        };
      }
      else if(!__config[NODE_CACHE_TOTAL].available) {
        __config[NODE_CACHE_TOTAL].available = true;
      }
    }
    // canvas返回信息，svg已经初始化好了vd
    if(computedStyle[DISPLAY] === 'none') {
      return { break: true };
    }
    // 使用sx和sy渲染位置，考虑了relative和translate影响
    let {
      sx: x,
      sy: y,
      width,
      height,
      clientWidth,
      clientHeight,
      offsetWidth,
      offsetHeight,
      outerWidth,
      outerHeight,
      __hasMask,
    } = this;
    let {
      [MARGIN_TOP]: marginTop,
      [MARGIN_LEFT]: marginLeft,
      [PADDING_TOP]: paddingTop,
      [PADDING_RIGHT]: paddingRight,
      [PADDING_BOTTOM]: paddingBottom,
      [PADDING_LEFT]: paddingLeft,
      [BORDER_LEFT_WIDTH]: borderLeftWidth,
      [BORDER_RIGHT_WIDTH]: borderRightWidth,
      [BORDER_TOP_WIDTH]: borderTopWidth,
      [BORDER_BOTTOM_WIDTH]: borderBottomWidth,
      [BACKGROUND_CLIP]: backgroundClip,
    } = computedStyle;
    let x1 = this.__sx1 = x + marginLeft;
    let x2 = this.__sx2 = x1 + borderLeftWidth;
    // let x3 = this.__sx3 = x2 + width + paddingLeft + paddingRight;
    // let x4 = this.__sx4 = x3 + borderRightWidth;
    let x3 = this.__sx3 = x2 + paddingLeft;
    let x4 = this.__sx4 = x3 + width;
    let x5 = this.__sx5 = x4 + paddingRight;
    let x6 = this.__sx6 = x5 + borderRightWidth;
    let y1 = this.__sy1 = y + marginTop;
    let y2 = this.__sy2 = y1 + borderTopWidth;
    // let y3 = this.__sy3 = y2 + height + paddingTop + paddingBottom;
    // let y4 = this.__sy4 = y3 + borderBottomWidth;
    let y3 = this.__sy3 = y2 + paddingTop;
    let y4 = this.__sy4 = y3 + height;
    let y5 = this.__sy5 = y4 + paddingBottom;
    let y6 = this.__sy6 = y5 + borderBottomWidth;
    let bx1 = x1, by1 = y1, bx2 = x6, by2 = y6;
    if(backgroundClip === 'padding-box') {
      bx1 = x2;
      by1 = y2;
      bx2 = x5;
      by2 = y5;
    }
    else if(backgroundClip === 'content-box') {
      bx1 = x3;
      by1 = y3;
      bx2 = x4;
      by2 = y4;
    }
    this.__bx1 = bx1;
    this.__by1 = by1;
    this.__bx2 = bx2;
    this.__by2 = by2;
    let res = { x1, x2, x3, x4, x5, x6, y1, y2, y3, y4, y5, y6, bx1, by1, bx2, by2 };
    // 防止cp直接返回cp嵌套，拿到真实dom的parent
    let p = __config[NODE_DOM_PARENT];
    let hasContent = this.__hasContent = __config[NODE_HAS_CONTENT] = this.__calContent(renderMode, lv, currentStyle, computedStyle);
    this.__calMatrix(lv, __cacheStyle, currentStyle, computedStyle, x1, y1, offsetWidth, offsetHeight);
    // canvas特殊申请离屏缓存
    let dx = 0, dy = 0;
    if(cache && renderMode === mode.CANVAS) {
      // 无内容可释放并提前跳出，geom覆盖特殊判断，因为后面子类会绘制矢量，img也覆盖特殊判断，加载完肯定有内容
      if(!hasContent && this.__releaseWhenEmpty(__cache)) {
        res.break = true;
        __config[NODE_LIMIT_CACHE] = false;
      }
      // 新生成根据最大尺寸，排除margin从border开始还要考虑阴影滤镜等，geom单独在dom里做
      else if(!__config[NODE_LIMIT_CACHE] && (!__cache || !__cache.available)) {
        let bbox = this.bbox;
        if(__cache) {
          __cache.reset(bbox);
        }
        else {
          __cache = Cache.getInstance(bbox);
        }
        // 有可能超过最大尺寸限制不使用缓存
        if(__cache && __cache.enabled) {
          __cache.__bbox = bbox;
          __cache.__appendData(x1, y1);
          // let dbx = __cache.dbx, dby = __cache.dby;
          ctx = __cache.ctx;
          // let [xc, yc] = __cache.coords;
          dx = __cache.dx;
          dy = __cache.dy;
          // 重置ctx为cache的，以及绘制坐标为cache的区域
          bx1 += dx;
          by1 += dy;
          bx2 += dx;
          by2 += dy;
          if(dx) {
            res.x1 = x1 += dx;
            res.x2 = x2 += dx;
            res.x3 = x3 += dx;
            res.x4 = x4 += dx;
            res.x5 = x5 += dx;
            res.x6 = x6 += dx;
          }
          if(dy) {
            res.y1 = y1 += dy;
            res.y2 = y2 += dy;
            res.y3 = y3 += dy;
            res.y4 = y4 += dy;
            res.y5 = y5 += dy;
            res.y6 = y6 += dy;
          }
        }
        else {
          __config[NODE_LIMIT_CACHE] = true;
          __cache = null;
        }
        __config[NODE_CACHE] = __cache;
      }
      res.dx = dx;
      res.dy = dy;
    }
    // 计算好cacheStyle的内容，以及位图缓存指数
    this.__calCache(renderMode, lv, ctx, defs, this.parent,
        __cacheStyle, currentStyle, computedStyle,
        clientWidth, clientHeight, offsetWidth, offsetHeight,
        borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth,
        paddingTop, paddingRight, paddingBottom, paddingLeft,
        x1, x2, x3, x4, x5, x6, y1, y2, y3, y4, y5, y6, bx1, by1, bx2, by2
      );
    let {
      [BACKGROUND_COLOR]: backgroundColor,
      [BORDER_TOP_COLOR]: borderTopColor,
      [BORDER_RIGHT_COLOR]: borderRightColor,
      [BORDER_BOTTOM_COLOR]: borderBottomColor,
      [BORDER_LEFT_COLOR]: borderLeftColor,
      [BORDER_TOP_LEFT_RADIUS]: borderTopLeftRadius,
      [BORDER_TOP_RIGHT_RADIUS]: borderTopRightRadius,
      [BORDER_BOTTOM_RIGHT_RADIUS]: borderBottomRightRadius,
      [BORDER_BOTTOM_LEFT_RADIUS]: borderBottomLeftRadius,
      [VISIBILITY]: visibility,
      [BACKGROUND_REPEAT]: backgroundRepeat,
      [BACKGROUND_IMAGE]: backgroundImage,
      [OPACITY]: opacity,
      [FILTER]: filter,
      [BACKGROUND_SIZE]: backgroundSize,
      [BOX_SHADOW]: boxShadow,
      [OVERFLOW]: overflow,
      [MIX_BLEND_MODE]: mixBlendMode,
    } = computedStyle;
    // 先设置透明度，canvas可以向上累积
    if(renderMode === mode.CANVAS) {
      if(p) {
        opacity *= p.__config[NODE_OPACITY];
      }
      __config[NODE_OPACITY] = opacity;
    }
    else if(renderMode === mode.SVG) {
      if(opacity === 1) {
        delete virtualDom.opacity;
      }
      else {
        virtualDom.opacity = opacity;
      }
      if(mixBlendMode !== 'normal') {
        virtualDom.mixBlendMode = mixBlendMode;
      }
      else {
        delete virtualDom.mixBlendMode;
      }
    }
    // canvas/svg/事件需要3种不同的matrix
    let matrix = this.__matrix = __config[NODE_MATRIX] = __cacheStyle[MATRIX];
    let renderMatrix = this.__renderMatrix = matrix;
    // 变换对事件影响，canvas要设置渲染
    if(p) {
      matrix = mx.multiply(p.matrixEvent, matrix);
    }
    // 为了引用不变，防止变化后text子节点获取不到，恶心的v8优化，初始化在构造函数中空数组
    let m = this.__matrixEvent = __config[NODE_MATRIX_EVENT];
    m[0] = matrix[0];
    m[1] = matrix[1];
    m[2] = matrix[2];
    m[3] = matrix[3];
    m[4] = matrix[4];
    m[5] = matrix[5];
    if(renderMode === mode.SVG) {
      // svg可以没变化省略计算，因为只相对于自身
      if(!contain(lv, TRANSFORM_ALL) && lv < REPAINT) {}
      else if(!mx.isE(renderMatrix)) {
        virtualDom.transform = 'matrix(' + joinArr(renderMatrix, ',') + ')';
      }
      else {
        delete virtualDom.transform;
      }
    }
    if(renderMode === mode.SVG) {
      virtualDom.visibility = visibility;
    }
    // 无离屏功能或超限视为不可缓存本身，等降级无cache再次绘制
    if(renderMode === mode.CANVAS && cache && (__config[NODE_LIMIT_CACHE] || res.break)) {
      return { limitCache: true };
    }
    // 无cache时canvas的blur需绘制到离屏上应用后反向绘制回来，有cache在Dom里另生成一个filter的cache
    let offScreenFilter;
    __config[NODE_BLUR_VALUE] = 0;
    if(Array.isArray(filter)) {
      filter.forEach(item => {
        let [k, v] = item;
        if(k === 'blur') {
          __config[NODE_BLUR_VALUE] = v;
          // 非cache模式返回offScreen，cache模式会生成cacheFilter识别
          if(renderMode === mode.CANVAS && v > 0  && !cache) {
            let { width, height } = root;
            let c = inject.getCacheCanvas(width, height);
            if(c.ctx) {
              offScreenFilter = {
                ctx,
                blur: v,
                target: c,
                matrix,
              };
              ctx = c.ctx;
            }
          }
          else if(renderMode === mode.SVG
            && (lv >= REPAINT || contain(lv, FT))) {
            // 模糊框卷积尺寸 #66
            if(v > 0 && width > 0 && height > 0) {
              let d = mx.int2convolution(v);
              let o = {
                tagName: 'filter',
                props: [
                  ['x', -d / outerWidth],
                  ['y', -d / outerHeight],
                  ['width', 1 + d * 2 / outerWidth],
                  ['height', 1 + d * 2 / outerHeight],
                ],
                children: [
                  {
                    tagName: 'feGaussianBlur',
                    props: [
                      ['stdDeviation', v],
                    ],
                  }
                ],
              };
              let id = defs.add(o);
              __config[NODE_DEFS_CACHE].push(o);
              virtualDom.filter = 'url(#' + id + ')';
            }
            else {
              delete virtualDom.filter;
            }
          }
        }
      });
    }
    let offScreenMask;
    if(__hasMask) {
      if(renderMode === mode.CANVAS && !cache) {
        if(offScreenFilter) {
          offScreenMask = offScreenFilter;
        }
        else {
          let { width, height } = root;
          let c = inject.getCacheCanvas(width, height);
          if(c.ctx) {
            offScreenMask = {
              ctx,
              target: c,
              matrix,
            };
            ctx = c.ctx;
          }
        }
      }
    }
    // overflow:hidden，最后判断，filter/mask优先
    let offScreenOverflow;
    if(overflow === 'hidden') {
      if(renderMode === mode.CANVAS && !cache) {
        if(offScreenFilter || offScreenMask) {
          offScreenOverflow = offScreenFilter || offScreenMask;
        }
        else {
          let { width, height } = root;
          let c = inject.getCacheCanvas(width, height);
          if(c.ctx) {
            offScreenOverflow = {
              ctx,
              target: c,
              matrix,
            };
            ctx = c.ctx;
          }
        }
        offScreenOverflow.x = x1;
        offScreenOverflow.y = y1;
        offScreenOverflow.offsetWidth = offsetWidth;
        offScreenOverflow.offsetHeight = offsetHeight;
      }
      else if(renderMode === mode.SVG) {
        let v = {
          tagName: 'clipPath',
          props: [],
          children: [
            {
              tagName: 'path',
              props: [
                ['d', `M${x1},${y1}L${x + offsetWidth},${y}L${x + offsetWidth},${y + offsetHeight}L${x},${y + offsetHeight},L${x},${y}`],
              ],
            }
          ],
        };
        let id = defs.add(v);
        __config[NODE_DEFS_CACHE].push(v);
        virtualDom.overflow = 'url(#' + id + ')';
      }
    }
    else if(renderMode === mode.SVG) {
      delete virtualDom.overflow;
    }
    let offScreenBlend;
    if(mixBlendMode !== 'normal' && !cache) {
      if(offScreenFilter || offScreenMask || offScreenOverflow) {
        offScreenBlend = offScreenFilter || offScreenMask || offScreenOverflow;
      }
      else {
        let { width, height } = root;
        let c = inject.getCacheCanvas(width, height);
        offScreenBlend = {
          ctx,
          target: c,
          mixBlendMode,
          matrix,
        };
        ctx = c.ctx;
      }
    }
    // 无法使用缓存时主画布直接绘制需设置
    if(renderMode === mode.CANVAS && !cache) {
      res.offScreenFilter = offScreenFilter;
      res.offScreenMask = offScreenMask;
      res.offScreenOverflow = offScreenOverflow;
      res.offScreenBlend = offScreenBlend;
      ctx.globalAlpha = opacity;
      ctx.setTransform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
    }
    // 隐藏不渲染
    if(visibility === 'hidden' && renderMode === mode.CANVAS) {
      res.break = true;
      return res;
    }
    // 背景色垫底，根据backgroundClip的不同值要调整坐标尺寸，也会影响borderRadius
    let btlr, btrr, bbrr, bblr;
    if(backgroundColor[3] > 0 || backgroundImage) {
      btlr = borderTopLeftRadius.slice(0);
      btrr = borderTopRightRadius.slice(0);
      bbrr = borderBottomRightRadius.slice(0);
      bblr = borderBottomLeftRadius.slice(0);
      if(backgroundClip === 'padding-box') {
        btlr[0] -= borderLeftWidth;
        btlr[1] -= borderTopWidth;
        btrr[0] -= borderRightWidth;
        btrr[1] -= borderTopWidth;
        bbrr[0] -= borderRightWidth;
        bbrr[1] -= borderBottomWidth;
        bblr[0] -= borderLeftWidth;
        bblr[1] -= borderBottomWidth;
      }
      else if(backgroundClip === 'content-box') {
        btlr[0] -= borderLeftWidth + paddingLeft;
        btlr[1] -= borderTopWidth + paddingTop;
        btrr[0] -= borderRightWidth + paddingRight;
        btrr[1] -= borderTopWidth + paddingTop;
        bbrr[0] -= borderRightWidth + paddingRight;
        bbrr[1] -= borderBottomWidth + paddingBottom;
        bblr[0] -= borderLeftWidth + paddingLeft;
        bblr[1] -= borderBottomWidth + paddingBottom;
      }
    }
    if(backgroundColor[3] > 0) {
      renderBgc(renderMode, __cacheStyle[BACKGROUND_COLOR], bx1, by1, bx2 - bx1, by2 - by1, ctx, defs, this,
        btlr, btrr, bbrr, bblr);
    }
    // 渐变或图片叠加
    if(backgroundImage) {
      backgroundImage.forEach((bgi, i) => {
        if(!bgi) {
          return;
        }
        if(util.isString(bgi)) {
          let loadBgi = this.__loadBgi[i];
          if(loadBgi.url === backgroundImage[i]) {
            let source = loadBgi.source;
            let bgW = bx2 - bx1;
            let bgH = by2 - by1;
            // 无source不绘制
            if(source) {
              let { width, height } = loadBgi;
              let [w, h] = backgroundSize[i];
              // -1为auto，-2为contain，-3为cover
              if(w === -1 && h === -1) {
                w = width;
                h = height;
              }
              else if(w === -2) {
                if(width > bgW && height > bgH) {
                  w = width / bgW;
                  h = height / bgH;
                  if(w >= h) {
                    w = bgW;
                    h = w * height / width;
                  }
                  else {
                    h = bgH;
                    w = h * width / height;
                  }
                }
                else if(width > bgW) {
                  w = bgW;
                  h = w * height / width;
                }
                else if(height > bgH) {
                  h = bgH;
                  w = h * width / height;
                }
                else {
                  w = width;
                  h = height;
                }
              }
              else if(w === -3) {
                if(bgW > width && bgH > height) {
                  w = width / bgW;
                  h = height / bgH;
                  if(w <= h) {
                    w = bgW;
                    h = w * height / width;
                  }
                  else {
                    h = bgH;
                    w = h * width / height;
                  }
                }
                else if(bgW > width) {
                  w = bgW;
                  h = w * height / width;
                }
                else if(bgH > height) {
                  h = bgH;
                  w = h * width / height;
                }
                else {
                  w = width / bgW;
                  h = height / bgH;
                  if(w <= h) {
                    w = bgW;
                    h = w * height / width;
                  }
                  else {
                    h = bgH;
                    w = h * width / height;
                  }
                }
              }
              else if(w === -1) {
                w = h * width / height;
              }
              else if(h === -1) {
                h = w * height / width;
              }
              let bgX = bx1 + calBackgroundPosition(currentStyle[BACKGROUND_POSITION_X][i], bgW, w);
              let bgY = by1 + calBackgroundPosition(currentStyle[BACKGROUND_POSITION_Y][i], bgH, h);
              // 超出尺寸模拟mask截取
              let needMask = bgX < x2 || bgY < y2 || w > bgW || h > bgH;
              // 计算因为repeat，需要向4个方向扩展渲染几个数量图片
              let xnl = 0;
              let xnr = 0;
              let ynt = 0;
              let ynb = 0;
              // repeat-x
              if(['repeat-x', 'repeat'].indexOf(backgroundRepeat[i]) > -1) {
                let diff = bgX - bx1;
                if(diff > 0) {
                  xnl = Math.ceil(diff / w);
                }
                diff = bx1 + bgW - bgX - w;
                if(diff > 0) {
                  xnr = Math.ceil(diff / w);
                }
              }
              // repeat-y
              if(['repeat-y', 'repeat'].indexOf(backgroundRepeat[i]) > -1) {
                let diff = bgY - by1;
                if(diff > 0) {
                  ynt = Math.ceil(diff / h);
                }
                diff = by1 + bgH - bgY - h;
                if(diff > 0) {
                  ynb = Math.ceil(diff / h);
                }
              }
              // 分同行列和4个角分别判断，先看同行同列，再看4个角的象限
              let repeat = [];
              if(xnl > 0) {
                for(let i = 0; i < xnl; i++) {
                  let x = bgX - (i + 1) * w;
                  repeat.push([x, bgY]);
                  // 看最左边超过没有
                  if(!needMask && i === 0 && x < bx1) {
                    needMask = true;
                  }
                }
              }
              if(xnr > 0) {
                for(let i = 0; i < xnr; i++) {
                  let x = bgX + (i + 1) * w;
                  repeat.push([x, bgY]);
                  // 看最右边超过没有
                  if(!needMask && i === xnr - 1 && x + w > bx1 + bgW) {
                    needMask = true;
                  }
                }
              }
              if(ynt > 0) {
                for(let i = 0; i < ynt; i++) {
                  let y = bgY - (i + 1) * h;
                  repeat.push([bgX, y]);
                  // 看最上边超过没有
                  if(!needMask && i === 0 && y < by1) {
                    needMask = true;
                  }
                }
              }
              if(ynb > 0) {
                for(let i = 0; i < ynb; i++) {
                  let y = bgY + (i + 1) * h;
                  repeat.push([bgX, y]);
                  // 看最下边超过没有
                  if(!needMask && i === ynb - 1 && y + w > by1 + clientHeight) {
                    needMask = true;
                  }
                }
              }
              // 原点和同行列十字画完，看4个角的情况
              if(xnl > 0 && ynt > 0) {
                for(let i = 0; i < xnl; i++) {
                  for(let j = 0; j < ynt; j++) {
                    repeat.push([bgX - (i + 1) * w, bgY - (j + 1) * h]);
                  }
                }
              }
              if(xnr > 0 && ynt > 0) {
                for(let i = 0; i < xnr; i++) {
                  for(let j = 0; j < ynt; j++) {
                    repeat.push([bgX + (i + 1) * w, bgY - (j + 1) * h]);
                  }
                }
              }
              if(xnl > 0 && ynb > 0) {
                for(let i = 0; i < xnl; i++) {
                  for(let j = 0; j < ynb; j++) {
                    repeat.push([bgX - (i + 1) * w, bgY + (j + 1) * h]);
                  }
                }
              }
              if(xnr > 0 && ynb > 0) {
                for(let i = 0; i < xnr; i++) {
                  for(let j = 0; j < ynb; j++) {
                    repeat.push([bgX + (i + 1) * w, bgY + (j + 1) * h]);
                  }
                }
              }
              if(renderMode === mode.CANVAS) {
                if(needMask) {
                  ctx.save();
                  renderBgc(renderMode, '#FFF', bx1, by1, bgW, bgH, ctx, defs, this,
                    btlr, btrr, bbrr, bblr, 'clip');
                }
                // 先画不考虑repeat的中心声明的
                ctx.drawImage(source, bgX, bgY, w, h);
                // 再画重复的十字和4角象限
                repeat.forEach(item => {
                  ctx.drawImage(source, item[0], item[1], w, h);
                });
                if(needMask) {
                  ctx.restore();
                }
              }
              else if(renderMode === mode.SVG) {
                let matrix = image.matrixResize(width, height, w, h, bgX, bgY, bgW, bgH);
                let props = [
                  ['xlink:href', bgi],
                  ['x', bgX],
                  ['y', bgY],
                  ['width', width],
                  ['height', height],
                ];
                let needResize;
                if(matrix && !mx.isE(matrix)) {
                  needResize = true;
                  props.push(['transform', 'matrix(' + joinArr(matrix, ',') + ')']);
                }
                if(needMask) {
                  let p1 = [x2, y2];
                  let p2 = [x2 + bgW, y2 + bgH];
                  if(needResize) {
                    let inverse = mx.inverse(matrix);
                    p1 = mx.calPoint(p1, inverse);
                    p2 = mx.calPoint(p2, inverse);
                  }
                  let v = {
                    tagName: 'clipPath',
                    children: [{
                      tagName: 'path',
                      props: [
                        ['d', `M${p1[0]},${p1[1]}L${p2[0]},${p1[1]}L${p2[0]},${p2[1]}L${p1[0]},${p2[1]}L${p1[0]},${p1[1]}`],
                        ['fill', '#FFF'],
                      ],
                    }],
                  };
                  let id = defs.add(v);
                  __config[NODE_DEFS_CACHE].push(v);
                  props.push(['clip-path', 'url(#' + id + ')']);
                }
                // 先画不考虑repeat的中心声明的
                this.virtualDom.bb.push({
                  type: 'img',
                  tagName: 'image',
                  props,
                });
                // 再画重复的十字和4角象限
                repeat.forEach(item => {
                  let copy = clone(props);
                  if(needResize) {
                    let matrix = image.matrixResize(width, height, w, h, item[0], item[1], bgW, bgH);
                    if(matrix && !mx.isE(matrix)) {
                      copy[5][1] = 'matrix(' + joinArr(matrix, ',') + ')';
                    }
                  }
                  copy[1][1] = item[0];
                  copy[2][1] = item[1];
                  this.virtualDom.bb.push({
                    type: 'img',
                    tagName: 'image',
                    props: copy,
                  });
                });
              }
            }
          }
        }
        else if(bgi.k) {
          let gd = __cacheStyle[BACKGROUND_IMAGE][i];
          if(gd) {
            if(gd.k === 'conic') {
              renderConic(renderMode, gd.v, bx1, by1, bx2 - bx1, by2 - by1, ctx, defs, this,
                btlr, btrr, bbrr, bblr);
            }
            else {
              renderBgc(renderMode, gd.v, bx1, by1, bx2 - bx1, by2 - by1, ctx, defs, this,
                btlr, btrr, bbrr, bblr);
            }
          }
        }
      });
    }
    // boxShadow可能会有多个
    if(boxShadow) {
      boxShadow.forEach(item => {
        renderBoxShadow(renderMode, ctx, defs, item, this, x1, y1, x6, y6, outerWidth, outerHeight);
      });
    }
    // 边框需考虑尖角，两条相交边平分45°夹角
    if(borderTopWidth > 0 && borderTopColor[3] > 0) {
      renderBorder(renderMode, __cacheStyle[BORDER_TOP], __cacheStyle[BORDER_TOP_COLOR], ctx, this, dx, dy);
    }
    if(borderRightWidth > 0 && borderRightColor[3] > 0) {
      renderBorder(renderMode, __cacheStyle[BORDER_RIGHT], __cacheStyle[BORDER_RIGHT_COLOR], ctx, this, dx, dy);
    }
    if(borderBottomWidth > 0 && borderBottomColor[3] > 0) {
      renderBorder(renderMode, __cacheStyle[BORDER_BOTTOM], __cacheStyle[BORDER_BOTTOM_COLOR], ctx, this, dx, dy);
    }
    if(borderLeftWidth > 0 && borderLeftColor[3] > 0) {
      renderBorder(renderMode, __cacheStyle[BORDER_LEFT], __cacheStyle[BORDER_LEFT_COLOR], ctx, this, dx, dy);
    }
    if(__cache && __cache.enabled) {
      __cache.__available = true;
    }
    return res;
  }

  render(renderMode, lv, ctx, defs, cache) {
    return this.__renderSelf(renderMode, lv, ctx, defs, cache);
  }

  __destroy() {
    if(this.isDestroyed) {
      return;
    }
    super.__destroy();
    let { root } = this;
    this.animationList.forEach(item => item.__destroy());
    this.__frameAnimateList.splice(0).forEach(item => {
      frame.offFrame(item);
    });
    root.delRefreshTask(this.__loadBgi.cb);
    root.delRefreshTask(this.__task);
    this.__matrix = this.__matrixEvent = this.__root = null;
    this.__cancelCache();
  }

  // 先查找到注册了事件的节点，再捕获冒泡判断增加性能
  __emitEvent(e, force) {
    let { isDestroyed, computedStyle } = this;
    if(isDestroyed || computedStyle[DISPLAY] === 'none' || e.__stopPropagation) {
      return;
    }
    let { event: { type } } = e;
    let { listener } = this;
    let cb;
    if(listener.hasOwnProperty(type)) {
      cb = listener[type];
    }
    // touchmove之类强制的直接由Root通知即可
    if(force) {
      e.target = this;
      if(util.isFunction(cb) && !e.__stopImmediatePropagation) {
        cb.call(this, e);
      }
      return true;
    }
    // 非force的判断事件坐标是否在节点内
    if(this.willResponseEvent(e)) {
      if(util.isFunction(cb) && !e.__stopImmediatePropagation) {
        cb.call(this, e);
      }
      return true;
    }
  }

  willResponseEvent(e) {
    let { x, y } = e;
    let { __sx1, __sy1, offsetWidth, offsetHeight, matrixEvent,
      computedStyle: { [POINTER_EVENTS]: pointerEvents } } = this;
    if(pointerEvents === 'none') {
      return;
    }
    let inThis = tf.pointInQuadrilateral(
      x, y,
      __sx1, __sy1,
      __sx1 + offsetWidth, __sy1,
      __sx1 + offsetWidth, __sy1 + offsetHeight,
      __sx1, __sy1 + offsetHeight,
      matrixEvent
    );
    if(inThis) {
      if(!e.target) {
        e.target = this;
        // 缓存target给move用
        if(e.event.type === 'touchstart') {
          this.root && (this.root.__touchstartTarget = this);
        }
      }
      return true;
    }
  }

  __gradient(renderMode, ctx, defs, bx1, by1, bx2, by2, vs) {
    let iw = bx2 - bx1;
    let ih = by2 - by1;
    let { k, v, d, s, z, p } = vs;
    let cx = bx1 + iw * 0.5;
    let cy = by1 + ih * 0.5;
    let res = { k };
    if(k === 'linear') {
      let gd = gradient.getLinear(v, d, bx1, by1, cx, cy, iw, ih);
      res.v = this.__getLg(renderMode, ctx, defs, gd);
    }
    else if(k === 'radial') {
      let gd = gradient.getRadial(v, s, z, p, bx1, by1, bx2, by2);
      if(gd) {
        res.v = this.__getRg(renderMode, ctx, defs, gd);
        if(gd.matrix) {
          res.v = [res.v, gd.matrix, gd.cx, gd.cy];
        }
      }
    }
    else if(k === 'conic') {
      let bbox = this.bbox;
      let m1 = Math.max(Math.abs(bbox[2] - bbox[0]), Math.abs(bbox[3] - bbox[1]));
      let m2 = Math.max(Math.abs(iw), Math.abs(ih));
      let gd = gradient.getConic(v, d, p, bx1, by1, bx2, by2, m1 / m2);
      res.v = this.__getCg(renderMode, ctx, defs, gd);
    }
    return res;
  }

  __getLg(renderMode, ctx, defs, gd) {
    if(renderMode === mode.CANVAS) {
      let lg = ctx.createLinearGradient(gd.x1, gd.y1, gd.x2, gd.y2);
      gd.stop.forEach(item => {
        lg.addColorStop(item[1], int2rgba(item[0]));
      });
      return lg;
    }
    else if(renderMode === mode.SVG) {
      let v = {
        tagName: 'linearGradient',
        props: [
          ['x1', gd.x1],
          ['y1', gd.y1],
          ['x2', gd.x2],
          ['y2', gd.y2],
        ],
        children: gd.stop.map(item => {
          return {
            tagName: 'stop',
            props: [
              ['stop-color', int2rgba(item[0])],
              ['offset', item[1] * 100 + '%'],
            ],
          };
        }),
      };
      let uuid = defs.add(v);
      this.__config[NODE_DEFS_CACHE].push(v);
      return 'url(#' + uuid + ')';
    }
  }

  __getRg(renderMode, ctx, defs, gd) {
    if(renderMode === mode.CANVAS) {
      let rg = ctx.createRadialGradient(gd.cx, gd.cy, 0, gd.cx, gd.cy, gd.r);
      gd.stop.forEach(item => {
        rg.addColorStop(item[1], int2rgba(item[0]));
      });
      return rg;
    }
    else if(renderMode === mode.SVG) {
      let v = {
        tagName: 'radialGradient',
        props: [
          ['cx', gd.cx],
          ['cy', gd.cy],
          ['r', gd.r],
        ],
        children: gd.stop.map(item => {
          return {
            tagName: 'stop',
            props: [
              ['stop-color', int2rgba(item[0])],
              ['offset', item[1] * 100 + '%'],
            ],
          };
        }),
      };
      let uuid = defs.add(v);
      this.__config[NODE_DEFS_CACHE].push(v);
      return 'url(#' + uuid + ')';
    }
  }

  __getCg(renderMode, ctx, defs, gd) {
    let { cx, cy, r, deg, stop } = gd;
    let len = stop.length - 1;
    if(stop[len][1] < 1) {
      stop.push([stop[len][0].slice(0), 1]);
    }
    if(stop[0][1] > 0) {
      stop.unshift([stop[0][0].slice(0), 0]);
    }
    let offset = renderMode === mode.CANVAS ? 1.5 : 0.5;
    // 根据2个stop之间的百分比得角度差划分块数，每0.5°一块，不足也算
    let list = [];
    for(let i = 0, len = stop.length; i < len - 1; i++) {
      let begin = stop[i][1] * 360;
      let end = stop[i + 1][1] * 360;
      let diff = end - begin;
      let n = Math.ceil(diff);
      let per = diff / n;
      // 计算每块的2个弧端点
      let bc = stop[i][0];
      let ec = stop[i + 1][0];
      let dc = [ec[0] - bc[0], ec[1] - bc[1], ec[2] - bc[2], ec[3] - bc[3]];
      let pc = [dc[0] / n, dc[1] / n, dc[2] / n, dc[3] / n];
      for(let j = 0; j < n; j++) {
        let [x1, y1] = geom.pointOnCircle(cx, cy, r, begin + per * j + deg - offset);
        let [x2, y2] = geom.pointOnCircle(cx, cy, r, begin + per * j + deg + offset);
        list.push([
          x1, y1,
          x2, y2,
          Math.round(bc[0] + pc[0] * j),
          Math.round(bc[1] + pc[1] * j),
          Math.round(bc[2] + pc[2] * j),
          Math.round(bc[3] + pc[3] * j),
        ]);
      }
    }
    // 最后一段补自己末尾颜色特殊处理
    let end = list[0].slice(0);
    let [x2, y2] = geom.pointOnCircle(cx, cy, r, deg);
    end[2] = x2;
    end[3] = y2;
    let s = stop[stop.length - 1][0];
    end[4] = s[0];
    end[5] = s[1];
    end[6] = s[2];
    end[7] = s[3];
    list.push(end);
    let prev, res = [];
    if(renderMode === mode.CANVAS) {
      for(let i = 0, len = list.length; i < len; i++) {
        let cur = list[i];
        if(prev) {
          let lg = ctx.createLinearGradient(prev[0], prev[1], cur[2], cur[3]);
          lg.addColorStop(0, int2rgba([prev[4], prev[5], prev[6], prev[7]]));
          lg.addColorStop(1, int2rgba([cur[4], cur[5], cur[6], cur[7]]));
          res.push([[[cx, cy], [prev[0], prev[1]], [cur[2], cur[3]]], lg]);
        }
        prev = cur;
      }
    }
    else if(renderMode === mode.SVG) {
      for(let i = 0, len = list.length; i < len; i++) {
        let cur = list[i];
        if(prev) {
          let v = {
            tagName: 'linearGradient',
            props: [
              ['x1', prev[0]],
              ['y1', prev[1]],
              ['x2', cur[2]],
              ['y2', cur[3]],
            ],
            children: [
              {
                tagName: 'stop',
                props: [
                  ['stop-color', int2rgba([prev[4], prev[5], prev[6], prev[7]])],
                  ['offset', '0%'],
                ],
              },
              {
                tagName: 'stop',
                props: [
                  ['stop-color', int2rgba([cur[4], cur[5], cur[6], cur[7]])],
                  ['offset', '100%'],
                ],
              },
            ],
          };
          let uuid = defs.add(v);
          this.__config[NODE_DEFS_CACHE].push(v);
          res.push([[[cx, cy], [prev[0], prev[1]], [cur[2], cur[3]]], 'url(#' + uuid + ')']);
        }
        prev = cur;
      }
    }
    return res;
  }

  // canvas清空自身cache，cacheTotal在Root的自底向上逻辑做，svg仅有cacheTotal
  __cancelCache(onlyTotal) {
    let __config = this.__config;
    let __cacheTotal = __config[NODE_CACHE_TOTAL];
    let __cacheFilter = __config[NODE_CACHE_FILTER];
    let __cacheMask = __config[NODE_CACHE_MASK];
    let __cacheOverflow = __config[NODE_CACHE_OVERFLOW];
    if(!onlyTotal) {
      __config[NODE_CACHE_STYLE] = this.__cacheStyle = {};
      let __cache = __config[NODE_CACHE];
      if(__cache) {
        __cache.release();
      }
    }
    if(__cacheTotal) {
      __cacheTotal.release();
    }
    if(__cacheFilter) {
      inject.releaseCacheCanvas(__cacheFilter.canvas);
      __config[NODE_CACHE_FILTER] = null;
    }
    if(__cacheMask) {
      inject.releaseCacheCanvas(__cacheMask.canvas);
      __config[NODE_CACHE_MASK] = null;
    }
    if(__cacheOverflow) {
      inject.releaseCacheCanvas(__cacheOverflow.canvas);
      __config[NODE_CACHE_OVERFLOW] = null;
    }
  }

  updateStyle(style, cb) {
    let node = this;
    let { root, __config } = node;
    let formatStyle = css.normalize(style);
    // 有root说明被添加渲染过了
    if(root) {
      root.addRefreshTask(node.__task = {
        __before() {
          if(__config[NODE_IS_DESTROYED]) {
            return;
          }
          // 刷新前统一赋值，由刷新逻辑计算最终值避免优先级覆盖问题
          let res = {};
          res[UPDATE_NODE] = node;
          res[UPDATE_STYLE] = formatStyle;
          res[UPDATE_OVERWRITE] = style; // 标识盖原有style样式不仅仅是修改currentStyle，不同于animate
          res[UPDATE_KEYS] = Object.keys(formatStyle).map(i => {
            if(!GEOM.hasOwnProperty(i)) {
              i = parseInt(i);
            }
            return i;
          });
          res[UPDATE_CONFIG] = __config;
          root.__addUpdate(node, __config, root, root.__config, res);
        },
        __after(diff) {
          if(util.isFunction(cb)) {
            cb.call(node, diff);
          }
        },
      });
    }
    // 没有是在如parse()还未添加的时候，可以直接同步覆盖
    else {
      Object.assign(this.currentStyle, formatStyle);
      if(util.isFunction(cb)) {
        cb.call(node, 0);
      }
    }
  }

  updateFormatStyleNoOverwrite(style, cb) {
    let { root, __config } = this;
    if(root) {
      let node = this;
      root.addRefreshTask(node.__task = {
        __before() {
          if(__config[NODE_IS_DESTROYED]) {
            return;
          }
          // 刷新前统一赋值，由刷新逻辑计算最终值避免优先级覆盖问题
          let res = {};
          res[UPDATE_NODE] = node;
          res[UPDATE_STYLE] = style;
          res[UPDATE_KEYS] = Object.keys(style).map(i => {
            if(!GEOM.hasOwnProperty(i)) {
              i = parseInt(i);
            }
            return i;
          });
          res[UPDATE_CONFIG] = __config;
          root.__addUpdate(node, __config, root, root.__config, res);
        },
        __after(diff) {
          if(util.isFunction(cb)) {
            cb.call(node, diff);
          }
        },
      });
    }
  }

  animate(list, options = {}) {
    let animation = new Animation(this, list, options);
    if(this.isDestroyed) {
      animation.__destroy(true);
      return animation;
    }
    this.animationList.push(animation);
    if(options.autoPlay === false) {
      return animation;
    }
    return animation.play();
  }

  removeAnimate(o) {
    if(o instanceof Animation) {
      let i = this.animationList.indexOf(o);
      if(i > -1) {
        o.cancel();
        o.__destroy();
        this.animationList.splice(i, 1);
      }
    }
  }

  clearAnimate() {
    this.animationList.splice(0).forEach(o => {
      o.cancel();
      o.__destroy();
    });
  }

  frameAnimate(cb) {
    if(util.isFunction(cb)) {
      let enter = {
        __after(diff) {
          cb(diff);
        },
        __karasFramecb: cb,
      };
      this.__frameAnimateList.push(enter);
      frame.onFrame(enter);
      return cb;
    }
  }

  removeFrameAnimate(cb) {
    for(let i = 0, list = this.__frameAnimateList, len = list.length; i < len; i++) {
      if(list[i].__karasFramecb === cb) {
        list.splice(i, 1);
        frame.offFrame(cb);
      }
    }
  }

  __computeMeasure(renderMode, ctx, isHost, cb) {
    css.computeMeasure(this, isHost);
    if(util.isFunction(cb)) {
      cb(this);
    }
  }

  __deepScan(cb, options) {
    return cb(this, options);
  }

  // isLayout为false时，为relative/margin/flex/vertical等
  __offsetX(diff, isLayout, lv) {
    super.__offsetX(diff, isLayout);
    if(isLayout) {
      this.__layoutData.x += diff;
    }
    if(lv !== undefined) {
      this.__config[NODE_REFRESH_LV] |= lv;
    }
    this.__sx1 += diff;
    this.__sx2 += diff;
    this.__sx3 += diff;
    this.__sx4 += diff;
  }

  __offsetY(diff, isLayout, lv) {
    super.__offsetY(diff, isLayout);
    if(isLayout) {
      this.__layoutData.y += diff;
    }
    if(lv !== undefined) {
      this.__config[NODE_REFRESH_LV] |= lv;
    }
    this.__sy1 += diff;
    this.__sy2 += diff;
    this.__sy3 += diff;
    this.__sy4 += diff;
  }

  __resizeX(diff, lv) {
    this.computedStyle.width = this.__width += diff;
    this.__clientWidth += diff;
    this.__offsetWidth += diff;
    this.__outerWidth += diff;
    this.__layoutData.w += diff;
    if(diff < 0) {
      this.__config[NODE_LIMIT_CACHE] = false;
    }
    if(lv !== undefined) {
      this.__config[NODE_REFRESH_LV] |= lv;
    }
  }

  __resizeY(diff, lv) {
    this.computedStyle.height = this.__height += diff;
    this.__clientHeight += diff;
    this.__offsetHeight += diff;
    this.__outerHeight += diff;
    this.__layoutData.h += diff;
    if(diff < 0) {
      this.__config[NODE_LIMIT_CACHE] = false;
    }
    if(lv !== undefined) {
      this.__config[NODE_REFRESH_LV] |= lv;
    }
  }

  __spreadByBoxShadowAndFilter(boxShadow, filter) {
    let ox = 0, oy = 0;
    if(Array.isArray(boxShadow)) {
      boxShadow.forEach(item => {
        let [x, y, blur, spread, , inset] = item;
        if(inset !== 'inset') {
          let d = mx.int2convolution(blur);
          d += spread;
          ox = Math.max(ox, x + d);
          oy = Math.max(oy, y + d);
        }
      });
    }
    if(Array.isArray(filter)) {
      for(let i = 0, len = filter.length; i < len; i++) {
        let [k, v] = filter[i];
        if(k === 'blur') {
          let d = mx.int2convolution(v);
          ox = Math.max(ox, d);
          oy = Math.max(oy, d);
        }
      }
    }
    return [ox, oy];
  }

  __releaseWhenEmpty(__cache) {
    if(__cache && __cache.available) {
      __cache.release();
    }
    return true;
  }

  getComputedStyle(key) {
    let computedStyle = this.computedStyle;
    let res = {};
    let keys;
    if(key) {
      if(Array.isArray(key)) {
        keys = key;
      }
      else {
        keys = [key];
      }
      keys = keys.map(s => {
        return STYLE_KEY[style2Upper(s)];
      });
    }
    else {
      keys = Object.keys(computedStyle);
    }
    keys.forEach(k => {
      if(GEOM.hasOwnProperty(k)) {
        res[k] = computedStyle[k];
      }
      else {
        res[STYLE_RV_KEY[k]] = computedStyle[k];
      }
    });
    return res;
  }

  getBoundingClientRect() {
    let { __sx1, __sy1, offsetWidth, offsetHeight, matrixEvent } = this;
    let p1 = mx.calPoint([__sx1, __sy1], matrixEvent);
    let p2 = mx.calPoint([__sx1 + offsetWidth, __sy1], matrixEvent);
    let p3 = mx.calPoint([__sx1 + offsetWidth, __sy1 + offsetHeight], matrixEvent);
    let p4 = mx.calPoint([__sx1, __sy1 + offsetHeight], matrixEvent);
    return {
      left: Math.min(p1[0], Math.min(p2[0], Math.min(p3[0], p4[0]))),
      top: Math.min(p1[1], Math.min(p2[1], Math.min(p3[1], p4[1]))),
      right: Math.max(p1[0], Math.max(p2[0], Math.max(p3[0], p4[0]))),
      bottom: Math.max(p1[1], Math.max(p2[1], Math.max(p3[1], p4[1]))),
      points: [p1, p2, p3, p4],
    };
  }

  get tagName() {
    return this.__tagName;
  }

  get sx() {
    return this.__sx;
  }

  get sy() {
    return this.__sy;
  }

  get clientWidth() {
    return this.__clientWidth || 0;
  }

  get clientHeight() {
    return this.__clientHeight || 0;
  }

  get offsetWidth() {
    return this.__offsetWidth || 0;
  }

  get offsetHeight() {
    return this.__offsetHeight || 0;
  }

  get outerWidth() {
    return this.__outerWidth || 0;
  }

  get outerHeight() {
    return this.__outerHeight || 0;
  }

  // 不考虑margin的范围
  get bbox() {
    let {
      __sx1, __sy1, clientWidth, clientHeight,
      currentStyle: {
        [BORDER_TOP_WIDTH]: borderTopWidth,
        [BORDER_RIGHT_WIDTH]: borderRightWidth,
        [BORDER_BOTTOM_WIDTH]: borderBottomWidth,
        [BORDER_LEFT_WIDTH]: borderLeftWidth,
        [BOX_SHADOW]: boxShadow,
        [FILTER]: filter,
      },
    } = this;
    let [ox, oy] = this.__spreadByBoxShadowAndFilter(boxShadow, filter);
    clientWidth += borderLeftWidth[0] + borderRightWidth[0];
    clientHeight += borderTopWidth[0] + borderBottomWidth[0];
    return [__sx1 - ox, __sy1 - oy, __sx1 + clientWidth + ox, __sy1 + clientHeight + oy];
  }

  get listener() {
    return this.__listener;
  }

  get matrix() {
    return this.__matrix;
  }

  get matrixEvent() {
    return this.__matrixEvent;
  }

  get renderMatrix() {
    return this.__renderMatrix;
  }

  get style() {
    return this.__style;
  }

  get computedStyle() {
    return this.__computedStyle;
  }

  get animationList() {
    return this.__animationList;
  }

  get currentStyle() {
    return this.__currentStyle;
  }

  get isShadowRoot() {
    return !this.parent && this.host && this.host !== this.root;
  }

}

export default Xom;
