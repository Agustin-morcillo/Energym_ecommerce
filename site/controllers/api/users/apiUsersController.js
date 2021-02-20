const {User} = require("../../../database/models")
const bcrypt = require("bcryptjs")

const apiUsersController={
    list: async (req,res)=>{
        try {
            const users =  await User.findAll({
                attributes: ["id", "name", "lastname", "email"]
            })
            
            const usersFullInfo = users.map((user)=>{
                return{
                    id:user.id,
                    name: user.name,
                    lastname:user.lastname,
                    email: user.email,
                    detail:`http://localhost:3000/api/users/${user.id}`
                }
            })
            
            return res.json({
                meta: {
                    status:"Success",
                    count: users.length
                },
                data:usersFullInfo,
            })
        
        } catch (error) {
            console.error("Error: " + error)
        }
    },
    findUser: async (req,res)=>{
        
        const id = req.params.id
        
        try{
            const user = await User.findOne({where:{id,}, attributes: ["id", "name", "lastname", "email","avatar"]})

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
                avatar: `http://localhost:3000/images/users/${user.avatar}`
            }
            
            return res.json({
                meta: {
                    status: "Success"
                },
                data: usersFullInfo
            })      
            
        } catch (error){
            console.error("Error: " + error)
        }
    },
    login: async (req,res)=>{
        
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
                },
                data:{
                    user
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