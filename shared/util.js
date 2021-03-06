const humanMemorySize = (b, si) => {
  let bytes = Number(b);
  const thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`;
  }
  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  do {
    bytes /= thresh;
    u += 1;
  } while (Math.abs(bytes) >= thresh && u < units.length - 1);
  return `${bytes.toFixed(1)} ${units[u]}`;
};

const padLeft = (input, len) => {
  const str = input && input.toString() ? input.toString() : '';
  return len > str.length
    ? (new Array(len - str.length + 1)).join(' ') + str
    : str;
};

const padRight = (input, len) => {
  const str = input && input.toString() ? input.toString() : '';
  return len > str.length
    ? str + (new Array(len - str.length + 1)).join(' ')
    : str;
};

const padZeros = (num, numZeros) => (Array(numZeros).join('0') + num).slice(-numZeros);

const numCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const isTrue = (value) => {
  const val = typeof value === 'string'
    ? value.trim().toLowerCase()
    : value;

  switch (val) {
    case true:
    case 'true':
    case 1:
    case '1':
    case 'on':
    case 'yes':
      return true;
    default:
      return false;
  }
};

const isClass = (func) => (
  typeof func === 'function' && /^class\s/.test(Function.prototype.toString.call(func))
);

module.exports = {
  humanMemorySize,
  padLeft,
  padRight,
  padZeros,
  numCommas,
  isJson,
  isClass,
  isTrue
};
