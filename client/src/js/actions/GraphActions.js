var Reflux = require('reflux');

var GraphActions = Reflux.createActions([
  'addNode',
  'editNode',
  'updateNodes',
  'loadNodes',
  'resourceToSide',
  'saveCurriculum'
]);


module.exports = GraphActions;