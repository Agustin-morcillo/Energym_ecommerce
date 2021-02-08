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
let imageEdit = document.querySelector("#add-edit-product-image-edit");
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
    image:false,

}

//FUNCIONES DE VALIDADORES//

//Distribuidor-------------------------------------------------------------------
console.table(estado)

let validator = (inputElement)=>{
    if(inputElement.name == "name"){
        console.log("pasando por empty name")
        /*1- Empty*/ emptyValidator(inputElement); 
        if(inputElement.value.trim() != ""){
            console.table(estado)
            /*2- Expresiones name*/ return validExpName(inputElement, expresiones.nombre);  
        }
    }
    if(inputElement.name == "price"){
        console.log("pasando por empty price")
        /*1- Empty*/ emptyValidator(inputElement);
        if(inputElement.value != ""){
            /*6- Extension precio*/ return extPrice(inputElement, expresiones.precio);
        }
    }
    if(inputElement.name == "introduction"){
        console.log("pasando por empty introduction")
        /*1- Empty*/ emptyValidator(inputElement); 
        if(inputElement.value.trim() != ""){
            /*7- Extension introduccion*/ return extIntroduction(inputElement);
        }
    }
    if(inputElement.name == "description"){
        console.log("pasando por blank Description")
        /*9- Empty description*/ blankDescription(inputElement); 
        if(inputElement.value.trim() != ""){
            /*5- Extension description*/ return extDescription(inputElement);
        }
    }
    if(inputElement.name == "duration"){
        console.log("pasando por empty duration")
        /*1- Empty*/ emptyValidator(inputElement); 
        if(inputElement.value.trim() != ""){
            /*8- Validar mayor a 0*/ return positiveNumber(inputElement);
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

        console.log("pasando por empty validator true")
        console.log(inputElement.name + estado[inputElement.name])
        console.table(estado)
        return;
    }
    //remove error
    error(inputElement.name, "small").classList.add("front-blank-error-inactive")
    error(inputElement.name, "small").classList.remove("front-blank-error-active")
    error(inputElement.name, "label").classList.remove("wrong-label")
    error(inputElement.name, "input").classList.remove("wrong-input")
    estado[inputElement.name]= true;

    console.log("pasando por empty validator false")
    console.log(inputElement.name + estado[inputElement.name])
    console.table(estado)
    return;
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

        console.log("pasando por validExpName validator false/error")
        console.log(inputElement.name + estado[inputElement.name])
        console.table(estado)
        return; 
    }
    //remove error
    error(inputElement.name, "p").classList.add("front-error-inactive")
    error(inputElement.name, "p").classList.remove("front-error-active")
    error(inputElement.name, "input").classList.remove("wrong-input")
    error(inputElement.name, "label").classList.remove("wrong-label")
    estado[inputElement.name]= true;

    console.log("pasando por validExpName validator true")
    console.log(inputElement.name + estado[inputElement.name])
    console.table(estado)
    return;
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
        
        console.log("pasando por extDESCRIPTION validator FALSE/ERROR")
        console.log(inputElement.name + estado[inputElement.name])
        console.table(estado)
        return;
    }
    //remove error
    error(inputElement.name, "p").classList.add("front-error-inactive")
    error(inputElement.name, "p").classList.remove("front-error-active")
    error(inputElement.name, "textarea").classList.remove("wrong-input")
    error(inputElement.name, "label").classList.remove("wrong-label")
    estado[inputElement.name]= true;

    console.log("pasando por extDESCRIPTION validator TRUE")
    console.log(inputElement.name + estado[inputElement.name])
    console.table(estado)
    return;
}

