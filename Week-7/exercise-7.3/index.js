// Sort array of 0's,1's and 2's
function sort(nums){
    let left=0;
    let right=nums.length-1;
    let i=0;
    while(i<=right){
        if(nums[i]===0){
            swap(left,i);
            left++;
        }else if(nums[i]==2){
            swap(right,i);
            right--;
            i--;
        }
        i++;
    }

    function swap(i,j){
        let temp=nums[i];
        nums[i]=nums[j];
        nums[j]=temp;
    }
}

//TEST CASE
const nums1 = [0, 2, 1, 2, 0];
sort(nums1)
console.log(nums1);

const nums2 = [2,0,2,1,1,0];
sort(nums2)
console.log(nums2);

const nums3 = [2,0,1];
sort(nums3)
console.log(nums3);
