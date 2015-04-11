var Reflux = require('reflux');

var GraphActions = Reflux.createActions([
  'addNode',
  'editNode',
  'updateNodes',
  'loadNodes'
]);


module.exports = GraphActions;