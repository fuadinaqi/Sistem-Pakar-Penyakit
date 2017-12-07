function cekLoginHandler(req, res, next) {
    // let isLogin = req.session.isLogin
    let isLogin = true
    if (isLogin) {
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = {
    cekLoginHandler: cekLoginHandler
}