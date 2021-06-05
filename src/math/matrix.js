// 生成4*4单位矩阵
function identity() {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

// 矩阵a*b，固定两个matrix都是长度16
function multiply(a, b) {
  if(isE(a)) {
    return b;
  }
  if(isE(b)) {
    return a;
  }
  let c = [];
  for(let i = 0; i < 4; i++) {
    let a0 = a[i];
    let a1 = a[i + 4];
    let a2 = a[i + 8];
    let a3 = a[i + 12];
    c[i] = a0 * b[0] + a1 * b[1] + a2 * b[2] + a3 * b[3];
    c[i + 4] = a0 * b[4] + a1 * b[5] + a2 * b[6] + a3 * b[7];
    c[i + 8] = a0 * b[8] + a1 * b[9] + a2 * b[10] + a3 * b[11];
    c[i + 12] = a0 * b[12] + a1 * b[13] + a2 * b[14] + a3 * b[15];
  }
  return c;
}

function calPoint(point, m) {
  let [x, y, z, w] = point;
  if(w === undefined) {
    w = 1;
  }
  if(m && !isE(m)) {
    z = z || 0;
    let [a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, a4, b4, c4, d4] = m;
    w *= x * d1 + y * d2 + z * d3 + d4;
    return [
      (x * a1 + y * a2 + z * a3 + a4),
      (x * b1 + y * b2 + z * b3 + b4),
      (x * c1 + y * c2 + z * c3 + c4),
      w
    ];
  }
  return [x, y, z, w];
}

/**
 * 初等行变换求3*3特定css的matrix方阵，一维6长度
 * https://blog.csdn.net/iloveas2014/article/details/82930946
 * @param m
 * @returns {number[]|*}
 */
function inverse(m) {
  if(m.length === 16) {
    return inverse4(m);
  }
  let [a, b, c, d, e, f] = m;
  if(a === 1 && b === 0 && c === 0 && d === 1 && e === 0 && f === 0) {
    return m;
  }
  let divisor = a * d - b * c;
  if(divisor === 0) {
    return m;
  }
  return [d / divisor, -b / divisor, -c / divisor, a / divisor,
    (c * f - d * e) / divisor, (b * e - a * f) / divisor];
}

function isE(m) {
  return m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 0
    && m[4] === 0 && m[5] === 1 && m[6] === 0 && m[7] === 0
    && m[8] === 0 && m[9] === 0 && m[10] === 1 && m[11] === 0
    && m[12] === 0 && m[13] === 0 && m[14] === 0 && m[15] === 1;
}

/**
 * 4*4 行列式的值
 * @returns {number}
 */
function det4([a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44]) {
  return a11 * (a22 * (a33 * a44 - a43 * a34) - a23 * (a32 * a44 - a42 * a34) + a24 * (a32 * a43 - a42 * a33))
    - a12 * (a21 * (a33 * a44 - a43 * a34) - a23 * (a31 * a44 - a41 * a34) + a24 * (a31 * a43 - a41 * a33))
    + a13 * (a21 * (a32 * a44 - a42 * a34) - a22 * (a31 * a44 - a41 * a34) + a24 * (a31 * a42 - a41 * a32))
    - a14 * (a21 * (a32 * a43 - a42 * a33) - a22 * (a31 * a43 - a41 * a33) + a23 * (a31 * a42 - a41 * a32))
}

/**
 * 递归写任意阶的伴随矩阵，但是 karas 这里用不到，所以直接写出来比较清晰明了
 * @returns {number[]} 返回伴随矩阵
 */
function adjoint4([a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44]) {
  let c11 = a22 * a33 * a44 + a23 * a34 * a42 + a24 * a32 * a43 - a22 * a34 * a43 - a23 * a32 * a44 - a24 * a33 * a42;
  let c21 = a12 * a34 * a43 + a13 * a32 * a44 + a14 * a33 * a42 - a12 * a33 * a44 - a13 * a34 * a42 - a14 * a32 * a43;
  let c31 = a12 * a23 * a44 + a13 * a24 * a42 + a14 * a22 * a43 - a12 * a24 * a43 - a13 * a22 * a44 - a14 * a23 * a42;
  let c41 = a12 * a24 * a33 + a13 * a22 * a34 + a14 * a23 * a32 - a12 * a23 * a34 - a13 * a24 * a32 - a14 * a22 * a33;

  let c12 = a21 * a34 * a43 + a23 * a31 * a44 + a24 * a33 * a41 - a21 * a33 * a44 - a23 * a34 * a41 - a24 * a31 * a43;
  let c22 = a11 * a33 * a44 + a13 * a34 * a41 + a14 * a31 * a43 - a11 * a34 * a43 - a13 * a31 * a44 - a14 * a33 * a41;
  let c32 = -1 * (a11 * a23 * a44 - a13 * a21 * a44 + a14 * a21 * a43 - a11 * a24 * a43 + a13 * a41 * a24 - a14 * a23 * a41);
  let c42 = a11 * a23 * a34 + a13 * a24 * a31 + a14 * a21 * a33 - a11 * a24 * a33 - a13 * a21 * a34 - a14 * a23 * a31;

  let c13 = a21 * a32 * a44 + a22 * a34 * a41 + a24 * a31 * a42 - a21 * a34 * a42 - a22 * a31 * a44 - a24 * a32 * a41;
  let c23 = a11 * a34 * a42 + a12 * a31 * a44 + a14 * a32 * a41 - a11 * a32 * a44 - a12 * a34 * a41 - a14 * a31 * a42;
  let c33 = a11 * a22 * a44 + a12 * a24 * a41 + a14 * a21 * a42 - a11 * a24 * a42 - a12 * a21 * a44 - a14 * a22 * a41;
  let c43 = a11 * a24 * a32 + a12 * a21 * a34 + a14 * a22 * a31 - a11 * a22 * a34 - a12 * a24 * a31 - a14 * a21 * a32;

  let c14 = a21 * a33 * a42 + a22 * a31 * a43 + a23 * a32 * a41 - a21 * a32 * a43 - a22 * a33 * a41 - a23 * a31 * a42;
  let c24 = a11 * a32 * a43 + a12 * a33 * a41 + a13 * a31 * a42 - a11 * a33 * a42 - a12 * a31 * a43 - a13 * a32 * a41;
  let c34 = a11 * a23 * a42 + a12 * a21 * a43 + a13 * a22 * a41 - a11 * a22 * a43 - a12 * a23 * a41 - a13 * a21 * a42;
  let c44 = a11 * a22 * a33 + a12 * a23 * a31 + a13 * a21 * a32 - a11 * a23 * a32 - a12 * a21 * a33 - a13 * a22 * a31;

  return [c11, c12, c13, c14, c21, c22, c23, c24, c31, c32, c33, c34, c41, c42, c43, c44];
}

/**
 * 求任意4*4矩阵的逆矩阵，行列式为 0 则返回单位矩阵兜底
 * 格式：matrix3d(a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, a4, b4, c4, d4)
 * 参见: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix3d()
 * 对应：
 * [
 *   a1,a2,a3,a4,
 *   b1,b2,b3,b4,
 *   c1,c2,c3,c4,
 *   d1,d2,d3,d4,
 * ]
 *
 * 根据公式 A* = |A|A^-1 来计算
 * A* 表示矩阵 A 的伴随矩阵，A^-1 表示矩阵 A 的逆矩阵，|A| 表示行列式的值
 *
 * @returns {number[]}
 */
function inverse4(m) {
  if(m.length !== 16) {
    throw new Error('The length of matrix4 must be 16');
  }
  let det = det4(m);
  // det 为 0，返回单位矩阵兜底
  if(det === 0) {
    return [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]
  }
  return adjoint4(m).map(a => a / det);
}

/**
 * 转换为webgl的mat4，即4*4矩阵，一维表示，同时位移转成[-1,1]区间表示
 * @param m
 * @param width
 * @param height
 * @returns {(*|number)[]|number[]|*}
 */
function m2Mat4(m, width, height) {
  if(m && m.length === 16) {
    m = m.slice(0);
    m[13] /= width;
    m[14] /= height;
    return m;
  }
  if(m && m.length === 6) {
    m = m.slice(0);
    return [
      m[0], m[1], 0, 0,
      m[2], m[3], 0, 0,
      0, 0, 1, 0,
      // m[4] / width, m[5] / height, 0, 1,
      m[4], m[5], 0, 1,
    ];
  }
  return m;
}

// 将4*4的16长度矩阵转成css/canvas的6位标准使用，忽略transform3d
function m2m6(m) {
  return [
    m[0],
    m[1],
    m[4],
    m[5],
    m[12],
    m[13],
  ];
}

export default {
  identity,
  multiply,
  calPoint,
  inverse,
  isE,
  // m2Mat4,
  m2m6,
};
