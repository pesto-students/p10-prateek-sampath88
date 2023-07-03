function maxSubarraySum(A) {
    let maxSum = A[0];
    let currentSum = A[0];
    
    for (let i = 1; i < A.length; i++) {
      currentSum = Math.max(A[i], currentSum + A[i]);
      maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
  }
  
  // Test case 1
  const A1 = [1, 2, 3, 4, -10];
  console.log(maxSubarraySum(A1)); // Output: 10
  
  // Test case 2
  const A2 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  console.log(maxSubarraySum(A2)); // Output: 6
  