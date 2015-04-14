var Reflux = require('reflux');
var UserActions = require('../actions/UserActions.js');

var _userResources = []; //This is a private resources array

var UserStore = Reflux.createStore({
  init: function() {
    //Here we listen to actions and register callbacks
   this.listenTo(NodeResourceActions.createResource, this.onCreate);
   this.listenTo(NodeResourceActions.editResource, this.onEdit);
  },

  onCreate: function(userResource) {
    _userResources.push(userResource); //create a new resource
    //Trigger an event once done so that our components can update
    //Also pass the modified list of resources
    this.trigger(_userResources); 
  },

  onEdit: function(userResource) {
    for(var i =0; i<_userResources.length; i++) {
      if(_userResources[i]._id===userResource._id) {
        _userResources[i].name=userResource.name;
        this.trigger(_userResources);
        break;
      }
    }
  },

  //getter for resources
  getResources: function() {
    return _userResources;
  },
  
  //getter for finding a single resource by id
  getResource: function(id) {
    for (var i = 0; i<_userResources.length; i++) {
      if(_userResources[i]._id === id) {
        return _userResources[i];
      }
    }
  }

});

module.exports = UserStore;