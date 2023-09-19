const express = require('express')
const router = express.Router()
const Usuario = require('../models/usuarios.cjs')

router.get('/', async(req, res) => {
    try {
        const usuarios = await Usuario.find()
        res.json(usuarios)
    } catch (err){
        res.status(500).json({message: erro.message})
    }
})

router.post('/', async(req, res) => {
    let email = await Usuario.find({ email: req.body.email }, { email: 1, _id: 0});

    if(email.length) return res.status(400).json({message: "Este usuario já existe"})

    const usuario = new Usuario({
        username: req.body.username,
        email: req.body.email,
        senha: req.body.senha
    })

    try {
        const novoUsuario = await usuario.save()
        console.log('Novo Usuario:', novoUsuario)
        return res.json({message: "Usuario criado"}).status(201)
    } catch (err){
        return res.status(400)
    }
})

router.post('/login', async(req, res) => {
    let query = await Usuario.find({ email: req.body.email, senha: req.body.senha }, {_id: 1});

    if(!query.length) return res.status(400).json({message: "Este usuario não existe"})

    return res.status(200).json({ id: query[0]._id.toString()})

})

router.delete('/:id', async(req, res)=> {
    try {
        let usuario = await Usuario.findById(req.params.id)
        
        if(usuario == null) return res.status(404)

        await usuario.deleteOne()
        res.json({message: "Usuario deletado"})

    } catch(err){
        res.status(500).json({ message: err.message })
        console.log(err)
    }

})

module.exports = router