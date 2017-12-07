function cekLoginHandler(req, res, next) {
    let isLogin = req.session.isLogin
    // let isLogin = true
    if (isLogin) {
        next()
    } else {
        res.redirect('/login')
    }
}

function cekLoginPatient(req, res, next) {
    let isLoginP = req.session.isLogin
    // let isLogin = true
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
