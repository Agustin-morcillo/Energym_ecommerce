const fs = require("fs")
const path = require("path")
const productsFilePath = path.join(__dirname, "../data/productsDataBase.json")
const usersFilePath = path.join(__dirname, "../data/usersDataBase.json")
const contactFilePath = path.join(__dirname, "../data/contactDataBase.json")

const allFunctions = {
  getAllProducts: () => {
    const products = fs.readFileSync(productsFilePath, "utf-8")
    const productsParsed = JSON.parse(products)
    return productsParsed
  },
  writeProducts: (arrayToTransform) => {
    const products = allFunctions.getAllProducts()
    const productToWrite = [...products, arrayToTransform]
    const productsJson = JSON.stringify(productToWrite, null, " ")
    fs.writeFileSync(productsFilePath, productsJson)
  },
  writeEditedProduct: (productToEdit) => {
    const productsJson = JSON.stringify(productToEdit, null, " ")
    fs.writeFileSync(productsFilePath, productsJson)
  },
  deleteProduct: (productToDeleteId) => {
    const products = allFunctions.getAllProducts()
    const productToDelete = products.find((product) => {
      return product.id == productToDeleteId
    })
    const productPlace = products.indexOf(productToDelete)
    products.splice(productPlace, 1)
    const productsJson = JSON.stringify(products, null, " ")
    fs.writeFileSync(productsFilePath, productsJson)
  },
  generateNewId: () => {
    const products = allFunctions.getAllProducts()
    if (products == "") {
      return 0
    }
    return products.pop().id + 1
  },
  getAllusers: () => {
    const users = fs.readFileSync(usersFilePath, "utf-8")
    const usersParsed = JSON.parse(users)
    return usersParsed
  },
  writeusers: (arrayToTransform) => {
    const users = allFunctions.getAllusers()
    const userToWrite = [...users, arrayToTransform]
    const usersJson = JSON.stringify(userToWrite, null, " ")
    fs.writeFileSync(usersFilePath, usersJson)
  },
  generateNewIdUsers: () => {
    const users = allFunctions.getAllusers()
    if (users == "") {
      return 0
    }
    return users.pop().id + 1
  },
  writeEditedUser: (userToEdit) => {
    const usersJson = JSON.stringify(userToEdit, null, " ")
    fs.writeFileSync(usersFilePath, usersJson)
  },
  getContactInfo: () => {
    const contactInfo = fs.readFileSync(contactFilePath, "utf-8")
    const contactInfoParsed = JSON.parse(contactInfo)
    return contactInfoParsed
  },
  writeContactInfo: (contactInfoToWrite) => {
    const contactInfo = allFunctions.getContactInfo()
    const infoToWrite = [...contactInfo, contactInfoToWrite]
    const contactJson = JSON.stringify(infoToWrite, null, " ")
    fs.writeFileSync(contactFilePath, contactJson)
  },
  generateNewIdContact: () => {
    const contact = allFunctions.getContactInfo()
    if (contact == "") {
      return 0
    }
    return contact.pop().id + 1
  },
}

module.exports = allFunctions
