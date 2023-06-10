// 3 sum

function findClosestSum(arr, target) {
  const sortedArr = arr.sort((a, b) => a - b);
  let result = sortedArr[0] + sortedArr[1] + sortedArr[arr.length - 1];

  for(let i=0; i<arr.length-2; i++){
    let left=i+1;
    let right=arr.length-1;

    while(left < right){
        let currentSum=sortedArr[i]+sortedArr[left]+sortedArr[right];
        if(currentSum > target){
            right--;
        }else{
            left++;
        }
        if(Math.abs(currentSum-target)< Math.abs(result-target)){
            result =currentSum;
        }
    }
  }
  return result;
}

//CASE TEST
const nums = [-1,2,1,-4], target = 1;
console.log(findClosestSum(nums,target));

const nums2 = [0,0,0], target2 = 1
console.log(findClosestSum(nums2,target2));
