// load the Passport.js local strategy to authenticate based on username and password
var LocalStrategy = require('passport-local').Strategy;

// load the Users model, so that we can use the class methods for generating a hashed password and checking for a valid password
var Users = require('./db_models.js').Users;

module.exports = function(passport){
  
  // Passport session setup
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    Users.find({ where: {id: id}})
    .then(function(user){
        done(user);
    });
  });

  // local signup
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, name, password, done) {

    // Users.findOne won't fire unless data is returned
    process.nextTick(function(){
      // check to see if the user already has an account
      Users.find({ where: { name: name }})
      .then(function(user){
        if (user){
          return done(null, false, req.flash('signupErrorMessage', 'Account already exists for that email address.'));
        } else {
          var newAccount = Users.create({
            name: req.body.name,
            password: Users.generateHash(req.body.password),
            email: body.email
          })
          .then(function(user) {
            console.log('Successfully created user in database');
            return done(null, user);
          });
        }
      });
    });

  }
  ));

  // local login
  passport.use('local-login', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, name, password, done) {
    // check to see if the user has an account
    Users.find({ where: { name: name }})
    .then(function(user){
      // if no user was found then flash a message
      if (!user){
        return done(null, false, req.flash('loginErrorMessage', 'No account was found for that username.'));
      } else if (!Users.validPassword(password)){
        // if the correct password was used then flash a message
          return done(null, false, req.flash('incorrectPasswordMessage', 'Incorrect password supplied.'));
      } else {
        // if the login is successful then return the user
        return done(null, user);
      }

    });
    
  }));

};
