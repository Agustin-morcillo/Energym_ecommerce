/* Clases para los errores
- "front-error-inactive" -- oculta el mensaje de error de las expresiones.
- "front-error-active" -- hace visible el mensaje de error de las expresiones.
- "wrong-input" -- pinta de rojo el input.
- "wrong-label" -- pinta de rojo la label.
- "front-blank-error-inactive" -- oculta el mensaje de campo en blanco.
- "front-blank-error-active" -- activa el mensaje de campo en blanco. */


/* Requiriendo los elementos del DOM */
let form = document.querySelector("form")
let inputs = document.querySelectorAll(".register-input")
let password = document.querySelector("#password-register")
let repassword = document.querySelector("#repassword-register")
let email = document.querySelector("#email-register")
let reemail = document.querySelector("#retype-email-register")
let avatar = document.querySelector("#avatar-register")

/* Expresiones regulares */
const expresiones = {
    name: /^[a-zA-ZÀ-ÿ\s]{2,}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // que sea email
    password: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/, //minimo 8, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico
    avatar: /(.jpg|.jpeg|.png|.gif)$/i //que sea de esos formatos.
}

/* Estado de los inputs */
let estado = {
    name: false,
    lastName: false,
    email: false,
    retypeEmail: false,
    password: false,
    retype: false,
    avatar: true
}

/* Funcion que cambia las clases */
let classController = (expresion,input)=>{
    if(expresion.test(input.value)){
            document.querySelector(`.register-${input.name} p`).classList.remove("front-error-active")
            document.querySelector(`.register-${input.name} p`).classList.add("front-error-inactive")
            document.querySelector(`.register-${input.name} input`).classList.remove("wrong-input")
            document.querySelector(`.register-${input.name} label`).classList.remove("wrong-label")
            document.querySelector(`.register-${input.name} small`).classList.remove("front-blank-error-active")
            document.querySelector(`.register-${input.name} small`).classList.add("front-blank-error-inactive")
            
            estado[input.name] = true
    } else{
            document.querySelector(`.register-${input.name} p`).classList.add("front-error-active")
            document.querySelector(`.register-${input.name} p`).classList.remove("front-error-inactive")
            document.querySelector(`.register-${input.name} input`).classList.add("wrong-input")
            document.querySelector(`.register-${input.name} label`).classList.add("wrong-label")
            document.querySelector(`.register-${input.name} small`).classList.remove("front-blank-error-active")
            document.querySelector(`.register-${input.name} small`).classList.add("front-blank-error-inactive")
       
            estado[input.name] = false
    }
}

/* Funcion que valida los campos de retype */
let reTypeInput = (input,retypeInput)=>{
    if(input.value !== retypeInput.value){
        document.querySelector(`.register-${retypeInput.name} p`).classList.add("front-error-active")
        document.querySelector(`.register-${retypeInput.name} p`).classList.remove("front-error-inactive")
        document.querySelector(`.register-${retypeInput.name} input`).classList.add("wrong-input")
        document.querySelector(`.register-${retypeInput.name} label`).classList.add("wrong-label")
        document.querySelector(`.register-${retypeInput.name} small`).classList.remove("front-blank-error-active")
        document.querySelector(`.register-${retypeInput.name} small`).classList.add("front-blank-error-inactive")
        estado[retypeInput.name] = false
    } else{
        document.querySelector(`.register-${retypeInput.name} p`).classList.remove("front-error-active")
        document.querySelector(`.register-${retypeInput.name} p`).classList.add("front-error-inactive")
        document.querySelector(`.register-${retypeInput.name} input`).classList.remove("wrong-input")
        document.querySelector(`.register-${retypeInput.name} label`).classList.remove("wrong-label")
        document.querySelector(`.register-${retypeInput.name} small`).classList.remove("front-blank-error-active")
        document.querySelector(`.register-${retypeInput.name} small`).classList.add("front-blank-error-inactive")
        estado[retypeInput.name] = true
    }
}

