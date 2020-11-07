const mainController ={
    homepage: (req,res)=>{
        res.render("index")
    },
    contactPage: (req,res)=>{
        res.render("contact")
    },
    adminPage: (req,res)=>{
        res.render("admin")
    },
}

module.exports = mainController;