// Find the pair with Given difference.

function findPair(arr,diff) {
  const sortedArr = arr.sort((a, b) => a - b);
  let i =0;
  let j=1;

  while(i<sortedArr.length && j < sortedArr.length){
    if(i!=j && sortedArr[j]-sortedArr[i]===diff){
        return 1;
    }else if(sortedArr[j]-sortedArr[i] < diff){
        j++;
    }else{
        i++;
    }
  }
  return 0;
}

// TEST CASE
const arr1 = [5, 10, 3, 2, 50, 80];
const diff1 = 78;
console.log(findPair(arr1,diff1));

const arr2 = [-10, 20];
const diff2 = 30;
console.log(findPair(arr2,diff2));