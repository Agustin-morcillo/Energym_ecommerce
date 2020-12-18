const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const allFunctions = require("../helpers/allFunctions");
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const bcrypt = require("bcryptjs");

const usersController={
    login: (req,res)=>{
        res.render("./users/login")
    },
    processLogin: (req, res)=>{
        const errors = validationResult(req);
        const users = allFunctions.getAllusers();
        const email = req.body.email;
        const password = req.body.password;
        console.log(errors)
        if(!errors.isEmpty()){
            return res.render('users/login', {errors: errors.errors})
        }
        console.log('pase por aca')

        const userToLogin = users.find(user=>user.mail == email)
        req.session.userLogged = userToLogin
        console.log(req.session.userLogged)

        if (req.body.remember){
            res.cookie('userLogged', userToLogin, { maxAge: 1000 * 60 * 15 })
        }
        console.log(req.cookies.userLogged)    
        return res.redirect('/users/profile');
        //ir al profile con un mensaje de exito
    },
    register: (req,res)=>{
        res.render("users/register")
    },
    createUser: (req,res)=>{
        const newUser = {
            id: allFunctions.generateNewIdUsers(),
            name: req.body.name,
            lastName: req.body.lastName,
            mail: req.body.email,
            password: bcrypt.hashSync(req.body.password,10),
            avatar: req.files[0].filename
        };
       allFunctions.writeusers(newUser);
        
        res.redirect("/users/login")
    },
    logout: (req, res)=>{
        req.session.destroy();
        res.cookie('userLogged', null, { maxAge: -1 });
        res.redirect('/');
    },
    profile: (req, res)=>{
        res.render('./users/profile')
    }
}

module.exports=usersController;