const db = require("../database/models");
const allFunctions = require("../helpers/allFunctions");

const logCookie = async (req, res, next) => {
    if (!req.session.userLogged && req.cookies.userLogged){
        const userToAuth = await db.User.findOne({where:{id:req.cookies.userLogged}});
        req.session.userLogged = userToAuth;
        next();
    } else{
        return next();
    }
    
}

module.exports = logCookie;
