const Block = require('./block');

describe('Block', () => {
    
    let data, last_block, block

    const mock_config = {
        "GENESYS":      "G3N3SYS-BL0CK-5CR47CH41N",
        "NONE":         "NONE",
        "ORIGIN":       2,
        "DIFFICULTY":   2,
        "MINE_RATE":    300
    }

    beforeEach(() =>{

        data = 'data'
        last_block = Block.build_genesis(mock_config);
        block = Block.mine_block(last_block, data, last_block.difficulty)
    }) 
    
    it(`sets the 'data' to match the input`, () => {
        expect(block.data).toEqual(data);
    })

    it(`sets the 'back hashpointer' to match the hash of the last block`, ()=> {
        expect(block.back_hash_pointer).toEqual(last_block.current_hash)
    } )

    it(`it calculates the hash that matches the configured difficulty`, ()=> {
        expect(block.current_hash).toContain('0'.repeat())
    } )

    it(`it adjusts the difficulty with respect to the mine rate`, ()=>{
        expect(block.current_hash)
    } )
} )