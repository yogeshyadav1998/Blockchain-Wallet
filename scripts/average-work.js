const Blockchain = require('../Blockchain/index');

const blockchain = new Blockchain();

blockchain.addBlock({data : 'initial'});

let prevTimestamp, nextTimestamp, nextBlock, timeDiff, average;

blockchain.addBlock({data: 'block' + 10});
console.log('first block: ' , blockchain.chain[blockchain.chain.length-1]);
const times = [];

for(let i=0; i<10000; i++){
    prevTimestamp = blockchain.chain[blockchain.chain.length -1].timestamp;

    blockchain.addBlock({data: 'block' + i});
    nextBlock = blockchain.chain[blockchain.chain.length-1];

    nextTimestamp = nextBlock.timestamp;
    timeDiff = nextTimestamp - prevTimestamp;
    
    times.push(timeDiff);

    average = times.reduce((total, num) => (total+num))/times.length;

    console.log('Time to mine Block:'+ timeDiff + '. Difficulty:'+ nextBlock.difficulty + '. Average time:'+ average)
}