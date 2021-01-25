const { body } = require("express-validator");
const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const allFunctions = require("../helpers/allFunctions");
const bcrypt = require("bcryptjs");
const { User } = require("../database/models");

const expresiones = {
    name: /^[a-zA-ZÀ-ÿ\s]{2,}$/, // Letras y espacios, pueden llevar acentos.
    password: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/, //minimo 8, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico
}


const validator = {
    login: [
        body('email')
            .notEmpty()
            .withMessage("Debes completar el campo: Email.")
            .bail()
            .isEmail()
            .withMessage('El email no tiene un formato válido')
            .bail()
            .custom(function(value, { req })  {
                return User.findOne({where:{email:value}})
                .then(user => {
                    if(!user || !bcrypt.compareSync(req.body.password, user.password)){                 
                        return Promise.reject('Email y/o contraseña invalido');
                    }
                })
            }),
        body("password")
            .notEmpty()
            .withMessage("Debes completar el campo: Contraseña.")
    ],
    register: [
        body('name')
            .notEmpty()
            .withMessage('Debes completar el campo: Nombre.')
            .bail()
            .isLength({ min: 2 })
            .withMessage('El nombre debe tener al menos 2 caracteres (solo letras).')
            .bail()
            .custom((value)=>{
                if(!expresiones.name.test(value)){
                    return false
                }
                return true
            })
            .withMessage("El nombre solo puede contener letras."),
        body('lastName')
            .notEmpty()
            .withMessage('Debes completar el campo: Apellido.')
            .bail()
            .isLength({ min: 2 })
            .withMessage('El apellido debe tener al menos 2 caracteres (solo letras).')
            .bail()
            .custom((value)=>{
                if(!expresiones.name.test(value)){
                    return false
                }
                return true
            })
            .withMessage("El apellido solo puede contener letras"),
        body('email')
            .notEmpty()
            .withMessage('Debes completar el campo: Email.')
            .bail()
            .isEmail()
            .withMessage('El email ingresado no tiene un formato válido.')
            .bail()
            .custom((value, {req})=> {
                return(value == req.body.retypeEmail);
            })
            .withMessage ('Los emails no coinciden.')
            .bail()
            .custom(function(value) {
                return User.findOne({where:{email:value}})
                    .then(user => {
                        if(user){
                            return Promise.reject('El email ingresado se encuentra en uso.');
                        } 
                    })
            }),
        body("retypeEmail")
            .notEmpty()
            .withMessage("Debes repetir el email."),
        body ('password')
            .notEmpty()
            .withMessage('Debes completar el campo: Contraseña.')
            .bail()
            .isLength({ min: 8 })
            .withMessage('La contraseña debe tener al menos 8 caracteres (mayúscula, minúscula, número y carácter especial)')
            .bail()
            .custom((value)=>{
                if(!expresiones.password.test(value)){
                    return false
                }
                return true
            })
            .withMessage("La contraseña debe tener al menos una: mayúscula, minúscula, número y carácter especial.")
            .bail()
            .custom ((value, {req})=> {
                return(value == req.body.retype);
            })
            .withMessage ('Las contraseñas no coinciden.'),
        body("retype")
            .notEmpty()
            .withMessage("Debes repetir la contraseña."),
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
            .withMessage ("Formato de imagen Inválido, formatos válidos: '.jpg', '.png', '.jpeg', '.gif'"),
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
            .bail()
            .isLength({max:78})
            .withMessage("Este campo solo admite 78 caracteres como máximo."),
        body("description")
            .notEmpty()
            .withMessage("Debes completar este campo.")
            .bail()
            .isLength({ min:20 })
            .withMessage("La descripción debe tener al menos 20 caracteres"),
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
                    const imageFormats = ['.jpg', '.png', '.jpeg', '.gif'];
                    const productImage = path.extname (req.files[0].originalname)
                    return (imageFormats.includes(productImage));
                }
                return true;
            })
            .withMessage ("Formato de imagen Inválido, formatos válidos: '.jpg', '.png', '.jpeg', '.gif'")
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
            .withMessage("Debes completar este campo (valor original restaurado).")
            .bail()
            .isLength({ min:20 })
            .withMessage("La descripción debe tener al menos 20 caracteres"),
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
                    const imageFormats = ['.jpg', '.png', '.jpeg', '.gif'];
                    const productImage = path.extname (req.files[0].originalname)
                    return (imageFormats.includes(productImage));
                }
                return true;
            })
            .withMessage ("Formato de imagen Inválido, formatos válidos: '.jpg', '.png', '.jpeg', '.gif'")
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
                    const imageFormats = ['.jpg', '.png', '.jpeg', '.gif'];
                    const productImage = path.extname (req.files[0].originalname)
                    return (imageFormats.includes(productImage));
                }
                return true;
            })
            .withMessage ("Formato de imagen Inválido, formatos válidos: '.jpg', '.png', '.jpeg', '.gif'")
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
                    const imageFormats = ['.jpg', '.png', '.jpeg', '.gif'];
                    const productImage = path.extname (req.files[0].originalname)
                    return (imageFormats.includes(productImage));
                }
                return true;
            })
            .withMessage ("Formato de imagen Inválido, formatos válidos: '.jpg', '.png', '.jpeg', '.gif'")
    ],
    profileEdit:[
        body("name")
            .notEmpty()
            .withMessage("El nombre no puede estar vacío.")
            .bail()
            .isLength({min:2})
            .withMessage('El nombre debe tener al menos 2 caracteres (solo letras).')
            .bail()
            .custom((value)=>{
                if(!expresiones.name.test(value)){
                    return false
                }
                return true
            })
            .withMessage("El nombre solo puede contener letras."),
        body("lastName")
            .notEmpty()
            .withMessage("El apellido no puede estar vacío.")
            .bail()
            .isLength({min:2})
            .withMessage('El apellido debe tener al menos 2 caracteres (solo letras).')
            .bail()
            .custom((value)=>{
                if(!expresiones.name.test(value)){
                    return false
                }
                return true
            })
            .withMessage("El apellido solo puede contener letras."),
        body("avatar")
            .custom ((value , {req}) => {
                if(req.files[0])
                {
                    const imageFormats = ['.jpg', '.png', '.jpeg', '.gif'];
                    const productImage = path.extname (req.files[0].originalname)
                    return (imageFormats.includes(productImage));
                }
                return true;
            })
            .withMessage ("Formato de imagen Inválido, formatos válidos: '.jpg', '.png', '.jpeg', '.gif'")
    ]
}

module.exports = validator;

