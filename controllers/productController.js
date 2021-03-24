const fs = require('fs');
const path = require('path');
const deleteFailureFile = path.join(__dirname, '../public/images/products/');
const {Product} = require("../database/models");
let {validationResult} = require ('express-validator');
let pageTitle = "";

const productController = {
    productPage: async (req,res)=>{
        
        pageTitle = "Energym - Productos";

        let products;
        
        try {
            products = await Product.findAll();
        } catch (error) {
            console.error(error);
        }

        return res.render("products/products", {products, pageTitle})
    },
    productDetail: async (req,res)=>{
        
        pageTitle = "Energym - Detalle de producto";

        let detalleProducto;
        
        try {
            detalleProducto = await Product.findByPk(req.params.id);
        } catch (error) {
            console.error(error);
        }

        return res.render("products/product-detail",{product: detalleProducto, pageTitle})
    },
    createProductView: (req,res)=>{
        
        pageTitle = "Energym - Crear Producto";
        
        return res.render("products/create-product", {pageTitle})
    },
    storeNewProduct: async (req,res, next)=>{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            pageTitle = "Energym - Crear Producto";
            res.render("products/create-product", {errors: errors.mapped(), pageTitle});
            return req.files[0] && req.files[0].filename ? fs.unlinkSync(deleteFailureFile + req.files[0].filename) : " ";
        }
        
        try {
            await Product.create({
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
        } catch (error) {
            console.error(error)
        }

        return res.redirect('/admin');
    },
    editProductView: async (req,res)=>{
        
        pageTitle = "Energym - Editar Producto";

        let productToEdit;
        
        try {
            productToEdit = await Product.findByPk(req.params.id)  
        } catch (error) {
            console.error(error)
        } 

        return res.render("products/edit-product", {productToEdit, pageTitle});
    },
    editProduct: async (req,res)=>{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            pageTitle = "Energym - Editar Producto";
            res.render("products/edit-product", {errors: errors.mapped(), productToEdit, pageTitle});
            return req.files[0] && req.files[0].filename ? fs.unlinkSync(deleteFailureFile + req.files[0].filename) : " ";
        }
        
        try {
            let productToEdit = await Product.findByPk(req.params.id)     
            
            await Product.update({
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
            }, { 
                where: { 
                    id: req.params.id 
                }
            });
        } catch (error) {
            console.error(error)
        }

        return res.redirect("/admin")
    },
    deleteProduct: async (req,res)=>{
        
        try {
            await Product.destroy({
                where: { 
                    id: req.params.id
                }
            })
        } catch (error) {
            console.error(error)
        }

        return res.redirect("/admin");
    }
}

module.exports=productController;

