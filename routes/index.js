// Import express to use Router
const express = require("express")
const router = express.Router()
const { authenticator } = require("../middleware/auth")

// Import routers
const home = require("./modules/home")
const todos = require("./modules/todos")
const users = require("./modules/users")

// Define route module (index -> Main Router)
router.use("/todos", authenticator, todos)
router.use("/users", users)
// Landing page
router.use("/", authenticator, home)

// Export route module
module.exports = router
