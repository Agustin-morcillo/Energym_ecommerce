/* Slider de imagenes automático y manual */
let counter = 1
const button = document.querySelectorAll(".banner-btn")

button.forEach((boton, i) => {
  boton.addEventListener("click", () => {
    counter = i + 1
  })
})

setInterval(() => {
  document.querySelector("#radio" + counter).checked = true
  counter++
  if (counter > 4) {
    counter = 1
  }
}, 4000)

/* Proveedor de imagenes al slider segun ancho de pantalla */
const vpWidth = window.innerWidth
const images = document.querySelectorAll(".slide-img")

if (vpWidth < 800) {
  images.forEach((image, i) => {
    image.src = `images/main/homepage-slider/mobile/mobile_slider_${i + 1}.jpg`
  })
} else {
  images.forEach((image, i) => {
    image.src = `images/main/homepage-slider/desktop/slider_${i + 1}.jpg`
  })
}

// Create a condition that targets viewports at least 800px wide
const mediaQueryMobile = window.matchMedia("(max-width: 800px)")

// Register event listener
mediaQueryMobile.addListener((e) => {
  if (e.matches) {
    images.forEach((image, i) => {
      image.src = `images/main/homepage-slider/mobile/mobile_slider_${i + 1}.jpg`
    })
  } else {
    images.forEach((image, i) => {
      image.src = `images/main/homepage-slider/desktop/slider_${i + 1}.jpg`
    })
  }
})
