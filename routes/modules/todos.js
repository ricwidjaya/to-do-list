// Import express Router
const express = require("express")
const router = express.Router()
const Todo = require("../../models/todo")

// Define router -> /todos

//  New To-do page
router.get("/new", (req, res) => {
  res.render("new")
})

// Create new todo
router.post("/", (req, res) => {
  const name = req.body.name
  const userId = req.user._id
  Todo.create({ name, userId }) // Create data from the POST request
    .then(res.redirect("/")) // Then, redirect back to landing page
    .catch((error) => console.log(error))
})

// View specific todo
router.get("/:id", (req, res) => {
  // const id = req.params.id
  const _id = req.params.id
  const userId = req.user._id
  Todo.findOne({ _id, userId }) // This equals to (SELECT * FROM todos WHERE id = id AND userId = userId)
    .lean()
    .then((todo) => res.render("detail", { todo }))
    .catch((error) => console.log(error))
})

// Land edit todo page
router.get("/:id/edit", (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => res.render("edit", { todo }))
    .catch((error) => console.log(error))
})

// Update todo
router.put("/:id", (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const { name, isDone } = req.body
  Todo.findOne({ _id, userId })
    .then((todo) => {
      // If found the data by id, do the belows
      todo.name = name // Update the name in the database
      todo.isDone = isDone === "on"
      todo.save() // Save it
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch((error) => console.log(error))
})

// Delete todo
router.delete("/:id", (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Todo.findOne({ _id, userId })
    .then((todo) => todo.remove())
    .then(res.redirect("/"))
    .catch((error) => console.log(error))
})

// Export router
module.exports = router
