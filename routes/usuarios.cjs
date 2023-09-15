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
    const usuario = new Usuario({
        username: req.body.username,
        email: req.body.email,
        senha: req.body.senha
    })
    try {
        const novoUsuario = await usuario.save()
        return res.status(201).redirect('back')
    } catch (err){
        return res.status(400).redirect('back')
    }
})

module.exports = router