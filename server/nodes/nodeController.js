// Node Controller
// ---------------
//
// The methods in the Node Controller are invoked when requests are sent to specific paths with specific HTTP request methods. The methods use Sequelize to interact with Node instances in the database.

var Nodes = require('../config/db_models.js').Nodes;
var Resources = require('../config/db_models.js').Resources;

module.exports = {

  // Create a new Node instance in the database based on the data sent in on the request.
  createNode: function(req, res, next) {
    Nodes.create({
      name: req.body.name,
      channelId: req.body.channelId
    })
    .then(function(node) {
      console.log('Successfully created node in database');
      // Associate the target Node instance with an existing neighbor Node instance that is passed in on the request.
      node.addNeighbor(req.body.neighbor)
      .then(function(){
        console.log('Successfully set neighbor');
      })
      .error(function(err){
        console.error('Error in setting neighbor');
      })
      // Send back to the client the Node instance as a JSON object.
      res.json(node);
    })
    .error(function(err){
      console.error('Error in creating instance of node: ', err);
    });
  },

  // Retrieve a specific Node instance.
  getNode: function(req, res, next) {
    Nodes.find({ where:{ id: req.params.nodeId } })
    .then(function(node){
      console.log('Successfully found node', node.id);
      // Send back to the client the Node instance as a JSON object.
      res.json(node);
    })
    .error(function(err){
      console.error('Error in finding node', err);
    });
  },

  // Retrieve all of the Resources for a specific Node from the database and send back to the client.
  getResources: function(req, res, next) {
    Resources.findAll({where:{ nodeId: req.params.nodeId }})
    .then(function(resources){
      console.log('Successfully found all resources');
      // Send back to the client the Resource instances as a JSON object.
      res.json(resources);
    })
    .error(function(err){
      console.error('Error in finding all resources:', err);
    });
  }
};
