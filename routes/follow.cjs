const express = require('express')
const router = express.Router()
const Follow = require('../models/follow.cjs')

//SELECIONA TODOS
router.get('/', async(req, res) => {
    try {
        const follows = await Follow.find()
        res.json(follows)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//INSERE UMA NOVA RELAÇÃO
router.post('/', async(req, res) => {
    //se ele já segue, retorna um erro
    let query = await Follow.find({ follower_id: req.body.follower_id, following_id: req.body.following_id});
    if(query.length) {
        console.log("Já segue esse usuário")
        return res.status(400).json({message: "Já segue esse usuário"})
    }
    const follow = new Follow({
        follower_id: req.body.follower_id,
        following_id: req.body.following_id,
    })

    try {
        const newFollow = await follow.save()
        console.log('Novo seguidor:', newFollow)
        res.sendStatus(200)
    } catch (err){
        return res.status(400)
    }
})

//SELECIONA ID DE USUARIO SEGUIDOS POR ESSA PESSOA
router.post('/seguindo', async(req, res) => {
    try {
        let query
        if(req.body.follower_id == null) {
            query = await Follow.find({ following_id: req.body.following_id}).sort({dateFollow: -1})
        } else if(req.body.following_id == null){
            query = await Follow.find({ follower_id: req.body.follower_id}).sort({dateFollow: -1})
        } else {
            query = await Follow.find({ follower_id: req.body.follower_id, following_id: req.body.following_id}).sort({dateFollow: -1})
        }
        return res.json(query)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//
router.delete('/deixarseguir', async(req, res)=> {
    try {
        let following = await Follow.findOne({ follower_id: req.body.follower_id, following_id: req.body.following_id})
        if(following == null) return res.status(404)

        await following.deleteOne()
        res.json({message: "Deixou de seguir"})

    } catch(err){
        res.status(500).json({ message: err.message })
        console.log(err)
    }

}) 

module.exports = router