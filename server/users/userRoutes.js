// User Routes
// -----------
//
// These routes further route any requests sent to the /api/user path. The User Controller exposes methods for handling the functionality associated with each type of request. The User Controller methods are associated with specific paths and HTTP request methods. For user authentication using Passport, the local and Github strategies are applied depending on which path the request is sent to.

var userController = require('./userController.js');

module.exports = function(app, passport) {

  // Create a new user.
  app.route('/')
    .post(userController.createUser);

  // Send back a specific user.
  app.route('/:userId')
    .get(userController.getUser);

  // Update the reputation for a specific user.
  app.route('/reputation/:userId')
    .post(userController.updateReputation);

  // Change the profile picture for a specific user.
  app.route('/picture/:userId')
    .post(userController.uploadPicture);

  // Retrieve all of the curricula that a specific user has created.
  app.route('/curricula/created/:userId')
    .get(userController.getCreatedCurricula);

  // Retrieve all of the curricula that a specific user has subscribed to.
  app.route('/curricula/subscribed/:userId')
    .get(userController.getSubscribedCurricula)
    .post(userController.subscribeToCurriculum);

  app.route('/resources/created/:userId')
    .get(userController.getCreatedResources);

  // The Passport local strategy for signing up a new user using an email and hashed password.
  app.post('/signup', function(req, res, next){
    passport.authenticate('local-signup', function(err, user, info){
      if (err) {
        // If an error was encountered during signup then send the error to the client.
        return res.status(404).send(err);
      }
      if (!user) {
        // If the user could not be signed up then send a 404 status code to the client.
        return res.sendStatus(404);
      } else {
        console.log('Signed up user: ', JSON.stringify(user));
        // If the user was signed up successfully then send a 200 status code and the newly created user as a JSON object to the client.
        res.status(200).send(JSON.stringify(user));
      }
    })(req, res, next);
  });

  // The Passport local strategy for logging in a user using an email and hashed password.
  app.post('/login', function(req, res, next){
    passport.authenticate('local-login', function(err, user, info){
      if (err) {
        // If an error was encountered during login then send the error to the client.
        return res.status(404).send(err);
      }
      if (!user) {
        // If the user account could not be found during login then send a 404 status code to the client.
        return res.sendStatus(404);
      } else {
        // If the user was logged in successfully then send a 200 status code and the logged in user as a JSON object to the client.
        res.status(200).send(JSON.stringify(user));
      }
    })(req, res, next);
  });

  // Logout the user from the session that they are in using the Passport logout function.
  app.route('/logout', function(req, res, next){
    req.logout();
    res.status(200);
  });

  // The Passport Github strategy for authenticating a user.
  app.route('/auth/github')
    .get(passport.authenticate('github'));

  // The Passport Github callback strategy used when a user has been successfully authenticated using Github.
  app.route('/auth/github/callback')
    .get(passport.authenticate('github'), function(req, res){
      // Send back a 200 status code on successful Github authentication.
      console.log('Github authentication was successful.');
      res.sendStatus(200);
    });
};
