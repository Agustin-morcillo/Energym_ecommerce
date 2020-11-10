const rutinesController = {
    rutineCreation: (req,res)=>{
        res.render("create-rutine")
    },
    rutineEdit: (req,res)=>{
        res.render("edit-rutine")
    },
    rutineDetail: (req,res)=>{
        res.render("rutine-detail")
    },
}

module.exports=rutinesController;