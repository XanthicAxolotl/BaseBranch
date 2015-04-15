var Reflux = require('reflux');
var NodeResourceActions = require('../actions/NodeResourceActions.js');

var _resources = [{name: 'asdf'},{name: "asdf2"}]; //This is a private resources array

var ResourceStore = Reflux.createStore({
  nodeId: '1',

  init: function() {
    //this.load()
    //Here we listen to actions and register callbacks
    this.listenTo(NodeResourceActions.createResource, this.onCreate);
    this.listenTo(NodeResourceActions.editResource, this.onEdit);
    this.listenTo(NodeResourceActions.setNodeId, this.updateNodeId);
    this.listenTo(NodeResourceActions.nodeClick, this.nodeIsClicked);
  },

  load: function(){
    // use this to get the resources data from the database
    var context = this;
    $.ajax({
      type: "GET",
      dataType: 'json',
      url: 'http://localhost:8000/api/node/resources/' + this.nodeId, // localhost for local testing
    }).then(function(data){
      _resources = data; //push data to store
      // set this.nodeId here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      context.trigger(data);
    },function(error){
      console.log('Error on ResourceStore.load\'s GET request');
      console.error(error);
    });
  },

  updateNodeId: function(id) {
    this.nodeId = id;
    this.load();
    // this.trigger(nodeId);
  },

  nodeIsClicked: function(data) {
    this.trigger(data);
  },

  onCreate: function(resource) {
    _resources.push(resource); //create a new resource

    //AJAX POST request to save to database
    var context = this;
    var data = {name: resource.name,
      //userId: context.nodeId,//resource.author, // change this in a later tier
      description: resource.description,
      author: resource.author,
      rating: 0,
      type: resource.type,
      url: resource.url,
      nodeId: context.nodeId
    };
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: './api/resource',
      data: data
    }).then(function(data) {
      // console.log('.then from ResourceStore POST', data);
      _resources.push(data);
      // context.trigger(data);
      context.load();
      }, function(error){
      console.log('Error on ResourceStore.onCreate');
      console.error(error);
    });

    //Trigger an event once done so that our components can update
    //Also pass the modified list of resources
    // this.trigger(_resources);
  },

  onEdit: function(note) {
    for(var i =0; i<_resources.length; i++) {
      if(_resources[i]._id===note._id) {
        _resources[i].name=note.name;
        this.trigger(_resources);
        break;
      }
    }
  },

  //getter for resources
  getResources: function() {
    return _resources;
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