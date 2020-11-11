const usersController={
    login: (req,res)=>{
        res.render("users/login")
    },
    register: (req,res)=>{
        res.render("register")
    }
}

module.exports=usersController;