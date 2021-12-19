// Import modules
const express = require("express")
const session = require("express-session")
const exphbs = require("express-handlebars")
const methodOverride = require("method-override") // Override HTTP verbs to match RESTful API
const routes = require("./routes")
require("./config/mongoose")
const usePassport = require("./config/passport")
const authInfo = require('./middleware/auth-info')
// const MongoStore = require("connect-mongo")

// Initialize server
const app = express()
const PORT = process.env.PORT || 3000

// Set template engine to handlebars
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" })) // express-handlebars 6.0.1 uses .engine() to configure the template engine
app.set("view engine", "handlebars")

// Serve static files
app.use(express.static("public"))

// Set cookie session
app.use(
  session({
    // store: MongoStore.create({ mongoUrl: "mongodb://localhost/todo-list" }),
    secret: "yourCookieYourSecret",
    resave: false,
    saveUninitialized: true
  })
)

// Set body-parser
app.use(express.urlencoded({ extended: true }))

// Override HTTP methods
app.use(methodOverride("_method"))

// Passport.js
usePassport(app)
app.use(authInfo)
// Main Router
app.use(routes)

// Start server and listen to request
app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`)
})
