/* Requiriendo los elementos del DOM */
const form = document.querySelector("form")
const inputs = document.querySelectorAll(".contact-inputs")

/* Expresiones */
const expresiones = {
  text: /^.{1,}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

/* Estado de los inputs */
let estado = {
  email: false,
  subject: false,
  emailBody: false,
}

/* Funcion que chequea si los campos estan en blanco */
const blankInput = (input) => {
  if (input.value === "") {
    estado[input.name] = false

    /* blank textarea */
    if (document.querySelector(`.contact-${input.name}-container textarea`)) {
      document.querySelector(`.contact-${input.name}-container textarea`).classList.add("wrong-input")
      document.querySelector(`.contact-${input.name}-container small`).classList.add("front-blank-error-active")
      document.querySelector(`.contact-${input.name}-container small`).classList.remove("front-blank-error-inactive")
    } else {
      /* blank en inputs */
      document.querySelector(`.contact-${input.name}-container input`).classList.add("wrong-input")
      document.querySelector(`.contact-${input.name}-container small`).classList.add("front-blank-error-active")
      document.querySelector(`.contact-${input.name}-container small`).classList.remove("front-blank-error-inactive")

      /* limpia el error de email invalido cuando el campo esta en blanco */
      if (document.querySelector(`.contact-${input.name}-container .contact-format-error`)) {
        document.querySelector(`.contact-${input.name}-container p`).classList.remove("front-error-active")
        document.querySelector(`.contact-${input.name}-container p`).classList.add("front-error-inactive")
      }
    }
  }
  return
}

/* Funcion que cambia las clases */
const classController = (expresion, input) => {
  if (expresion.test(input.value)) {
    estado[input.name] = true

    /* sin errores en el text-area */
    if (document.querySelector(`.contact-${input.name}-container textarea`)) {
      document.querySelector(`.contact-${input.name}-container textarea`).classList.remove("wrong-input")
      document.querySelector(`.contact-${input.name}-container small`).classList.remove("front-blank-error-active")
      document.querySelector(`.contact-${input.name}-container small`).classList.add("front-blank-error-inactive")
    } else {
      /* sin errores en los inputs*/
      document.querySelector(`.contact-${input.name}-container input`).classList.remove("wrong-input")
      document.querySelector(`.contact-${input.name}-container small`).classList.remove("front-blank-error-active")
      document.querySelector(`.contact-${input.name}-container small`).classList.add("front-blank-error-inactive")
      
      /* sin error en el campo de email */
      if (document.querySelector(`.contact-${input.name}-container .contact-format-error`)) {
        document.querySelector(`.contact-${input.name}-container p`).classList.remove("front-error-active")
        document.querySelector(`.contact-${input.name}-container p`).classList.add("front-error-inactive")
      }
    }
  } else {
    estado[input.name] = false
    
    /* con errores en el text-area */
    if (document.querySelector(`.contact-${input.name}-container textarea`)) {
      document.querySelector(`.contact-${input.name}-container textarea`).classList.add("wrong-input")
      document.querySelector(`.contact-${input.name}-container small`).classList.add("front-blank-error-active")
      document.querySelector(`.contact-${input.name}-container small`).classList.remove("front-blank-error-inactive")
    }

    /* con errores en los inputs*/
    document.querySelector(`.contact-${input.name}-container input`).classList.add("wrong-input")
    document.querySelector(`.contact-${input.name}-container small`).classList.add("front-blank-error-active")
    document.querySelector(`.contact-${input.name}-container small`).classList.remove("front-blank-error-inactive")
    
    /* con error en el campo de email */
    if (document.querySelector(`.contact-${input.name}-container .contact-format-error`)) {
      document.querySelector(`.contact-${input.name}-container p`).classList.add("front-error-active")
      document.querySelector(`.contact-${input.name}-container p`).classList.remove("front-error-inactive")
      document.querySelector(`.contact-${input.name}-container small`).classList.remove("front-blank-error-active")
      document.querySelector(`.contact-${input.name}-container small`).classList.add("front-blank-error-inactive")
    }
  }
}

/* Identificando y validando los inputs */
const validarCampos = (e) => {
  switch (e.target.name) {
    case "email":
      classController(expresiones.email, e.target)
      blankInput(e.target)
      break
    case "subject":
      blankInput(e.target)
      classController(expresiones.text, e.target)
      break
    case "emailBody":
      blankInput(e.target)
      classController(expresiones.text, e.target)
      break
  }
}

/* dandole eventos a los inputs */
inputs.forEach((input) => {
  input.addEventListener("keyup", validarCampos)
  input.addEventListener("blur", validarCampos)
})

/* Submit del form */
form.addEventListener("submit", (e) => {
  e.preventDefault()

  inputs.forEach((input) => {
    blankInput(input)
  })

  if (estado.email && estado.subject && estado.emailBody) {
    form.submit()
  }
})
