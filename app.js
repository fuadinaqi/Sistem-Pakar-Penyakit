const express = require('express')
const Model = require('./models')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// const Teacher = require('./routes/teacher') diganti sama nama model,router buat model
// const Subject = require('./routes/subject')
// const Student = require('./routes/student')

// app.use('/teachers', Teacher)
// app.use('/subjects', Subject)
// app.use('/students', Student)

app.get('/', (req, res) => {
    res.send('masuk')
})


app.listen(3000)