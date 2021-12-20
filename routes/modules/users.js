// Import express router
const express = require("express")
const router = express.Router()
const User = require("../../models/user")
const passport = require("passport")
const bcrypt = require("bcryptjs/dist/bcrypt")

// Login Page
router.get("/login", (req, res) => {
  const user = req.user
  if (user) return res.redirect("/")
  res.render("login")
})

// Use passport middleware instead of express one
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "./login",
    failureFlash: true
  })
)

// Log out route
router.get("/logout", (req, res) => {
  req.logout()
  req.flash("success_msg", "You have logged out.")
  res.redirect("./login")
})

// Register Page
router.get("/register", (req, res) => {
  res.render("register")
})

router.post("/register", (req, res) => {
  const errors = []
  const { name, email, password, confirmPassword } = req.body
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: "Please fill out all fileds." })
  }

  if (password !== confirmPassword) {
    errors.push({ message: "Password Inconsistent." })
  }

  if (errors.length) {
    return res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      errors.push({ message: "User already exist" })
      return res.render("register", {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) =>
        User.create({
          name,
          email,
          password: hash
        })
      )
      .then(() => res.redirect("./login"))
      .catch((err) => console.log(err))
  })
})

// Export route module
module.exports = router
