const {Order} = require("../database/models");

const orderPageAuth = async (req, res, next) => {
    
    let ordenExistente = await Order.findOne({
        where: {
            userId: req.session.userLogged.id
        }
    })

    if(ordenExistente){
        return next()
    }

    return res.redirect("/cart")
    
}

module.exports = orderPageAuth;