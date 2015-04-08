var Nodes = require('../config/db_models.js').Nodes;


module.exports = {

  createNode: function(req, res, next) {
    // TODO: Implement

    Nodes.create({
      name: req.body.name
    })
    .then(function(node) {
      console.log('Successfully created node in database');
      res.json(node);
    })
    .error(function(err){
      console.error('Error in creating instance of node: ', err);
    });
  },

  getResources: function(req, res, next) {
    // TODO: Implement
    
  }
};
