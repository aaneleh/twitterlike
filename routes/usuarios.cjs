const express = require('express')
const router = express.Router()
const Usuario = require('../models/usuarios.cjs')

router.get('/', async(req, res) => {
    try {
        const usuarios = await Usuario.find()
        res.json(usuarios)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

router.post('/', async(req, res) => {
    //procura o usuario, se já existe retorna um erro
    let query = await Usuario.find({ email: req.body.email }, { _id: 1});
    if(query.length) return res.status(400).json({message: "Este usuario já existe"})

    const usuario = new Usuario({
        username: req.body.username,
        email: req.body.email,
        senha: req.body.senha
    })

    try {
        //salva o usuario no bd
        const novoUsuario = await usuario.save()
        console.log('Novo Usuario:', novoUsuario)

        return res.status(200).json({ id: novoUsuario._id.toString()})
    } catch (err){
        return res.status(400)
    }
})

router.post('/login', async(req, res) => {
    let query = await Usuario.find({ email: req.body.email, senha: req.body.senha }, {_id: 1, username: 1});

    if(!query.length) return res.status(400).json({message: "Este usuario não existe"})

    return res.status(200).json({ id: query[0]._id.toString(), username: query[0].username.toString()})

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