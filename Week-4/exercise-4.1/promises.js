function MyPromise(callback) {
  let state = "pending";
  let value;
  function resolve(newValue) {
    if (state == "pending") {
      state = "resolved";
      value = newValue;
      return;
    }
  }
  function reject(newValue) {
    if (state == "pending") {
      state = "rejected";
      value = newValue;
      return;
    }
  }

  function handle(handler) {
    if (
      handler.onResolved &&
      typeof handler.onResolved === "function" &&
      state === "resolved"
    ) {
      value = handler.onResolved(value);
    }
    if (
      handler.onRejected &&
      typeof handler.onRejected === "function" &&
      state === "rejected"
    ) {
      value = handler.onRejected(value);
    }
  }
  this.then = function (onResolved, onRejected) {
    handle({
      onResolved: onResolved,
      onRejected: onRejected,
    });
    return this;
  };

  this.catch = function (onError) {
    if (onError && typeof onError === "function" && state === "rejected") {
      value = onError(value);
    }
    return this;
  };

  callback(resolve, reject);
}

function generateNumber() {
  return Math.floor(Math.random() * 100);
}

const getNumber = new MyPromise((resolve, reject) => {
  let randomNumber = generateNumber();
  if (randomNumber % 5 === 0) {
    reject(randomNumber);
  }
  resolve(randomNumber);
});

getNumber
  .then((randomNumber) => {
    console.log("Resolved: ", randomNumber);
  })
  .catch((randomNumber) => console.log("Rejected: ", randomNumber));

