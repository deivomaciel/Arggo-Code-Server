// require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const codeController = require('./src/controllers/code')

const app = express()
const http = require('http')
const server = http.createServer(app)
const PORT = 3000

app.use(bodyParser.json())
app.use('/code', codeController)

app.get('/', (req, res) => {
    res.status(200).send("I'm alive!")
})

server.listen(PORT, () => {
    const { address, port } = server.address()
    console.log(`Server running at http://${address}:${port}`)
})