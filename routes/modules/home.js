// Import express router
const express = require("express")
const router = express.Router()
const Todo = require("../../models/todo")

// Home Page (Logged in)
router.get("/", (req, res) => {
  Todo.find() // Tell Todo data model to find data in MongoDB through mongoose. This equals to (SELECT * FROM "todos") in SQL
    .lean() // Transfer the mongoose object into clean Javascript array
    .sort({ _id: "asc" })
    .then((todos) => res.render("index", { todos })) // Then, pass the data to index partial template
    .catch((error) => console.log(error)) // Print the error message
})

// Export route module
module.exports = router
