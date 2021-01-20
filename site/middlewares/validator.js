const { body } = require("express-validator");
const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const allFunctions = require("../helpers/allFunctions");
const bcrypt = require("bcryptjs");
const { User } = require("../database/models");

const validator = {
    login: [
        body('email')
            .notEmpty()
            .withMessage("Debes completar el campo: Email.")
            .bail()
            .custom(function(value, { req })  {
                User.findOne({where:{email:value}})
                    .then(user => {
                        if(!user || !bcrypt.compareSync(req.body.password, user.password)){
                            return Promise.reject();
                        } 
                    })    
            })
            .withMessage('Email o contraseña inválidos.')
    ],
    register: [
        body('name')
            .notEmpty()
            .withMessage('Debes completar el campo: Nombre.'),
        body('lastName')
            .notEmpty()
            .withMessage('Debes completar el campo: Apellido.'),
        body('email')
            .notEmpty()
            .withMessage('Debes completar el campo: Email.')
            .bail()
            .isEmail()
            .withMessage('El email ingresado no es válido.')
            .bail()
            .custom((value, {req})=> {
                return(value == req.body.retypeEmail);
            })
            .withMessage ('Los emails no coinciden.')
            .bail()
            .custom(function(value) {
                User.findOne({where:{email:value}})
                    .then(user => {
                        if(user){
                            return Promise.reject();
                        }
                    })
            })
            .withMessage('El email ingresado se encuentra en uso.'),
        body ('password')
            .notEmpty()
            .withMessage('Debes completar el campo: Contraseña.')
            .bail()
            .custom ((value, {req})=> {
                return(value == req.body.retype);
            })
            .withMessage ('Las contraseñas no coinciden.')
            .bail()
            .isLength ({min:5})
            .withMessage ('La contraseña debe tener al menos 5 caracteres.'),
        body('avatar')
            .custom ((value , {req}) => {
                if(req.files[0])
                {
                    const imageFormats = ['.jpg', '.png', '.jpeg', '.gif'];
                    const userImage = path.extname (req.files[0].originalname)
                    return (imageFormats.includes(userImage));
                }
                return true;
            })
            .withMessage ("Formato de imagen Inválido, formatos válidos: '.jpg', '.png', '.jpeg', '.gif'")
    ],
    createProduct: [
        body("name")
            .notEmpty()
            .withMessage("Debes completar este campo.")
            .bail()
            .isLength({min:5})
            .withMessage("El nombre debe tener al menos 5 caracteres."),
        body("price")
            .notEmpty()
            .withMessage("Debes completar este campo.")
            .bail()
            .isInt()
            .withMessage("Debes ingresar un valor numérico."),
        body("introduction")
            .notEmpty()
            .withMessage("No has completado este campo.")
            .isLength({max:78})
            .withMessage("Este campo solo admite 78 caracteres como máximo."),
        body("description")
            .notEmpty()
            .withMessage("Debes completar este campo."),
        body("weight")
            .notEmpty()
            .withMessage("Debes completar este campo.")
            .bail()
            .isInt()
            .withMessage("Debes ingresar un valor numérico."),
        body("size")
            .notEmpty()
            .withMessage("Debes completar este campo."),
        body("material")
            .notEmpty()
            .withMessage("Debes completar este campo."),
        body("image")
            .custom ((value , {req}) => {
                if(req.files[0])
                {
                    const imageFormats = ['.jpg', '.png', '.jpeg'];
                    const productImage = path.extname (req.files[0].originalname)
                    return (imageFormats.includes(productImage));
                }
                return true;
            })
            .withMessage ("Formato de imagen Inválido, formatos válidos: '.jpg', '.png', '.jpeg'")
            .bail()
            .custom((valueImg, { req }) => req.files[0])
            .withMessage('Debes cargar una imagen.')
    ],
    editProduct: [
        body("name")
            .notEmpty()
            .withMessage("Debes completar este campo (valor original restaurado).")
            .bail()
            .isLength({min:5})
            .withMessage("El nuevo nombre debe tener al menos 5 caracteres (valor original restaurado)."),
        body("price")
            .notEmpty()
            .withMessage("Debes completar este campo (valor original restaurado).")
            .bail()
            .isInt()
            .withMessage("Debes ingresar un valor numérico (valor original restaurado)."),
        body("introduction")
            .notEmpty()
            .withMessage("Debes completar este campo (valor original restaurado).")
            .isLength({max:78})
            .withMessage("Este campo solo admite 78 caracteres como máximo (valor original restaurado)."),
        body("description")
            .notEmpty()
            .withMessage("Debes completar este campo (valor original restaurado)."),
        body("weight")
            .notEmpty()
            .withMessage("Debes completar este campo (valor original restaurado).")
            .bail()
            .isInt()
            .withMessage("Debes ingregar un valor numérico"),
        body("size")
            .notEmpty()
            .withMessage("Debes completar este campo (valor original restaurado)."),
        body("material")
            .notEmpty()
            .withMessage("Debes completar este campo (valor original restaurado)."),
        body("image")
            .custom ((value , {req}) => {
                if(req.files[0])
                {
                    const imageFormats = ['.jpg', '.png', '.jpeg'];
                    const productImage = path.extname (req.files[0].originalname)
                    return (imageFormats.includes(productImage));
                }
                return true;
            })
            .withMessage ("Formato de imagen Inválido, formatos válidos: '.jpg', '.png', '.jpeg'")
    ],
    createRutine: [
        body("name")
            .notEmpty()
            .withMessage("Debes completar este campo.")
            .bail()
            .isLength({min:5})
            .withMessage("El nombre debe tener al menos 5 caracteres."),
        body("price")
            .notEmpty()
            .withMessage("Debes completar este campo.")
            .bail()
            .isInt()
            .withMessage("Debes ingresar un valor numérico."),
        body("introduction")
            .notEmpty()
            .withMessage("Debes completar este campo.")
            .isLength({max:78})
            .withMessage("Este campo solo admite 78 caracteres como máximo."),
        body("description")
            .notEmpty()
            .withMessage("Debes completar este campo."),
        body("duration")
            .notEmpty()
            .withMessage("Debes completar este campo.")
            .bail()
            .isInt()
            .withMessage("Debes ingresar un valor numérico."),
        body("image")
            .custom ((value , {req}) => {
                if(req.files[0])
                {
                    const imageFormats = ['.jpg', '.png', '.jpeg'];
                    const productImage = path.extname (req.files[0].originalname)
                    return (imageFormats.includes(productImage));
                }
                return true;
            })
            .withMessage ("Formato de imagen Inválido, formatos válidos: '.jpg', '.png', '.jpeg'")
            .bail()
            .custom((valueImg, { req }) => req.files[0])
            .withMessage('Debes cargar una imagen.')
    ],
    editRutine: [
        body("name")
            .notEmpty()
            .withMessage("Debes completar este campo (valor original restaurado).")
            .bail()
            .isLength({min:5})
            .withMessage("El nuevo nombre debe tener al menos 5 caracteres (valor original restaurado)."),
        body("price")
            .notEmpty()
            .withMessage("Debes completar este campo (valor original restaurado).")
            .bail()
            .isInt()
            .withMessage("Debes ingresar un valor numérico (valor original restaurado)."),
        body("introduction")
            .notEmpty()
            .withMessage("Debes completar este campo (valor original restaurado).")
            .isLength({max:78})
            .withMessage("Este campo solo admite 78 caracteres como máximo (valor original restaurado)."),
        body("description")
            .notEmpty()
            .withMessage("Debes completar este campo (valor original restaurado)."),
        body("duration")
            .notEmpty()
            .withMessage("Debes completar este campo (valor original restaurado).")
            .bail()
            .isInt()
            .withMessage("Debes ingresar un valor numérico (valor original restaurado)."),
            body("image")
            .custom ((value , {req}) => {
                if(req.files[0])
                {
                    const imageFormats = ['.jpg', '.png', '.jpeg'];
                    const productImage = path.extname (req.files[0].originalname)
                    return (imageFormats.includes(productImage));
                }
                return true;
            })
            .withMessage ("Formato de imagen Inválido, formatos válidos: '.jpg', '.png', '.jpeg'")
    ]
}

module.exports = validator;

