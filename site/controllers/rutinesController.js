const fs = require('fs');
const path = require('path');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const rutinesController = {
    create: (req,res)=>{
        res.render("rutines/create-rutine")
    },
    edit: (req,res)=>{
        res.render("rutines/edit-rutine")
    },
    detail: (req,res)=>{
        res.render("rutines/rutine-detail")
    },
}

module.exports=rutinesController;