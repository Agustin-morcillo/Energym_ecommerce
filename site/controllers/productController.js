const productController = {
    productDetail: (req,res)=>{
        res.render("product-detail")
    },
    productCart: (req,res)=>{
        res.render("product-cart")
    },
    productCreate: (req,res)=>{
        res.render("create-product")
    },
    productEdit: (req,res)=>{
        res.render("edit-product")
    }
}

module.exports=productController;

