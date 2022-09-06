import enums from '../util/enums';
import unit from '../style/unit';
import level from './level';

const {
  STYLE_KEY: {
    DISPLAY,
    TOP,
    BOTTOM,
    POSITION,
    HEIGHT,
  },
} = enums;
const { AUTO, PX, PERCENT } = unit;
const { REFLOW } = level;

function offsetAndResizeByNodeOnY(node, root, reflowHash, dy, inDirectAbsList) {
  if(dy) {
    let last;
    do {
      // component的sr没有next兄弟，视为component的next
      while(node.isShadowRoot) {
        node = node.host;
      }
      last = node;
      let isContainer, parent = node.domParent;
      if(parent) {
        let cs = parent.computedStyle;
        let ps = cs[POSITION];
        isContainer = parent === root || parent.isShadowRoot || ps === 'relative' || ps === 'absolute';
      }
      // 先偏移next，忽略有定位的absolute，本身非container也忽略
      let next = node.next;
      let container;
      while(next) {
        if(next.computedStyle[DISPLAY] !== 'none') {
          if(next.currentStyle[POSITION] === 'absolute') {
            let { [TOP]: top, [BOTTOM]: bottom, [HEIGHT]: height } = next.currentStyle;
            if(top.u === AUTO) {
              if(bottom.u === AUTO || bottom.u === PX) {
                next.__offsetY(dy, true, REFLOW);
                next.clearCache();
              }
              else if(bottom.u === PERCENT) {
                let v = (1 - bottom.v * 0.01) * dy;
                next.__offsetY(v, true, REFLOW);
                next.clearCache();
              }
            }
            else if(top.u === PERCENT) {
              let v = top.v * 0.01 * dy;
              next.__offsetY(v, true, REFLOW);
              next.clearCache();
            }
            // 高度百分比需发生变化的重新布局，需要在容器内
            if(height.u === PERCENT) {
              if(isContainer) {
                parent.__layoutAbs(parent, parent.__layoutData, next);
              }
              else {
                if(!container) {
                  container = parent;
                  while(container) {
                    if(container === root || container.isShadowRoot) {
                      break;
                    }
                    let cs = container.currentStyle;
                    if(cs[POSITION] === 'absolute' || cs[POSITION] === 'relative') {
                      break;
                    }
                    container = container.domParent;
                  }
                }
                inDirectAbsList.push([parent, container, next]);
              }
            }
          }
          else {
            next.__offsetY(dy, true, REFLOW);
            next.clearCache();
          }
        }
        next = next.next;
      }
      // root本身没domParent
      if(!parent) {
        break;
      }
      node = parent;
      // parent判断是否要resize
      let { currentStyle } = node;
      let isAbs = currentStyle[POSITION] === 'absolute';
      let need;
      if(isAbs) {
        if(currentStyle[HEIGHT].u === AUTO
          && (currentStyle[TOP].u === AUTO || currentStyle[BOTTOM].u === AUTO)) {
          need = true;
        }
      }
      // height不定则需要
      else if(currentStyle[HEIGHT].u === AUTO) {
        need = true;
      }
      if(need) {
        node.__resizeY(dy, REFLOW);
        node.clearCache();
      }
      // abs或者高度不需要继续向上调整提前跳出
      else {
        break;
      }
      if(node === root) {
        break;
      }
    }
    while(true);
    // 最后一个递归向上取消总缓存，防止过程中重复next多次无用递归
    while(last) {
      last.clearCache();
      last = last.domParent;
    }
  }
}

function clearUniqueReflowId(hash) {
  for(let i in hash) {
    if(hash.hasOwnProperty(i)) {
      let { node } = hash[i];
      delete node.__uniqueReflowId;
    }
  }
}

function getMergeMargin(topList, bottomList) {
  let total = 0;
  let max = topList[0];
  let min = topList[0];
  topList.forEach(item => {
    total += item;
    max = Math.max(max, item);
    min = Math.min(min, item);
  });
  bottomList.forEach(item => {
    total += item;
    max = Math.max(max, item);
    min = Math.min(min, item);
  });
  // 正数取最大，负数取最小，正负则相加
  let diff = 0;
  if(max > 0 && min > 0) {
    diff = Math.max(max, min) - total;
  }
  else if(max < 0 && min < 0) {
    diff = Math.min(max, min) - total;
  }
  else if(max !== 0 || min !== 0) {
    diff = max + min - total;
  }
  return diff;
}

export default {
  offsetAndResizeByNodeOnY,
  clearUniqueReflowId,
  getMergeMargin,
};
