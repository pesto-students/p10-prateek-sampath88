const Person = function () {};
Person.prototype.initialize = function (name, age) {
  this.name = name;
  this.age = age;
};

/* class based syntax */
// class Person {
//   initialize(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

class Teacher extends Person {
  teach(subject) {
    console.log(`${this.name} is now teaching ${subject}`);
  }
}
const him = new Teacher();
him.initialize("John", 45);
him.teach("inheritance");
