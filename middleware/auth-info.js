const getAuthInfo = (req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  return next()
}

module.exports = getAuthInfo
