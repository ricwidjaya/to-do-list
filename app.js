// Import modules
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require('method-override') // Override HTTP verbs to match RESTful API
const routes = require('./routes')

// Initialize server
const app = express()
const port = 3000

// Connect to database
mongoose.connect('mongodb://localhost/todo-list')
// Listen to database connection
const db = mongoose.connection

db.on('error', () => { // Listen on errors
  console.log('mongodb error')
})

db.once('open', () => { // Listen on open once
  console.log('mongodb connected')
})

// Set template engine to handlebars
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' })) // express-handlebars 6.0.1 uses .engine() to configure the template engine
app.set('view engine', 'handlebars')

// Serve static files
app.use(express.static('public'))

// Set body-parser
app.use(express.urlencoded({ extended: true }))

// Override HTTP methods
app.use(methodOverride('_method'))

// Main Router
app.use(routes)


// Start server and listen to request
app.listen(port, () => {
  console.log(`Server running on port:${port}`)
})