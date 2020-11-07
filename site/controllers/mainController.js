const mainController ={
    homepage: (req,res)=>{
        res.render("index")
    },
    contactPage: (req,res)=>{
        res.render("contact")
    },
}

module.exports = mainController;