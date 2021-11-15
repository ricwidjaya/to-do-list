const mongoose = require('mongoose')

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

module.exports = db