/* Clases para los errores
- "front-error-inactive" -- oculta el mensaje de error de las expresiones.
- "front-error-active" -- hace visible el mensaje de error de las expresiones.
- "wrong-input" -- pinta de rojo el input.
- "wrong-label" -- pinta de rojo la label.
- "front-blank-error-inactive" -- oculta el mensaje de campo en blanco.
- "front-blank-error-active" -- activa el mensaje de campo en blanco. */

/* Requiriendo los elementos del DOM */
let form = document.querySelector("form")
let inputs = document.querySelectorAll(".inputs-fields")


/* Expresiones regulares */
const expresiones = {
    name: /^[a-zA-ZÀ-ÿ\s]{2,}$/, // Letras y espacios, pueden llevar acentos.
    avatar: /(.jpg|.jpeg|.png|.gif)$/i //que sea de esos formatos.
}

/* Estado de los inputs */
let estado = {
    name: true,
    lastName: true,
    avatar: true
}

/* Expresiones regulares */
const expresiones = {
    name: /^[a-zA-ZÀ-ÿ\s]{2,}$/, // Letras y espacios, pueden llevar acentos.
    avatar: /(.jpg|.jpeg|.png|.gif)$/i //que sea de esos formatos.
}

/* Funcion que cambia las clases */
let classController = (expresion,input)=>{
    if(expresion.test(input.value)){
        document.querySelector(`.profile-${input.name} p`).classList.remove("front-error-active")
        document.querySelector(`.profile-${input.name} p`).classList.add("front-error-inactive")
        document.querySelector(`.profile-${input.name} input`).classList.remove("wrong-input")
        document.querySelector(`.profile-${input.name} label`).classList.remove("wrong-label")
        document.querySelector(`.profile-${input.name} small`).classList.remove("front-blank-error-active")
        document.querySelector(`.profile-${input.name} small`).classList.add("front-blank-error-inactive")
        estado[input.name] = true
    } else{
        document.querySelector(`.profile-${input.name} p`).classList.add("front-error-active")
        document.querySelector(`.profile-${input.name} p`).classList.remove("front-error-inactive")
        document.querySelector(`.profile-${input.name} input`).classList.add("wrong-input")
        document.querySelector(`.profile-${input.name} label`).classList.add("wrong-label")
        document.querySelector(`.profile-${input.name} small`).classList.remove("front-blank-error-active")
        document.querySelector(`.profile-${input.name} small`).classList.add("front-blank-error-inactive")
        estado[input.name] = false
    }
}

/* Funcion que chequea si los campos estan en blanco */
let blankInput = (input)=>{
    if(input.value==""){
        document.querySelector(`.profile-${input.name} p`).classList.remove("front-error-active")
        document.querySelector(`.profile-${input.name} p`).classList.add("front-error-inactive")
        document.querySelector(`.profile-${input.name} input`).classList.add("wrong-input")
        document.querySelector(`.profile-${input.name} label`).classList.add("wrong-label")
        document.querySelector(`.profile-${input.name} small`).classList.add("front-blank-error-active")
        document.querySelector(`.profile-${input.name} small`).classList.remove("front-blank-error-inactive")
        estado[input.name] = false
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
    }
}

/* Eventos de los inputs */

inputs.forEach((input)=>{
    input.addEventListener("keyup",validarCampos)
    input.addEventListener("blur",validarCampos)
})

form.addEventListener("submit",(e)=>{
    
    /* Validacion campos en blanco */
    inputs.forEach((input)=>{
        blankInput(input)
    })
    
    /* Validacion del avatar */
    let avatar = document.querySelector("#image")
    if(avatar.value){
        if(expresiones.avatar.exec(avatar.value)){
            document.querySelector(`.register-img p`).classList.remove("front-error-active")
            document.querySelector(`.register-img p`).classList.add("front-error-inactive")
            estado.avatar = true
        } else{
            document.querySelector(`.register-img p`).classList.add("front-error-active")
            document.querySelector(`.register-img p`).classList.remove("front-error-inactive")
            estado.avatar = false
        }
    }

     /* Validacion estado de los inputs */
     if(!estado.name||!estado.lastName||!estado.avatar){
        e.preventDefault()
    }

})