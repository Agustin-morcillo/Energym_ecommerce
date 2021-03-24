const {Product, Rutine, Contact} = require('../database/models');
let {validationResult} = require ('express-validator');
let pageTitle = "";

const mainController ={
    homepage: async (req,res)=>{
        
        pageTitle = "Energym - Home"

        let productsHome;

        let rutinasHome;

        try {
            productsHome = await Product.findAll({
                where:{
                    homepage:1
                }
            })
    
            rutinasHome = await Rutine.findAll({
                where:{
                    homepage:1
                }
            })
        } catch (error) {
            console.error(error)
        }

        return res.render("main/index", {productsHome,rutinasHome,pageTitle})
    },
    contactPage: (req,res)=>{
        
        pageTitle = "Energym - Contacto"
        
        return res.render("main/contact",{pageTitle})
    },
    storageContactInfo: async (req,res)=>{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            pageTitle = "Energym - Contacto";
            return res.render("main/contact", {errors: errors.mapped(), pageTitle});
        }

        try {
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
        } catch (error) {
            console.error(error)
        }
        
        return res.redirect('/');
    },
    adminPage: async (req,res)=>{
        
        pageTitle = "Energym - Admin";

        let products;

        let rutines;

        try {
            products = await Product.findAll()

            rutines = await Rutine.findAll()
        } catch (error) {
            console.error(error)
        }
          
        return res.render("main/admin", {products,rutines, pageTitle})
    }
}

module.exports = mainController;