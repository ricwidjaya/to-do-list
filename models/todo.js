// Import mongoose
const mongoose = require("mongoose")

// Import Schema from mongoose
const Schema = mongoose.Schema

// Define a to-do data Schema
const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true
  }
})

// Export todo Schema
module.exports = mongoose.model("Todo", todoSchema)
