const fs = require('fs');
const path = require('path');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


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