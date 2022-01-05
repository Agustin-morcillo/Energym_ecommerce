const adminAuth = (req, res, next) => {
  if (req.session.userLogged && req.session.userLogged.rol > 10) {
    return next()
  }
  return res.redirect("/")
}

module.exports = adminAuth