/* Funcion que chequea si los campos estan en blanco */
let blankInput = (input)=>{
    if(input.value==""){
        document.querySelector(`.register-${input.name} p`).classList.remove("front-error-active")
        document.querySelector(`.register-${input.name} p`).classList.add("front-error-inactive")
        document.querySelector(`.register-${input.name} input`).classList.add("wrong-input")
        document.querySelector(`.register-${input.name} label`).classList.add("wrong-label")
        document.querySelector(`.register-${input.name} small`).classList.add("front-blank-error-active")
        document.querySelector(`.register-${input.name} small`).classList.remove("front-blank-error-inactive")
        estado[input.name] = false
    } 
}

/* Usuarios de la base de datos */
let usuarios = []

if(window.location.href.includes("localhost")) {
    fetch("http://localhost:3000/api/users")
    .then(resp => resp.json())
    .then(users => {
        for(let user of users.data){
            usuarios.push(user.email)
        }
    })
} else {
    fetch("https://energym.herokuapp.com/api/users")
    .then(resp => resp.json())
    .then(users => {
        for(let user of users.data){
            usuarios.push(user.email)
        }
    })
}


/* Ver si existe el email */
let checkAvailable = (dbUsers,emailInput)=>{
    if(dbUsers.includes(emailInput.value)){
        document.querySelector(".email-available").classList.remove("front-error-inactive")
        document.querySelector(".email-available").classList.add("front-error-active")
        document.querySelector(".register-email input").classList.add("wrong-input")
        document.querySelector(".register-email label").classList.add("wrong-label")
        estado.email= false
    } else{
        document.querySelector(".email-available").classList.add("front-error-inactive")
        document.querySelector(".email-available").classList.remove("front-error-active")
        document.querySelector(".register-email input").classList.remove("wrong-input")
        document.querySelector(".register-email label").classList.remove("wrong-label")
        estado.email= true
    }
}

/* Identificando y validando los inputs */
let validarCampos = (e)=>{
    switch(e.target.name){
        case "name":
          classController(expresiones.name,e.target)
          blankInput(e.target)
        break;
        case "lastName":
            classController(expresiones.name,e.target)
            blankInput(e.target)
        break;
        case "email":
            classController(expresiones.email,e.target)
            blankInput(e.target)
            checkAvailable(usuarios,email);
            reTypeInput(email,reemail)
        break;
        case "retypeEmail":
            reTypeInput(email,reemail)
            blankInput(e.target)
        break;
        case "password":
            classController(expresiones.password,e.target)
            blankInput(e.target)
            reTypeInput(password,repassword)
        break;
        case "retype":
            blankInput(e.target)
            reTypeInput(password,repassword)
        break;

    }
}


/* Eventos de los inputs */
inputs.forEach((input)=>{
    input.addEventListener("keyup",validarCampos)
    input.addEventListener("blur",validarCampos)
})

form.addEventListener("submit",(e)=>{
    
    /* Validacion del avatar */
    if(avatar.value){
        if(expresiones.avatar.exec(avatar.value)){
            document.querySelector(`.register-img p`).classList.remove("front-error-active")
            document.querySelector(`.register-img p`).classList.add("front-error-inactive")
            estado.avatar = true
        } 
        else{
            document.querySelector(`.register-img p`).classList.add("front-error-active")
            document.querySelector(`.register-img p`).classList.remove("front-error-inactive")
            estado.avatar = false
        }
    } else{
        document.querySelector(`.register-img p`).classList.remove("front-error-active")
        document.querySelector(`.register-img p`).classList.add("front-error-inactive")
        estado.avatar = true
    }

    /* Validacion campos en blanco */
    inputs.forEach((input)=>{
        blankInput(input)
    })

    /* Validacion estado de los inputs */
    if(!estado.name||!estado.lastName||!estado.email||!estado.retypeEmail||!estado.retype||!estado.password||!estado.avatar){
        e.preventDefault()
    }
})