const fs = require('fs');
const path = require('path');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');


const productController = {
    detail: (req,res)=>{
        res.render("products/product-detail")
    },
    cart: (req,res)=>{
        res.render("products/product-cart")
    },
    create: (req,res)=>{
        res.render("products/create-product")
    },
    store: (req,res)=>{
        //guardar producto nuevo
    },
    edit: (req,res)=>{
        res.render("products/edit-product")
    },
    update: (req,res)=>{
        //guardar cambio de producto
    },
    delete: (req,res)=>{
        //eliminar producto
    },
    
}

module.exports=productController;

