

const { parseSKU } = require('./dist').ItemParser;
const fs = require('fs');

const skus = fs.readFileSync('/home/colors/skus.txt', 'utf8').split('\n');


console.time('parsed');
for (let j = 0; j < 1000; j++) {
    
    for (let i = 0; i < skus.length; i++) {
        parseSKU(skus[i]);
    }

}

console.timeEnd('parsed');
