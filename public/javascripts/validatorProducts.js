/* Clases para los errores
- "front-error-inactive" -- p -- oculta el mensaje de error de las expresiones.
- "front-error-active" -- p -- hace visible el mensaje de error de las expresiones.
- "wrong-input" -- pinta de rojo el input.
- "wrong-label" -- pinta de rojo la label.
- "front-blank-error-inactive" -- small --  oculta el mensaje de campo en blanco.
- "front-blank-error-active" -- small -- activa el mensaje de campo en blanco. */

/* Requiriendo los elementos del DOM */
const form = document.querySelector("form")
const inputs = document.querySelectorAll(".input-validator")
const image = document.querySelector("#add-edit-product-image")
const description = document.querySelector("#create-edit-product-description")
const error = (campo, label) => {
  return document.querySelector(`.create-product-error-${campo} ${label}`)
}
const backEndError = document.querySelector(".validation-error-product")

/* Expresiones */
const expresiones = {
  name: /^[a-zA-ZÀ-ÿ\s]{5,}$/, // Letras y espacios, pueden llevar acentos.
  image: /(.jpg|.jpeg|.png|.gif)$/i,
  price: /(^(?:-\d))/g,
}

/* Estado de los inputs */
let estado = {
  name: false,
  price: false,
  introduction: false,
  description: false,
  weight: false,
  size: false,
  material: false,
  image: false,
}

/* Distribuidor */
const validator = (inputElement, event) => {
  if (inputElement.name == "name") {
    /*1- Empty*/ emptyValidator(inputElement)
    if (inputElement.value != "") {
      /*2- Expresiones name*/ validExpName(inputElement, expresiones.name)
    }
  }
  if (inputElement.name == "price") {
    /*1- Empty*/ emptyValidator(inputElement)
    if (inputElement.value != "") {
      /*6- Extension precio*/ extPrice(inputElement, expresiones.price)
      /*8- Validar mayor a 0*/ positiveNumber(inputElement)
    }
  }
  if (inputElement.name == "introduction") {
    /*1- Empty*/ emptyValidator(inputElement)
    if (inputElement.value != "") {
      /*7- Extension introduccion*/ extIntroduction(inputElement)
    }
  }
  if (inputElement.name == "description") {
    /*9- Empty description*/ blankDescription(inputElement)
    if (inputElement.value != "") {
      /*5- Extension description*/ extDescription(inputElement)
    }
  }
  if (inputElement.name == "weight") {
    /*1- Empty*/ emptyValidator(inputElement)
    if (inputElement.value != "") {
      /*8- Validar mayor a 0*/ positiveNumber(inputElement)
    }
  }
  if (inputElement.name == "size") {
    /*1- Empty*/ emptyValidator(inputElement)
  }
  if (inputElement.name == "material") {
    /*1- Empty*/ emptyValidator(inputElement)
  }
}

/* Validador 1 empty o campo obligatorio */
const emptyValidator = (inputElement) => {
  if (inputElement.value == "") {
    //add error
    error(inputElement.name, "small").classList.remove("front-blank-error-inactive")
    error(inputElement.name, "small").classList.add("front-blank-error-active")
    error(inputElement.name, "label").classList.add("wrong-label")
    error(inputElement.name, "input").classList.add("wrong-input")
    error(inputElement.name, "p").classList.add("front-error-inactive")
    error(inputElement.name, "p").classList.remove("front-error-active")
    backEndError.classList.add("front-blank-error-inactive")
    estado[inputElement.name] = false
    return
  }
  //remove error
  error(inputElement.name, "small").classList.add("front-blank-error-inactive")
  error(inputElement.name, "small").classList.remove("front-blank-error-active")
  error(inputElement.name, "input").classList.remove("wrong-input")
  error(inputElement.name, "label").classList.remove("wrong-label")
  estado[inputElement.name] = true
}

/* Validador 2 expresiones name */
const validExpName = (inputElement, expresion) => {
  if (!expresion.test(inputElement.value) && inputElement.value != "") {
    //add error
    error(inputElement.name, "p").classList.remove("front-error-inactive")
    error(inputElement.name, "p").classList.add("front-error-active")
    error(inputElement.name, "input").classList.add("wrong-input")
    error(inputElement.name, "label").classList.add("wrong-label")
    backEndError.classList.add("front-blank-error-inactive")
    estado[inputElement.name] = false
    return
  }
  //remove error
  error(inputElement.name, "p").classList.add("front-error-inactive")
  error(inputElement.name, "p").classList.remove("front-error-active")
  error(inputElement.name, "input").classList.remove("wrong-input")
  error(inputElement.name, "label").classList.remove("wrong-label")
  estado[inputElement.name] = true
}

/* Validador 3 extension description */
const extDescription = (inputElement) => {
  const inputElementValue = inputElement.value
  if (inputElementValue.length < 20) {
    //add error
    error(inputElement.name, "p").classList.remove("front-error-inactive")
    error(inputElement.name, "p").classList.add("front-error-active")
    error(inputElement.name, "textarea").classList.add("wrong-input")
    error(inputElement.name, "label").classList.add("wrong-label")
    backEndError.classList.add("front-blank-error-inactive")
    estado[inputElement.name] = false
    return
  }
  //remove error
  error(inputElement.name, "p").classList.add("front-error-inactive")
  error(inputElement.name, "p").classList.remove("front-error-active")
  error(inputElement.name, "textarea").classList.remove("wrong-input")
  error(inputElement.name, "label").classList.remove("wrong-label")
  estado[inputElement.name] = true
}

