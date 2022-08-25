const STYLE_KEY = {
  POSITION: 0,
  DISPLAY: 1,
  TOP: 2,
  RIGHT: 3,
  BOTTOM: 4,
  LEFT: 5,
  MARGIN_TOP: 6,
  MARGIN_RIGHT: 7,
  MARGIN_BOTTOM: 8,
  MARGIN_LEFT: 9,
  PADDING_TOP: 10,
  PADDING_RIGHT: 11,
  PADDING_BOTTOM: 12,
  PADDING_LEFT: 13,
  FONT_SIZE: 14,
  FONT_FAMILY: 15,
  COLOR: 16,
  FONT_STYLE: 17,
  FONT_WEIGHT: 18,
  LINE_HEIGHT: 19,
  BACKGROUND_IMAGE: 20,
  BACKGROUND_COLOR: 21,
  BACKGROUND_SIZE: 22,
  BACKGROUND_REPEAT: 23,
  BACKGROUND_POSITION_X: 24,
  BACKGROUND_POSITION_Y: 25,
  BORDER_TOP_WIDTH: 26,
  BORDER_RIGHT_WIDTH: 27,
  BORDER_BOTTOM_WIDTH: 28,
  BORDER_LEFT_WIDTH: 29,
  BORDER_TOP_COLOR: 30,
  BORDER_RIGHT_COLOR: 31,
  BORDER_BOTTOM_COLOR: 32,
  BORDER_LEFT_COLOR: 33,
  BORDER_TOP_STYLE: 34,
  BORDER_RIGHT_STYLE: 35,
  BORDER_BOTTOM_STYLE: 36,
  BORDER_LEFT_STYLE: 37,
  BORDER_TOP_LEFT_RADIUS: 38,
  BORDER_TOP_RIGHT_RADIUS: 39,
  BORDER_BOTTOM_RIGHT_RADIUS: 40,
  BORDER_BOTTOM_LEFT_RADIUS: 41,
  WIDTH: 42,
  HEIGHT: 43,
  FLEX_GROW: 44,
  FLEX_SHRINK: 45,
  FLEX_BASIS: 46,
  FLEX_DIRECTION: 47,
  JUSTIFY_CONTENT: 48,
  ALIGN_ITEMS: 49,
  ALIGN_SELF: 50,
  TEXT_ALIGN: 51,
  TRANSFORM_ORIGIN: 52,
  VISIBILITY: 53,
  OPACITY: 54,
  Z_INDEX: 55,
  TRANSFORM: 56,
  TRANSLATE_X: 57,
  TRANSLATE_Y: 58,
  TRANSLATE_Z: 59,
  SCALE_X: 60,
  SCALE_Y: 61,
  SCALE_Z: 62,
  SKEW_X: 63,
  SKEW_Y: 64,
  ROTATE_X: 65,
  ROTATE_Y: 66,
  ROTATE_Z: 67,
  ROTATE_3D: 68,
  PERSPECTIVE: 69,
  PERSPECTIVE_ORIGIN: 70,
  FILTER: 71,
  BOX_SHADOW: 72,
  POINTER_EVENTS: 73,
  OVERFLOW: 74,
  MIX_BLEND_MODE: 75,
  BACKGROUND_CLIP: 76,
  WHITE_SPACE: 77,
  TEXT_OVERFLOW: 78,
  LETTER_SPACING: 79,
  LINE_CLAMP: 80,
  ORDER: 81,
  FLEX_WRAP: 82,
  ALIGN_CONTENT: 83,
  TEXT_STROKE_WIDTH: 84,
  TEXT_STROKE_COLOR: 85,
  TEXT_STROKE_OVER: 86,
  WRITING_MODE: 87,
  // GEOM
  FILL: 88,
  STROKE: 89,
  STROKE_WIDTH: 90,
  STROKE_DASHARRAY: 91,
  STROKE_DASHARRAY_STR: 92,
  STROKE_LINECAP: 93,
  STROKE_LINEJOIN: 94,
  STROKE_MITERLIMIT: 95,
  FILL_RULE: 96,
  // 无此样式，仅cache或特殊情况需要
  MATRIX: 97,
  BORDER_TOP: 98,
  BORDER_RIGHT: 99,
  BORDER_BOTTOM: 100,
  BORDER_LEFT: 101,
  TRANSLATE_PATH: 102,
};

const STYLE2LOWER_MAP = {};
function style2Lower(s) {
  let res = STYLE2LOWER_MAP[s];
  if(!res) {
    res = STYLE2LOWER_MAP[s] = s.toLowerCase().replace(/_([a-z])/g, function($0, $1) {
      return $1.toUpperCase();
    });
  }
  return res;
}

const STYLE2UPPER_MAP = {};
function style2Upper(s) {
  let res = STYLE2UPPER_MAP[s];
  if(!res) {
    res = STYLE2UPPER_MAP[s] = s.replace(/([a-z\d_])([A-Z])/g, function($0, $1, $2) {
      return $1 + '_' + $2;
    }).toUpperCase();
  }
  return res;
}

const STYLE_R_KEY = {};
const STYLE_RV_KEY = {};
const STYLE_V_KEY = {};
Object.keys(STYLE_KEY).forEach(k => {
  let k2 = STYLE_KEY[k];
  STYLE_R_KEY[k2] = k;
  let l = style2Lower(k);
  STYLE_RV_KEY[k2] = l;
  STYLE_V_KEY[l] = k2;
});

// 节点使用
const NODE_KEY = {
  NODE_DOM_PARENT: 0,
  NODE_OPACITY: 1,
  NODE_MATRIX: 2,
  NODE_MATRIX_EVENT: 3,
  NODE_CACHE: 4,
  NODE_CACHE_TOTAL: 5,
  NODE_CACHE_FILTER: 6,
  NODE_CACHE_MASK: 7,
  NODE_CACHE_OVERFLOW: 8,
  NODE_STRUCT: 9,
  NODE_TAG_NAME: 10,
  NODE_CURRENT_STYLE: 11,
  NODE_CURRENT_PROPS: 12,
  NODE_COMPUTED_STYLE: 13,
  NODE_CACHE_STYLE: 14,
  NODE_CACHE_PROPS: 15,
  NODE_LIMIT_CACHE: 16,
  NODE_IS_MASK: 17,
  NODE_IS_INLINE: 18,
  NODE_HAS_CONTENT: 19,
  NODE_REFRESH_LV: 20,
  NODE_IS_DESTROYED: 21,
  NODE_STYLE: 22,
  NODE_UPDATE_HASH: 23,
  NODE_UNIQUE_UPDATE_ID: 24,
  NODE_DEFS_CACHE: 25,
  NODE_PERSPECTIVE_MATRIX: 26,
  NODE_VIRTUAL_DOM: 27,
  NODE_CACHE_AS_BITMAP: 28,
};

export default {
  STYLE_KEY, // 大写常量为k，数字为值
  STYLE_R_KEY, // 数字为k，大写常量为值
  STYLE_RV_KEY, // 数字为k，小写为值
  STYLE_V_KEY, // 小写为k，数字为值
  style2Lower,
  style2Upper,
  NODE_KEY,
  ELLIPSIS: '…',
};
