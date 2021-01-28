/* Clases para los errores
- "front-error-inactive" -- p -- oculta el mensaje de error de las expresiones.
- "front-error-active" -- p -- hace visible el mensaje de error de las expresiones.
- "wrong-input" -- pinta de rojo el input.
- "wrong-label" -- pinta de rojo la label.
- "front-blank-error-inactive" -- small --  oculta el mensaje de campo en blanco.
- "front-blank-error-active" -- small -- activa el mensaje de campo en blanco. */

//Selectores---------------------------------------------------------------------
let form = document.querySelector("form");
let inputs = document.querySelectorAll(".input-validator");
let image = document.querySelector("#add-edit-product-image");
let name = document.querySelector("#add-edit-product-name");
let error = (campo, label)=>{return document.querySelector(`.create-rutine-error-${campo} ${label}`)};
let backEndError = document.querySelector(".validation-error-product");

//Estados para preventDefault----------------------------------------------------
let estado = {
    name:false,
    description: false,
    image:true,
}

//Expresiones--------------------------------------------------------------------
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{5,}$/, // Letras y espacios, pueden llevar acentos.
    image: /(.jpg|.jpeg|.png|.gif)$/i
}

//FUNCIONES DE VALIDADORES//

//Distribuidor name y description------------------------------------------------
let validator = (inputElement, event)=>{
    if(inputElement.name == "name"){
        /*1- Empty*/ emptyValidator(inputElement); 
        if(event.type == "keyup"){
            /*2- Expresiones name*/ validExpName(inputElement, expresiones.nombre);
        }
    }
    if(inputElement.name == "description"){
        /*5- Extension description*/ extDescription(inputElement);
    }
}

//Validador 1 empty o campo obligatorio-----------------------------------------
let emptyValidator = (inputElement)=>{
    if(inputElement.value == ""){
        //add error
        error(inputElement.name, "small").classList.remove("front-blank-error-inactive")
        error(inputElement.name, "small").classList.add("front-blank-error-active")
        error(inputElement.name, "input").classList.add("wrong-input")
        error(inputElement.name, "label").classList.add("wrong-label")
        error(inputElement.name, "p").classList.add("front-error-inactive")
        error(inputElement.name, "p").classList.remove("front-error-active")
        backEndError.classList.add("front-blank-error-inactive")
        estado[inputElement.name]= false;
        return; 
    }
    //remove error
    error(inputElement.name, "small").classList.add("front-blank-error-inactive")
    error(inputElement.name, "small").classList.remove("front-blank-error-active")
    error(inputElement.name, "input").classList.remove("wrong-input")
    error(inputElement.name, "label").classList.remove("wrong-label")
    estado[inputElement.name]= true;
}

//Validador 2 expresiones name-------------------------------------------------
let validExpName = (inputElement, expresion)=>{
    if(!expresion.test(inputElement.value) && inputElement.value != ""){
        //add error
        error(inputElement.name, "p").classList.remove("front-error-inactive")
        error(inputElement.name, "p").classList.add("front-error-active")
        error(inputElement.name, "input").classList.add("wrong-input")
        error(inputElement.name, "label").classList.add("wrong-label")
        backEndError.classList.add("front-blank-error-inactive")
        estado[inputElement.name]= false;
        return; 
    }
    //remove error
    error(inputElement.name, "p").classList.add("front-error-inactive")
    error(inputElement.name, "p").classList.remove("front-error-active")
    error(inputElement.name, "input").classList.remove("wrong-input")
    error(inputElement.name, "label").classList.remove("wrong-label")
    estado[inputElement.name]= true;
    console.log(estado.name)
}

//Validador 3 extension description-------------------------------------------
let extDescription = (inputElement)=>{
    let inputElementValue = inputElement.value;
    if(inputElementValue.length < 20){
        //add error
        error(inputElement.name, "p").classList.remove("front-error-inactive")
        error(inputElement.name, "p").classList.add("front-error-active")
        error(inputElement.name, "textarea").classList.add("wrong-input")
        error(inputElement.name, "label").classList.add("wrong-label")
        backEndError.classList.add("front-blank-error-inactive")
        estado[inputElement.name]= false;        
        return; 
    }
    //remove error
    error(inputElement.name, "p").classList.add("front-error-inactive")
    error(inputElement.name, "p").classList.remove("front-error-active")
    error(inputElement.name, "textarea").classList.remove("wrong-input")
    error(inputElement.name, "label").classList.remove("wrong-label")
    estado[inputElement.name]= true;
}

//Validador 4 de expresion de imagen------------------------------------------
let imgExtValidator = (inputElement)=>{
    if(!expresiones.image.exec(inputElement.value)){
        //add error
        error(inputElement.name, "p").classList.remove("front-error-inactive")
        error(inputElement.name, "p").classList.add("front-error-active")
        error(inputElement.name, "label").classList.add("wrong-label")
        backEndError.classList.add("front-blank-error-inactive")
        estado[inputElement.name]= false;
        return;
    }
    //remove error
    error(inputElement.name, "p").classList.add("front-error-inactive")
    error(inputElement.name, "p").classList.remove("front-error-active")
    error(inputElement.name, "label").classList.remove("wrong-label")
    estado[inputElement.name]= true;
    console.log(estado.image)
}

//Validador 5 submit---------------------------------------------------------
let blankSubmitValidator = (inputElement)=>{
    if(inputElement.value == ""){
        //add error
        error(inputElement.name, "small").classList.remove("front-blank-error-inactive")
        error(inputElement.name, "small").classList.add("front-blank-error-active")
        error(inputElement.name, "input").classList.add("wrong-input")
        error(inputElement.name, "label").classList.add("wrong-label")
        backEndError.classList.add("front-blank-error-inactive")
        estado[inputElement.name]= false;
        return; 
    } else {
        //remove error
        error(inputElement.name, "small").classList.add("front-blank-error-inactive")
        error(inputElement.name, "small").classList.remove("front-blank-error-active")
        error(inputElement.name, "input").classList.remove("wrong-input")
        error(inputElement.name, "label").classList.remove("wrong-label")
        estado[inputElement.name]= true;
    }
}

//EJECUCION DE EVENTOS DE VALIDACION//

//Validacion campo por campo (name y description)
inputs.forEach((input)=>{
    input.addEventListener("blur", (e)=>{
        validator(input, e);
    })
    input.addEventListener("keyup", (e)=>{
        validator(input, e);
    })
})

//Validacion imagen
image.addEventListener("change", (e)=>{
    /*3- Expresiones de imagen*/ return imgExtValidator(image);
})

//Validacion submit empty
form.addEventListener("submit", (e)=>{
    blankSubmitValidator(name);
    validExpName(name, expresiones.nombre);
    if(!estado.name){
        e.preventDefault();
    }
    console.table(estado)
})
console.table(estado)

