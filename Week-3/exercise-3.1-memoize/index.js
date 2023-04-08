function memoize(fn) {
  let store = new Map();
  let storeIt = (key, value) => store.set(key, value); //helper function
  let hasValue = (key) => store.get(key); //helper function
  let createKey = (...args) => args.sort((a, b) => a - b); //helper function

  /**
   * Store manager
   * @param {Function} fn final function for which memoization is applied
   * @param {Array} args arguments for the final function
   * @returns output of the final function
   */
  let storeManager = (fn, args) => {
    let key = createKey(...args).toString();
    if (hasValue(key) != null) {
      return hasValue(key);
    } else {
      let output = fn(...args);
      storeIt(key.toString(), output);
      return output;
    }
  };

  return function (...args) {
    return storeManager(fn, args);
  };
}

function add(a, b, c) {
  console.log(">> computing: ", arguments);
  return a + b + c;
}
function addTwo(a, b) {
  console.log(">> computing: ", arguments);
  return a + b ;
}

const memoizeAdd = memoize(add);
const memoizeAddTwo = memoize(addTwo);

console.log(memoizeAdd(8, 6, 10)); //24 --> computing
console.log(memoizeAdd(8, 2, 10)); //20   --> computing
console.log(memoizeAdd(8, 6, 10)); //24
console.log(memoizeAdd(2, 10, 8)); //20   
