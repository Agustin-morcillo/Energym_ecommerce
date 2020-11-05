const rutinesController = {
    rutineCreation: (req,res)=>{
        res.render("create-product-rutine")
    },
    rutineEdit: (req,res)=>{
        res.render("edit-product-rutine")
    },
}

module.exports=rutinesController;