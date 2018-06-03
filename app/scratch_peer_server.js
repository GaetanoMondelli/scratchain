const Websocket = require('ws')

const P2P_PORT = process.env.P2P_PORT || 5001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []

class ScratchPeerServer {
    constructor(blockchain){
        this.blockchain = blockchain
        this.sockets = []
    }

    connect_socket(socket){
        this.sockets.push(socket)
        console.log(`ScratchBuddy connected ${this.sockets.length}`)
        this.message_handler(socket)
        this.send_block_array(socket)
    }

    listen() {
        const server = new Websocket.Server({ port: P2P_PORT})
        server.on('connection', socket => this.connect_socket(socket))
        this.connect_peer_list()
        console.log(`ScratchPeerServer listening on port ${P2P_PORT}`)
    }

    connect_peer_list(){
        //console.log(peers)
        peers.forEach(peer => {
            const socket = new Websocket(peer)
            socket.on('open', () => this.connect_socket(socket)) 
        })
    }
    
    send_block_array(socket){
        socket.send(JSON.stringify(this.blockchain.block_array))
    }

    message_handler(socket){
            socket.on('message', message => {
                const candidate_block_array = JSON.parse(message);
                this.blockchain.replace_block_array(candidate_block_array)
            })
    }
    
    synchronize(){
        this.sockets.forEach(socket => { this.send_block_array(socket) })
    }
}

module.exports = ScratchPeerServer