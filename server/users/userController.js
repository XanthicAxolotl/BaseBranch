var Users = require('../config/db_models.js').Users;

module.exports = {

  createUser: function(req, res, next) {
    // TODO: Implement
    var body = req.body;

    Users.create({
      name: body.name,
      password: body.password,
      email: body.email,
      reputation: body.reputation,
      picture: body.picture
    })
    .then(function(user) {
      console.log('Successfully created user in database');
      res.json(user);
    })
    .error(function(err){
      console.error('Error in creating instance of user: ', err);
    });
  },

  getUser: function(req, res, next) {
    // TODO: Implement
    Users.find({ where:{ id: req.params.userId } })
    .then(function(user){
      console.log('Successfully found user', user);
      res.json(user);
    })
    .error(function(err){
      console.error('Error in finding user', err);
    })
  },

  updateReputation: function(req, res, next) {
    // TODO: Implement
  },

  uploadPicture: function(req, res, next) {
    // TODO: Implement
  },

  getCreatedCurricula: function(req, res, next) {
    // TODO: Implement
  },

  getSubscribedCurricula: function(req, res, next) {
    // TODO: Implement
  },

  subscribeToCurriculum: function(req, res, next) {
    // TODO: Implement
  }
};
