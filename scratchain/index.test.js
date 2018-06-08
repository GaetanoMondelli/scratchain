const Block = require('./block')
const Scratchain =  require('./index')

describe('Scratchain', () =>{
    let blockchain, other_blockchain, data

    var mock_config = {
        "GENESIS":      "G3N3SYS-BL0CK-5CR47CH41N",
        "NONE":         "NONE",
        "ORIGIN":       0,
        "DIFFICULTY":   7,
        "MINE_RATE":    300
    }

    beforeEach(() => {

        data = "data"
        blockchain = new Scratchain(mock_config)
        other_blockchain = new Scratchain(mock_config)
    })

    it('starts with scratchain genesis block', ()=> {
        expect(blockchain.block_array[0]).toEqual(Block.build_genesis(mock_config))
    })

    it('adds a new block', () => {
        blockchain.add_block(data)
        const size = blockchain.block_array.length

        expect(blockchain.block_array[size-1].data).toEqual(data)
    })

    it('gets last block when last_block invoked', () => {
        blockchain.add_block(data)
        const size = blockchain.block_array.length
        const last_block = blockchain.get_last_block()

        expect(blockchain.block_array[size-1]).toEqual(last_block)
    })

    it('validates a valid blockchain', ()=> {
        other_blockchain.add_block(data)
        expect(blockchain.is_valid_blockchain(other_blockchain.block_array)).toBe(true)
    })

    it('invalidates a blockchain with a not valid genesis block', ()=>{
        other_blockchain.block_array[0].current_hash = 'WRONG GENESIS'

        expect(blockchain.is_valid_blockchain(other_blockchain.block_array)).toBe(false)
    })

    it('invalidates a corrupted blockchain', () => {
        other_blockchain.add_block(data)
        other_blockchain.get_last_block().data = "corrupted_data"

        expect(blockchain.is_valid_blockchain(other_blockchain.block_array)).toBe(false)
    })

    it('replaces the block array with a valid longer block array', () =>{
        other_blockchain.add_block('new block')
        
        blockchain.replace_block_array(other_blockchain.block_array)

        expect(other_blockchain.block_array).toEqual(blockchain.block_array)
    })

    it('does not change the block array with a invalid block array ', () =>{
        other_blockchain.add_block('new wrong block')
        other_blockchain.get_last_block().data = "corrupted data"

        blockchain.replace_block_array(other_blockchain.block_array)

        expect(other_blockchain.block_array).not.toEqual(blockchain.block_array)
    })
})