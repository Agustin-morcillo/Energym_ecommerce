const {Product, Item, Order, Rutine} = require("../database/models");

let pageTitle = "";

const cartController = {
    showCart: async (req,res)=>{
        pageTitle = "Energym - Carrito";

        const items = await Item.findAll({
            where:{
                userId: req.session.userLogged.id,
                orderId: null
            }
        })

        let total = items.reduce((acum,item)=>{
            return acum += parseInt(item.total) 
        },0) 
 
        
        return res.render("purchase/shopping-cart", {pageTitle,items,total})
    },
    addToCart: async(req,res)=>{
        const typeOfProduct = req.params.category
       
        if(typeOfProduct=="products"){
            const product = await Product.findByPk(req.params.id)

            let itemExistente = await Item.findAll({
                where: {
                    name: product.name,
                    userId: req.session.userLogged.id,
                    orderId: null
                }
            })

            if(itemExistente.length!=0){
                await Item.update({
                    quantity: req.body.productQuantity,
                    total: (product.price*req.body.productQuantity),
                },{
                    where: {
                        name: product.name,
                        userId: req.session.userLogged.id
                    }
                })
            } else{
                const item = await Item.create({
                    category: typeOfProduct,
                    name: product.name,
                    price: product.price,
                    quantity: req.body.productQuantity,
                    total: (product.price*req.body.productQuantity),
                    image: product.image,
                    userId: req.session.userLogged.id
                })
            }
          
        } else{
            const rutine = await Rutine.findByPk(req.params.id)

            let itemExistente = await Item.findAll({
                where: {
                    name: rutine.name,
                    userId: req.session.userLogged.id,
                    orderId: null
                }
            })

            if(itemExistente.length!=0){
                await Item.update({
                    quantity: req.body.productQuantity,
                    total: (rutine.price*req.body.productQuantity),
                },{
                    where: {
                        name: rutine.name,
                        userId: req.session.userLogged.id
                    }
                })
            } else{
                const item = await Item.create({
                    category: typeOfProduct,
                    name: rutine.name,
                    price: rutine.price,
                    quantity: req.body.productQuantity,
                    total: (rutine.price*req.body.productQuantity),
                    image: rutine.image,
                    userId: req.session.userLogged.id
                })
            }  
        }

        return res.redirect("/cart")
    },
    deleteFromCart: async (req,res)=>{
    
        const id = req.params.id

        await Item.destroy({
            where: {
                id,
            }
        })

        return res.redirect("/cart")
    },
    shop: async (req,res)=>{

        let cartFinalQuantity = req.body.cartFinalQuantity

        let cartProductUnitPrice = req.body.cartProductUnitPrice
        
        const items = await Item.findAll({
            where: {
                userId: req.session.userLogged.id,
                orderId: null
            }
        })

        let total = items.reduce((acum,item)=>{
            return acum += parseInt(item.total) 
        },0)

        let lastOrder = await Order.findOne({order:[["id","DESC"]]})
        
        const order = await Order.create({
            orderNumber: (lastOrder ? lastOrder.orderNumber+1 : 3000 ),
            total: total,
            userId: req.session.userLogged.id
        })

        await Item.update({
            quantity: cartFinalQuantity,
            price: cartProductUnitPrice,
            total: (cartProductUnitPrice*cartFinalQuantity),
            orderId: order.id
        },{
            where: {
                userId: req.session.userLogged.id,
                orderId: null
            }
        })

        return res.redirect("/cart/OrderPage")
    },
    showOrderPage: async (req,res)=>{
        pageTitle = "Energym - Order de compra"

        let orderNumber = await Order.findOne({order:[["id","DESC"]]},{
            where: {
                id: req.session.userLogged.id
            },
        })
        res.render("purchase/order-page",{pageTitle,orderNumber})
    },
    editQuantity: async (req,res)=>{
        
        const {newQuantity,productUnitPrice,productName,category} = req.body

        if(category=="products"){
            nombredeproducto = await Product.findOne({where:{name:productName}})

            await Item.update({
                quantity: newQuantity,
                price: productUnitPrice,
                total: productUnitPrice*newQuantity
            },{
                where: {
                    userId: req.session.userLogged.id,
                    orderId: null,
                    name: nombredeproducto.name
                }
            })
        } else {
            nombrederutine = await Rutine.findOne({where:{name:productName}})

            await Item.update({
                quantity: newQuantity,
                price: productUnitPrice,
                total: productUnitPrice*newQuantity
            },{
                where: {
                    userId: req.session.userLogged.id,
                    orderId: null,
                    name: nombrederutine.name
                }
            })
        }

        res.json({
            meta: {
                status: "sucess",
                nuevaCantidad: newQuantity,
                PrecioUnitario: productUnitPrice,
            }
        })
    } 
       
}

module.exports = cartController