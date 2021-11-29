// ../routes/modules/users.js
const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  console.log('POST /login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('User already exist')
        res.render('register', {
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
        res.redirect('./login')
      }
    })
})


module.exports = router