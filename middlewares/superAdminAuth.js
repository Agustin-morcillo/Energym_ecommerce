const superAdminAuth = (req, res, next) => {
    if(req.session.userLogged && req.session.userLogged.rol > 20){
        return next();
    }
    return res.redirect('/');
}
module.exports = superAdminAuth;