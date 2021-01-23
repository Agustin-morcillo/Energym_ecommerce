/* Expresiones */
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{1,}$/, 
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}


/* Requiriendo los elementos */
let form = document.querySelector("form")
let inputs = document.querySelectorAll(".all-login-inputs")


/* Status de los campos */
let estado={
    email:false,
    password:false
}

/* Funcion que valida los campos */
let validarCampos = (e)=>{
    switch(e.target.name){
        case "email":
            if(expresiones.correo.test(e.target.value)){
                setTimeout(() => {
                    document.querySelector(".login-email-container input").classList.remove("wrong-input")
                    document.querySelector(".login-email-container p").classList.remove("front-error-active")
                    document.querySelector(".login-email-container p").classList.add("front-error-inactive")
                    document.querySelector(".login-email-container small").classList.add("front-blank-error-inactive")
                    document.querySelector(".login-inputs-titles").classList.remove("wrong-label")
                }, 500);
                estado.email = true
            } else{
                setTimeout(() => {
                    document.querySelector(".login-email-container input").classList.add("wrong-input")
                    document.querySelector(".login-email-container p").classList.remove("front-error-inactive")
                    document.querySelector(".login-email-container p").classList.add("front-error-active")
                    document.querySelector(".login-email-container small").classList.add("front-blank-error-inactive")
                    document.querySelector(".login-inputs-titles").classList.add("wrong-label")
                }, 500);
                estado.email = false
            }
        break;
        case "password":
            if(expresiones.password.test(e.target.value)){
                document.querySelector(".login-password-container input").classList.remove("wrong-input")
                document.querySelector(".login-password-container small").classList.add("front-blank-error-inactive")
                document.querySelector(".login-password-container label").classList.remove("wrong-label")
                estado.password = true
            } else{
                document.querySelector(".login-password-container input").classList.add("wrong-input")
                document.querySelector(".login-password-container small").classList.remove("front-blank-error-inactive")
                document.querySelector(".login-password-container label").classList.add("wrong-label")
                estado.password = false
            }
    }
}

/* Eventos para los inputs */
inputs.forEach((input)=>{
    input.addEventListener("keyup",validarCampos)
    input.addEventListener("blur",validarCampos)
})


/* Funcion que verifica si los campos estan vacios */
let blankField = (InputName,campo)=>{
    if(InputName.value==""){
        document.querySelector(`.login-${campo}-container small`).classList.remove("front-blank-error-inactive")
        document.querySelector(`.login-${campo}-container small`).classList.add("front-blank-error-active")
        document.querySelector(`.login-${campo}-container input`).classList.add("wrong-input")
        document.querySelector(`.login-${campo}-container label`).classList.add("wrong-label")
        estado[campo] = false
    }
}


form.addEventListener("submit",(e)=>{
    
    inputs.forEach((input)=>{
        blankField(input,input.name)
    }) 


    if(!estado.email||!estado.password){
        e.preventDefault()
    }
})