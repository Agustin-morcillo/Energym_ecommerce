const { User, Contact } = require("../database/models")
const { validationResult } = require("express-validator")
const noIndex = true
let seoTitle = ""
let seoDescription = ""

const fs = require("fs")
const path = require("path")
const deleteFailureFile = path.join(__dirname, "../public/images/users/")
const bcrypt = require("bcryptjs")

const usersController = {
  loginView: (req, res) => {
    seoTitle = "Iniciar sesión | Energym"
    seoDescription = "Inicia sesión en nuestro sitio y accede a contenido y descuentos exclusivos."

    return res.render("./users/login", { seoTitle, seoDescription })
  },
  processLogin: async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      seoTitle = "Iniciar sesión | Energym"
      seoDescription = "Inicia sesión en nuestro sitio y accede a contenido y descuentos exclusivos."
      return res.render("users/login", { errors: errors.mapped(), seoTitle, seoDescription })
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
    seoTitle = "Registrate | Energym"
    seoDescription = "Registrate gratis en nuestro sitio y accede a productos y descuentos exclusivos."

    return res.render("users/register", { seoTitle, seoDescription })
  },
  createUser: async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      seoTitle = "Registrate | Energym"
      seoDescription = "Registrate gratis en nuestro sitio y accede a productos y descuentos exclusivos."
      res.render("users/register", { errors: errors.mapped(), seoTitle, seoDescription })
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
    seoTitle = "Tu Perfil | Energym"
    seoDescription = "Consulta los datos que están configurados en tu perfil."
    return res.render("./users/profile", { seoTitle, seoDescription, noIndex })
  },
  editUserProfileView: (req, res) => {
    seoTitle = "Editar Perfil | Energym"
    seoDescription = "Edita los datos configurados en tu perfil."
    return res.render("./users/profile-edit", { seoTitle, seoDescription, noIndex })
  },
  editUserProfile: async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      seoTitle = "Editar Perfil | Energym"
      seoDescription = "Edita los datos configurados en tu perfil."
      res.render("users/profile-edit", { errors: errors.mapped(), seoTitle, seoDescription, noIndex })
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
    seoTitle = "Administrar Usuarios | Energym"
    seoDescription = "Administra el nivel de acceso de todos los usuarios registrados en el sitio."

    let allUsers

    try {
      allUsers = await User.findAll()
    } catch (error) {
      console.error(error)
    }

    return res.render("users/users-admin", { seoTitle, seoDescription, noIndex, allUsers })
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
