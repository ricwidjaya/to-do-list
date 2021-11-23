// Import express to use Router
const express = require('express')
const router = express.Router()

// Import routers
const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')

// Define route module (index -> Main Router)
// Landing page
router.use('/', home)
router.use('/todos', todos)
router.use('/users', users)

// Export route module
module.exports = router