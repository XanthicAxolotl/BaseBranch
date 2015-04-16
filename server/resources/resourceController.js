// Resource Controller
// -------------------
//
// The methods in the Resource Controller are invoked when requests are sent to specific paths with specific HTTP request methods. The methods use Sequelize to interact with Resource instances in the database.

var Resources = require('../config/db_models.js').Resources;
var Comments = require('../config/db_models.js').Comments;

module.exports = {

  // Create a new Resource instance in the database based on the data sent in on the request.
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
      // Send back to the client the Resource instance as a JSON object.
      res.json(resource);
    })
    .error(function(err){
      console.error('Error in creating instance of resource: ', err);
    });
  },

  // Retrieve a specific Resource instance.
  getResource: function(req, res, next) {
    var resourceId = req.params.resourceId;

    Resources.find({ where: { id: resourceId} })
    .then(function(resource) {
      console.log('successfully retrieved resource from database');
      // Send back to the client the Resource instance as a JSON object.
      res.json(resource);
    })
    .error(function(err){
      console.error('Error in retrieving instance of resource: ', err);
    });
  },

  // Increment the rating of a Resource instance.
  upRating: function(req, res, next) {
    Resources.find({where: { id: req.params.resourceId }})
    .then(function(resource){
      resource.increment('rating')
        .then(function(newresource){
          newresource.reload()
          .then(function(newresource) {
            console.log('Successfully increase rating for resource', resource.id);
            // Send back to the client the updated rating value.
            res.json(newresource.rating);
          });
        });
    })
    .error(function(err){
      console.error('Error in finding resource to increase rating',err);
    });
  },

  // Decrement the rating of a Resource instance.
  downRating: function(req, res, next) {
    Resources.find({where: { id: req.params.resourceId }})
    .then(function(resource){
      resource.decrement('rating')
        .then(function(newresource){
          newresource.reload()
          .then(function(newresource) {
            console.log('Successfully decrease rating for resource', resource.id);
            // Send back to the client the updated rating value.
            res.json(newresource.rating);
          });
        });
    })
    .error(function(err){
      console.error('Error in finding resource to decrease rating',err);
    });
  },

  // Retrieve all of the Comments for a specific Resource from the database and send back to the client.
  getAllComments: function(req, res, next) {
    Comments.findAll({where: { resourceId: req.params.resourceId }})
    .then(function(comments){
      console.log('Successfully found all comments');
      // Send back to the client the Comment instances as a JSON object.
      res.json(comments);
    })
    .error(function(err){
      console.error('Error in finding all comments:', err);
    });
  }
};
