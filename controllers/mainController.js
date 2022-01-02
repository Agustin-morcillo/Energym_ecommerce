const { Product, Rutine, Contact } = require("../database/models")
const { validationResult } = require("express-validator")
const noIndex = true
let seoTitle = ""
let seoDescription = ""

const mainController = {
  homepage: async (req, res) => {
    seoTitle = "Energym - Home"

    let productsHome
    let rutinasHome

    try {
      productsHome = await Product.findAll({
        where: {
          homepage: 1,
        },
      })

      rutinasHome = await Rutine.findAll({
        where: {
          homepage: 1,
        },
      })
    } catch (error) {
      console.error(error)
    }

    return res.render("main/index", { productsHome, rutinasHome, seoTitle, seoDescription })
  },
  contactPage: (req, res) => {
    seoTitle = "Energym - Contacto"

    return res.render("main/contact", { seoTitle, seoDescription })
  },
  storageContactInfo: async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      seoTitle = "Energym - Contacto"
      return res.render("main/contact", { errors: errors.mapped(), seoTitle, seoDescription })
    }

    try {
      if (req.session.userLogged) {
        await Contact.create({
          isRegistered: 1,
          userId: req.session.userLogged.id,
          email: req.body.email,
          subject: req.body.subject,
          body: req.body.emailBody,
        })
      } else {
        await Contact.create({
          isRegistered: 0,
          subject: req.body.subject,
          email: req.body.email,
          subject: req.body.subject,
          body: req.body.emailBody,
        })
      }
    } catch (error) {
      console.error(error)
    }

    return res.redirect("/")
  },
  adminPage: async (req, res) => {
    seoTitle = "Energym - Admin"

    let products
    let rutines

    try {
      products = await Product.findAll()
      rutines = await Rutine.findAll()
    } catch (error) {
      console.error(error)
    }

    return res.render("main/admin", { products, rutines, seoTitle, seoDescription, noIndex })
  },
}

module.exports = mainController
