const fs = require('fs');
const path = require('path');
const allFunctions = require("../helpers/allFunctions");
const deleteFailureFile = path.join(__dirname, '../public/images/users/');
const bcrypt = require("bcryptjs");
const db = require('../database/models')
let {validationResult} = require ('express-validator');

let pageTitle = "";


const usersController={
    login: (req,res)=>{
        pageTitle = "Energym - Login";
        return res.render("./users/login", {pageTitle})
    },
    processLogin: async (req, res)=>{
        const errors = validationResult(req);
                       
        if(!errors.isEmpty()){
            pageTitle = "Energym - Login";
            return res.render('users/login', {errors: errors.mapped(), pageTitle})
        }
        
        const userToLogin = await db.User.findOne({where:{email:req.body.email}})
        req.session.userLogged = userToLogin

        if (req.body.remember){
            res.cookie('userLogged', userToLogin.id, { maxAge: 1000 * 60 * 60 * 365 })
        }
            
        return res.redirect('/');
        
    },
    register: (req,res)=>{
        pageTitle = "Energym - Registro";
        return res.render("users/register", {pageTitle})
    },
    createUser: async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
                pageTitle = "Energym - Registro";
                res.render("users/register", {errors: errors.mapped(), pageTitle});
                return req.files[0] && req.files[0].filename ? fs.unlinkSync(deleteFailureFile + req.files[0].filename) : " ";
            }
        
            const newUser = {
            name: req.body.name,
            lastname: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,10),
            avatar: req.files[0] ? req.files[0].filename : "default_avatar.jpg"
            };

       await db.User.create(newUser)
       return res.redirect("/users/login");
        
       
    },
    logout: (req, res)=>{
        res.clearCookie('userLogged')
        req.session.destroy();
        
        return res.redirect('/');
    },
    profile: (req, res)=>{
        pageTitle = "Energym - Perfil";
        return res.render('./users/profile', {pageTitle})
    },
    editProfile: (req,res)=>{
        pageTitle = "Energym - Editar Perfil";
        return res.render('./users/profile-edit', {pageTitle})
    },
    editedProfile: async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
                pageTitle = "Energym - Editar Perfil";
                res.render("users/profile-edit", {errors: errors.mapped(), pageTitle});
                return req.files[0] && req.files[0].filename ? fs.unlinkSync(deleteFailureFile + req.files[0].filename) : " ";
            }
        
        const userToEdit = await db.User.findOne({where:{id:req.params.id}});
        
        const newData = {
            name: req.body.name,
            lastname: req.body.lastName,
            email: req.body.email,
            avatar: req.files[0] ? req.files[0].filename : userToEdit.avatar
        };
        await db.User.update(newData, {where:{id:req.params.id}});

        return res.redirect("/users/profile");
    },
    adminUsers: async (req,res)=>{
        let allUsers = await db.User.findAll()
        
        pageTitle = "Energym - Editar Usuarios";
        return res.render("users/users-admin",{pageTitle,allUsers})
    },
    becomeSuperAdmin: async (req,res)=>{

        await db.User.update({
            rol: 30
        },{where:{id:req.params.id}}
        )
        return res.redirect("/users/admin")
    },
    becomeAdmin: async (req,res)=>{

        await db.User.update({
            rol: 20
        },{where:{id:req.params.id}}
        )
        return res.redirect("/users/admin")
    },
    becomeUser: async (req,res)=>{

        await db.User.update({
            rol: 10
        },{where:{id:req.params.id}}
        )
        return res.redirect("/users/admin")
    },
    deleteUser: async (req,res)=>{
        
        db.User.destroy({
            where:{
                id: req.params.id
            }
        })

        return res.redirect("/users/admin")
    }
}

module.exports=usersController;