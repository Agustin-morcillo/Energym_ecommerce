let prices = document.querySelectorAll(".price-global")

prices.forEach((price) => {
  price.innerHTML = new Intl.NumberFormat("de-DE").format(price.innerHTML)
})
