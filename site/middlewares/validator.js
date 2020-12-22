const { body } = require("express-validator");
const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const allFunctions = require("../helpers/allFunctions");
const bcrypt = require("bcryptjs")

const validator = {
    login: [
        body('email')
            .notEmpty()
            .withMessage("Debes completar el campo: Email")
            .bail()
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
    ],
    register: [
        body('name')
            .notEmpty()
            .withMessage('Debe completar el campo: Nombre'),
        body('lastName')
            .notEmpty()
            .withMessage('Debe completar el campo: Apellido'),
        body('email')
            .notEmpty()
            .withMessage('Debe completar el campo: Email')
            .bail()
            .isEmail()
            .withMessage('El email ingresado no es válido')
            .bail()
            .custom((value, {req})=> {
                return(value == req.body.retypeEmail);
            })
            .withMessage ('Los emails no coinciden')
            .bail()
            .custom((value)=> {
                const allUsers = allFunctions.getAllusers();
                const searchUser = allUsers.find((user) => (value == user.email))
        
                return !searchUser;
            })
            .withMessage('El email ingresado se encuentra en uso'),
        body ('password')
            .notEmpty()
            .withMessage('Debe completar el campo: Contraseña')
            .bail()
            .custom ((value, {req})=> {
                return(value == req.body.retype);
            })
            .withMessage ('Las contraseñas no coinciden')
            .bail()
            .isLength ({min:5})
            .withMessage ('La contraseña debe tener al menos 5 caracteres'),
        body('avatar')
            .custom ((value , {req}) => {
                if(req.files[0])
                {
                    const imageFormats = ['.jpg', '.png', '.jpeg'];
                    const userImage = path.extname (req.files[0].originalname)
                    return (imageFormats.includes(userImage));
                }
                return true;
            })
            .withMessage ("Formato de imagen Inválido. Formatos válidos: '.jpg', '.png', '.jpeg'"),
    ]
}

module.exports = validator;

