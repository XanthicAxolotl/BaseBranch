var Users = require('../config/db_models.js').Users;
var Curricula = require('../config/db_models.js').Curricula;

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
    Users.update(
    {
      reputation: req.body.reputation
    },
    {
      where: { id: req.params.userId}
    })
    .success(function(){
      console.log('Successfully updated reputation')
    })
    .error(function(){
      console.log('Error to updating reputation')
    });
  },

  uploadPicture: function(req, res, next) {
    // TODO: Implement
    Users.update(
    {
      picture: req.body.picture
    },
    {
      where: { id: req.params.userId}
    })
    .success(function(){
      console.log('Successfully updated picture')
    })
    .error(function(){
      console.log('Error to updating picture')
    });
  },

  getCreatedCurricula: function(req, res, next) {
    // TODO: Implement
    Curricula.findAll({where:{ userId: req.params.userId }})
    .then(function(curricula){
      console.log('Successfully found all curricula', curricula);
      res.json(curricula);
    })
    .error(function(err){
      console.error('Error in finding all curricula:', err);
    })
  },

  getSubscribedCurricula: function(req, res, next) {
    // TODO: Implement
    Users.find({ where:{ id: req.params.userId } })
    .then(function(user){
      console.log('Successfully found user to get subscriptions', user);
      user.getCurriculas({where: {userId: req.body.userId }})
      .then(function(curricula){
        console.log('Successfully retrieve curricula user is subscribed to', curricula)
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

  subscribeToCurriculum: function(req, res, next) {
    // TODO: Implement
    Users.find({ where:{ id: req.params.userId } })
    .then(function(user){
      console.log('Successfully found user for subscription', user);
      user.addCurricula(req.body.curriculaId)
      .then(function(curricula){
        console.log('Successfully add subscription for user');
        res.json(curricula);
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
