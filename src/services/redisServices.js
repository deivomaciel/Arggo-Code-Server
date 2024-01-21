const { createClient } = require('@vercel/kv')

const kv = createClient({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN
})

const insertCode = async (code, value) => {
    await kv.set(code, value)
    return 200
}

const verifycode = async key => {
    const code = await kv.get(key)
    if(!code) return false
    return true
}

const deleteValue = value => {
    kv.del(value)
    return 200
}

const listAllKeys = async () => {
    for await (const key of kv.scanIterator()) {
        console.log(key)
    }
}

const getAllContent = async code => {
    const oldContent = await kv.get(code)
    return oldContent
}

module.exports = {
    insertCode,
    verifycode,
    deleteValue,
    listAllKeys,
    getAllContent
}