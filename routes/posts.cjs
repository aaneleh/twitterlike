const express = require('express')
const router = express.Router()
const Post = require('../models/posts.cjs')

router.get('/', async(req, res) => {

})

router.post('/', async(req, res) => {
    const tweet = new Post({
        user_id: req.body.id,
        post: req.body.post
    })

    try{
        const novoPost = await tweet.save()
        console.log(novoPost)
        return res.sendStatus(200)
    } catch(err) {
        console.log(err)
        return res.status(400).json({"erro": err})
    }

})

router.post('/login', async(req, res) => {
    
})

router.delete('/:id', async(req, res)=> {

})

module.exports = router