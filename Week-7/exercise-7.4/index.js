// Best time to buy and sell stock
function maxProfit(prices){
    let buy=prices[0];
    let max=0;
    for(i=0; i<prices.length; i++){
       buy=Math.min(prices[i],buy);
       max=Math.max(prices[i]-buy,max);
    }
    return max;
}

// TEST CASE
const prices = [7,1,5,3,6,4];
console.log(maxProfit(prices)); // Output: 5

const prices2 = [7,6,4,3,1];
console.log(maxProfit(prices2)); // Output: 0