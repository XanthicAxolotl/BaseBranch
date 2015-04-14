var userController = require('./userController.js');

module.exports = function(app, passport) {
    app.route('/')
      .post(userController.createUser);

    app.route('/:userId')
      .get(userController.getUser);

    app.route('/reputation/:userId')
      .post(userController.updateReputation);

    app.route('/picture/:userId')
      .post(userController.uploadPicture);

    app.route('/curricula/created/:userId')
      .get(userController.getCreatedCurricula);

    app.route('/curricula/subscribed/:userId')
      .get(userController.getSubscribedCurricula)
      .post(userController.subscribeToCurriculum);

    // local strategy signup route
    app.route('/signup')
      .post(passport.authenticate('local-signup', {
        failureFlash: true // allows the use of flash messages
      }), function(req, res){
        // send back 200 status code on successful signup
        console.log('Signup was successful.');
        res.sendStatus(200);
      });

    // local strategy login route
    app.route('/login')
      .post(passport.authenticate('local-login', {
        failureFlash: true // allows the use of flash messages
      }), function(req, res){
        // send back 200 status code on successful login
        console.log('Login was successful.');
        res.sendStatus(200);
      });

    // Github strategy authentication route
    app.route('/auth/github')
      .get(passport.authenticate('github'));

    // Github strategy callback route
    app.route('/auth/github/callback')
      .get(passport.authenticate('github'), function(req, res){
        // send back 200 status code on successful Github authentication
        console.log('Github authentication was successful.');
        res.sendStatus(200);
      });

};
