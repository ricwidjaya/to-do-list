// Import mongoose
const mongoose = require('mongoose')

// Import Schema from mongoose
const Schema = mongoose.Schema

// Construct a to-do data
const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

// Export todo Schema
module.exports = mongoose.model('Todo', todoSchema)