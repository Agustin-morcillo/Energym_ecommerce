const {User} = require("../../../database/models")
const bcrypt = require("bcryptjs")
const { paginationFunction } = require("../../../helpers/pagination.js");

const apiUsersController={
    listUsers: async (req,res)=>{
        try {
            //paginacion
            const counter = await User.findAll();
            const pagination = paginationFunction(req.baseUrl, counter, req.query.limit, req.query.page)
            // 

            const users =  await User.findAll({
                offset: pagination.offset, //paginacion
                limit: pagination.limit, //paginacion
                attributes: ["id", "name", "lastname", "email", "avatar", "createdAt", "updatedAt"]
            })
            
            const usersFullInfo = users.map((user)=>{
                return{
                    id:user.id,
                    name: user.name,
                    lastname:user.lastname,
                    email: user.email,
                    avatar: process.env.API_URL+`images/users/${user.avatar}`,
                    detail:process.env.API_URL+`api/users/${user.id}`,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            })
            
            return res.json({
                meta:pagination.meta, //paginacion
                data:usersFullInfo,
            })
        
        } catch (error) {
            res.status(404).json({
                meta: {
                    status: "error"
                },
                error: `${error}`
                })
        }
    },
    userDetail: async (req,res)=>{
        
        const id = req.params.id
        
        try{
            const user = await User.findOne({where:{id,}, attributes: ["id", "name", "lastname", "email","avatar", "createdAt", "updatedAt"]})

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
            res.status(404).json({
                meta: {
                    status: "error"
                },
                error: error
                })
            }

        
    },
    checkLogin: async (req,res)=>{
        
        const {email,password} = req.body
       
        const user = await User.findOne({
            where:{
                email,
            }
        })

        if(user && bcrypt.compareSync(password,user.password)){
            res.json({
                meta: {
                    status: "sucess",
                }
            })
            return
        } 
        
        res.status(200).json({
            meta: {
                status: "error"
            },
            error: "Email o password Incorrecto"
            })
        }
    }

module.exports=apiUsersController;