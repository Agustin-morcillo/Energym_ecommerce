/* Image Slider */
let counter = 1;
let botones = document.querySelectorAll(".banner-btn")

botones.forEach((boton,i)=>{
    boton.addEventListener("click",()=>{
        counter = i+1
    })
})

setInterval(() => {
    document.querySelector("#radio" + counter ).checked = true;
    counter++
    if(counter >4){
        counter = 1;
    }
}, 4000);

