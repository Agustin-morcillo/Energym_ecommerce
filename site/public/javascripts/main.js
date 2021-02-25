window.onload = ()=>{
    let menu = document.querySelector(".menu-nav")
    let check = document.querySelector(".menu-icon")

    check.addEventListener("click",()=>{
            menu.classList.toggle("active")
    })

}