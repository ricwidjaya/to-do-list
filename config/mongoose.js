const mongoose = require('mongoose')

// Connect to database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todo-list'
mongoose.connect(MONGODB_URI)

// Listen to database connection
const db = mongoose.connection

db.on('error', () => { // Listen on errors
  console.log('mongodb error')
})

db.once('open', () => { // Listen on open once
  console.log('mongodb connected')
})

module.exports = db