/* Validador 4 submit */
const blankSubmitValidator = (inputElement) => {
  if (inputElement.value == "") {
    //add error
    error(inputElement.name, "small").classList.remove("front-blank-error-inactive")
    error(inputElement.name, "small").classList.add("front-blank-error-active")
    error(inputElement.name, "input").classList.add("wrong-input")
    error(inputElement.name, "label").classList.add("wrong-label")
    backEndError.classList.add("front-blank-error-inactive")
    error(inputElement.name, "p").classList.add("front-error-inactive")
    estado[inputElement.name] = false
    return
  } else {
    //remove error
    error(inputElement.name, "small").classList.add("front-blank-error-inactive")
    error(inputElement.name, "small").classList.remove("front-blank-error-active")
    error(inputElement.name, "input").classList.remove("wrong-input")
    error(inputElement.name, "label").classList.remove("wrong-label")
    estado[inputElement.name] = true
  }
}

/* Validador 5 extension precio */
const extPrice = (inputElement, expresion) => {
  if (expresion.test(inputElement.value)) {
    //add error
    error(inputElement.name, "p").classList.remove("front-error-inactive")
    error(inputElement.name, "p").classList.add("front-error-active")
    error(inputElement.name, "input").classList.add("wrong-input")
    error(inputElement.name, "label").classList.add("wrong-label")
    backEndError.classList.add("front-blank-error-inactive")
    estado[inputElement.name] = false
    return
  }
  //remove error
  error(inputElement.name, "p").classList.add("front-error-inactive")
  error(inputElement.name, "p").classList.remove("front-error-active")
  error(inputElement.name, "input").classList.remove("wrong-input")
  error(inputElement.name, "label").classList.remove("wrong-label")
  estado[inputElement.name] = true
}

/* Validador 6 extension introduccion */
const extIntroduction = (inputElement) => {
  if (inputElement.value.length < 5 || inputElement.value.length > 78) {
    //add error
    error(inputElement.name, "p").classList.remove("front-error-inactive")
    error(inputElement.name, "p").classList.add("front-error-active")
    error(inputElement.name, "input").classList.add("wrong-input")
    error(inputElement.name, "label").classList.add("wrong-label")
    backEndError.classList.add("front-blank-error-inactive")
    estado[inputElement.name] = false
    return
  }
  //remove error
  error(inputElement.name, "p").classList.add("front-error-inactive")
  error(inputElement.name, "p").classList.remove("front-error-active")
  error(inputElement.name, "input").classList.remove("wrong-input")
  error(inputElement.name, "label").classList.remove("wrong-label")
  estado[inputElement.name] = true
}

/* Validador 7 numero mayor a 0 */
const positiveNumber = (inputElement) => {
  if (inputElement.value < 1) {
    //add error
    error(inputElement.name, "p").classList.remove("front-error-inactive")
    error(inputElement.name, "p").classList.add("front-error-active")
    error(inputElement.name, "input").classList.add("wrong-input")
    error(inputElement.name, "label").classList.add("wrong-label")
    backEndError.classList.add("front-blank-error-inactive")
    estado[inputElement.name] = false
    return
  }
  //remove error
  error(inputElement.name, "p").classList.add("front-error-inactive")
  error(inputElement.name, "p").classList.remove("front-error-active")
  error(inputElement.name, "input").classList.remove("wrong-input")
  error(inputElement.name, "label").classList.remove("wrong-label")
  estado[inputElement.name] = true
}

/* Validador 8 blank description */
const blankDescription = (inputElement) => {
  if (inputElement.value == "") {
    //add error
    error(inputElement.name, "small").classList.remove("front-blank-error-inactive")
    error(inputElement.name, "small").classList.add("front-blank-error-active")
    error(inputElement.name, "textarea").classList.add("wrong-input")
    error(inputElement.name, "label").classList.add("wrong-label")
    error(inputElement.name, "p").classList.add("front-error-inactive")
    error(inputElement.name, "p").classList.remove("front-error-active")
    backEndError.classList.add("front-blank-error-inactive")
    estado[inputElement.name] = false
    return
  }
  //remove error
  error(inputElement.name, "small").classList.add("front-blank-error-inactive")
  error(inputElement.name, "small").classList.remove("front-blank-error-active")
  error(inputElement.name, "textarea").classList.remove("wrong-input")
  error(inputElement.name, "label").classList.remove("wrong-label")
  estado[inputElement.name] = true
}

/* Validacion campo por campo */
inputs.forEach((input) => {
  input.addEventListener("blur", (e) => {
    validator(input, e)
  })
  input.addEventListener("keyup", (e) => {
    validator(input, e)
  })
})

//Validacion submit empty
form.addEventListener("submit", (e) => {
  if (
    !estado.name ||
    !estado.price ||
    !estado.introduction ||
    !estado.description ||
    !estado.weight ||
    !estado.size ||
    !estado.material ||
    !estado.image
  ) {
    e.preventDefault()
  }
  inputs.forEach((input) => {
    if (input.name != "description") {
      blankSubmitValidator(input)
    }
  })

  /* Validacion del image */
  if (image.value) {
    if (expresiones.image.exec(image.value)) {
      document.querySelector(`.admin-img-2 p`).classList.remove("front-error-active")
      document.querySelector(`.admin-img-2 p`).classList.add("front-error-inactive")
      estado.image = true
    } else {
      document.querySelector(`.admin-img-2 p`).classList.add("front-error-active")
      document.querySelector(`.admin-img-2 p`).classList.remove("front-error-inactive")
      estado.image = false
    }
  } else {
    document.querySelector(`.admin-img-2 p`).classList.add("front-error-active")
    document.querySelector(`.admin-img-2 p`).classList.remove("front-error-inactive")
    estado.image = false
  }
  blankDescription(description)
})
