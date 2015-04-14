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

    // alternative local strategy signup route
    app.post('/signup', function(req, res, next){
      passport.authenticate('local-signup', function(err, user, info){
        if (err) {
          return res.status(404).send(err);
        }
        if (!user) {
          return res.sendStatus(404);
        } else {
          res.status(200).send(JSON.stringify(user));
        }
      })(req, res, next);
    });

    // local strategy login route
    app.post('/login', function(req, res, next){
      passport.authenticate('local-login', function(err, user, info){
        if (err) {
          return res.status(404).send(err);
        }
        if (!user) {
          return res.sendStatus(404);
        } else {
          res.status(200).send(JSON.stringify(user));
        }
      })(req, res, next);
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
