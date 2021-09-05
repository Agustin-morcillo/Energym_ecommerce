const productQuantity = document.querySelectorAll(".cart-total-quantity")
const productUnitPrice = document.querySelectorAll(".cart-product-unit-price")
const productsFullPrice = document.querySelectorAll(".cart-total")
const purchaseFinalPrice = document.querySelector(".cart-final-price")
const productQuantityHidden = document.querySelector(".product-quantity-hidden")
const productName = document.querySelectorAll(".product-cart-title")
const productImgSrc = document.querySelectorAll(".product-cart-img")

const cartPrice = (e, itera) => {
  let data
  let category

  if (e.target.value < 1) {
    e.target.value = 1
  }

  productQuantityHidden.value = e.target.value

  for (let i = 0; i < productQuantity.length; i++) {
    if (productQuantity.length == 1) {
      purchaseFinalPrice.textContent = 0
      productsFullPrice[i].textContent = parseInt(
        productUnitPrice[i].textContent * e.target.value
      )
      purchaseFinalPrice.textContent =
        parseInt(purchaseFinalPrice.textContent) +
        parseInt(productsFullPrice[i].textContent)

      productImgSrc[0].currentSrc.includes("rutines")
        ? (category = "rutines")
        : (category = "products")

      data = {
        newQuantity: e.target.value,
        productUnitPrice: productUnitPrice[0].textContent,
        productName: productName[0].textContent,
        category: category,
      }
    } else {
      productsFullPrice[itera].textContent = parseInt(
        productUnitPrice[itera].textContent * e.target.value
      )

      if ([i] == 0) {
        purchaseFinalPrice.textContent = parseInt(
          productsFullPrice[0].textContent
        )
      } else {
        purchaseFinalPrice.textContent =
          parseInt(purchaseFinalPrice.textContent) +
          parseInt(productsFullPrice[i].textContent)
      }

      productImgSrc[itera].currentSrc.includes("rutines")
        ? (category = "rutines")
        : (category = "products")

      data = {
        newQuantity: e.target.value,
        productUnitPrice: productUnitPrice[itera].textContent,
        productName: productName[itera].textContent,
        category: category,
      }
    }

    const seeting = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }

    fetch("cart/editQuantity", seeting)
      .then((response) => response.json())
      .then((data) => data)
  }
}

productQuantity.forEach((input, itera) => {
  input.addEventListener("change", function (e) {
    cartPrice(e, itera)
  })
})
