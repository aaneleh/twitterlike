const express = require('express')
const router = express.Router()
const User = require('../models/user.cjs')

router.get('/', async(req, res) => {
    console.log('Req recebido get user/ ')
    try {
        const users = await User.find()
        res.json(users)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//SELECIONA USUARIO PELO ID
router.get('/:id_user', async(req, res) => {
    try {
        const users = await User.find({_id: req.params.id_user})
        res.json(users)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//SELECIONA USUARIO PELO USERNAME
router.get('/search/:username', async(req, res) => {
    try {
        const users = await User.find({'username': {$regex : req.params.username} })
        res.json(users)
    } catch (err) {
        res.status(500).json({message: err.message})
    }

})

//INSERE UM NOVO USUARIO
/* @todo salvar a senha criptografada */
router.post('/', async(req, res) => {
    //procura o usuario, se já existe retorna um erro
    let query = await User.find({ email: req.body.email }, { _id: 1});
    if(query.length) {
        console.log("email ja usado")
        return res.status(400).json({message: "Este usuario já existe"})
    }
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    console.log(user)
    try {
        //salva o usuario no bd
        const newUser = await user.save()
        console.log('Novo Usuario:', newUser)

        return res.status(200).json({ id: newUser._id.toString()})
    } catch (err){
        return res.status(400)
    }
})

//PROCURA O USUARIO E RETORNA O ID
router.post('/login', async(req, res) => {
    let query = await User.find({ email: req.body.email, password: req.body.password }, {_id: 1, username: 1});

    if(!query.length) return res.status(400).json({message: "Este usuario não existe"})
    
    return res.status(200).json({ id: query[0]._id.toString(), username: query[0].username.toString()})
})

//ALTERA UM USUARIO
router.patch('/:id', async(req, res) => {
    try{
        let user = await User.findById(req.params.id)
        console.log(user)
        if(user == null) return res.sendStatus(404)
        
        if(req.body.username != null)
            user.username = req.body.username
        if(req.body.password != null)
            user.password = req.body.password

        const userAtualizado = await user.save()
        console.log(userAtualizado)
        res.sendStatus(200)

    } catch(err){
        console.log(err)
        return res.sendStatus(500)
    }

})

router.delete('/', async(req, res)=> {
    console.log('Req recebido delete user ' + req.body.id_user)
    try {
        let user = await User.findById(req.body.id_user)
        if(user == null) return res.status(404)

        await user.deleteOne()

        /* @todo excluir também todos posts (user_id = req.body.id_user) e relacoes de seguindo = req.body.id_user */

        res.sendStatus(200)

    } catch(err){
        res.status(500).json({ message: err.message })
        console.log(err)
    }
})

module.exports = router