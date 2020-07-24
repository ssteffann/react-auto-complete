export const highlightString = (subStr, str, cssClass) => {
  if(!subStr) {
    return str;
  }
  const reg = new RegExp(subStr, 'gi');

  return str.replace(reg, (res) => `<span class="${cssClass}">${res}</span>`);
}

export const debounce = (callback, wait) => {
  let timeout;
  return function (...args) {
    const self = this;
    const later = function () {
     timeout = null;
     callback.apply(self, args);
    }

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
  }
}
