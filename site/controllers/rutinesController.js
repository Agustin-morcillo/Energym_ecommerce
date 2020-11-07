const rutinesController = {
    rutineCreation: (req,res)=>{
        res.render("create-rutine")
    },
    rutineEdit: (req,res)=>{
        res.render("edit-rutine")
    },
}

module.exports=rutinesController;