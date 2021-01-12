let {validationResult} = require ('express-validator');
const fs = require('fs');
const path = require('path');
const allFunctions = require("../helpers/allFunctions");
const deleteFailureFile = path.join(__dirname, '../public/images/users/');
const bcrypt = require("bcryptjs");


const usersController={
    login: (req,res)=>{
        return res.render("./users/login")
    },
    processLogin: (req, res)=>{
        const errors = validationResult(req);
        const users = allFunctions.getAllusers();
        const email = req.body.email;
        const password = req.body.password;
       
        if(!errors.isEmpty()){
            return res.render('users/login', {errors: errors.errors})
        }
        
        const userToLogin = users.find(user=>user.email == email)
        req.session.userLogged = userToLogin

        if (req.body.remember){
            res.cookie('userLogged', userToLogin.id, { maxAge: 1000 * 60 * 60 * 365 })
        }
            
        return res.redirect('/');
        
    },
    register: (req,res)=>{
        return res.render("users/register")
    },
    createUser: (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
                res.render("users/register", {errors: errors.errors});
                return req.files[0] && req.files[0].filename ? fs.unlinkSync(deleteFailureFile + req.files[0].filename) : " ";
            }

        const newUser = {
            id: allFunctions.generateNewIdUsers(),
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,10),
            avatar: req.files[0] ? req.files[0].filename : "default_avatar.jpg"
        };
        allFunctions.writeusers(newUser);

       return res.redirect("/users/login");
        
       
    },
    logout: (req, res)=>{
        res.clearCookie('userLogged')
        req.session.destroy();
        
        return res.redirect('/');
    },
    profile: (req, res)=>{

        return res.render('./users/profile')
    },
    editProfile: (req,res)=>{
        return res.render('./users/profile-edit')
    },
    editedProfile: (req,res)=>{
        const users = allFunctions.getAllusers();
        
        const id = req.params.id;

        const editedUser = users.map((user)=>{
            if(user.id == id){
                user.name = req.body.name,
                user.lastName = req.body.lastName,
                user.email = req.body.email,
                user.avatar = req.files[0] ? req.files[0].filename : user.avatar;
            }
            return user
        })

        allFunctions.writeEditedUser(editedUser)

        return res.redirect("/users/profile")
    }
}

module.exports=usersController;