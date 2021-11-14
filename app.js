// Import modules
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Todo = require('./models/todo') // Load Todo model

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

// Landing page
app.get('/', (req, res) => {
  Todo.find() // Tell Todo data model to find data in MongoDB through mongoose. This equals to (SELECT * FROM "todos") in SQL
    .lean() // Transfer the mongoose object into clean Javascript array
    .then(todos => res.render('index', { todos })) // Then, pass the data to index partial template
    .catch(error => console.log(error)) // Print the error message
})

//  New To-do page
app.get('/todos/new', (req, res) => {
  res.render('new')
})

// Create new todo
app.post('/todos', (req, res) => {
  const name = req.body.name
  Todo.create({ name }) // Create data from the POST request
    .then(res.redirect('/')) // Then, redirect back to landing page
    .catch(error => console.log(error))

})

// View specific todo
app.get('/todos/:id', (req, res) => {
  // const id = req.params.id
  const id = req.params.id
  Todo.findById(id) // This equals to (SELECT * FROM todos WHERE id = id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})


// Start server and listen to request
app.listen(port, () => {
  console.log(`Server running on port:${port}`)
})