// Node Routes
// -----------
//
// These routes further route any requests sent to the /api/node path. The Node Controller exposes methods for handling the functionality associated with each type of request. The Node Controller methods are associated with specific paths and HTTP request methods.

var nodeController = require('./nodeController.js');

module.exports = function(app) {

  // Create a new node.
  app.route('/')
    .post(nodeController.createNode);

  // Send back a specific node.
  app.route('/:nodeId')
    .get(nodeController.getNode);

  // Send back all of the resources associated with a specific node.
  app.route('/resources/:nodeId')
    .get(nodeController.getResources);
};
