const { addTwoNumbers, subtractTwoNumbers, multiplyTwoNumbers } = require('./operators');

describe('addTwoNumbers', () => {
  test('adds two positive numbers correctly', () => {
    expect(addTwoNumbers(2, 3)).toBe(5);
  });

  test('adds a positive and negative number correctly', () => {
    expect(addTwoNumbers(2, -3)).toBe(-1);
  });
});

describe('subtractTwoNumbers', () => {
  test('subtracts two positive numbers correctly', () => {
    expect(subtractTwoNumbers(5, 3)).toBe(2);
  });

  test('subtracts a negative number from a positive number correctly', () => {
    expect(subtractTwoNumbers(2, -3)).toBe(5);
  });
});

describe('multiplyTwoNumbers', () => {
  test('multiplies two positive numbers correctly', () => {
    expect(multiplyTwoNumbers(2, 3)).toBe(6);
  });

  test('multiplies a positive and negative number correctly', () => {
    expect(multiplyTwoNumbers(2, -3)).toBe(-6);
  });
});
