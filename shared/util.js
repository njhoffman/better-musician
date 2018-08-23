export const humanMemorySize = (bytes, si) => {
  bytes = Number(bytes);
  const thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }
  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.abs(bytes) >= thresh && u < units.length - 1);
  return bytes.toFixed(1) + ' ' + units[u];
}

export const padLeft = (input, len) => {
  const str = input && input.toString() || '';
  return len > str.length
    ? (new Array(len - str.length + 1)).join(' ') + str
    : str;
};

export const padRight = (input, len) => {
  const str = input && input.toString() || '';
  return len > str.length
    ? str + (new Array(len - str.length + 1)).join(' ')
    : str;
};

export const padZeros = (num, numZeros) => (Array(numZeros).join('0') + num).slice(-numZeros);

export const numCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const isClass = (func) => (
  typeof func === 'function' &&
  /^class\s/.test(Function.prototype.toString.call(func))
);
