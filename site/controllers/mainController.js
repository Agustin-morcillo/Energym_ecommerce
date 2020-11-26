//***** requires y constantes ***** 
const fs = require('fs');
const path = require('path');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

// ***** funciones ***** 
function getAllProducts(){
    const products = fs.readFileSync(productsFilePath, 'utf-8');
    const productsParsed = JSON.parse(products);
    return productsParsed;
}

// ***** controller ***** 
const mainController ={
    homepage: (req,res)=>{
        res.render("main/index")
    },
    contactPage: (req,res)=>{
        res.render("main/contact")
    },
    adminPage: (req,res)=>{
        const products = getAllProducts();
        res.render("main/admin", {products: products})
    },
}

// ***** export ***** 
module.exports = mainController;