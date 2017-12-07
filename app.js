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
const Signup = require('./routers/signup')
const Obat = require('./routers/obat')
const Diagnosa = require('./routers/diagnosa')
const Patient = require('./routers/patient');

// app.get('/signup',function(req,res){
//     res.render('login',{
//         err : null
//     })
// })
// app.post('/signup', function (req, res) {
//     // res.send('masuk sini')
//     let objCreate = {
//         username: req.body.username.toLowerCase(),
//         password: req.body.password,
//         email: req.body.email.toLowerCase(),
//         role : req.body.role
//     }
//     // res.send(objCreate)
//     Model.User.create(objCreate)
//         .then(function () {
//             res.redirect('/login')
//         })
//         .catch(function (err) {
//             console.log(err);
//             res.render('login', {
//                 err: err.message,
//             })
//         })
// })

app.get('/login', (req, res) => {
    res.render('login',{
        err: null
    })
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
                    
                    if (user.role == 'pasien') {
                        req.session.isLogin = true
                        res.redirect('/patients/sakit')
                    } else if(user.role == 'admin'){
                        req.session.isLoginA = true 
                        res.redirect('/')
                    }


                } else {
                    req.session.isLogin = false
                    req.session.isLoginA = false                    
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

app.use('/users', authHelper.cekLoginHandler, User)
app.use('/obats', authHelper.cekLoginHandler, Obat)
app.use('/diagnosas', authHelper.cekLoginHandler, Diagnosa)
app.use('/signup',Signup)
app.use('/patients', authHelper.cekLoginPatient, Patient)


app.listen(3000, console.log('ALIVE'))




/*
 - router buat pasien belum
 - form sign up di tampilan depan




*/
