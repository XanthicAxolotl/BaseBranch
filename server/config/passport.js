// load the Passport.js local strategy to authenticate based on username and password
var LocalStrategy = require('passport-local').Strategy;
// load the Passport.js Github strategy to authenticate based on Github account
var GithubStrategy = require('passport-github').Strategy;

// load the Users model, so that we can use the class methods for generating a hashed password and checking for a valid password
var Users = require('./db_models.js').Users;

// load the Github authentication details if run locally
// if (!process.env.NODE_ENV) {
//   var auth = require('./auth.js');
// } else {
//   auth.githubAuth.clientID = null;
//   auth.githubAuth.clientSecret = null;
//   auth.githubAuth.callbackURL = null;
//}

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

  // ****************
  // * LOCAL SIGNUP *
  // ****************
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
          return done(null, false, req.flash('signupErrorMessage', 'Account already exists for that username.'));
        } else {
          var newAccount = Users.create({
            name: req.body.name,
            password: Users.generateHash(req.body.password),
            email: req.body.email
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

  // ***************
  // * LOCAL LOGIN *
  // ***************
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
        console.log('User does not have account');
        return done(null, false, req.flash('loginErrorMessage', 'No account was found for that username.'));
      } else if (!user.validPassword(password)){
        // if the correct password was used then flash a message
        console.log('Incorrect password supplied');
        return done(null, false, req.flash('incorrectPasswordMessage', 'Incorrect password supplied.'));
      } else {
        // if the login is successful then return the user
        console.log('Successfully logged in user ', user.name);
        return done(null, user);
      }

    });
    
  }));


  // *******************
  // * GITHUB STRATEGY *
  // *******************
  passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID, //|| auth.githubAuth.clientID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET, //|| auth.githubAuth.clientSecret,
    callbackURL: process.env.GITHUB_CLIENT_CALLBACK //|| auth.githubAuth.callbackURL
  }, function(accessToken, refreshToken, profile, done) {

    process.nextTick(function() {
      // lookup user in database based on Github ID
      Users.findOrCreate({ githubId: profile.id }, function(err, user){
        return done(err, user);
      });
    });
  }));

};
