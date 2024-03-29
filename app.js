const express = require("express")
const app = express()

const path = require("path")
const createError = require("http-errors")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const session = require("express-session")
const methodOverride = require("method-override")
const cors = require("cors")

const logCookie = require("./middlewares/logCookie")
const localSession = require("./middlewares/localSession")

/* Config */
app.use(session({ secret: "energym session", resave: false, saveUninitialized: true }))
app.use(methodOverride("_method"))
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
require("dotenv").config()
app.use(logCookie)
app.use(localSession)

/* Routes */
const mainRouter = require("./routes/main")
const usersRouter = require("./routes/users")
const productRouter = require("./routes/products")
const rutineRouter = require("./routes/rutines")
const cartRouter = require("./routes/cart")
const apiUsersRouter = require("./routes/api/users/users")
const apiRutinesRouter = require("./routes/api/rutines/rutines")
const apiProductsRouter = require("./routes/api/products/products")

app.use("/", mainRouter)
app.use("/users", usersRouter)
app.use("/products", productRouter)
app.use("/rutines", rutineRouter)
app.use("/cart", cartRouter)
app.use("/api/users", apiUsersRouter)
app.use("/api/rutines", apiRutinesRouter)
app.use("/api/products", apiProductsRouter)

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
