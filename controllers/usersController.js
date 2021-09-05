const { User, Contact } = require("../database/models")
let { validationResult } = require("express-validator")
let pageTitle = ""

const fs = require("fs")
const path = require("path")
const deleteFailureFile = path.join(__dirname, "../public/images/users/")
const bcrypt = require("bcryptjs")

const usersController = {
  loginView: (req, res) => {
    pageTitle = "Energym - Login"

    return res.render("./users/login", { pageTitle })
  },
  processLogin: async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      pageTitle = "Energym - Login"
      return res.render("users/login", { errors: errors.mapped(), pageTitle })
    }

    let userToLogin

    try {
      userToLogin = await User.findOne({
        where: {
          email: req.body.email,
        },
      })
    } catch (error) {
      console.error(error)
    }

    /* Creando la sesion */
    req.session.userLogged = userToLogin

    /* Creando la Cookie */
    if (req.body.remember) {
      res.cookie("userLogged", userToLogin.id, { maxAge: 1000 * 60 * 60 * 365 })
    }

    return res.redirect("/")
  },
  registerView: (req, res) => {
    pageTitle = "Energym - Registro"

    return res.render("users/register", { pageTitle })
  },
  createUser: async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      pageTitle = "Energym - Registro"
      res.render("users/register", { errors: errors.mapped(), pageTitle })
      return req.files[0] && req.files[0].filename
        ? fs.unlinkSync(deleteFailureFile + req.files[0].filename)
        : " "
    }

    const newUser = {
      name: req.body.name,
      lastname: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      avatar: req.files[0] ? req.files[0].filename : "default_avatar.jpg",
    }

    try {
      await User.create(newUser)
    } catch (error) {
      console.error(error)
    }

    return res.redirect("/users/login")
  },
  logout: (req, res) => {
    res.clearCookie("userLogged")
    req.session.destroy()

    return res.redirect("/")
  },
  userProfileView: (req, res) => {
    pageTitle = "Energym - Perfil"
    return res.render("./users/profile", { pageTitle })
  },
  editUserProfileView: (req, res) => {
    pageTitle = "Energym - Editar Perfil"
    return res.render("./users/profile-edit", { pageTitle })
  },
  editUserProfile: async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      pageTitle = "Energym - Editar Perfil"
      res.render("users/profile-edit", { errors: errors.mapped(), pageTitle })
      return req.files[0] && req.files[0].filename
        ? fs.unlinkSync(deleteFailureFile + req.files[0].filename)
        : " "
    }

    try {
      const userToEdit = await User.findOne({
        where: {
          id: req.params.id,
        },
      })

      const newData = {
        name: req.body.name,
        lastname: req.body.lastName,
        email: req.body.email,
        avatar: req.files[0] ? req.files[0].filename : userToEdit.avatar,
      }

      await User.update(newData, {
        where: {
          id: req.params.id,
        },
      })
    } catch (error) {
      console.error(error)
    }

    return res.redirect("/users/profile")
  },
  adminUsersView: async (req, res) => {
    pageTitle = "Energym - Editar Usuarios"

    let allUsers

    try {
      allUsers = await User.findAll()
    } catch (error) {
      console.error(error)
    }

    return res.render("users/users-admin", { pageTitle, allUsers })
  },
  becomeSuperAdmin: async (req, res) => {
    try {
      await User.update(
        {
          rol: 30,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
    } catch (error) {
      console.error(error)
    }

    return res.redirect("/users/admin")
  },
  becomeAdmin: async (req, res) => {
    try {
      await User.update(
        {
          rol: 20,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
    } catch (error) {
      console.error(error)
    }

    return res.redirect("/users/admin")
  },
  becomeUser: async (req, res) => {
    try {
      await User.update(
        {
          rol: 10,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
    } catch (error) {
      console.error(error)
    }

    return res.redirect("/users/admin")
  },
  deleteUser: async (req, res) => {
    try {
      await Contact.update(
        {
          isRegistered: 0,
          userId: null,
        },
        {
          where: {
            userId: req.params.id,
          },
        }
      )

      await User.destroy({
        where: {
          id: req.params.id,
        },
      })
    } catch (error) {
      console.error(error)
    }

    return res.redirect("/users/admin")
  },
}

module.exports = usersController
