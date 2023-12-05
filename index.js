// import module `express`
const express = require('express');
const session = require('express-session');

// import module `routes` from `./routes/routes.js`
const routes = require('./routes/routes.js');

// import module `database` from `./model/db.js`
const db = require('./models/db.js');

// import module `path` for working with file and directory paths
const path = require('path');

// import module `hbs`
const hbs = require('hbs');

const app = express();
const port = 3000;

// Set up handlebars as the view engine and register partials
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
app.set('view engine', 'hbs');

// Register a custom helper to check if a value exists in an array
hbs.registerHelper('includes', function (array, value, options) {
  if (array.includes(value)) {
    return value; // Value to be displayed if it exists in the array
  } else {
    return ''; // Empty string if it does not exist in the array
  }
});

// Configure session middleware
app.use(session({
  secret: 'manifesting_high_grade_livejesusinourhearts',
  resave: false,
  saveUninitialized: true,
}));

// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// set the folder `public` as folder containing static assets
// such as css, js, and image files
app.use(express.static('public'));

// define the paths contained in `./routes/routes.js`
app.use('/', routes);

// Error handling middleware
app.use(function (req, res) {
  res.render('error');
});

// connects to the database
db.connect();

// binds the server to a specific port
app.listen(port, function () {
  console.log('app listening at port ' + port);
});
