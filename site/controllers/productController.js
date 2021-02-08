let {validationResult} = require ('express-validator');
const fs = require('fs');
const path = require('path');
const deleteFailureFile = path.join(__dirname, '../public/images/products/');
const allFunctions = require("../helpers/allFunctions");
const db = require("../database/models");

let pageTitle = "";

const productController = {
    detail: async (req,res)=>{
        pageTitle = "Energym - Detalle de producto";
        try{
            const detalleProducto = await db.Product.findByPk(req.params.id);
            return res.render("products/product-detail",{product: detalleProducto, pageTitle})

        } catch (errors) {
            return res.send(errors);
        }
    },
    cart: (req,res)=>{
        pageTitle = "Energym - Carrito";
        return res.render("products/product-cart", {pageTitle})
    },
    productPage: async (req,res)=>{
        pageTitle = "Energym - Productos";
        try {
            const products = await db.Product.findAll();
            return res.render("products/products", {products: products, pageTitle})
        } catch (errors) {
            return res.send(errors);
        }
    },
    create: (req,res)=>{
        pageTitle = "Energym - Crear Producto";
        return res.render("products/create-product", {pageTitle})
    },
    store: async (req,res, next)=>{
        pageTitle = "Energym - Crear Producto";
        try {
            const errors = validationResult(req);
        
            if(!errors.isEmpty()){
                    pageTitle = "Energym - Crear Producto";
                    res.render("products/create-product", {errors: errors.mapped(), pageTitle});
                    return req.files[0] && req.files[0].filename ? fs.unlinkSync(deleteFailureFile + req.files[0].filename) : " ";
                }
            await db.Product.create({
                name: req.body.name,
                price: req.body.price,
                introduction: req.body.introduction,
                description: req.body.description,
                weightKg: req.body.weight,
                size: req.body.size,
                material: req.body.material,
                category: req.body.category,
                homepage: req.body.homepage,
                image: req.files[0].filename
            });    
            return res.redirect('/admin');
        } catch (errors) {
            return res.send(errors);
        } 
    },
    edit: async (req,res)=>{
        pageTitle = "Energym - Editar Producto";
        try {
            const id = req.params.id;
            const productToEdit = await db.Product.findByPk(req.params.id)  
            return res.render("products/edit-product", {productToEdit:productToEdit, pageTitle});
        } catch (errors) {
            return res.send(errors);
        } 
    },
    editProduct: async (req,res)=>{
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                pageTitle = "Energym - Editar Producto";
                const productToEdit = await db.Product.findByPk(req.params.id)  
                res.render("products/edit-product", {errors: errors.mapped(), productToEdit, pageTitle});
                return req.files[0] && req.files[0].filename ? fs.unlinkSync(deleteFailureFile + req.files[0].filename) : " ";
                }

            const productToEdit = await db.Product.findByPk(req.params.id)     
            let product = await db.Product.update({
                name: req.body.name,
                price: req.body.price,
                introduction: req.body.introduction,
                description: req.body.description,
                weightKg: req.body.weight,
                size: req.body.size,
                material: req.body.material,
                category: req.body.category,
                homepage: req.body.homepage,
                image: req.files[0] ? req.files[0].filename : productToEdit.image
            }, 
            { 
                where: { 
                    id: req.params.id 
                }});
            
            return res.redirect("/admin")
            
        } catch (errors) {
            return res.send(errors);
        } 
    },
    destroy: async (req,res)=>{
        try {
            const id = req.params.id;
            await db.Product.destroy({
                where: { id: id }
            })        
            return res.redirect("/admin");
        } catch (errors) {
            return res.send(errors);
        }
    }
}

module.exports=productController;