//Validador 4 de expresion de imagen------------------------------------------
let imgExtValidator = (inputElement)=>{
    if(!expresiones.image.exec(inputElement.value) && inputElement.value != ""){
        //add error
        error(inputElement.name, "p").classList.remove("front-error-inactive")
        error(inputElement.name, "p").classList.add("front-error-active")
        error(inputElement.name, "label").classList.add("wrong-label")
        error(inputElement.name, "input").classList.add("wrong-input")
        error(inputElement.name, "small").classList.add("front-blank-error-inactive")
        error(inputElement.name, "small").classList.remove("front-blank-error-active")        
        estado[inputElement.name]= false;

        console.log("pasando por imgExtValidator FALSE/ERROR")
        console.log(inputElement.name + estado.image)
        console.table(estado)
        return;
    }
    //remove error
    error(inputElement.name, "p").classList.add("front-error-inactive")
    error(inputElement.name, "p").classList.remove("front-error-active")
    error(inputElement.name, "label").classList.remove("wrong-label")
    error(inputElement.name, "input").classList.remove("wrong-input")       
    error(inputElement.name, "small").classList.add("front-blank-error-inactive")
    error(inputElement.name, "small").classList.remove("front-blank-error-active")       
    estado[inputElement.name]= true;

    console.log("pasando por imgExtValidator TRUE")
    console.log(inputElement.name + estado[inputElement.name])
    console.table(estado)
    return;
}

//Validador 5 submit---------------------------------------------------------
let blankSubmitValidator = (inputElement)=>{
    if(inputElement.value == ""){
        //add error
        error(inputElement.name, "small").classList.remove("front-blank-error-inactive")
        error(inputElement.name, "small").classList.add("front-blank-error-active")
        error(inputElement.name, "input").classList.add("wrong-input")
        error(inputElement.name, "label").classList.add("wrong-label")
        error(inputElement.name, "p").classList.add("front-error-inactive")
        estado[inputElement.name]= false;

        console.log("pasando por blank Submit Validator FALSE/ERROR")
        console.log(inputElement.name + estado[inputElement.name])
        console.table(estado)
        return; 
    }
    //remove error
    error(inputElement.name, "small").classList.add("front-blank-error-inactive")
    error(inputElement.name, "small").classList.remove("front-blank-error-active")
    error(inputElement.name, "input").classList.remove("wrong-input")
    error(inputElement.name, "label").classList.remove("wrong-label")
    estado[inputElement.name]= true;

    console.log("pasando por Blank submit validator TRUE")
    console.log(inputElement.name + estado[inputElement.name])
    console.table(estado)
    return; 
}

//Validador 6 extension precio------------------------------------------------
let extPrice = (inputElement, expresion)=>{
    if(inputElement.value.match(expresion)){
        //add error
        error(inputElement.name, "p").classList.remove("front-error-inactive")
        error(inputElement.name, "p").classList.add("front-error-active")
        error(inputElement.name, "input").classList.add("wrong-input")
        error(inputElement.name, "label").classList.add("wrong-label")
        error(inputElement.name, "small").classList.add("front-blank-error-inactive")
        estado[inputElement.name]= false; 
       
        console.log("pasando por ext price FALSE/ERROR")
        console.log(inputElement.name + estado[inputElement.name])  
        console.table(estado)
        return;
    }
    //remove error
    error(inputElement.name, "p").classList.add("front-error-inactive")
    error(inputElement.name, "p").classList.remove("front-error-active")
    error(inputElement.name, "input").classList.remove("wrong-input")
    error(inputElement.name, "label").classList.remove("wrong-label")
    estado[inputElement.name]= true;

    console.log("pasando por ext price TRUE")
    console.log(inputElement.name + estado[inputElement.name])
    console.table(estado)
    return; 
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

        console.log("pasando por ext Introduction FALSE/ERROR")
        console.log(inputElement.name + estado[inputElement.name])
        console.table(estado)
        return; 
    }
    //remove error
    error(inputElement.name, "p").classList.add("front-error-inactive")
    error(inputElement.name, "p").classList.remove("front-error-active")
    error(inputElement.name, "input").classList.remove("wrong-input")
    error(inputElement.name, "label").classList.remove("wrong-label")
    estado[inputElement.name]= true;

    console.log("pasando por ext Introduction TRUE")
    console.log(inputElement.name + estado[inputElement.name])
    console.table(estado)
    return; 
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

        console.log("pasando por ext Introduction FALSE/ERROR")
        console.log(inputElement.name + estado[inputElement.name])
        console.table(estado)
        return; 
    }
     //remove error
     error(inputElement.name, "p").classList.add("front-error-inactive")
     error(inputElement.name, "p").classList.remove("front-error-active")
     error(inputElement.name, "input").classList.remove("wrong-input")
     error(inputElement.name, "label").classList.remove("wrong-label")
     estado[inputElement.name]= true;

     console.log("pasando por ext Introduction TRUE")
     console.log(inputElement.name + estado[inputElement.name])
     console.table(estado)
     return; 

}

