var Reflux = require('reflux');

var NodeResourceActions = Reflux.createActions([
  "createResource", 
  "editResource",
  "setNodeId",
  "nodeClick"
]);

module.exports = NodeResourceActions;