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

function editProduct (productToEdit){
    const products = getAllProducts();
    const productPlace = products.indexOf(products.find((product)=>{return product.id==productToEdit.id}))
    products[productPlace].name=productToEdit.name;
    products[productPlace].price=productToEdit.price;
    products[productPlace].introduction=productToEdit.introduction;
    products[productPlace].description=productToEdit.description;
    products[productPlace].weight=productToEdit.weight;
    products[productPlace].size=productToEdit.size;
    products[productPlace].material=productToEdit.material;
    products[productPlace].category=productToEdit.category;
    const productsJson = JSON.stringify(products,null," ")
    fs.writeFileSync(productsFilePath, productsJson);   
}

function deleteProduct (productToDeleteId){
    const products = getAllProducts();
    const productToDelete = products.find((product)=>{return product.id==productToDeleteId});
    const productPlace = products.indexOf(productToDelete)
    products.splice(productPlace, 1)
    const productsJson = JSON.stringify(products,null," ")
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
        res.redirect('/admin');
    },
    edit: (req,res)=>{
        const id= req.params.id;
        const products=getAllProducts();
        const productToEdit = products.find((product)=>product.id==id);
        res.render("products/edit-product", {productToEdit:productToEdit})
    },
    editProduct: (req,res)=>{
        editProduct(req.params)
        res.redirect("/admin")
    },
    update: (req,res)=>{
        //guardar cambio de producto
    },
    destroy: (req,res)=>{
        const id = req.params.id;
        deleteProduct(id)
        res.redirect("/admin")
    },
    
}

module.exports=productController;

