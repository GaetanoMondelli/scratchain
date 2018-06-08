const sha256 = require('js-sha256').sha256
const { config } = require('./config')

class Block{
    constructor(timestamp, back_hash_pointer, current_hash, nonce, data){
        this.timestamp = timestamp
        this.back_hash_pointer = back_hash_pointer
        this.current_hash = current_hash
        this.nonce = nonce
        this.data = data
        this.difficulty = config.DIFFICULTY
    }

    toString(){
        return `Block - 
            Timestamp   : ${this.timestamp}
            HashPointer : ${this.back_hash_pointer.substring(0,4)}...${this.back_hash_pointer.substring(this.back_hash_pointer.length -4)}
            Nonce:      : '0x${this.nonce}'
            Hash        : ${this.current_hash.substring(0,4)}...${this.current_hash.substring(this.current_hash.length -4)}
            Data        : ${this.data}\n`;       
    }

    static build_genesis(timestamp='0', current_hash="G3N3SYS-BL0CK-5CR47CH41N"){
        return new this(timestamp, "NONE", current_hash , 0, [])
    }

    static matching_hash(hash, difficulty){
        if(hash.substring(0, difficulty) === '0'.repeat(difficulty))
            return true
        return false            
    }

    static bruteforce_nonce(timestamp, back_hash_pointer, data){
        let hash
        let nonce = 0

        while (true){
            nonce = nonce+1
            hash = this.block_hash_sha256(timestamp, back_hash_pointer, nonce, data)
            console.log('FOUND'+hash)
            if (this.matching_hash(hash, this.difficulty)=== true){
                console.log('FOUND'+hash)
                return nonce
            }
        }
    }

    static mine_block(lastBlock, data){
        const timestamp = Date.now()
        const back_hash_pointer = lastBlock.current_hash
        const nonce = this.bruteforce_nonce(timestamp, back_hash_pointer, data)
        const hash = 1//this.block_hash_sha256(timestamp, back_hash_pointer, nonce, data)

        return new this(timestamp, back_hash_pointer, hash, nonce, data)
    }

    static block_hash_sha256(timestamp, back_hash_pointer, nonce, data){
        return sha256(`${timestamp}${back_hash_pointer}${nonce}${data}`)
    }

    static block_hash(block){
        const {timestamp, back_hash_pointer, nonce, data} = block
        return this.block_hash_sha256(timestamp, back_hash_pointer, nonce, data) 
    }
}

module.exports = Block;