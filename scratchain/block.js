const sha256 = require('js-sha256').sha256
const { config } = require('./config')

class Block{
    constructor(timestamp, back_hash_pointer, current_hash, nonce, difficulty, data){
        this.timestamp = timestamp
        this.back_hash_pointer = back_hash_pointer
        this.current_hash = current_hash
        this.nonce = nonce
        this.data = data
        this.difficulty = difficulty || config.DIFFICULTY
    }

    toString(){
        return `Block - 
            Timestamp   : ${this.timestamp}
            HashPointer : ${this.back_hash_pointer.substring(0,4)}...${this.back_hash_pointer.substring(this.back_hash_pointer.length -4)}
            Nonce:      : '0x${this.nonce}'
            Difficulty  : ${this.difficulty}
            Hash        : ${this.current_hash.substring(0,4)}...${this.current_hash.substring(this.current_hash.length -4)}
            Data        : ${this.data}\n`;       
    }

    static build_genesis(config){
        return new this(config.ORIGIN, config.NONE, config.GENESIS , 0, config.DIFFICULTY, config.NONE)
    }

    static matching_hash(hash, difficulty){
        if(hash.substring(0, difficulty) === '0'.repeat(difficulty)){
            return true
        }
        return false            
    }

    static containing_hash(hash, difficulty){
        if( hash.includes('0'.repeat(difficulty+1))){
            return true
        }
        return false
    }

    static bruteforce_nonce(timestamp, back_hash_pointer, difficulty, data){
        let hash
        let nonce = 0

        while (true){
            nonce = nonce+1
            hash = this.block_hash_sha256(timestamp, back_hash_pointer, nonce, data)
            if (this.containing_hash(hash, difficulty) === true){
                return nonce
            }
        }
    }

    static mine_block(lastBlock, data, difficulty){
        const timestamp = Date.now()
        const back_hash_pointer = lastBlock.current_hash
        const nonce = this.bruteforce_nonce(timestamp, back_hash_pointer, difficulty, data)
        const hash = this.block_hash_sha256(timestamp, back_hash_pointer, nonce, difficulty, data)

        return new this(timestamp, back_hash_pointer, hash, nonce, difficulty, data)
    }

    static block_hash_sha256(timestamp, back_hash_pointer, nonce, difficulty, data){
        return sha256(`${timestamp}${back_hash_pointer}${nonce}${difficulty}${data}`)
    }

    static block_hash(block){
        const {timestamp, back_hash_pointer, nonce, difficulty, data} = block
        return this.block_hash_sha256(timestamp, back_hash_pointer, nonce, difficulty, data) 
    }
}

module.exports = Block;