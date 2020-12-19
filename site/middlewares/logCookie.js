const allFunctions = require("../helpers/allFunctions");

const logCookie = (req, res, next) => {
    if (!req.session.userLogged && req.cookies.userLogged){
        const users = allFunctions.getAllusers();
        const userToAuth = users.find(user=>user.id == req.cookies.userLogged)
        req.session.userLogged = userToAuth;
    }
    return next();
}

module.exports = logCookie;
