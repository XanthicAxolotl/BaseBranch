var Reflux = require('reflux');

var NodeResourceActions = Reflux.createActions([
  "createResource", 
  "editResource",
  "setNodeId"
]);

module.exports = NodeResourceActions;