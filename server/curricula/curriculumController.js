var Curricula = require('../config/db_models.js').Curricula;

module.exports = {

  createCurriculum: function(req, res, next) {
    var body = req.body;

    Curricula.create({
      name: body.name,
      description: body.description,
      userId: body.userId,
      channelId: body.channelId
    })
    .then(function(curriculum) {
      console.log('Successfully created curriculum in database');

      // associate curriculum with associated resources
      // will receive an array of resourceIds in the req body
      curriculum.setResources(body.resources).then(function(){
        console.log('Successfully associated resources with curriculum in database');
      })
      .error(function(err){
        console.error('Error in associating resources with curriculum: ', err);
      });

      // send back the newly created curriculum as a JSON object
      res.json(curriculum);
    })
    .error(function(err){
      console.error('Error in creating instance of curriculum: ', err);
    });
  },

  getCurriculum: function(req, res, next) {
    // MVP
    // TODO: Implement

  },

  getRating: function(req, res, next) {
    // TODO: Implement
  },

  updateRating: function(req, res, next) {
    // TODO: Implement
  },

  getUser: function(req, res, next) {
    // TODO: Implement
  },

  getResources: function(req, res, next) {
    // MVP
    // TODO: Implement

  }
};
