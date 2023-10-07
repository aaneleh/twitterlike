require('dotenv').config()
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const app = express()
const usuariosRouter = require('./routes/usuarios.cjs')
const postsRouter = require('./routes/posts.cjs')

app.use(cors())
app.use(express.json())

//Banco de dados
mongoose.connect(process.env.DATABASE_URL)
db = mongoose.connection
db.on('error', (erro) => console.error(erro))
db.once('open', () => console.log('Banco de dados conectado'))

//Servidor
app.use(express.json())
app.use(express.urlencoded( {extended: true} )); //permite acessar dados vindos de forms

app.use('/user', usuariosRouter)
app.use('/posts', postsRouter)

app.listen(process.env.PORT, ()=> console.log(`Server iniciado porta ${process.env.PORT}`))