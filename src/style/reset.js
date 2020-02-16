import util from '../util/util';

const DOM = {
  position: 'static',
  display: 'block',
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto',
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  fontSize: 'inherit',
  fontFamily: 'inherit',
  color: 'inherit',
  fontStyle: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'normal',
  backgroundColor: 'transparent',
  backgroundSize: 'auto',
  backgroundRepeat: 'repeat',
  backgroundPositionX: 0,
  backgroundPositionY: 0,
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
  borderLeftWidth: 0,
  borderTopColor: '#000',
  borderRightColor: '#000',
  borderBottomColor: '#000',
  borderLeftColor: '#000',
  borderTopStyle: 'solid',
  borderRightStyle: 'solid',
  borderBottomStyle: 'solid',
  borderLeftStyle: 'solid',
  width: 'auto',
  height: 'auto',
  flexGrow: 0,
  flexShrink: 1,
  flexBasis: 'auto',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  textAlign: 'inherit',
  transformOrigin: 'center',
  visibility: 'visible',
  opacity: 1,
  zIndex: 0,
  transform: null,
  translateX: 0,
  translateY: 0,
  scaleX: 1,
  scaleY: 1,
  skewX: 0,
  skewY: 0,
  rotateZ: 0,
};

const GEOM = {
  fill: 'transparent',
  stroke: '#000',
  strokeWidth: 1,
  strokeDasharray: '',
  strokeLinecap: 'butt',
};

let dom = [];
Object.keys(DOM).forEach(k => {
  let v = DOM[k];
  dom.push({
    k,
    v,
  });
});

let geom = util.clone(dom);
Object.keys(GEOM).forEach(k => {
  let v = GEOM[k];
  geom.push({
    k,
    v,
  });
});

export default {
  DOM,
  GEOM,
  XOM: Object.assign(DOM, GEOM),
  dom,
  geom,
};
