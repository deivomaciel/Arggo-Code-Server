require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const codeController = require('./src/controllers/code')
const redis = require('./src/services/redisServices')

const app = express()
const http = require('http')
const server = http.createServer(app)
const PORT = 3000

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))

app.use(bodyParser.json())
app.use('/code', codeController)

app.get('/', (req, res) => {
    res.status(200).send("I'm alive!")
})

server.listen(PORT, async () => {
    await redis.listAllKeys()
    const { address, port } = server.address()
    console.log(`Server running at http://${address}:${port}`)
})