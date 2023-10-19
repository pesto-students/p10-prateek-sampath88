const useDebounce = (func, timeout = 300) => {
  let timer;
  function handler() {
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      const props = Array.from(args);
      func(...props);
    }, timeout);
  }

  return handler;
};

export default useDebounce;