//Validador 9 blank description-------------------------------------------
let blankDescription = (inputElement)=>{  
        if(inputElement.value.trim() == ""){
            console.log("Pasando por Blank description TRUE/BLANK con input: " + inputElement.name)
            //add error
            error(inputElement.name, "small").classList.remove("front-blank-error-inactive")
            error(inputElement.name, "small").classList.add("front-blank-error-active")
            error(inputElement.name, "textarea").classList.add("wrong-input")
            error(inputElement.name, "label").classList.add("wrong-label")
            error(inputElement.name, "p").classList.add("front-error-inactive")
            error(inputElement.name, "p").classList.remove("front-error-active")
            estado[inputElement.name]= false;

            console.log("pasando por BlankDescription FALSE/ERROR")
            console.log(inputElement.name + estado[inputElement.name])
            console.table(estado)
            return; 
        }
        console.log("Pasando por Blank description FALSE/NO BLANK con input: " + inputElement.name)
        //remove error
        error(inputElement.name, "small").classList.add("front-blank-error-inactive")
        error(inputElement.name, "small").classList.remove("front-blank-error-active")
        error(inputElement.name, "textarea").classList.remove("wrong-input")
        error(inputElement.name, "label").classList.remove("wrong-label")
        estado[inputElement.name]= true;

        console.log("pasando por BlankDescription TRUE")
        console.log(inputElement.name + estado[inputElement.name])
        console.table(estado)
        return; 
}

//EJECUCION DE EVENTOS DE VALIDACION//

//Validacion campo por campo 
inputs.forEach((input)=>{
    input.addEventListener("keyup", (e)=>{
        validator(input, e);
    })
    input.addEventListener("blur", (e)=>{            
        validator(input, e);
    })
    input.addEventListener("input", (e)=>{
        if(input.name == "price" || input.name == "duration"){
            validator(input, e);
        }
    })
})

//Validacion imagen create
image.addEventListener("change", (e)=>{
    /*9- Empty description*/ emptyValidator(image)    
    
    if(image.value != ""){
        /*3- Expresiones de imagen*/ imgExtValidator(image)
    }
})

image.addEventListener("blur", (e)=>{
    /*9- Empty description*/ emptyValidator(image)    

    if(image.value != ""){
        /*3- Expresiones de imagen*/ imgExtValidator(image)
    }    
})

//Validacion submit empty
form.addEventListener("submit", (e)=>{
    
    //Validacion en submit de campo por campo si estan vacios
    inputs.forEach((input)=>{
        console.log(input.name)
        if(input.name != "description"){
            blankSubmitValidator(input);
            if(input.name == "duration" && input.value != ""){
                positiveNumber(input)
                console.log(input.name)
                console.table(estado)
            }
        }
    })

    //Validacion en submit del campo description si esta vacio
    blankDescription(description);

    //Validacion en submit si el campo imagen esta vacio
    if(form.classList.contains("edit-form")){
        estado.image = true;
        console.log("pasando por validacion image blank - Estado: " + estado.image)
    } else {
        console.log("Pasando por image blank validator")
        blankSubmitValidator(image);  
        if(image.value != ""){
            imgExtValidator(image)
        }
    }

    //Prevent Default segun estado
    if(!estado.name||!estado.price||!estado.introduction||!estado.description||!estado.duration||!estado.image){
        e.preventDefault();
        console.table(estado)
        console.log("Pasando por el segundo prevent default")
    }   

})




//--------------------------------//
//Validacion imagen edit

if(form.classList.contains("edit-form")){
    imageEdit.addEventListener("change", (e)=>{
        if(imageEdit.value != ""){
            /*3- Expresiones de imagen*/ imgExtValidator(imageEdit)
        } else {
            estado[imageEdit.name]= true;
            error(imageEdit.name, "p").classList.add("front-error-inactive")
            error(imageEdit.name, "p").classList.remove("front-error-active")
        }
    })

    imageEdit.addEventListener("blur", (e)=>{
        if(imageEdit.value != ""){
            /*3- Expresiones de imagen*/ imgExtValidator(imageEdit)
        } else {
            estado[imageEdit.name]= true;
            error(imageEdit.name, "p").classList.add("front-error-inactive")
            error(imageEdit.name, "p").classList.remove("front-error-active")
        }
    })
}
