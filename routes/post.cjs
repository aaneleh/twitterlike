const express = require('express')
const router = express.Router()
const Post = require('../models/post.cjs')

//SELECIONA TODOS
router.get('/', async(req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//SELECIONA APENAS UM PELO ID
router.get('/:id_post', async(req, res) => {
    console.log("req post id = " + req.params.id_post)
    try {
        const post = await Post.findById(req.params.id_post)
        res.json(post)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//SELECIONA PELO ID DO POST "PAI"
router.get('/responses/:id_parent', async(req, res) => {
    console.log("req post parent id = " + req.params.id_parent)
    try {
        const responses = await Post.find({id_parent_post: req.params.id_parent})
        console.log(responses)
        res.json(responses)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

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
    console.log("req posts user:" + req.params.id_user)
    try {
        const postsUser = await Post.find({'user_id': req.params.user_id})
        res.json(postsUser)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//INSERE UM NOVO POST
router.post('/', async(req, res) => {
    const post = new Post({
        user_id: req.body.user_id,
        post: req.body.post,
        id_parent_post: req.body.id_parent_post,
        datePosted: req.body.datePosted
    })
    try{
        const newPost = await post.save()
        console.log(newPost)
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