const Express = require('express')
const BodyParser = require('body-parser')
const Scratchain = require('../scratchain')

const HTTP_PORT = process.env.HTTP_PORT || 3000
const starting_string = `Scratchain listing on port ${HTTP_PORT}`

const app = Express()

const blockchain = new Scratchain()

app.use(BodyParser.json())

app.get('/scratchain/blockarray', (req, res) => {
    res.json(blockchain.block_array)
})

app.post('/scratchchain/add_block', (req, res) => {
    const new_block = blockchain.add_block(req.body.data)
    console.log(`Added ${new_block}`)
    res.redirect('/scratchain/blockarray')
})

app.listen(HTTP_PORT, () => console.log(starting_string))