const productController = {
    productDetail: (req,res)=>{
        res.render("products/product-detail")
    },
    productCart: (req,res)=>{
        res.render("products/product-cart")
    },
    productCreate: (req,res)=>{
        res.render("products/create-product")
    },
    productEdit: (req,res)=>{
        res.render("products/edit-product")
    }
}

module.exports=productController;

