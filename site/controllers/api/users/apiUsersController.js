const {User} = require("../../../database/models")
const bcrypt = require("bcryptjs")

const apiUsersController={
    list: async (req,res)=>{
        try {
            const users =  await User.findAll()
            let respuesta ={
                meta: {
                    status:"Success",
                    totalUsers: users.length
                },
                data:users,
            }
            return res.json(respuesta)
        } catch (error) {
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