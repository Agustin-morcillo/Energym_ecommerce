const { User } = require("../database/models")

const logCookie = async (req, res, next) => {
  if (!req.session.userLogged && req.cookies.userLogged) {
    let userToAuth

    try {
      userToAuth = await User.findOne({
        where: {
          id: req.cookies.userLogged,
        },
      })
    } catch (error) {
      console.error(error)
    }

    req.session.userLogged = userToAuth

    next()
  } else {
    return next()
  }
}

module.exports = logCookie
