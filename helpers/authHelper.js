function cekLoginHandler(req, res, next) {
    let isLogin = req.session.isLoginA
    // console.log('ini helper non pasien',isLogin )
    // let isLogin = true
    if (isLogin) {
        next()
    } else {
        if(req.session.isLogin == true) {
            res.redirect('/patients/sakit')
        } else {
            res.redirect('/login')
        }

    }
}

function cekLoginPatient(req, res, next) {
    let isLoginP = req.session.isLogin
    // console.log('ini helper pasien',isLoginP )
    // let isLoginP = true
    if (isLoginP) {
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = {
    cekLoginHandler: cekLoginHandler,
    cekLoginPatient: cekLoginPatient,
}
