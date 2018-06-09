const Express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const Scratchain = require('../scratchain')
const ScratchPeerServer = require('./scratch_peer_server')

const HTTP_PORT = process.env.HTTP_PORT || 3000
const starting_string = `Scratchain listening on port ${HTTP_PORT}`

const app = Express()
const blockchain = new Scratchain(config)
const p2p_server = new ScratchPeerServer(blockchain)

app.use(bodyParser.json())

app.get('/scratchain/blockarray', (req, res) => {
    res.json(blockchain.block_array)
})

app.post('/scratchchain/addblock', (req, res) => {
    const new_block = blockchain.add_block(req.body.data)
    console.log(`Added ${new_block}`)
    p2p_server.synchronize()
    res.redirect('/scratchain/blockarray')
})

app.listen(HTTP_PORT, () => console.log(starting_string))
p2p_server.listen()
