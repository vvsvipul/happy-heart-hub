const fs = require('fs');

let data;

try {
    const jsonData = fs.readFileSync('data.json', 'utf8');
    data = JSON.parse(jsonData);
} catch (err) {
    console.error('Error reading JSON file:', err);
    return;
}

function euclideanDistance(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        throw new Error('Arrays must have the same length');
    }

    let sum = 0;
    for (let i = 0; i < arr1.length; i++) {
        sum += Math.pow(arr1[i] - arr2[i], 2);
    }
    return Math.sqrt(sum);
}


// const age = 29
// const gender = 2
// const height = 150
// const weight = 90
// const ap_hi = 120
// const ap_lo = 80
// const cholesterol = 1
// const gluc = 2
// const smoke = 0
// const alco = 0
// const active = 0


// console.log(ac)


function predict (age,gender,height,weight,ap_hi,ap_lo,cholesterol,gluc){
    let ac = [age,gender,height,weight,ap_hi,ap_lo,cholesterol*10,gluc*10]
    let distances=[]
    for(let i=0;i<70000;i++) 
    {
        let arr = [data.age[""+i]/365,data.gender[""+i],data.height[""+i],data.weight[""+i],data.ap_hi[""+i],data.ap_lo[""+i],data.cholesterol[""+i],data.gluc[""+i]]
        let y = data.cardio[""+i];

        let distance = euclideanDistance(ac,arr);
        distances.push({ "y": y, "distance": distance });
    }
    // console.log(distances)

    distances.sort((a, b) => a.distance - b.distance);

    let neighbors = [];
    let ones = 0;
    let k = 117;
    for (let i = 0; i < k; i++) {
        if(distances[i].y==1) ones++;
    }
    return ones/k;
}
module.exports = { predict }