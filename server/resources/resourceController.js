var Resources = require('../config/db_models.js').Resources;

module.exports = {

  createResource: function(req, res, next) {
    // MVP
    // TODO: Implement
    var body = req.body;

    Resources.create({
      name: body.name,
      url: body.url,
      type: body.type,
      description: body.description
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
    // MVP
    // TODO: Implement
  },

  updateRating: function(req, res, next) {
    // TODO: Implement
  },

  getAllComments: function(req, res, next) {
    // TODO: Implement
  }
};
