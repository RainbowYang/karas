export default {
  position: /(([-+]?[\d.]+[pxremvwh%]*)|(left|top|right|bottom|center)){1,2}/ig,
  // tfo: /((-?[\d.]+(px|%)?)|(left|top|right|bottom|center)){1,2}/ig,
  gradient: /\b(\w+)-?gradient\((.+)\)/i,
  img: /(?:\burl\((['"]?)(.*?)\1\))|(?:\b((data:)))/i,
};
