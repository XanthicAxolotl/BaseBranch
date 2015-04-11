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

    // signup route
    app.route('/signup')
      .post(/* placeholder */);

    // login route
    app.route('/login')
      .post(/* placeholder */);

};
