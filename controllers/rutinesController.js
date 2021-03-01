const fs = require('fs');
let {validationResult} = require ('express-validator');
const path = require('path');
const db = require("../database/models")
const deleteFailureFile = path.join(__dirname, '../public/images/rutines/');

let pageTitle = "";


const rutinesController = {
    rutinePage : async (req,res)=>{
        pageTitle = "Energym - Rutinas"
        let rutines = await db.Rutine.findAll();
        return res.render("rutines/rutines",{rutines,pageTitle})
    },
    rutineDetail: async (req,res)=>{
        pageTitle = "Energym - Detalle de rutina"
        let id = req.params.id
        let rutine = await db.Rutine.findByPk(id);
        return res.render("rutines/rutine-detail",{rutine,pageTitle})
    },
    createView: (req,res)=>{
        pageTitle = "Energym - Crear Rutina"
        return res.render("rutines/create-rutine",{pageTitle})
    },
    storeRutine: async (req,res)=>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            pageTitle = "Energym - Crear Rutina"
            res.render("rutines/create-rutine", {errors: errors.mapped(), pageTitle});
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
        pageTitle = "Energym - Editar Rutina"
        let id = req.params.id
        let rutineToEdit = await db.Rutine.findByPk(id);
        return res.render("rutines/edit-rutine",{rutineToEdit,pageTitle})
    },
    editRutine: async (req,res)=>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            pageTitle = "Energym - Editar Rutina";
            let rutineToEdit = await db.Rutine.findByPk(req.params.id)
            res.render("rutines/edit-rutine", {errors: errors.mapped(),rutineToEdit, pageTitle});
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