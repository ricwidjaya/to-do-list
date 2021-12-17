// Import express router
const express = require("express")
const router = express.Router()
const Todo = require("../../models/todo")
const User = require("../../models/user")
const passport = require("passport")


// Home Page (Logged in)
router.get("/", (req, res) => {
  Todo.find() // Tell Todo data model to find data in MongoDB through mongoose. This equals to (SELECT * FROM "todos") in SQL
    .lean() // Transfer the mongoose object into clean Javascript array
    .sort({ _id: "asc" })
    .then((todos) => res.render("index", { todos })) // Then, pass the data to index partial template
    .catch((error) => console.log(error)) // Print the error message
})

// Login Page
router.get("/login", (req, res) => {
  res.render("login")
})

// Use passport middleware instead of express one
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
)

// Register Page
router.get("/register", (req, res) => {
  res.render("register")
})

router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email }).then((user) => {
    if (user) {
      console.log("User already exist")
      res.render("register", {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      User.create({
        name,
        email,
        password
      })
      res.redirect("./login")
    }
  })
})

// Export route module
module.exports = router
