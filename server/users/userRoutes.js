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
        successRedirect: '/', // redirect to homepage
        failureRedirect: '/signup.html', // redirect back to signup page
        failureFlash: true // allows the use of flash messages
      }));

    // local strategy login route
    app.route('/login')
      .post(passport.authenticate('local-login', {
        successRedirect: '/', // redirect to homepage
        failureRedirect: '/login.html', // redirect back to the login page
        failureFlash: true // allows the use of flash messages
      }));

    // Github strategy authentication route
    app.route('/auth/github')
      .get(passport.authenticate('github'));

    // Github strategy callback route
    app.route('/auth/github/callback')
      .get(passport.authenticate('github', {
        successRedirect: '/', // redirect to homepage
        failureRedirect: '/login.html' // redirect back to the login page
      }));

};
