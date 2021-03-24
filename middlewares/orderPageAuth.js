const {Order} = require("../database/models");

const orderPageAuth = async (req, res, next) => {
    let ordenExistente;
    
    try {
        ordenExistente = await Order.findOne({
            where: {
                userId: req.session.userLogged.id
            }
        })
    } catch (error) {
        console.error(error)
    }
    
    if(ordenExistente){
        return next()
    }

    return res.redirect("/cart")
}

module.exports = orderPageAuth;