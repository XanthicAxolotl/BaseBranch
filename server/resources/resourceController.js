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
      nodeId: body.nodeId,
      userId: body.userId
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
      resource.increment('rating')
        .then(function(newresource){
          newresource.reload()
          .then(function(newresource) {
            console.log('Successfully increase rating for resource', resource.id);
            res.json(newresource.rating);
          });
        });
    })
    .error(function(err){
      console.error('Error in finding resource to increase rating',err);
    });
  },

  downRating: function(req, res, next) {
    Resources.find({where: { id: req.params.resourceId }})
    .then(function(resource){
      resource.decrement('rating')
        .then(function(newresource){
          newresource.reload()
          .then(function(newresource) {
            console.log('Successfully decrease rating for resource', resource.id);
            res.json(newresource.rating);
          });
        });
    })
    .error(function(err){
      console.error('Error in finding resource to decrease rating',err);
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
