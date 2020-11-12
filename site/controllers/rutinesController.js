const rutinesController = {
    rutineCreation: (req,res)=>{
        res.render("rutines/create-rutine")
    },
    rutineEdit: (req,res)=>{
        res.render("rutines/edit-rutine")
    },
    rutineDetail: (req,res)=>{
        res.render("rutines/rutine-detail")
    },
}

module.exports=rutinesController;