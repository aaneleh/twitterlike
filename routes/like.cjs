const express = require('express')
const router = express.Router()
const Like = require('../models/like.cjs')

//INSERE UMA NOVA CURTIDA
router.post('/', async(req, res) => {
    //se ele já segue, retorna um erro
    let query = await Like.find({ user_id: req.body.user_id, post_id: req.body.post_id});
    if(query.length) return res.status(400).json({message: "Post já curtido"})

    const like = new Like({
        user_id: req.body.user_id,
        poster_id: req.body.poster_id,
        post_id: req.body.post_id,
    })

    try {
        const newLike = await like.save()
        console.log('Nova curtida:', newLike)
        res.sendStatus(200)
    } catch (err){
        return res.status(400)
    }
})

router.delete('/', async(req, res)=> {
    try {
        let like = await Like.findOne({ user_id: req.body.user_id, post_id: req.body.post_id})
        if(like == null) return res.status(404)

        await like.deleteOne()
        console.log("Curtida removida: ",like)
        res.json({message: "Curtida removida"})

    } catch(err){
        res.status(500).json({ message: err.message })
        console.log(err)
    }
})

//SELECIONA TODOS
router.get('/', async(req, res) => {
    try {
        const allLikes = await Like.find()
        res.json(allLikes)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//SELECIONA ID DE USUARIOS QUE CURTIRAM CERTO POST
router.get('/:user_id/:post_id', async(req, res) => {
    /* console.log("req ao post: ", req.params.post_id, ", user: ", req.params.user_id) */
    try {
        const allUsers = await Like.find({ post_id: req.params.post_id }, { _id: 0, user_id: 1})
        res.json(allUsers)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//SELECIONA PELO DONO DO POST
router.get('/:poster_id', async(req, res) => {
    try {
        const likes = await Like.find({ poster_id: req.params.poster_id }).sort({dateLiked: -1})
        res.json(likes)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router