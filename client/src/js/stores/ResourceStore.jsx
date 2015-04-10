var Reflux = require('reflux');
var NodeResourceActions = require('../actions/NodeResourceActions');

var _resources = []; //This is a private resources array

var ResourceStore = Reflux.createStore({
  init: function() {
    //Here we listen to actions and register callbacks
    this.listenTo(NodeResourceActions.createNote, this.onCreate);
  },

  onCreate: function(resource) {
    _resources.push(resource); //create a new resource
    //Trigger an event once done so that our components can update
    //Also pass the modified list of resources
    this.trigger(_resources); 
  },

  //getter for resources
  getResources: function() {
    resturn _resources;
  },
  
  //getter for finding a single resource by id
  getResource: function(id) {
    for (var i = 0; i<_resources.length; i++) {
      if(_resources[i]._id === id) {
        return _resources[i];
      }
    }
  }

});

module.exports = ResourceStore;