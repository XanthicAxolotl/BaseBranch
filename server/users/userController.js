// User Controller
// ---------------
//
// The methods in the User Controller are invoked when requests are sent to specific paths with specific HTTP request methods. The methods use Sequelize to interact with User instances in the database.

var Users = require('../config/db_models.js').Users;
var Curricula = require('../config/db_models.js').Curricula;

module.exports = {

  // Create a new User instance in the database based on the data sent in on the request.
  createUser: function(req, res, next) {
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
      // Send back to the client the User instance as a JSON object.
      res.json(user);
    })
    .error(function(err){
      console.error('Error in creating instance of user: ', err);
    });
  },

  // Retrieve a specific User instance.
  getUser: function(req, res, next) {
    Users.find({ where:{ id: req.params.userId } })
    .then(function(user){
      console.log('Successfully found user', user);
      // Send back to the client the User instance as a JSON object.
      res.json(user);
    })
    .error(function(err){
      console.error('Error in finding user', err);
    })
  },

  // Update the rating of a User instance.
  updateReputation: function(req, res, next) {
    Users.update(
    {
      reputation: req.body.reputation
    },
    {
      where: { id: req.params.userId}
    })
    .success(function(){
      console.log('Successfully updated reputation');
    })
    .error(function(){
      console.log('Error in updating reputation');
    });
  },

  // Update the profile picture of a User instance.
  uploadPicture: function(req, res, next) {
    Users.update(
    {
      picture: req.body.picture
    },
    {
      where: { id: req.params.userId}
    })
    .then(function(user){
      console.log('Successfully updated picture');
      // Send back to the client the User instance as a JSON object.
      res.json(user);
    })
    .error(function(){
      console.log('Error in updating picture:', err);
    });
  },

  // Retrieve all of the Curricula that were created by a specific User from the database and send back to the client.
  getCreatedCurricula: function(req, res, next) {
    Curricula.findAll({where:{ userId: req.params.userId }})
    .then(function(curricula){
      console.log('Successfully found all curricula', curricula);
      // Send back to the client the Curricula instances as a JSON object.
      res.json(curricula);
    })
    .error(function(err){
      console.error('Error in finding all curricula:', err);
    })
  },

  // Retrieve all of the Curricula that were subscribed to by a specific User from the database and send back to the client.
  getSubscribedCurricula: function(req, res, next) {
    Users.find({ where:{ id: req.params.userId } })
    .then(function(user){
      console.log('Successfully found user to get subscriptions', user);
      user.getCurriculas()
      .then(function(curricula){
        console.log('Successfully retrieve curricula user is subscribed to', curricula)
        // Send back to the client the Curricula instances as a JSON object.
        res.json(curricula);
      })
      .error(function(err){
        console.log('Error in retrieving curricula user is subscribed to', err)
      })
    })
    .error(function(err){
      console.error('Error in finding user to get subscriptions', err);
    })
  },

  // Associate a curriculum to the User instance.
  subscribeToCurriculum: function(req, res, next) {
    Users.find({ where:{ id: req.params.userId } })
    .then(function(user){
      console.log('Successfully found user for subscription', user);
      user.addCurricula(req.body.curriculaId)
      .then(function(subscription){
        console.log('Successfully add subscription for user', subscription);
        // Send back to the client the subscribed to Curriculum instance as a JSON object.
        res.json(subscription);
      })
      .error(function(err){
        console.log('Error in adding subscription for user', err);
      })
    })
    .error(function(err){
      console.error('Error in finding user for subscription', err);
    })
  }
};
