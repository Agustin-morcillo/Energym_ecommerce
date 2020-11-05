const productController = {
    productDetail: (req,res)=>{
        res.render("product_detail")
    },
    productCart: (req,res)=>{
        res.render("product_cart")
    },
    productAdmin: (req,res)=>{
        res.render("product_admin")
    },
    productCreation: (req,res)=>{
        res.render("create-product")
    },
    productEdit: (req,res)=>{
        res.render("edit-product")
    }
}

module.exports=productController;

