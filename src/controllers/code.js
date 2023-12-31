const { generateValue } = require('random-var')
const { Router } = require("express")
const router = Router()

const generateCode = () => { // Essa função deve ficar em um service??
    let code = generateValue(4, ['number'])
    console.log(code)
    console.log(' ')
    return code
}

router.get('/', async (req, res) => {
    const code = generateCode()
    res.status(200).send({ code })
})

module.exports = router