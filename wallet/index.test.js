const Wallet = require('./index');
const { verifySignature } = require('../utils')
 
describe('Wallet', ()=>{
    let wallet;
    
    beforeEach(()=>{
        wallet = new Wallet();
    });

    it('has a balance', ()=>{
        expect(wallet).toHaveProperty('balance');
    });

    it('has a `public key`', ()=>{
        expect(wallet).toHaveProperty('publicKey')
    });

    describe('signing data', ()=>{
        const data = 'yogesh';

        it('verifies a signature',()=>{
            expect(
                verifySignature({
                    publicKey: Wallet.publicKey,
                    data,
                    signature: wallet.sign(data)
                })
            ).toBe(true)
        });

        it('does not verify a signature', ()=>{
            expect(
                verifySignature({
                    publicKey: Wallet.publicKey,
                    data,
                    signature: new Wallet().sign(data)
                })
            ).toBe(false)
        });
    })
})