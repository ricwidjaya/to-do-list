// Import express to use Router
const express = require('express')
const router = express.Router()

// Import routers
const home = require('./modules/home')
const todos = require('./modules/todos')

// Define route module (index -> Main Router)
// Landing page
router.use('/', home)
router.use('/todos', todos)

// Export route module
module.exports = router