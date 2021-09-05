window.onload = () => {
  const menu = document.querySelector(".menu-nav")
  const check = document.querySelector(".menu-icon")

  check.addEventListener("click", () => {
    menu.classList.toggle("active")
  })
}
