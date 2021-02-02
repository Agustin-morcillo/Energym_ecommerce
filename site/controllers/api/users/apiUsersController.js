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
    }
}


module.exports=apiUsersController;