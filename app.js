const express = require('express')
const Model = require('./models')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const User = require('./routers/user') 
const Obat = require('./routers/obat')
const Diagnosa = require('./routers/diagnosa')

app.use('/users', User)
app.use('/obats', Obat)
app.use('/diagnosas', Diagnosa)

app.get('/', (req, res) => {
    res.render('home')
})


app.listen(4000,console.log('ALIVE'))