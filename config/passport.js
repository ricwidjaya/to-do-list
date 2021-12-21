const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const FacebookStrategy = require("passport-facebook").Strategy
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

  // Facebook Strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ["id", "displayName", "photos", "email"]
      },
      (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json
        User.findOne({ email }).then((user) => {
          // Return exist user
          if (user) return done(null, user)
          // New user
          const randomPassword = Math.random().toString(36).slice(-8)
          bcrypt
            .genSalt(10)
            .then((salt) => {
              return bcrypt.hash(randomPassword, salt)
            })
            .then((hash) => {
              return User.create({
                name,
                email,
                password: hash
              })
            })
            .then((user) => {
              console.log(user)
              done(null, user)
            })
            .catch((err) => {
              done(err, false)
            })
        })
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
