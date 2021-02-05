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
let description = document.querySelector("#add-edit-product-description");
let error = (campo, label)=>{return document.querySelector(`.create-rutine-error-${campo} ${label}`)};

//Expresiones--------------------------------------------------------------------
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{5,}$/, // Letras y espacios, pueden llevar acentos.
    image: /(.jpg|.jpeg|.png|.gif)$/i,
    precio: /(^(?:-\d))/g,
}

//Estados para preventDefault----------------------------------------------------
let estado = {
    name:true,
    price:true,
    introduction:true,
    description:true,
    duration:true,
    image:false
}

//FUNCIONES DE VALIDADORES//

//Distribuidor-------------------------------------------------------------------
let validator = (inputElement, event)=>{
    if(inputElement.name == "name"){
        /*1- Empty*/ emptyValidator(inputElement); 
        if(inputElement.value.trim() != ""){
            /*2- Expresiones name*/ validExpName(inputElement, expresiones.nombre);
        }
    }
    if(inputElement.name == "price"){
        /*1- Empty*/ emptyValidator(inputElement); 
        if(inputElement.value.trim() != ""){
            /*6- Extension precio*/ extPrice(inputElement, expresiones.precio);
        }
    }
    if(inputElement.name == "introduction"){
        /*1- Empty*/ emptyValidator(inputElement); 
        if(inputElement.value.trim() != ""){
            /*7- Extension introduccion*/ extIntroduction(inputElement);
        }
    }
    if(inputElement.name == "description"){
        /*9- Empty description*/ blankDescription(inputElement); 
        if(inputElement.value.trim() != ""){
            /*5- Extension description*/ extDescription(inputElement);
        }
    }
    if(inputElement.name == "duration"){
        /*1- Empty*/ emptyValidator(inputElement); 
        if(inputElement.value.trim() != ""){
            /*8- Validar mayor a 0*/ positiveNumber(inputElement);
        }
    }
}

//Validador 1 empty o campo obligatorio-----------------------------------------
let emptyValidator = (inputElement)=>{
    if(inputElement.value.trim() == ""){
        //add error
        error(inputElement.name, "small").classList.remove("front-blank-error-inactive")
        error(inputElement.name, "small").classList.add("front-blank-error-active")
        error(inputElement.name, "label").classList.add("wrong-label")
        error(inputElement.name, "input").classList.add("wrong-input")
        error(inputElement.name, "p").classList.add("front-error-inactive")
        error(inputElement.name, "p").classList.remove("front-error-active")
        estado[inputElement.name]= false;
        return;
    }
    //remove error
    error(inputElement.name, "small").classList.add("front-blank-error-inactive")
    error(inputElement.name, "small").classList.remove("front-blank-error-active")
    error(inputElement.name, "label").classList.remove("wrong-label")
    error(inputElement.name, "input").classList.remove("wrong-input")
    estado[inputElement.name]= true;
}

//Validador 2 expresiones name-------------------------------------------------
let validExpName = (inputElement, expresion)=>{
    if(!expresion.test(inputElement.value.trim()) && inputElement.value.trim() != ""){
        //add error
        error(inputElement.name, "p").classList.remove("front-error-inactive")
        error(inputElement.name, "p").classList.add("front-error-active")
        error(inputElement.name, "input").classList.add("wrong-input")
        error(inputElement.name, "label").classList.add("wrong-label")
        estado[inputElement.name]= false;
        return; 
    }
    //remove error
    error(inputElement.name, "p").classList.add("front-error-inactive")
    error(inputElement.name, "p").classList.remove("front-error-active")
    error(inputElement.name, "input").classList.remove("wrong-input")
    error(inputElement.name, "label").classList.remove("wrong-label")
    estado[inputElement.name]= true;
}

