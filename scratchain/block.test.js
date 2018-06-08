const Block = require('./block');

describe('Block', () => {
    
    let data, last_block, block

    beforeEach(() =>{
        data = 'data'
        last_block = Block.build_genesis(Date.now(),'GENESIS');
        block = Block.mine_block(last_block, data)
    }) 
    
    it(`sets the 'data' to match the input`, () => {
        expect(block.data).toEqual(data);
    })

    it(`sets the 'back hashpointer' to match the hash of the last block`, ()=> {
        expect(block.back_hash_pointer).toEqual(last_block.current_hash)
    } )
    
    it(`it calculates the hash that match the configured difficulty`, ()=> {
        expect(block.current_hash.substring(0,6)).toEqual('0'.repeat(block.difficulty))
    } )

} )