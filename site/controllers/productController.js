let {validationResult} = require ('express-validator');
const fs = require('fs');
const path = require('path');
const deleteFailureFile = path.join(__dirname, '../public/images/products/');
const allFunctions = require("../helpers/allFunctions")

const productController = {
    detail: (req,res)=>{
        const id = req.params.id;
        const products = allFunctions.getAllProducts();
        const product = products.find((product)=>product.id == id);

        return res.render("products/product-detail",{product: product})
    },
    cart: (req,res)=>{
        return res.render("products/product-cart")
    },
    productPage: (req,res)=>{
        const products = allFunctions.getAllProducts();
        return res.render("products/products", {products: products})
    },
    create: (req,res)=>{
        return res.render("products/create-product")
    },
    store: (req,res, next)=>{
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
                res.render("products/create-product", {errors: errors.mapped()});
                return req.files[0] && req.files[0].filename ? fs.unlinkSync(deleteFailureFile + req.files[0].filename) : " ";
            }

        const products = allFunctions.getAllProducts();
        
        const newProduct = {
            id: allFunctions.generateNewId(),
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
        allFunctions.writeProducts(newProduct);
        
       return res.redirect('/admin');
    },
    edit: (req,res)=>{
        
        const id= req.params.id;
        
        const products=allFunctions.getAllProducts();
        
        const productToEdit = products.find((product)=>product.id==id);
       
        return res.render("products/edit-product", {productToEdit:productToEdit})
    },
    editProduct: (req,res)=>{
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            const id= req.params.id;
            const products=allFunctions.getAllProducts();
            const productToEdit = products.find((product)=>product.id==id);
            
            res.render("products/edit-product", {errors: errors.mapped(), productToEdit:productToEdit});
            return req.files[0] && req.files[0].filename ? fs.unlinkSync(deleteFailureFile + req.files[0].filename) : " ";
            }
        const products = allFunctions.getAllProducts();
        
        const id = req.params.id;

        const editedProduct = products.map((product)=>{
            if(product.id == id){
                product.name = req.body.name;
                product.price = req.body.price;
                product.introduction = req.body.introduction;
                product.description = req.body.description;
                product.weight = req.body.weight;
                product.size = req.body.size;
                product.material = req.body.material;
                product.category = req.body.category;
                product.homepage = req.body.homepage;
                product.image = req.files[0] ? req.files[0].filename : product.image;
            }
            return product
        })

        allFunctions.writeEditedProduct(editedProduct)

        return res.redirect("/admin")
        
    },
    destroy: (req,res)=>{
        const id = req.params.id;
        allFunctions.deleteProduct(id)
        
        return res.redirect("/admin")
    },
}

module.exports=productController;

