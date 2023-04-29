class MyPromise {
  constructor(handler) {
    this.status = "pending";
    this.value = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === "pending") {
        this.status = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn(value));
      }
    };

    const reject = (value) => {
      if (this.status === "pending") {
        this.status = "rejected";
        this.value = value;
        this.onRejectedCallbacks.forEach((fn) => fn(value));
      }
    };

    try {
      handler(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.status === "pending") {
        this.onFulfilledCallbacks.push(() => {
          try {
            if (onFulfilled && typeof onFulfilled === "function") {
              const fulfilledFromLastPromise = onFulfilled(this.value);
              if (fulfilledFromLastPromise instanceof MyPromise) {
                fulfilledFromLastPromise.then(resolve, reject);
              } else {
                resolve(fulfilledFromLastPromise);
              }
            }
          } catch (err) {
            reject(err);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            if (onRejected && typeof onRejected === "function") {
              const rejectedFromLastPromise = onRejected(this.value);
              if (rejectedFromLastPromise instanceof MyPromise) {
                rejectedFromLastPromise.then(resolve, reject);
              } else {
                reject(rejectedFromLastPromise);
              }
            }
          } catch (err) {
            reject(err);
          }
        });
      }

      if (this.status === "fulfilled") {
        try {
          if (onFulfilled && typeof onFulfilled === "function") {
            const fulfilledFromLastPromise = onFulfilled(this.value);
            if (fulfilledFromLastPromise instanceof MyPromise) {
              fulfilledFromLastPromise.then(resolve, reject);
            } else {
              resolve(fulfilledFromLastPromise);
            }
          }
        } catch (err) {
          reject(err);
        }
      }

      if (this.status === "rejected") {
        try {
          if (onRejected && typeof onRejected === "function") {
            const rejectedFromLastPromise = onRejected(this.value);
            if (rejectedFromLastPromise instanceof MyPromise) {
              rejectedFromLastPromise.then(resolve, reject);
            } else {
              reject(rejectedFromLastPromise);
            }
          }
        } catch (err) {
          reject(err);
        }
      }
    });
  }
}

function generateNumber() {
  return Math.floor(Math.random() * 100);
}

const getNumber = new MyPromise((resolve, reject) => {
  let randomNumber = generateNumber();
  if (randomNumber % 5 === 0) {
    setTimeout(() => {
      reject(randomNumber);
    }, 1000);
    return;
  }
  resolve(randomNumber);
});

getNumber.then(
  (randomNumber) => console.log("Resolved: ", randomNumber),
  (randomNumber) => console.log("Rejected: ", randomNumber),
);
