const { Rutine } = require("../database/models")
const { validationResult } = require("express-validator")
const noIndex = true
let seoTitle = ""
let seoDescription = ""

const fs = require("fs")
const path = require("path")
const deleteFailureFile = path.join(__dirname, "../public/images/rutines/")

const rutinesController = {
  rutinePage: async (req, res) => {
    seoTitle = "Nuestras rutinas | Energym"
    seoDescription = "Consulta nuestras rutinas de entrenamiento disponibles y empieza hoy mismo a ponerte en movimiento para lograr tus objetivos."

    let rutines

    try {
      rutines = await Rutine.findAll()
    } catch (error) {
      console.error(error)
    }

    return res.render("rutines/rutines", { rutines, seoTitle, seoDescription })
  },
  rutineDetail: async (req, res) => {
    let rutine

    try {
      rutine = await Rutine.findByPk(req.params.id)
    } catch (error) {
      console.error(error)
    }

    seoTitle = rutine.dataValues.seoTitle || "Detalle de la rutina | Energym"
    seoDescription = rutine.dataValues.seoDescription || "Consulta todos los detalles de la rutina de tu interés."

    return res.render("rutines/rutine-detail", { rutine, seoTitle, seoDescription})
  },
  createRutineView: (req, res) => {
    seoTitle = "Crear Rutina | Energym"
    seoDescription = "Crea nuevas rutinas y ponelas a la venta dentro del sitio."
    return res.render("rutines/create-rutine", { seoTitle, seoDescription, noIndex })
  },
  storeNewRutine: async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      seoTitle = "Crear Rutina | Energym"
      seoDescription = "Crea nuevas rutinas y ponelas a la venta dentro del sitio."
      res.render("rutines/create-rutine", {
        errors: errors.mapped(),
        seoTitle,
        seoDescription,
        noIndex
      })
      return req.files[0] && req.files[0].filename
        ? fs.unlinkSync(deleteFailureFile + req.files[0].filename)
        : " "
    }

    try {
      await Rutine.create({
        name: req.body.name,
        price: req.body.price,
        introduction: req.body.introduction,
        description: req.body.description,
        duration_weeks: req.body.duration,
        category: req.body.category,
        homepage: req.body.homepage,
        image: req.files[0].filename,
        altImage: req.body.altImage,
        seoTitle: req.body.seoTitle,
        seoDescription: req.body.seoDescription
      })
    } catch (error) {
      console.error(error)
    }

    return res.redirect("/admin")
  },
  editRutineView: async (req, res) => {
    seoTitle = "Editar Rutina | Energym"
    seoDescription = "Edita los datos de la rutina seleccionada."

    let rutineToEdit

    try {
      rutineToEdit = await Rutine.findByPk(req.params.id)
    } catch (error) {
      console.error(error)
    }

    return res.render("rutines/edit-rutine", { rutineToEdit, seoTitle, seoDescription, noIndex })
  },
  editRutine: async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      seoTitle = "Editar Rutina | Energym"
      seoDescription = "Edita los datos de la rutina seleccionada."
      res.render("rutines/edit-rutine", {
        errors: errors.mapped(),
        rutineToEdit,
        seoTitle,
        seoDescription,
        noIndex
      })
      return req.files[0] && req.files[0].filename
        ? fs.unlinkSync(deleteFailureFile + req.files[0].filename)
        : " "
    }

    try {
      const rutineToEdit = await Rutine.findByPk(req.params.id)

      await Rutine.update(
        {
          name: req.body.name,
          price: req.body.price,
          introduction: req.body.introduction,
          description: req.body.description,
          duration_weeks: req.body.duration,
          category: req.body.category,
          homepage: req.body.homepage,
          image: req.files[0] ? req.files[0].filename : rutineToEdit.image,
          altImage: req.body.altImage,
          seoTitle: req.body.seoTitle,
          seoDescription: req.body.seoDescription
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

    return res.redirect("/admin")
  },
  deleteRutine: async (req, res) => {
    try {
      await Rutine.destroy({
        where: {
          id: req.params.id,
        },
      })
    } catch (error) {
      console.error(error)
    }

    return res.redirect("/admin")
  },
}

module.exports = rutinesController
