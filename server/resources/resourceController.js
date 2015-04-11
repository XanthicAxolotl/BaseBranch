var Resources = require('../config/db_models.js').Resources;
var Comments = require('../config/db_models.js').Comments;

module.exports = {

  createResource: function(req, res, next) {
    var body = req.body;

    Resources.create({
      name: body.name,
      url: body.url,
      type: body.type,
      description: body.description,
      nodeId: body.nodeId
    })
    .then(function(resource) {
      console.log('Successfully created resource in database');
      res.json(resource);
    })
    .error(function(err){
      console.error('Error in creating instance of resource: ', err);
    });
  },

  getResource: function(req, res, next) {
    var resourceId = req.params.resourceId;

    Resources.find({ where: { id: resourceId} })
    .then(function(resource) {
      console.log('successfully retrieved resource from database');
      res.json(resource);
    })
    .error(function(err){
      console.error('Error in retrieving instance of resource: ', err);
    });
  },

  upRating: function(req, res, next) {
    Resources.find({where: { id: req.params.resourceId }})
    .then(function(resource){
      console.log('Successfully found resource', resource.id);
      var newRating = resource.rating + 1; 

      Resources.update({ rating: newRating}, { where:{ id: resource.id }})
      .success(function(){
        console.log('Successfully increase Rating', newRating)
        res.json(newRating);
      })
      .error(function(){
        console.log('Error from increasing Rating')
      })
    })
    .error(function(err){
      console.error('Error in finding resource',err);
    });
  },

  downRating: function(req, res, next) {
    Resources.find({where: { id: req.params.resourceId }})
    .then(function(resource){
      console.log('Successfully found resource', resource.id);
      var newRating = resource.rating - 1; 

      Resources.update({ rating: newRating}, { where:{ id: resource.id }})
      .success(function(){
        console.log('Successfully decrease Rating', newRating)
        res.json(newRating);
      })
      .error(function(){
        console.log('Error from decreasing Rating')
      })
    })
    .error(function(err){
      console.error('Error in finding resource',err);
    });
  },

  getAllComments: function(req, res, next) {
    // TODO: Implement
    Comments.findAll({where: { resourceId: req.params.resourceId }})
    .then(function(comments){
      console.log('Successfully found all comments');
      res.json(comments);
    })
    .error(function(err){
      console.error('Error in finding all comments:', err);
    });
  }
};
