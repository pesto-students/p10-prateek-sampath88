let user = {
  firstName: "John",
  lastName: "Doe",
  getFullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
};

//without explicit bind
console.log(user.getFullName()); /* Context: user object */

let getFullNameRef = user.getFullName;
console.log(getFullNameRef()); /* Context: global */

/* ++++++++++++++++++++++++++++++++++
+++++++++++++++ bind ++++++++++++++++
+++++++++++++++++++++++++++++++++++++ */
let getFullNameWithBind = user.getFullName.bind(user);
console.log(getFullNameWithBind()); /* Context: user */

/* Explicit dynamic bind */
let getFullNameWithDynamicBind = user.getFullName.bind({
  firstName: "Jane",
  lastName: "Doe",
});
console.log(getFullNameWithDynamicBind()); /* Context: dynamic */

/* Creating Partial functions */
function multiply(a, b) {
  return a * b;
}
const multiplyByTwo = multiply.bind(this, 2);
console.log(multiplyByTwo(3));
console.log(multiplyByTwo(5));

const multiplyByThree = multiply.bind(this, 3);
console.log(multiplyByThree(3));
console.log(multiplyByThree(5));


/* ++++++++++++++++++++++++++++++++++
+++++++++++++++ call ++++++++++++++++
+++++++++++++++++++++++++++++++++++++ */
function calcArea() {
  return this.width * this.heigth;
}
function calcAreaOfBox(box) {
  return calcArea.call(box);
}

let box1 = {
  width: 20,
  heigth: 30,
};
let box2 = {
  width: 20,
  heigth: 20,
};
console.log(calcAreaOfBox(box1));
console.log(calcAreaOfBox(box2));

/* ++++++++++++++++++++++++++++++++++
+++++++++++++++ apply ++++++++++++++++
+++++++++++++++++++++++++++++++++++++ */
let printTheseNumbers = [1, 2, 3, 4, 5, 6, 7];
console.log(printTheseNumbers); //without apply, output is an array.
console.log.apply(this, printTheseNumbers);//output: individual numbers.
