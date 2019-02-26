// initializations
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const jwt = require('express-jwt');

// middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(
  jwt({
    secret: "shhhhhhared-secret",
    getToken: function fromHeaderOrCookie(req) {
      // fromHeaderOrquerystring
      if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1];
      } else if (req.cookies && req.cookies.token) {
        return req.cookies.token;
      }
      return null;
    }
  }).unless({ path: ["/login", "/sign-up"]}) // Don't need to be auth'd to go here
);

// controllers
require('./controllers/auth.js')(app);

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
