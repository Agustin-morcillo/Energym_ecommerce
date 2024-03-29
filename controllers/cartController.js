const { Product, Item, Order, Rutine } = require("../database/models")
const noIndex = true
let seoTitle = ""
let seoDescription = ""

const cartController = {
  showCart: async (req, res) => {
    seoTitle = "Carrito de compras | Energym"
    seoDescription = "Consulta, compra o edita todos los articulos que has agregado al carrito."

    let items

    try {
      items = await Item.findAll({
        where: {
          userId: req.session.userLogged.id,
          orderId: null,
        },
      })
    } catch (error) {
      console.error(error)
    }

    const total = items.reduce((acum, item) => {
      return (acum += parseInt(item.total))
    }, 0)

    return res.render("purchase/shopping-cart", { seoTitle, seoDescription, noIndex, items, total })
  },
  addToCart: async (req, res) => {
    const typeOfProduct = req.params.category

    try {
      if (typeOfProduct === "products") {
        const product = await Product.findByPk(req.params.id)

        const itemExistente = await Item.findAll({
          where: {
            name: product.name,
            userId: req.session.userLogged.id,
            orderId: null,
          },
        })

        if (itemExistente.length != 0) {
          await Item.update(
            {
              quantity: req.body.productQuantity,
              total: product.price * req.body.productQuantity,
            },
            {
              where: {
                name: product.name,
                userId: req.session.userLogged.id,
              },
            }
          )
        } else {
          await Item.create({
            category: typeOfProduct,
            name: product.name,
            price: product.price,
            quantity: req.body.productQuantity,
            total: product.price * req.body.productQuantity,
            image: product.image,
            userId: req.session.userLogged.id,
          })
        }
      } else {
        const rutine = await Rutine.findByPk(req.params.id)

        const itemExistente = await Item.findAll({
          where: {
            name: rutine.name,
            userId: req.session.userLogged.id,
            orderId: null,
          },
        })

        if (itemExistente.length != 0) {
          await Item.update(
            {
              quantity: req.body.productQuantity,
              total: rutine.price * req.body.productQuantity,
            },
            {
              where: {
                name: rutine.name,
                userId: req.session.userLogged.id,
              },
            }
          )
        } else {
          const item = await Item.create({
            category: typeOfProduct,
            name: rutine.name,
            price: rutine.price,
            quantity: req.body.productQuantity,
            total: rutine.price * req.body.productQuantity,
            image: rutine.image,
            userId: req.session.userLogged.id,
          })
        }
      }
    } catch (error) {
      console.error(error)
    }

    return res.redirect("/cart")
  },
  deleteFromCart: async (req, res) => {
    await Item.destroy({
      where: {
        id: req.params.id,
      },
    })

    return res.redirect("/cart")
  },
  shop: async (req, res) => {
    const cartFinalQuantity = req.body.cartFinalQuantity
    const cartProductUnitPrice = req.body.cartProductUnitPrice

    try {
      const items = await Item.findAll({
        where: {
          userId: req.session.userLogged.id,
          orderId: null,
        },
      })

      const total = items.reduce((acum, item) => {
        return (acum += parseInt(item.total))
      }, 0)

      let lastOrder = await Order.findOne({
        order: [["id", "DESC"]],
      })

      const order = await Order.create({
        orderNumber: lastOrder ? lastOrder.orderNumber + 1 : 3000,
        total: total,
        userId: req.session.userLogged.id,
      })

      await Item.update(
        {
          quantity: cartFinalQuantity,
          price: cartProductUnitPrice,
          total: cartProductUnitPrice * cartFinalQuantity,
          orderId: order.id,
        },
        {
          where: {
            userId: req.session.userLogged.id,
            orderId: null,
          },
        }
      )
    } catch (error) {
      console.error(error)
    }

    return res.redirect("/cart/order-page")
  },
  showOrderPage: async (req, res) => {
    seoTitle = "Energym - Order de compra"

    let orderNumber

    try {
      orderNumber = await Order.findOne(
        {
          order: [["id", "DESC"]],
        },
        {
          where: {
            id: req.session.userLogged.id,
          },
        }
      )
    } catch (error) {
      console.error(error)
    }

    return res.render("purchase/order-page", { seoTitle, seoDescription, noIndex, orderNumber })
  },
  editQuantity: async (req, res) => {
    const { newQuantity, productUnitPrice, productName, category } = req.body

    try {
      if (category === "products") {
        const nombreProducto = await Product.findOne({
          where: {
            name: productName,
          },
        })

        await Item.update(
          {
            quantity: newQuantity,
            price: productUnitPrice,
            total: productUnitPrice * newQuantity,
          },
          {
            where: {
              userId: req.session.userLogged.id,
              orderId: null,
              name: nombreProducto.name,
            },
          }
        )
      } else {
        const nombreRutina = await Rutine.findOne({
          where: {
            name: productName,
          },
        })

        await Item.update(
          {
            quantity: newQuantity,
            price: productUnitPrice,
            total: productUnitPrice * newQuantity,
          },
          {
            where: {
              userId: req.session.userLogged.id,
              orderId: null,
              name: nombreRutina.name,
            },
          }
        )
      }
    } catch (error) {
      console.error(error)
    }

    return res.json({
      meta: {
        status: "success",
        nuevaCantidad: newQuantity,
        PrecioUnitario: productUnitPrice,
      },
    })
  },
}

module.exports = cartController
