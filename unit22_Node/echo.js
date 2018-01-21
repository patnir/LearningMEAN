function echo(value, total) {
    for (var i = 0; i < total; i++ ) {
        console.log(value);
    }
}

echo("Echo!", 10);
echo("Tater Tots!", 3);


function average(arr) {
    var sum =0; 
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];    
    }

    var average = sum / arr.length;

    console.log("the average is " + average);

    return average
}


var scores = [1, 2, 3, 4, 5, 6];
var result = average(scores);
console.log(result);


var cats = require('cat-me');
console.log(cats());