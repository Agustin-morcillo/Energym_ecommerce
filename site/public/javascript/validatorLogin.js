/* Clases para los errores
- "front-error-inactive" -- oculta el mensaje de error de las expresiones.
- "front-error-active" -- hace visible el mensaje de error de las expresiones.
- "wrong-input" -- pinta de rojo el input.
- "wrong-label" -- pinta de rojo la label.
- "front-blank-error-inactive" -- oculta el mensaje de campo en blanco.
- "front-blank-error-active" -- activa el mensaje de campo en blanco. */



/* Requiriendo los elementos del DOM */
let form = document.querySelector("form")
let inputs = document.querySelectorAll(".all-login-inputs")
let email = document.querySelector("#email-login")
let password = document.querySelector("#password-login")

/* Expresiones */
const expresiones = {
	password: /^.{1,}$/, 
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

/* Estado de los inputs */
let estado = {
    email:false,
    password:false
}

/* Funcion que cambia las clases */
let classController = (expresion,input)=>{
    if(expresion.test(input.value)){
        document.querySelector(`.login-${input.name} input`).classList.remove("wrong-input")
        document.querySelector(`.login-${input.name} label`).classList.remove("wrong-label")
        document.querySelector(`.login-${input.name} small`).classList.remove("front-blank-error-active")
        document.querySelector(`.login-${input.name} small`).classList.add("front-blank-error-inactive")

        if(document.querySelector(`.login-${input.name} .login-email-error`)){
            document.querySelector(`.login-${input.name} p`).classList.remove("front-error-active")
            document.querySelector(`.login-${input.name} p`).classList.add("front-error-inactive")
            document.querySelector(`.login-${input.name} .password-email-error`).classList.add("front-error-inactive")
            document.querySelector(`.login-${input.name} .password-email-error`).classList.remove("front-error-active")
        }
          
        estado[input.name] = true
    } else{
        document.querySelector(`.login-${input.name} input`).classList.add("wrong-input")
        document.querySelector(`.login-${input.name} label`).classList.add("wrong-label")
        document.querySelector(`.login-${input.name} small`).classList.remove("front-blank-error-active")
        document.querySelector(`.login-${input.name} small`).classList.add("front-blank-error-inactive")
        
        if(document.querySelector(`.login-${input.name} .login-email-error`)){
            document.querySelector(`.login-${input.name} p`).classList.add("front-error-active")
            document.querySelector(`.login-${input.name} p`).classList.remove("front-error-inactive")
            document.querySelector(`.login-${input.name} .password-email-error`).classList.add("front-error-inactive")
            document.querySelector(`.login-${input.name} .password-email-error`).classList.remove("front-error-active")
        }
        estado[input.name] = false
    }
}

/* Funcion que chequea si los campos estan en blanco */
let blankInput = (input)=>{
    if(input.value==""){
        
        document.querySelector(`.login-${input.name} input`).classList.add("wrong-input")
        document.querySelector(`.login-${input.name} label`).classList.add("wrong-label")
        document.querySelector(`.login-${input.name} small`).classList.add("front-blank-error-active")
        document.querySelector(`.login-${input.name} small`).classList.remove("front-blank-error-inactive")
        document.querySelector(".password-email-error").classList.remove("front-error-active")
        document.querySelector(".password-email-error").classList.add("front-error-inactive")

        if(document.querySelector(`.login-${input.name} .login-email-error`)){
            document.querySelector(`.login-${input.name} p`).classList.remove("front-error-active")
            document.querySelector(`.login-${input.name} p`).classList.add("front-error-inactive")
        }  
        estado[input.name] = false
    } 
}

/* Usuarios de la base de datos */


/* Identificando y validando los inputs */
let validarCampos = (e)=>{
    switch(e.target.name){  
        case "email":
            classController(expresiones.email,e.target)
            blankInput(e.target)
        break;
        case "password":
            classController(expresiones.password,e.target)
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

    /* let data ={
        email: email.value,
        password: password.value,
    }
    let seeting ={
        method: "POST",
        body: JSON.stringify(data),
        headers:{
        "Content-Type": "application/json"
        }
    }    
    
    fetch("http://localhost:3000/api/users/checkCredentials",seeting)
    .then(res => res.json())
    .then(response => {
       if(response.meta.status!="error"){
            document.querySelector(".password-email-error").classList.remove("front-error-active")
            document.querySelector(".password-email-error").classList.add("front-error-inactive")
            document.querySelector(`.login-email input`).classList.remove("wrong-input")
            document.querySelector(`.login-email label`).classList.remove("wrong-label")
            estado.email = true,
            estado.password = true
            
       } else{
           document.querySelector(".password-email-error").classList.add("front-error-active")
           document.querySelector(".password-email-error").classList.remove("front-error-inactive")
           document.querySelector(`.login-email input`).classList.add("wrong-input")
           document.querySelector(`.login-email label`).classList.add("wrong-label")
           estado.email = false,
           estado.password = false
       }
    })
    .catch(error=>console.error(error)) */

    
  
    /* Validacion estado de los inputs */
    if(!estado.email||!estado.password){
        e.preventDefault()
    }
})