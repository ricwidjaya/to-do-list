// Express
const express = require('express')
const app = express()
const port = 3000

// Set template engine to handlebars
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' })) // express-handlebars 6.0.1 uses .engine() to configure the template engine
app.set('view engine', 'handlebars')

// Serve static files
app.use(express.static('public'))

// Set body-parser
app.use(express.urlencoded({ extended: true }))

// Landing page
app.get('/', (req, res) => {
  res.render('index')
})


// Start server and listen to request
app.listen(port, () => {
  console.log(`Server running on port:${port}`)
})