function cekLoginHandler(req, res, next) {
    let isLogin = req.session.isLogin
    if (isLogin) {
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = {
    cekLoginHandler: cekLoginHandler
}