const express = require('express')
const Model = require('./models')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const authHelper = require('./helpers/authHelper')


app.set('view engine', 'ejs')
app.set('views', './views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'key'
}))


const User = require('./routers/user')
const Obat = require('./routers/obat')
const Diagnosa = require('./routers/diagnosa')


app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', function (req, res) {
    Model.User.findOne({
        where: {
            username: req.body.username,
        }
    })
        .then(function (user) {
            user.compare_password(req.body.password, function (result) {
                if (result) {
                    req.session.isLogin = true
                    if (user.role == 'pasien') {
                        res.redirect('/pasien')
                    } else {
                        res.redirect('/')
                    }


                } else {
                    req.session.isLogin = false
                    res.redirect('/login')
                }
            })
        })
        .catch(function (err) {
            res.redirect('/login')
        })

})

app.get('/logout', authHelper.cekLoginHandler, function (req, res) {
    req.session.destroy(function (err) {
        if (!err) {
            res.redirect('/')
        } else {
            res.send(err)
        }
    })
})

app.get('/', authHelper.cekLoginHandler, function (req, res) {
    res.render('home')
})

app.get('/pasien', authHelper.cekLoginHandler, function (req, res) {
    res.render('pasien')
})

app.use('/users', authHelper.cekLoginHandler, User)
app.use('/obats', authHelper.cekLoginHandler, Obat)
app.use('/diagnosas', authHelper.cekLoginHandler, Diagnosa)

app.listen(3000, console.log('ALIVE'))




/*
 - router buat pasien belum
 - form sign up di tampilan depan
 



*/