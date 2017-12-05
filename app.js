const express = require('express')
const Model = require('./models')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const User = require('./routes/user') 
const Obat = require('./routes/obat')
const Diagnosa = require('./routes/diagnosa')

app.use('/users', User)
app.use('/obats', Obat)
app.use('/diagnosas', Diagnosa)

app.get('/', (req, res) => {
    res.send('masuk')
})


app.listen(3000)