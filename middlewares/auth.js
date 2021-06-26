const auth = (req, res, next) => {
  if (req.session.userLogged) {
    return next()
  }
  return res.redirect("/users/login")
}

module.exports = auth
