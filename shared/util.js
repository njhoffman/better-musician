export const humanMemorySize = (bytes, si) => {
  var thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }
  var units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  var u = -1;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.abs(bytes) >= thresh && u < units.length - 1);
  return bytes.toFixed(1) + ' ' + units[u];
}


export const padLeft = (str, len) => {
  return len > str.length
    ? (new Array(len - str.length + 1)).join(' ') + str
    : str;
};

export const padRight = (str, len) => {
  return len > str.length
    ? str + (new Array(len - str.length + 1)).join(' ')
    : str;
};

export const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

