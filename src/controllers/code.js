const { generateValue } = require('random-var')
const redis = require('../services/redisServices')
const { Router } = require("express")
const router = Router()

const generateCode = () => { // Essa função deve ficar em um service??
    let code = generateValue(4, ['number'])
    return code
}

router.get('/getcode', async (req, res) => {
    let code = generateCode()
    let codeAlreadyExist = await redis.verifycode(code)

    while(codeAlreadyExist) {
        code = generateCode()
        codeAlreadyExist = redis.verifycode(code)
    }

    try {
        redis.insertCode(code.toString(), code)
        res.status(200).send({ code })

    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Internal Server Error. Try later!' })
    }
})

router.post('/addcontent', async(req, res) => {
    let { code, content } = req.body

    try {
        if(code) {
            const codeAlreadyExist = await redis.verifycode(code)
            if(!codeAlreadyExist) return res.status(201).send({ msg: 'Invalid code!' })
        } else return res.status(422).send({ msg: 'The code is mandatory!' })

        const oldContent = await redis.getAllContent(code)
        content = oldContent + ',' + content
        redis.insertCode(code, content)
        res.status(200).send({ msg: 'Content inserted successfully!' })

    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Internal Server Error. Try later!' })
    }
})

router.post('/verifycode', async (req, res) => {
    const code = req.body.code
    if(!code || code.trim() == '') return res.status('422').send({ msg: 'The code is mandatory!' })
    // Verificar no sistema de cache se o código existe
})

module.exports = router