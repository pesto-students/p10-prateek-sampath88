function hasDuplicate(arr) {
  return new Set(arr).size !== arr.length;
}
console.log(hasDuplicate([1, 2, 3, 4, 3])); //true
console.log(hasDuplicate([1, 2, 3, 4])); //false
