var Reflux = require('reflux');

var UserActions = Reflux.createActions([
  "createResource", 
  "editResource"
]);

module.exports = UserActions;