/* Fibonacci series using iterators */
const fib = (num) => ({
  [Symbol.iterator]: function () {
    console.log("The Fibonacci series is: ")
    let i = 1;
    let old = 0,
      current = 0,
      temp = 0;
    return {
      next: () => {
        if (i > num) {
          return { done: true };
        }
        i++;
        temp = current;
        current = old + current || 1;
        old = temp;
        return { value: old, done: false };
      },
    };
  },
});

console.log(...fib(8));
