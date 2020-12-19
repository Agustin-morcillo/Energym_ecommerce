const fs = require('fs');
const path = require('path');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const contactFilePath = path.join(__dirname, '../data/contactDataBase.json');
const allFunctions = require("../helpers/allFunctions")


const mainController ={
    homepage: (req,res)=>{
        const products=allFunctions.getAllProducts()
        const losMasVendidos=products.filter((product)=>product.homepage==="si");
        res.render("main/index", {losMasVendidos:losMasVendidos})
    },
    contactPage: (req,res)=>{
        res.render("main/contact")
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
    adminPage: (req,res)=>{
        const products = allFunctions.getAllProducts()
        res.render("main/admin", {products: products})
    }
}

module.exports = mainController;