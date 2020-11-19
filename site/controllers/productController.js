const fs = require('fs');
const path = require('path');
const { get } = require('../routes/products');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

//**** funciones *****/

function getAllProducts(){
    const products = fs.readFileSync(productsFilePath, 'utf-8');
    const productsParsed = JSON.parse(products);
    return productsParsed;
}

function writeProducts(arrayToTransform){
    const products = getAllProducts();
    const productToWrite = [...products, arrayToTransform];
    const productsJson = JSON.stringify(productToWrite, null, " ");
    fs.writeFileSync(productsFilePath, productsJson);
}

function generateNewId(){
    const products = getAllProducts();
    if(products == ""){
        return 0;
    }
    return products.pop().id +1;
}


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

