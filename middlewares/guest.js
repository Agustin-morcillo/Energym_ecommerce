const guest = (req, res, next) => {
  if (!req.session.userLogged) {
    return next()
  }
  return res.redirect("/users/profile")
}

module.exports = guest
