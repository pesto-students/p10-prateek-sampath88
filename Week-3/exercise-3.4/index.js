function createStack() {
  return {
    items: [],
    push(item) {
      this.items.push(item);
    },
    pop() {
      return this.items.pop();
    },
  };
}

const stack = createStack();
stack.push(10);
stack.push(5);
stack.pop();
stack.items;
stack.items = [10, 100, 1000];
console.log(stack.items);

/* Refactored code */
function createStackTwo() {
  const items = [];
  return {
    push(item) {
      items.push(item);
    },
    pop() {
      return items.pop();
    },
    log() {
      console.log(items);
    },
  };
}

const stack2 = createStackTwo();
stack2.push(10);
stack2.push(5);
stack2.pop();
console.log(stack2.items);//undefined
stack2.log();
