var Resources = require('../config/db_models.js').Resources;

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
    // use :resourceID parameter from request URL
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

  updateRating: function(req, res, next) {
    // TODO: Implement
  },

  getAllComments: function(req, res, next) {
    // TODO: Implement
  }
};
