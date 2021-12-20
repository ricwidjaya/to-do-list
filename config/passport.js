const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/user")

const bcrypt = require("bcryptjs")

// Export passport configuration as a function
// which take "app" as argument to pass in the function
module.exports = (app) => {
  // Config and initialize passport module with middleware
  // To use Passport in an Express app
  app.use(passport.initialize())
  // Use persistent login sessions in app
  app.use(passport.session())

  // Local Strategy (User Authentication)
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      (req, email, password, done) => {
        User.findOne({ email })
          .then((user) => {
            if (!user) {
              return done(null, false, { message: "User not found!" })
            }
            return bcrypt.compare(password, user.password).then((isMatch) => {
              if (!isMatch) {
                return done(null, false, { message: "Incorrect password" })
              }
              return done(null, user)
            })
          })
          .catch((err) => done(err, false))
      }
    )
  )

  // Serialize and Deserialize
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      // found user -> no error, return user object
      .then((user) => done(null, user))
      // error found -> show error, return nothing
      .catch((err) => done(err, false))
  })
}
