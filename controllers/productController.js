const { Product } = require("../database/models")
const { validationResult } = require("express-validator")
const noIndex = true
let seoTitle = ""
let seoDescription = ""

const fs = require("fs")
const path = require("path")
const deleteFailureFile = path.join(__dirname, "../public/images/products/")

const productController = {
  productPage: async (req, res) => {
    seoTitle = "Nuestros productos | Energym"
    seoDescription = "Consulta nuestro amplio catálogo de productos, todas las marcas y modelos disponibles. Envíos gratis a todo el país por compras superiores a $4.000."

    let products

    try {
      products = await Product.findAll()
    } catch (error) {
      console.error(error)
    }

    return res.render("products/products", { products, seoTitle, seoDescription })
  },
  productDetail: async (req, res) => {
    let detalleProducto

    try {
      detalleProducto = await Product.findByPk(req.params.id)
    } catch (error) {
      console.error(error)
    }

    seoTitle = detalleProducto.dataValues.seoTitle || "Detalle del producto | Energym"
    seoDescription = detalleProducto.dataValues.seoDescription || "Consulta todos los detalles del producto de tu interés."

    return res.render("products/product-detail", {
      product: detalleProducto,
      seoTitle,
      seoDescription
    })
  },
  createProductView: (req, res) => {
    seoTitle = "Crear Producto | Energym"
    seoDescription = "Crea nuevos productos y ponelos a la venta dentro del sitio."

    return res.render("products/create-product", { seoTitle, seoDescription, noIndex })
  },
  storeNewProduct: async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      seoTitle = "Crear Producto | Energym"
      seoDescription = "Crea nuevos productos y ponelos a la venta dentro del sitio."
      res.render("products/create-product", {
        errors: errors.mapped(),
        seoTitle,
        seoDescription
      })
      return req.files[0] && req.files[0].filename
        ? fs.unlinkSync(deleteFailureFile + req.files[0].filename)
        : " "
    }

    try {
      await Product.create({
        name: req.body.name,
        price: req.body.price,
        introduction: req.body.introduction,
        description: req.body.description,
        weightKg: req.body.weight,
        size: req.body.size,
        material: req.body.material,
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
  editProductView: async (req, res) => {
    seoTitle = "Editar Producto | Energym"
    seoDescription = "Edita los datos del producto seleccionado."

    let productToEdit

    try {
      productToEdit = await Product.findByPk(req.params.id)
    } catch (error) {
      console.error(error)
    }

    return res.render("products/edit-product", { productToEdit, seoTitle, seoDescription, noIndex })
  },
  editProduct: async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      seoTitle = "Editar Producto | Energym"
      seoDescription = "Edita los datos del producto seleccionado."
      res.render("products/edit-product", {
        errors: errors.mapped(),
        productToEdit,
        seoTitle,
        seoDescription,
        noIndex
      })
      return req.files[0] && req.files[0].filename
        ? fs.unlinkSync(deleteFailureFile + req.files[0].filename)
        : " "
    }

    try {
      const productToEdit = await Product.findByPk(req.params.id)

      await Product.update(
        {
          name: req.body.name,
          price: req.body.price,
          introduction: req.body.introduction,
          description: req.body.description,
          weightKg: req.body.weight,
          size: req.body.size,
          material: req.body.material,
          category: req.body.category,
          homepage: req.body.homepage,
          image: req.files[0] ? req.files[0].filename : productToEdit.image,
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
  deleteProduct: async (req, res) => {
    try {
      await Product.destroy({
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

module.exports = productController