//Validador 3 extension description-------------------------------------------
let extDescription = (inputElement)=>{
    if(inputElement.value.trim().length < 20){
        //add error
        error(inputElement.name, "p").classList.remove("front-error-inactive")
        error(inputElement.name, "p").classList.add("front-error-active")
        error(inputElement.name, "textarea").classList.add("wrong-input")
        error(inputElement.name, "label").classList.add("wrong-label")
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
    if(!expresiones.image.exec(inputElement.value.trim())){
        //add error
        error(inputElement.name, "p").classList.remove("front-error-inactive")
        error(inputElement.name, "p").classList.add("front-error-active")
        error(inputElement.name, "label").classList.add("wrong-label")
        error(inputElement.name, "input").classList.add("wrong-input")
        error(inputElement.name, "small").classList.add("front-error-inactive")
        estado[inputElement.name]= false;
        return;
    }
    //remove error
    error(inputElement.name, "p").classList.add("front-error-inactive")
    error(inputElement.name, "p").classList.remove("front-error-active")
    error(inputElement.name, "label").classList.remove("wrong-label")
    error(inputElement.name, "input").classList.remove("wrong-input")
    error(inputElement.name, "small").classList.add("front-error-inactive")
    estado[inputElement.name]= true;
}

//Validador 5 submit---------------------------------------------------------
let blankSubmitValidator = (inputElement)=>{
    if(inputElement.value.trim() == ""){
        //add error
        error(inputElement.name, "small").classList.remove("front-blank-error-inactive")
        error(inputElement.name, "small").classList.add("front-blank-error-active")
        error(inputElement.name, "input").classList.add("wrong-input")
        error(inputElement.name, "label").classList.add("wrong-label")
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
    if(expresion.test(inputElement.value.trim())){
        //add error
        error(inputElement.name, "p").classList.remove("front-error-inactive")
        error(inputElement.name, "p").classList.add("front-error-active")
        error(inputElement.name, "input").classList.add("wrong-input")
        error(inputElement.name, "label").classList.add("wrong-label")
        estado[inputElement.name]= false;
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
    if(inputElement.value.length < 5 || inputElement.value.length > 78){
        //add error
        error(inputElement.name, "p").classList.remove("front-error-inactive")
        error(inputElement.name, "p").classList.add("front-error-active")
        error(inputElement.name, "input").classList.add("wrong-input")
        error(inputElement.name, "label").classList.add("wrong-label")
        estado[inputElement.name]= false;
        return; 
    }
    //remove error
    error(inputElement.name, "p").classList.add("front-error-inactive")
    error(inputElement.name, "p").classList.remove("front-error-active")
    error(inputElement.name, "input").classList.remove("wrong-input")
    error(inputElement.name, "label").classList.remove("wrong-label")
    estado[inputElement.name]= true;
}

//Validador 8 numero mayor a 0----------------------------------------------
let positiveNumber = (inputElement)=>{
    if(inputElement.value.trim() < 1){
        //add error
        error(inputElement.name, "p").classList.remove("front-error-inactive")
        error(inputElement.name, "p").classList.add("front-error-active")
        error(inputElement.name, "input").classList.add("wrong-input")
        error(inputElement.name, "label").classList.add("wrong-label")
        estado[inputElement.name]= false;
        return; 
    }
     //remove error
     error(inputElement.name, "p").classList.add("front-error-inactive")
     error(inputElement.name, "p").classList.remove("front-error-active")
     error(inputElement.name, "input").classList.remove("wrong-input")
     error(inputElement.name, "label").classList.remove("wrong-label")
     estado[inputElement.name]= true;
}

//Validador 9 blank description-------------------------------------------
let blankDescription = (inputElement)=>{  
        if(inputElement.value.trim() == ""){
            //add error
            error(inputElement.name, "small").classList.remove("front-blank-error-inactive")
            error(inputElement.name, "small").classList.add("front-blank-error-active")
            error(inputElement.name, "textarea").classList.add("wrong-input")
            error(inputElement.name, "label").classList.add("wrong-label")
            error(inputElement.name, "p").classList.add("front-error-inactive")
            error(inputElement.name, "p").classList.remove("front-error-active")
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

//Validacion imagen
image.addEventListener("change", (e)=>{
    if(image.value != ""){
        /*3- Expresiones de imagen*/ return imgExtValidator(image);
    }
})

image.addEventListener("focus", (e)=>{
    if(image.value == ""){
        /*9- Empty description*/ return emptyValidator(image)    
    }
})

image.addEventListener("blur", (e)=>{
    if(image.value == ""){
        /*9- Empty description*/ return emptyValidator(image)    
    }
})
console.table(estado)

//Validacion submit empty
form.addEventListener("submit", (e)=>{
    if(!estado.name || !estado.price || !estado.introduction || !estado.description || !estado.duration || !estado.image){
        e.preventDefault();
    }   
    inputs.forEach((input)=>{
        if(input.name != "description"){
            blankSubmitValidator(input);
        }
    })
    blankDescription(description);
    blankSubmitValidator(image);  
})
console.table(estado)

