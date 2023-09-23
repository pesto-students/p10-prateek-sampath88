const groupBy = (arr, key) => {
    const agg = {};
    arr.forEach((a)=>{
        if(a[key]){
            const val = a[key];
            if(agg[val]){
                agg[val].push(a);
            }
            else{
                agg[val] = [a];
            }
        }
    });

    return agg;
}


module.exports = {
    groupBy,
}