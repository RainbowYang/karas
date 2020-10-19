import Geom from './Geom';
import mode from '../node/mode';
import util from '../util/util';
import painter from '../util/painter';
import geom from '../math/geom';

let { isNil } = util;

function concatPointAndControl(point, control) {
  if(Array.isArray(control) && (control.length === 2 || control.length === 4)
    && Array.isArray(point) && point.length === 2) {
    return control.concat(point);
  }
  return point;
}

class Polyline extends Geom {
  constructor(tagName, props) {
    super(tagName, props);
    // 所有点的列表
    if(this.isMulti) {
      this.__points = [[]];
      this.__controls = [[]];
    }
    else {
      this.__points = [];
      // 控制点
      this.__controls = [];
    }
    if(Array.isArray(props.controls)) {
      this.__controls = props.controls;
    }
    if(Array.isArray(props.points)) {
      this.__points = props.points;
    }
  }

  __getPoints(originX, originY, width, height, points, isControl) {
    return points.map((item, i) => {
      if(!Array.isArray(item)) {
        return;
      }
      let len = item.length;
      if(isControl) {
        if(len !== 0 && len !== 2 && len !== 4) {
          return;
        }
      }
      else {
        if(len !== 0 && len !== 2) {
          return;
        }
      }
      let res = [];
      for(let i = 0; i < len; i++) {
        if(i % 2 === 0) {
          res.push(originX + item[i] * width);
        }
        else {
          res.push(originY + item[i] * height);
        }
      }
      return res;
    });
  }

  render(renderMode, lv, ctx, defs) {
    let res = super.render(renderMode, lv, ctx, defs);
    if(res.break) {
      return res;
    }
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
    } = res;
    let { width, height, points, controls, __cacheProps, isMulti } = this;
    let rebuild = true;
    if(isNil(__cacheProps.points)) {
      if(isMulti) {
        __cacheProps.points = points.map(item => {
          if(Array.isArray(item)) {
            return this.__getPoints(originX, originY, width, height, item);
          }
        });
      }
      else {
        __cacheProps.points = this.__getPoints(originX, originY, width, height, points);
      }
    }
    if(isNil(__cacheProps.controls)) {
      if(isMulti) {
        __cacheProps.controls = controls.map(item => {
          if(Array.isArray(item)) {
            return this.__getPoints(originX, originY, width, height, item, true);
          }
          return item;
        });
      }
      else {
        __cacheProps.controls = this.__getPoints(originX, originY, width, height, controls, true);
      }
    }
    let pts = __cacheProps.points;
    let cls = __cacheProps.controls;
    // points/controls有变化就需要重建顶点
    if(rebuild) {
      if(isMulti) {
        let list = pts.filter(item => Array.isArray(item)).map((item, i) => {
          let cl = cls[i];
          if(Array.isArray(item)) {
            return item.map((point, j) => {
              if(j) {
                return concatPointAndControl(point, cl && cl[j - 1]);
              }
              return point;
            });
          }
        });
        if(renderMode === mode.CANVAS) {
          __cacheProps.list = list;
        }
        else if(renderMode === mode.SVG) {
          let d = '';
          list.forEach(item => d += painter.svgPolygon(item));
          __cacheProps.d = d;
        }
      }
      else {
        let list = pts.filter(item => Array.isArray(item)).map((point, i) => {
          if(i) {
            return concatPointAndControl(point, cls[i - 1]);
          }
          return point;
        });
        if(renderMode === mode.CANVAS) {
          __cacheProps.list = list;
        }
        else if(renderMode === mode.SVG) {
          __cacheProps.d = painter.svgPolygon(list);
        }
      }
    }
    if(renderMode === mode.CANVAS) {
      ctx.beginPath();
      let list = __cacheProps.list;
      if(isMulti) {
        list.forEach(item => painter.canvasPolygon(ctx, item));
      }
      else {
        painter.canvasPolygon(ctx, list);
      }
      ctx.fill();
      if(strokeWidth > 0) {
        ctx.stroke();
      }
      ctx.closePath();
    }
    else if(renderMode === mode.SVG) {
      let props = [
        ['d', __cacheProps.d],
        ['fill', fill],
        ['stroke', stroke],
        ['stroke-width', strokeWidth]
      ];
      this.__propsStrokeStyle(props, strokeDasharrayStr, strokeLinecap, strokeLinejoin, strokeMiterlimit);
      this.addGeom('path', props);
    }
    return res;
  }

  get points() {
    return this.getProps('points');
  }

  get controls() {
    return this.getProps('controls');
  }

  get bbox() {
    let { isMulti, __cacheProps: { points, controls }, computedStyle: { strokeWidth } } = this;
    let bbox = super.bbox;
    let half = strokeWidth * 0.5;
    if(!isMulti) {
      points = [points];
      controls = [controls];
    }
    points.forEach((pointList, i) => {
      if(!pointList || pointList.length < 2 || pointList[0].length < 2 || pointList[1].length < 2) {
        return;
      }
      let controlList = controls[i];
      let [xa, ya] = pointList[0];
      for(let i = 1, len = pointList.length; i < len; i++) {
        let [xb, yb] = pointList[i];
        let c = controlList[i - 1];
        if(c && c.length === 4) {
          let bezierBox = geom.bboxBezier(xa, ya, c[0], c[1], c[2], c[3], xb, yb);
          bbox[0] = Math.min(bbox[0], bezierBox[0] - half);
          bbox[1] = Math.min(bbox[0], bezierBox[1] - half);
          bbox[2] = Math.max(bbox[0], bezierBox[2] + half);
          bbox[3] = Math.max(bbox[0], bezierBox[3] + half);
        }
        else if(c && c.length === 2) {
          let bezierBox = geom.bboxBezier(xa, ya, c[0], c[1], xb, yb);
          bbox[0] = Math.min(bbox[0], bezierBox[0] - half);
          bbox[1] = Math.min(bbox[0], bezierBox[1] - half);
          bbox[2] = Math.max(bbox[0], bezierBox[2] + half);
          bbox[3] = Math.max(bbox[0], bezierBox[3] + half);
        }
        else {
          bbox[0] = Math.min(bbox[0], xa - half);
          bbox[1] = Math.min(bbox[0], xb - half);
          bbox[2] = Math.max(bbox[0], xa + half);
          bbox[3] = Math.max(bbox[0], xb + half);
        }
        xa = xb;
        ya = yb;
      }
    });
    return bbox;
  }
}

export default Polyline;
