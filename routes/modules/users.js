// Import express router
const express = require("express")
const router = express.Router()
const User = require("../../models/user")
const passport = require("passport")

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
    failureRedirect: "/login"
  })
)

// Log out route
router.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/login")
})

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
