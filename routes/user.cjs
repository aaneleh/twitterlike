const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/user.cjs')
const Follow = require('../models/follow.cjs')

router.get('/', async(req, res) => {
    console.log('Retornando todos os usuarios...')
    try {
        const users = await User.find()
        res.json(users)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//SELECIONA USUARIO PELO ID
router.get('/:id_user', async(req, res) => {
    console.log(`Procurando usuario "${req.params.id_user}"...`)
    try {
        const users = await User.find({_id: req.params.id_user})
        res.json(users)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//SELECIONA USUARIO PELO USERNAME
router.get('/search/:username', async(req, res) => {
    console.log(`Procurando usuario "${req.params.username}"...`)
    try {
        const users = await User.find({'username': {$regex : req.params.username} })
        res.json(users)
    } catch (err) {
        res.status(500).json({message: err.message})
    }

})

//INSERE UM NOVO USUARIO
router.post('/', async(req, res) => {
    console.log('Criando usuario...')
    //procura o usuario, se já existe retorna um erro
    let query = await User.find({ email: req.body.email }, { _id: 1});
    if(query.length) {
        console.log("email ja usado")
        return res.status(400).json({message: "Este usuario já existe"})
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        //salva o usuario no bd
        const newUser = await user.save()
        console.log('Novo Usuario:', newUser)

        return res.status(200).json({ id: newUser._id.toString(), username: newUser.username.toString()})
    } catch (err){
        return res.status(400)
    }
})

//PROCURA O USUARIO E RETORNA O ID
router.post('/login', async(req, res) => {
    console.log('Fazendo login...')

    let query = await User.find({ email: req.body.email})

    if(!query.length) return res.status(400).json({message: "Este usuario não existe"})

    try {
        if(await bcrypt.compare(req.body.password, query[0].password.toString())) 
            return res.status(200).json({ id: query[0]._id.toString(), username: query[0].username.toString()})
    } catch{
        return res.status(400).json({message: "Login inválido"})
    }
    
    return res.status(400).json({message: "Erro desconhecido"})
})

//ALTERA UM USUARIO
router.patch('/:id', async(req, res) => {
    console.log(`Editando usuario "${req.params.id}"...`)

    try{
        let user = await User.findById(req.params.id)
        console.log(user)
        if(user == null) return res.sendStatus(404)
        
        if(req.body.username != null)
            user.username = req.body.username
        if(req.body.password != null) 
            try {
                user.password = await bcrypt.hash(req.body.password, 10)
            } catch{
                res.sendStatus(500)
            }
        const userAtualizado = await user.save()
        console.log(userAtualizado)
        res.sendStatus(200)

    } catch(err){
        console.log(err)
        return res.sendStatus(500)
    }

})

router.delete('/', async(req, res)=> {
    console.log('Deletando usuario ' + req.body.id_user)
    try {
        let user = await User.findById(req.body.id_user)
        if(user == null) return res.status(404)
        await user.deleteOne()

        await Follow.deleteMany({ follower_id: req.body.id_user })//user deletado deixa de seguir todos
        await Follow.deleteMany({ following_id: req.body.id_user }) //quem segue o user deletado, deixa de seguir

        res.sendStatus(200)
    } catch(err){
        res.status(500).json({ message: err.message })
        console.log(err)
    }
})

module.exports = router