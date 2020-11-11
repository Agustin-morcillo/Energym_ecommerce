const mainController ={
    homepage: (req,res)=>{
        res.render("main/index")
    },
    contactPage: (req,res)=>{
        res.render("main/contact")
    },
    adminPage: (req,res)=>{
        res.render("main/admin")
    },
}

module.exports = mainController;