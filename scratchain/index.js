const Block = require('./block')

class Scratchain{
    
    constructor(config){
        this.config = config
        this.block_array = [Block.build_genesis(config)]
    }

    get_last_block(){
        return this.block_array[this.block_array.length-1]
    }

    add_block(data) {
        const last_block = this.get_last_block()
        const block = Block.mine_block(last_block, data, last_block.difficulty)
        this.block_array.push(block)
        return block
    }

    is_valid_blockchain(block_array){
        if(JSON.stringify(block_array[0]) !== JSON.stringify(Block.build_genesis(this.config))){
            return false
        }

        for(let i = 1; i < block_array.length; i++){
            const block = block_array[i];
            const last_block = block_array[i-1]

            if(block.back_hash_pointer !== last_block.current_hash ||
                block.current_hash !== Block.block_hash(block)){
                    return false
            } 
        }

        return true
    }

    replace_block_array(longer_block_array){
        if (longer_block_array.length <= this.block_array){
            return false
        }
        if (!this.is_valid_blockchain(longer_block_array)){
            return false
        }

        this.block_array = longer_block_array
        return true
    }

    toString(){
        let blockchain_string = ""

        for(let i=0; i<this.block_array.length; i++){
            blockchain_string += this.block_array[i].toString()+'\n'
        }
        return blockchain_string
    }
}

module.exports = Scratchain