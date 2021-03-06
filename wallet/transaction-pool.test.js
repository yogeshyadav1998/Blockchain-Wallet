const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction.js');
const Wallet = require('./index');
const Blockchain = require('../Blockchain');

describe('TransactionPool',()=>{
    let transactionPool, transaction, senderWallet;

    beforeEach(()=>{
        transactionPool = new TransactionPool();
        senderWallet = new Wallet();
        transaction = new Transaction({
            senderWallet,
            recipient: 'arpit-chhabra',
            amount: 50
        });
    })

    describe('set Transaction',()=>{
        it('adds a transaction',()=>{
            transactionPool.setTransaction((transaction));

            expect(transactionPool.transactionMap[transaction.id]).toBe(transaction);
        });
    });

    describe('existingTransaction()',()=>{
        it('returns as existing transaction given an output address',()=>{
            transactionPool.setTransaction(transaction);

            expect(transactionPool.existingTransaction({inputAddress: senderWallet.publicKey})).toBe(transaction);
        });
    });

    describe('validTransactions()',()=>{
        let validTransactions;

        beforeEach(()=>{
            validTransactions = [];

            for( let i=0; i<10; i++){
                transaction = new Transaction({
                    senderWallet,
                    recipient: 'arpit_chhabra',
                    amount: 30
                });

                if(i%3 === 0){
                    transaction.input.amount = 999999;
                }else if(i%3 === 1){
                    transaction.input.signature = new Wallet().sign('yogesh');
                }else{
                    validTransactions.push(transaction)
                }

                transactionPool.setTransaction(transaction);
            }
        })


    });

    describe('clearTransactions()',()=>{
        it('clears the transactions',()=>{
            transactionPool.clear();

            expect(transactionPool.transactionMap).toEqual({});
        });
    });

    describe('clearBlockchainTransaction()',()=>{
        it('clears the pool of any blockchain transactions',()=>{
            const blockchain = new Blockchain();
            const expectedTransactionMap = {};

            for(let i=0;i<6;i++){
                const transaction = new Wallet().createTransaction({recipient: "arpit_chhabra", amount: 20})
                transactionPool.setTransaction(transaction);

                if(i%2 === 0){
                    blockchain.addBlock({data: [transaction]})
                }else{
                    expectedTransactionMap[transaction.id] = transaction;
                }
            }

            transactionPool.clearBlockchainTransactions({chain: blockchain.chain});

            expect(transactionPool.transactionMap).toEqual(expectedTransactionMap)
        })
    })
});