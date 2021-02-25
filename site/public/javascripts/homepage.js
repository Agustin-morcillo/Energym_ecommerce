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


let vpWidth = window.innerWidth
let images = document.querySelectorAll(".slide-img")
let currentSrc = []

images.forEach((image,i)=>{
    currentSrc.push(image.src)
})

if(vpWidth<800){
    images.forEach((image,i)=>{
        image.src = `images/main/mobile_slider_${i+1}.jpg`
    })
}

// Create a condition that targets viewports at least 768px wide
const mediaQueryMobile = window.matchMedia('(max-width: 800px)')

// Register event listener
mediaQueryMobile.addListener((e)=>{
    if(e.matches){
        images.forEach((image,i)=>{
            image.src = `images/main/mobile_slider_${i+1}.jpg`
        })
    } else{
        for(let i=0;i<images.length;i++){
            images[i].src = currentSrc[i]
        }
    }
})

