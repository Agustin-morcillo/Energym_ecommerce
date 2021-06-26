const fs = require("fs")
const path = require("path")
const deleteFailureFile = path.join(__dirname, "../public/images/rutines/")
const { Rutine } = require("../database/models")
let { validationResult } = require("express-validator")
let pageTitle = ""

const rutinesController = {
  rutinePage: async (req, res) => {
    pageTitle = "Energym - Rutinas"

    let rutines

    try {
      rutines = await Rutine.findAll()
    } catch (error) {
      console.error(error)
    }

    return res.render("rutines/rutines", { rutines, pageTitle })
  },
  rutineDetail: async (req, res) => {
    pageTitle = "Energym - Detalle de rutina"

    let rutine

    try {
      rutine = await Rutine.findByPk(req.params.id)
    } catch (error) {
      console.error(error)
    }

    return res.render("rutines/rutine-detail", { rutine, pageTitle })
  },
  createRutineView: (req, res) => {
    pageTitle = "Energym - Crear Rutina"

    return res.render("rutines/create-rutine", { pageTitle })
  },
  storeNewRutine: async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      pageTitle = "Energym - Crear Rutina"
      res.render("rutines/create-rutine", {
        errors: errors.mapped(),
        pageTitle,
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
      })
    } catch (error) {
      console.error(error)
    }

    return res.redirect("/admin")
  },
  editRutineView: async (req, res) => {
    pageTitle = "Energym - Editar Rutina"

    let rutineToEdit

    try {
      rutineToEdit = await Rutine.findByPk(req.params.id)
    } catch (error) {
      console.error(error)
    }

    return res.render("rutines/edit-rutine", { rutineToEdit, pageTitle })
  },
  editRutine: async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      pageTitle = "Energym - Editar Rutina"
      res.render("rutines/edit-rutine", {
        errors: errors.mapped(),
        rutineToEdit,
        pageTitle,
      })
      return req.files[0] && req.files[0].filename
        ? fs.unlinkSync(deleteFailureFile + req.files[0].filename)
        : " "
    }

    try {
      let rutineToEdit = await Rutine.findByPk(req.params.id)

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
