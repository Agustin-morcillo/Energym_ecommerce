const {Product, Contact, Rutine} = require('../database/models');
let {validationResult} = require ('express-validator');
let pageTitle = "";

const mainController ={
    homepage: async (req,res)=>{
        pageTitle = "Energym - Home"

        let productsHome = await Product.findAll({
            where:{
                homepage:1
            }
        })

        let rutinasHome = await Rutine.findAll({
            where:{
                homepage:1
            }
        })
        res.render("main/index", {productsHome,rutinasHome,pageTitle})
    },
    contactPage: (req,res)=>{
        pageTitle = "Energym - Contacto"
        res.render("main/contact",{pageTitle})
    },
    storageContactInfo: async (req,res)=>{
        pageTitle = "Energym - Contacto";
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            pageTitle = "Energym - Contacto";
            return res.render("main/contact", {errors: errors.mapped(), pageTitle});
        }
        
        if(req.session.userLogged){
            await Contact.create({
                isRegistered: 1,
                userId: req.session.userLogged.id,
                email: req.body.email,
                subject: req.body.subject,
                body: req.body.emailBody,
            })
        } else{
            await Contact.create({
                isRegistered: 0,
                subject: req.body.subject,
                email: req.body.email,
                subject: req.body.subject,
                body: req.body.emailBody,
            })
        }
        
        return res.redirect('/');
    },
    adminPage: async (req,res)=>{
        pageTitle = "Energym - Admin";
        const products = await Product.findAll()

        let rutines = await Rutine.findAll()
        res.render("main/admin", {products: products,rutines, pageTitle})
    }
}

module.exports = mainController;