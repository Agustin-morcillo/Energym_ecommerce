const fs = require('fs');
const path = require('path');
const bcrypt = require("bcryptjs")
const allFunctions = require("../helpers/allFunctions")


const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');

const usersController={
    login: (req,res)=>{
        res.render("users/login")
    },
    register: (req,res)=>{
        res.render("users/register")
    },
    createUser: (req,res)=>{
        const newUser = {
            id: allFunctions.generateNewIdUsers(),
            name: req.body.name,
            lastName: req.body.lastName,
            mail: req.body.mail,
            password: bcrypt.hashSync(req.body.password,10)
        };
       allFunctions.writeusers(newUser);
        
        res.redirect("/users/login")
    }
}

module.exports=usersController;