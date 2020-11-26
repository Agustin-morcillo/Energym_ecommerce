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
        const id = req.params.id;
        const products = getAllProducts();
        const product = products.find((product)=>product.id == id);

        res.render("products/product-detail",{product: product})
    },
    cart: (req,res)=>{
        res.render("products/product-cart")
    },
    productPage: (req,res)=>{
        const products = getAllProducts();
        res.render("products/products", {products: products})
    },
    create: (req,res)=>{
        res.render("products/create-product")
    },
    store: (req,res, next)=>{
        const products = getAllProducts();
        const newProduct = {
            id: generateNewId(),
            name: req.body.name,
            price: req.body.price,
            introduction: req.body.introduction,
            description: req.body.description,
            weight: req.body.weight,
            size: req.body.size,
            material: req.body.material,
            category: req.body.category,
            homepage: req.body.homepage,
            image: req.files[0].filename
        }
        writeProducts(newProduct);
        res.redirect('/');
    },
    edit: (req,res)=>{
        res.render("products/edit-product")
    },
    update: (req,res)=>{
        //guardar cambio de producto
    },
    destroy: (req,res)=>{
        const id = req.params.id;
        const products = getAllProducts();
        const productToDelete = products.find((product)=>{return product.id==id});
        const productPlace = products.indexOf(productToDelete)
        products.splice(productPlace, 1)
        writeProducts(products);
        res.redirect("/")
    },
    
}

module.exports=productController;

