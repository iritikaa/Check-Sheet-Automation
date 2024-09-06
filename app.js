// Import necessary modules
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Setup view engine if using one
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // or 'pug', 'hbs', etc. based on your view engine

// Middleware setup
app.use(logger('dev')); // Log requests to the console
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded request bodies
app.use(cookieParser()); // Parse cookies

// Static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Handle 404 errors
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error'); // Render an error view
});

// Export the app
module.exports = app;

