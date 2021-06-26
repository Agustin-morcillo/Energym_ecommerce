const localSession = (req, res, next) => {
  res.locals.userLog = false

  if (req.session.userLogged) {
    res.locals.userLog = req.session.userLogged
  }

  return next()
}

module.exports = localSession
