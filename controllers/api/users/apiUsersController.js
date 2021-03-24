const {User} = require("../../../database/models")
const bcrypt = require("bcryptjs")
const {paginationFunction} = require("../../../helpers/pagination.js");

const apiUsersController={
    listUsers: async (req,res)=>{
        
        try {
            //Configuracion variables paginacion
            const counter = await User.findAll();
            
            const pagination = paginationFunction("api/users", counter, req.query.limit, req.query.page)
            
            //Pedido asincronico base de datos usuarios
            const users =  await User.findAll({
                offset: pagination.offset,
                limit: pagination.limit,
                attributes: ["id", "name", "lastname", "email", "avatar", "createdAt", "updatedAt"]
            })
            
            const usersFullInfo = users.map((user)=>{
                return{
                    id:user.id,
                    name: user.name,
                    lastname:user.lastname,
                    email: user.email,
                    avatar: process.env.API_URL+`images/users/${user.avatar}`,
                    detail: process.env.API_URL+`api/users/${user.id}`,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            })
            
            return res.json({
                meta:pagination.meta,
                data:usersFullInfo,
            })
        
        } catch (error) {
            return res.status(404).json({
                meta: {
                    status: "error"
                },
                error: error
            })
        }
    },
    userDetail: async (req,res)=>{
        
        try {
            const user = await User.findOne({
                where:{
                    id: req.params.id
                },
                attributes: ["id", "name", "lastname", "email","avatar", "createdAt", "updatedAt"]
            })

            if(!user){
                return res.json({
                meta: {
                    status: "Error",
                    message: "Usuario no encontrado en la base"
                    }
                })
            }

            const usersFullInfo = { 
                id:user.id,
                name: user.name,
                lastname: user.lastname,
                email:user.email,
                avatar: process.env.API_URL+`images/users/${user.avatar}`,
                url: process.env.API_URL+`api/users/${user.id}`,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
            
            return res.json({
                meta: {
                    status: "Success"
                },
                data: usersFullInfo
            })      
            
        } catch (error){
            return res.status(404).json({
                meta: {
                    status: "error"
                },
                error: error
            })
        }
    },
    checkLogin: async (req,res)=>{
        
        const {email,password} = req.body

        let user;

        try {
            user = await User.findOne({
                where:{
                    email,
                }
            })
        } catch (error) {
            console.error(error)
        }
       
        if(user && bcrypt.compareSync(password,user.password)){
            res.json({
                meta: {
                    status: "sucess",
                }
            })
        } 
        
        return res.status(200).json({
            meta: {
                status: "error"
                },
                error: "Email o password Incorrecto"
            })
        }
    }

module.exports=apiUsersController;