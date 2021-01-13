const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const contactFilePath = path.join(__dirname, '../data/contactDataBase.json');
const allFunctions = require("../helpers/allFunctions")


const mainController ={
    homepage: async (req,res)=>{
        let pageTitle = "Energym - Home"

        let productsHome = await db.Product.findAll({
            where:{
                homepage:1
            }
        })

        let rutinasHome = await db.Rutine.findAll({
            where:{
                homepage:1
            }
        })
        res.render("main/index", {productsHome,rutinasHome,pageTitle})
    },
    contactPage: (req,res)=>{
        let pageTitle = "Energym - Contacto"
        res.render("main/contact",{pageTitle})
    },
    storageContactInfo: (req,res)=>{
        const contactInfo = allFunctions.getContactInfo();
        
        const newContactInfo = {
            id: allFunctions.generateNewIdContact(),
            email: req.body.email,
            subject: req.body.subject,
            emailBody: req.body.emailBody
        }
        allFunctions.writeContactInfo(newContactInfo)
        
        res.redirect('/');
    },
    adminPage: async (req,res)=>{
        let pageTitle = "Energym - Admin";
        const products = await db.Product.findAll()

        let rutines = await db.Rutine.findAll()
        res.render("main/admin", {products: products,rutines, pageTitle})
    }
}

module.exports = mainController;