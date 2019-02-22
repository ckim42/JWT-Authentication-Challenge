const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = (app) => {

  // SIGN-UP FORM aka step 2 of challenge
  app.get('/sign-up', function(req, res) {
    res.render('sign-up');
  });

  // ACTUALLY SIGN UP
  app.post('/sign-up', function(req, res) {
    const newUser = new User(req.body);

    newUser
      .save(function(err) {
        if (err) console.log(err);
        const token = jwt.sign({_id: newUser._id}, 'shhhhhhared-secret');
        res.json({"token": token});
    });
  });

  // LOGIN FORM aka step 11 of the challenge
  app.get('/login', function(req, res) {
    res.render('login');
  });

  app.post("/login", (req, res) => {
      res.send("Yay you logged in")
  });

  // phony route. shouldn't work. it's not authorized
  app.post('/bananas', function(req, res) {
    res.render('bananas');
  });
  // yay, nothing happens, just as it shouldn't! "No authorization token found"

}
