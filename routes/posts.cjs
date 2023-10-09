const express = require('express')
const router = express.Router()
const Post = require('../models/posts.cjs')

//SELECIONA TODOS
router.get('/', async(req, res) => {
    try {
        const todosPosts = await Post.find()
        res.json(todosPosts)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//SELECIONA APENAS UM PELO ID
/* router.get('/:id_post', async(req, res) => {
    try {
        const postsUser = await Post.findById()
        res.json(postsUser)
    } catch (err){
        res.status(500).json({message: err.message})
    }
}) */

//SELECIONA AQUELE(S) QUE TEM TAL CONTEUDO
router.get('/search/:content', async(req, res) => {
    try {
        const posts = await Post.find({'post': {$regex : req.params.content} })
        res.json(posts)
    } catch (err) {
        res.status(500).json({message: err.message})
    }

})

//SELECIONA TODOS POSTS DE UM USUARIO
router.get('/user/:user_id', async(req, res) => {
    console.log(req.params.id_user)
    try {
        const postsUser = await Post.find({'user_id': req.params.user_id})
        res.json(postsUser)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//INSERE UM NOVO POST
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

//DELETA UM POST
router.delete('/:id', async(req, res) => {
    console.log(`Deletando post ${req.params.id}`)
    try{
        let post = await Post.findById(req.params.id)
        if(post == null) return res.sendStatus(404)
        await post.deleteOne()
        res.sendStatus(200)
    } catch(err){
        res.status(500).json({ message: err.message })
        console.log(err)
    }
})

module.exports = router