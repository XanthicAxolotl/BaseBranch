// Passport Authentication
// -----------------------
//
// Passport is used for server-side session-based user authentication. The different Passport authentication strategies, local for username/hashed password and Github for Github authentication, are defined here.

// Load the Passport.js local strategy to authenticate based on username and hashed password.
var LocalStrategy = require('passport-local').Strategy;
// Load the Passport.js Github strategy to authenticate based on Github account.
var GithubStrategy = require('passport-github').Strategy;

// Load the Users model, so that we can use the class methods for generating a hashed password and checking for a valid password.
var Users = require('./db_models.js').Users;

module.exports = function(passport){
  
  // Serialize user data to be stored in the session upon successful authentication. The output of this method is attached to req.session.passport.user.
  passport.serializeUser(function(user, done){
    console.log('Inside of serializeUser');
    done(null, user.id);
  });

  // Deserialize user data on requests sent after the initial authentication. The output of this method is attached to req.user.
  passport.deserializeUser(function(id, done){
    console.log('Inside of deserializeUser');
    Users.find({ where: {id: id}})
    .then(function(user){
        done(user);
    });
  });

  // Local Signup Strategy
  // ---------------------
  //
  // The Passport local signup strategy uses username and hashed password for authentication. The database is checked to determine whether the passed in user data is for a user that already exists or not. If the user does not exist then a new user will be created, and the new user data will be returned.

  // Use the local strategy for authentication.
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, name, password, done) {

    process.nextTick(function(){
      // Check to see if the user already has an account.
      Users.find({ where: { name: name }})
      .then(function(user){
        // Flash an error message is the user already exists in the database.
        if (user){
          return done(null, false, req.flash('signupErrorMessage', 'Account already exists for that username.'));
        } else {
          // If the user does not exist in the database then use the data passed in on the request to create a new user with a hashed password.
          var newAccount = Users.create({
            name: req.body.name,
            password: Users.generateHash(req.body.password),
            email: req.body.email
          })
          .then(function(user) {
            // Send the new user data back.
            console.log('Successfully created user in database');
            return done(null, user);
          });
        }
      });
    });
  }
  ));

  // Local Login Strategy
  // --------------------
  //
  // The Passport local login strategy uses username and hashed password for authentication. The database is checked to determine whether the passed in user data is for a user that already exists or not. If the user exists and the supplied password is correct then the user is logged in.

  // Use the local strategy for authentication.
  passport.use('local-login', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, name, password, done) {

    process.nextTick(function(){
      // check to see if the user has an account
      Users.find({ where: { name: name }})
      .then(function(user){
        // If no user was found then flash an error message.
        if (!user){
          console.log('User does not have account');
          return done(null, false, req.flash('loginErrorMessage', 'No account was found for that username.'));
        } else if (!user.validPassword(password)){
          // If an incorrect password was supplied then flash an error message.
          console.log('Incorrect password supplied');
          return done(null, false, req.flash('incorrectPasswordMessage', 'Incorrect password supplied.'));
        } else {
          // If the login is successful then return the user data.
          console.log('Successfully logged in user ', user.name);
          return done(null, user);
        }
      });
    });
  }));


  // Github Strategy
  // ---------------
  //
  // The Passport Github strategy will attempt to authenticate users based on their Github account.

  // Use the Github strategy for authentication. The specific Github authentication details, Client ID, Client Secret, and Callback URL are stored as environment variables in the deployment environment. Default dummy values are included for running the app locally during development.
  passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID || 12345,
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'secret',
    callbackURL: process.env.GITHUB_CLIENT_CALLBACK || 'http://localhost:8000/api/user/auth/github/callback'
  }, function(accessToken, refreshToken, profile, done) {

    process.nextTick(function() {
      // Lookup the user in the database based on Github ID.
      Users.find({ where: {githubId: profile.id} }, function(err, user){
        if (err) {
          // if an error was encountered while looking for the user then return the error.
          return done(err);
        }
        if (user) {
          // if the user was found then login.
          return done(null, user);
        } else {
          // if there's no user with the githubId in the database then create the user.
          var newUser = Users.create({
            name: profile.id.toString(),
            password: '12345678',
            email: profile.id.toString(),
            githubId: profile.id
          });
        }
        return done(null, newUser);
      });
    });
  }));

};
