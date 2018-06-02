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
        console.log(`ScratchBuddy connected ${socket}`)
        this.messageHandler(socket)
        socket.send(JSON.stringify(this.blockchain.block_array))
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
    
    messageHandler(socket){
            socket.on('message', message => {
                const data = JSON.parse(message);
                console.log('data:', data)
            })
        }           
}

module.exports = ScratchPeerServer