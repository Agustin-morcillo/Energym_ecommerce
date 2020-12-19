const { body } = require("express-validator");
const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const allFunctions = require("../helpers/allFunctions");
const bcrypt = require("bcryptjs")

const validator = {
    login: [
        body('email')
            .custom((value, { req }) => {
                const password = req.body.password;
                const users = allFunctions.getAllusers();
                const userExist = users.find(user=>value == user.email)
                if(userExist && bcrypt.compareSync(password, userExist.password)){
                    return true;
                }
                return false;
            })
            .withMessage('Email o contraseña inválidos')
    ]
}

module.exports = validator;

