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
let description = document.querySelector("#create-edit-product-description");
let error = (campo, label)=>{return document.querySelector(`.create-product-error-${campo} ${label}`)};
let backEndError = document.querySelector(".validation-error-product");

//Estados para preventDefault----------------------------------------------------
let estado = {
    name:false,
    price:false,
    introduction:false,
    description:false,
    weight:false,
    size: false,
    material: false,
    image:false
}

//Expresiones--------------------------------------------------------------------
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{5,}$/, // Letras y espacios, pueden llevar acentos.
    image: /(.jpg|.jpeg|.png|.gif)$/i,
    precio: /(^(?:-\d))/g,
}

//FUNCIONES DE VALIDADORES//

//Distribuidor-------------------------------------------------------------------
let validator = (inputElement, event)=>{
    if(inputElement.name == "name"){
        /*1- Empty*/ emptyValidator(inputElement); 
        if(inputElement.value != ""){
            /*2- Expresiones name*/ validExpName(inputElement, expresiones.nombre);
        }
    }
    if(inputElement.name == "price"){
        /*1- Empty*/ emptyValidator(inputElement); 
        if(inputElement.value != ""){
            /*6- Extension precio*/ extPrice(inputElement, expresiones.precio);
            /*8- Validar mayor a 0*/ positiveNumber(inputElement);
        }
    }
    if(inputElement.name == "introduction"){
        console.log(inputElement.name)
        /*1- Empty*/ emptyValidator(inputElement); 
        if(inputElement.value != ""){
            /*7- Extension introduccion*/ extIntroduction(inputElement);
        }
    }
    if(inputElement.name == "description"){
        /*9- Empty description*/ blankDescription(inputElement); 
        if(inputElement.value != ""){
            /*5- Extension description*/ extDescription(inputElement);
        }
    }
    if(inputElement.name == "weight"){
        /*1- Empty*/ emptyValidator(inputElement); 
        if(inputElement.value != ""){
            /*8- Validar mayor a 0*/ positiveNumber(inputElement);
        }
    }
    if(inputElement.name == "size"){
        /*1- Empty*/ emptyValidator(inputElement); 
    }
    if(inputElement.name == "material"){
        /*1- Empty*/ emptyValidator(inputElement); 
    }
    console.table(estado)    
}

//Validador 1 empty o campo obligatorio-----------------------------------------
let emptyValidator = (inputElement)=>{
    if(inputElement.value == ""){
        //add error
        error(inputElement.name, "small").classList.remove("front-blank-error-inactive")
        error(inputElement.name, "small").classList.add("front-blank-error-active")
        error(inputElement.name, "label").classList.add("wrong-label")
        error(inputElement.name, "input").classList.add("wrong-input")
        error(inputElement.name, "p").classList.add("front-error-inactive")
        error(inputElement.name, "p").classList.remove("front-error-active")
        backEndError.classList.add("front-blank-error-inactive")
        estado[inputElement.name]= false;
        console.table(estado)
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

//Validador 5 submit---------------------------------------------------------
let blankSubmitValidator = (inputElement)=>{
    if(inputElement.value == ""){
        //add error
        error(inputElement.name, "small").classList.remove("front-blank-error-inactive")
        error(inputElement.name, "small").classList.add("front-blank-error-active")
        error(inputElement.name, "input").classList.add("wrong-input")
        error(inputElement.name, "label").classList.add("wrong-label")
        backEndError.classList.add("front-blank-error-inactive")
        error(inputElement.name, "p").classList.add("front-error-inactive")
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

//Validador 6 extension precio------------------------------------------------
let extPrice = (inputElement, expresion)=>{
    if(expresion.test(inputElement.value)){
        //add error
        error(inputElement.name, "p").classList.remove("front-error-inactive")
        error(inputElement.name, "p").classList.add("front-error-active")
        error(inputElement.name, "input").classList.add("wrong-input")
        error(inputElement.name, "label").classList.add("wrong-label")
        backEndError.classList.add("front-blank-error-inactive")
        estado[inputElement.name]= false;
        console.table(estado)
        return; 
    }
    //remove error
    error(inputElement.name, "p").classList.add("front-error-inactive")
    error(inputElement.name, "p").classList.remove("front-error-active")
    error(inputElement.name, "input").classList.remove("wrong-input")
    error(inputElement.name, "label").classList.remove("wrong-label")
    estado[inputElement.name]= true;
}

//Validador 7 extension introduccion-----------------------------------------
let extIntroduction = (inputElement)=>{
    console.log(inputElement.value.length)
    if(inputElement.value.length < 5 || inputElement.value.length > 78){
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

//Validador 8 numero mayor a 0----------------------------------------------
let positiveNumber = (inputElement)=>{
    console.log(inputElement.value)
    if(inputElement.value < 1){
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

//Validador 9 blank description-------------------------------------------
let blankDescription = (inputElement)=>{  
        if(inputElement.value == ""){
            //add error
            error(inputElement.name, "small").classList.remove("front-blank-error-inactive")
            error(inputElement.name, "small").classList.add("front-blank-error-active")
            error(inputElement.name, "textarea").classList.add("wrong-input")
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
        error(inputElement.name, "textarea").classList.remove("wrong-input")
        error(inputElement.name, "label").classList.remove("wrong-label")
        estado[inputElement.name]= true;
}

//EJECUCION DE EVENTOS DE VALIDACION//

//Validacion campo por campo 
inputs.forEach((input)=>{
    input.addEventListener("blur", (e)=>{
        validator(input, e);
    })
    input.addEventListener("keyup", (e)=>{
        validator(input, e);
    })
})

//Validacion submit empty
form.addEventListener("submit", (e)=>{
    if(!estado.name || !estado.price || !estado.introduction || !estado.description || !estado.weight || !estado.size || !estado.material || !estado.image){
        e.preventDefault();
    }
    inputs.forEach((input)=>{
        if(input.name != "description"){
            blankSubmitValidator(input);
        }
    })
        /* Validacion del image */
        if(image.value){
            if(expresiones.image.exec(image.value)){
                document.querySelector(`.admin-img-2 p`).classList.remove("front-error-active")
                document.querySelector(`.admin-img-2 p`).classList.add("front-error-inactive")
                estado.image = true
            } else{
                document.querySelector(`.admin-img-2 p`).classList.add("front-error-active")
                document.querySelector(`.admin-img-2 p`).classList.remove("front-error-inactive")
                estado.image = false
            }
        }else {
            document.querySelector(`.admin-img-2 p`).classList.add("front-error-active")
            document.querySelector(`.admin-img-2 p`).classList.remove("front-error-inactive")
            estado.image = false
        }
        console.table(estado)
        blankDescription(description);
})
console.table(estado)

