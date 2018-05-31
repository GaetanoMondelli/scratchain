const sha256 = require('js-sha256').sha256

class Block{
    constructor(timestamp, back_hash_pointer, current_hash, data){
        this.timestamp = timestamp
        this.back_hash_pointer = back_hash_pointer
        this.current_hash = current_hash
        this.data = data
    }

    toString(){
        return `Block - 
            Timestamp   : ${this.timestamp}
            HashPointer : ${this.back_hash_pointer.substring(0,4)}...${this.back_hash_pointer.substring(this.back_hash_pointer.length -4)}
            Hash        : ${this.current_hash.substring(0,4)}...${this.current_hash.substring(this.current_hash.length -4)}
            Data        : ${this.data}`;       
    }

    static build_genesis(timestamp='0', current_hash="scratchcain"){
        return new this(timestamp, "NONE", current_hash , [])
    }

    static mine_block(lastBlock, data){
        const timestamp = Date.now()
        const back_hash_pointer = lastBlock.current_hash
        const hash = this.block_hash_sha256(timestamp, back_hash_pointer, data)
        return new this(timestamp, back_hash_pointer, hash, data)
    }

    static block_hash_sha256(timestamp, back_hash_pointer, data){
        return sha256(`${timestamp}${back_hash_pointer}${data}`)
    }

    static block_hash(block){
        const {timestamp, back_hash_pointer, data} = block
        return this.block_hash_sha256(timestamp, back_hash_pointer, data) 
    }
}

module.exports = Block;