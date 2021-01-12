const fs = require('fs');
let {validationResult} = require ('express-validator');
const path = require('path');
const db = require("../database/models")
const deleteFailureFile = path.join(__dirname, '../public/images/rutines/');


const rutinesController = {
    rutinePage : async (req,res)=>{
        let pageTitle = "Energym - Rutinas"
        let rutines = await db.Rutine.findAll();
        return res.render("rutines/rutines",{rutines,pageTitle})
    },
    rutineDetail: async (req,res)=>{
        let pageTitle = "Energym - Detalle de producto"
        let id = req.params.id
        let rutine = await db.Rutine.findByPk(id);
        return res.render("rutines/rutine-detail",{rutine,pageTitle})
    },
    createView: (req,res)=>{
        let pageTitle = "Energym - Crear Rutina"
       return res.render("rutines/create-rutine",{pageTitle})
    },
    storeRutine: async (req,res)=>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.render("rutines/create-rutine", {errors: errors.mapped()});
            return req.files[0] && req.files[0].filename ? fs.unlinkSync(deleteFailureFile + req.files[0].filename) : " ";
        }

        let newRutine = await db.Rutine.create({
            name: req.body.name,
            price: req.body.price,
            introduction: req.body.introduction,
            description: req.body.description,
            duration_weeks: req.body.duration,
            category: req.body.category,
            homepage: req.body.homepage,
            image: req.files[0].filename
        })
        return res.redirect('/admin');
    },
    editView: async (req,res)=>{
        let pageTitle = "Energym - Editar Rutina"
        let id = req.params.id
        let rutineToEdit = await db.Rutine.findByPk(id);
        return res.render("rutines/edit-rutine",{rutineToEdit,pageTitle})
    },
    editRutine: async (req,res)=>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            let rutineToEdit = await db.Rutine.findByPk(req.params.id)
            res.render("rutines/edit-rutine", {errors: errors.mapped(),rutineToEdit});
            return req.files[0] && req.files[0].filename ? fs.unlinkSync(deleteFailureFile + req.files[0].filename) : " ";
        }


        let rutineToEdit = await db.Rutine.findByPk(req.params.id)
        let rutine = await db.Rutine.update({
            name: req.body.name,
            price: req.body.price,
            introduction: req.body.introduction,
            description: req.body.description,
            duration_weeks: req.body.duration,
            category: req.body.category,
            homepage: req.body.homepage,
            image: req.files[0] ? req.files[0].filename : rutineToEdit.image
        },
        {
            where:{
                id:req.params.id
            }
        });

        return res.redirect("/admin")
    },
    deleteRutine: async (req,res)=>{
        let rutineToDelete = await db.Rutine.destroy({
            where:{
                id: req.params.id
            }
        })
        return res.redirect("/admin")
    }
}

module.exports=rutinesController;