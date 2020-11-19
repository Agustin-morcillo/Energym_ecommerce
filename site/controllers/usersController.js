const fs = require('fs');
const path = require('path');
const bcrypt = require("bcryptjs")



const usersController={
    login: (req,res)=>{
        res.render("users/login")
    },
    register: (req,res)=>{
        res.render("users/register")
    }
}

module.exports=usersController;