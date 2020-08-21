const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction.js');
const Wallet = require('./index');

describe('TransactionPool',()=>{
    let transactionPool, transaction;

    beforeEach(()=>{
        transactionPool = new TransactionPool();
        transaction = new Transaction({
            senderWallet: new Wallet(),
            recipient: 'arpit-chhabra',
            amount: 50
        });
    })

    describe('set Transaction',()=>{
        it('adds a transaction',()=>{
            transactionPool.setTransaction((transaction));

            expect(transactionPool.transactionMap[transaction.id]).toBe(transaction);
        })
    })
})