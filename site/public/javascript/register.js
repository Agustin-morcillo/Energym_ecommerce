const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{2,}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/, //minimo 8, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico
    avatar: /(.jpg|.jpeg|.png|.gif)$/i
}

let form = document.querySelector("form")
let inputs = document.querySelectorAll(".register-input")


let estado={
    name:false,
    lastName: false,
    email:false,
    password:false,
    avatar:true,
}



let classController = (expresion,input,campo)=>{
    if(expresion.test(input.value)){
        setTimeout(() => {
            document.querySelector(`.register-${campo} p`).classList.add("front-error-inactive")
            document.querySelector(`.register-${campo} p`).classList.remove("front-error-active")
            document.querySelector(`.register-${campo} input`).classList.remove("wrong-input")
            document.querySelector(`.register-${campo} label`).classList.remove("wrong-label")
            document.querySelector(`.register-${campo} small`).classList.add("front-blank-error-inactive")
        }, 500);
     
        estado[campo]=true
    } else{
        setTimeout(() => {
        document.querySelector(`.register-${campo} p`).classList.remove("front-error-inactive")
        document.querySelector(`.register-${campo} p`).classList.add("front-error-active")
        document.querySelector(`.register-${campo} input`).classList.add("wrong-input")
        document.querySelector(`.register-${campo} label`).classList.add("wrong-label")
        document.querySelector(`.register-${campo} small`).classList.add("front-blank-error-inactive")
        }, 500);
        estado[campo]=false
    }
}



let reTypeValidator = (input,reTypeInput)=>{
    if(input.value !== reTypeInput.value){
        document.querySelector(`.register-${reTypeInput.name} p`).classList.remove("front-error-inactive")
        document.querySelector(`.register-${reTypeInput.name} p`).classList.add("front-error-active")
        document.querySelector(`.register-${reTypeInput.name} input`).classList.add("wrong-input")
        document.querySelector(`.register-${reTypeInput.name} label`).classList.add("wrong-label")
        document.querySelector(`.register-${reTypeInput.name} small`).classList.add("front-blank-error-inactive")
        estado[input.name] = false
    } else{
        document.querySelector(`.register-${reTypeInput.name} p`).classList.add("front-error-inactive")
        document.querySelector(`.register-${reTypeInput.name} p`).classList.remove("front-error-active")
        document.querySelector(`.register-${reTypeInput.name} input`).classList.remove("wrong-input")
        document.querySelector(`.register-${reTypeInput.name} label`).classList.remove("wrong-label")
        document.querySelector(`.register-${reTypeInput.name} small`).classList.add("front-blank-error-inactive")
        estado[input.name] = true
    }
}

let password = document.querySelector("#password-register")
let repassword = document.querySelector("#repassword-register")
let reemail = document.querySelector("#retype-email-register")
let email = document.querySelector("#email-register")

let validarCampos = (e)=>{
    switch(e.target.name){
        case "name":
            classController(expresiones.nombre,e.target,e.target.name)
        break;
        case "lastName":
            classController(expresiones.nombre,e.target,e.target.name)
        break;
        case "email":
            classController(expresiones.email,e.target,e.target.name)
            reTypeValidator(email,reemail)
        break;
        case "retypeEmail":
            reTypeValidator(email,reemail)
        break;
        case "password":
            classController(expresiones.password,e.target,e.target.name)
            reTypeValidator(password,repassword)
        break;
        case "retype":
            reTypeValidator(password,repassword)
        break;

    }
}

inputs.forEach((input)=>{
    input.addEventListener("keyup",validarCampos)
    input.addEventListener("blur",validarCampos)
})


let blankField = (InputName,campo)=>{
    if(InputName.value==""){
        document.querySelector(`.register-${campo} small`).classList.remove("front-blank-error-inactive")
        document.querySelector(`.register-${campo} small`).classList.add("front-blank-error-active")
        document.querySelector(`.register-${campo} input`).classList.add("wrong-input")
        document.querySelector(`.register-${campo} label`).classList.add("wrong-label")
        estado[campo] = false
    }
}


form.addEventListener("submit",(e)=>{
    inputs.forEach((input)=>{
        blankField(input,input.name)
    })

    let avatar = document.querySelector("#avatar-register")

    if(avatar.value){
        if(!expresiones.avatar.exec(avatar.value)){
            document.querySelector(".register-img p").classList.remove("front-error-inactive")
            document.querySelector(".register-img p").classList.add("front-error-active")
            estado.avatar=false
        } else{
            document.querySelector(".register-img p").classList.add("front-error-inactive")
            document.querySelector(".register-img p").classList.remove("front-error-active")
            estado.avatar=true

        }
        
    }

    console.table(estado)

    if(!estado.name||!estado.lastName||!estado.password||!estado.email||!estado.avatar){
      e.preventDefault()
    }
    
})