const allFunctions = require("../helpers/allFunctions");

const logCookie = (req, res, next) => {
    if (!req.session.userLogged && req.cookies.userLogged){
        const users = allFunctions.getAllusers();
        userToAuth = users.find(user=>user.email == req.cookies.userLogged.email)
        req.session.userLogged = userToAuth;
    }
    return next();
}

module.exports = logCookie;
