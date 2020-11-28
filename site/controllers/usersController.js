const fs = require('fs');
const path = require('path');
const bcrypt = require("bcryptjs")


const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');

function getAllusers(){
    const users = fs.readFileSync(usersFilePath, 'utf-8');
    const usersParsed = JSON.parse(users);
    return usersParsed;
}

function writeusers(arrayToTransform){
    const users = getAllusers();
    const userToWrite = [...users, arrayToTransform];
    const usersJson = JSON.stringify(userToWrite, null, " ");
    fs.writeFileSync(usersFilePath, usersJson);
}

function generateNewId(){
    const users = getAllusers();
    if(users == ""){
        return 0;
    }
    return users.pop().id +1;
}

const usersController={
    login: (req,res)=>{
        res.render("users/login")
    },
    register: (req,res)=>{
        res.render("users/register")
    },
    createUser: (req,res)=>{
        const newUser = {
            id: generateNewId(),
            name: req.body.name,
            lastName: req.body.lastName,
            mail: req.body.mail,
            password: req.body.password
        };
        writeusers(newUser);
        
        res.redirect("/users/login")
    }
}

module.exports=usersController;