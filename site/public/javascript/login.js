const emailInput = document.querySelector('#email-login');
const passwordInput = document.querySelector('#password-login');
const form = document.querySelector('form');

form.addEventListener("submit", function(e){
    let errors = [];
    if (emailInput.value == '') {
        errors.push('El campo no puede estar vacio');   
    }

    let arrobaCounter = 0;
    for (let i=0; i<emailInput.value.length; i++){

        if(emailInput.value[i] == '@'){
            arrobaCounter++
        }
    }
    if(arrobaCounter==0){
        errors.push('El email es invalido')
    }

    
    if (errors.length > 0){
        e.preventDefault();
        console.log(errors)
    }
})

