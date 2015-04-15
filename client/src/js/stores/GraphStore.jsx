var Reflux = require('reflux');
var mui = require('material-ui');
var cuid = require('cuid');
var GraphActions = require('../actions/GraphActions.js');
var NodeResourceActions = require('../actions/NodeResourceActions.js');


var GraphStore = Reflux.createStore({
  width: 900,
  height: 560,
  color: "Azure",
  channelName: 'JavaScript',
  circleProperties: [{
    id: 1,
    channelName: 'placeholderName',
    nodeCoordinates: {'x': 100, 'y': 200, 'r': 60}
  }],

  // hardcoded data is replaced on this.load()
  // uncomment hardcoded data for svg text deletion testing later
  nodeData: [
    /*{
      id: 1,//cuid(),
      name: 'google',
      nodeLink: 'http://google.com',
      x: 20,
      y: 50,
      z: 10,
    },
    {
      id: 2,//cuid(),
      name: 'sounds',
      nodeLink: 'https://soundcoud.com',
      x: 1,
      y: 70,
      z: 10,
    },
    {
      id: 3,//cuid(),
      name: 'past fred place',
      nodeLink: 'http://walmart.com',
      x: 10,
      y: 10,
      z: 10,
    }*/
  ],

  listenables: [NodeResourceActions, GraphActions],

  init: function(){
    this.load();
    this.listenTo(GraphActions.loadNodes, this.load);
    this.listenTo(GraphActions.addNode, this.onCreate);
    // this.listenTo(GraphActions.addNode, this.XXXX);
    // this.listenTo(GraphActions.editNode, this.XXXX);
    // this.listenTo(GraphActions.updateNodes, this.XXXX);
  },
  load: function(){
    var language = window.location.href.split('#')[1];
    // use this to get the graph data from the database
    if (language !== undefined && language.length > 0) {
      var context = this;
      $.ajax({
        type: "GET",
        dataType: 'json',
        url: './api/channel/nodes/' + language, //this.channelName,
      }).then(function(data){
          this.nodeData = data; //push data to store
          for (var i = 0; i < this.nodeData.length; i++) {
            this.nodeData[i].x = 8 * ( i + 1 );
            this.nodeData[i].y = 8 * ( i + 1 );
            this.nodeData[i].z = 10;
          }
          context.trigger(data);
      },function(error){
        console.log('Error on GraphStore.load\'s GET request');
        console.error(error);
      });
    } else {
      window.location.replace('./');
    }
  },
  pushChanges: function() {
    // use this to push updates to database
    // var context = this;
    // $.ajax({
    //   type: "POST",
    //   dataType: 'json',
    //   data: _jobs,
    //   url: '/api/listings',
    // }).done(function(data){
    //     console.log(data);
    //     context.trigger(_jobs);
    // });
  },
  
  onCreate: function(topic) {
    var data = {name: topic, channelId: 1};
    var context = this;
    console.log('in the store', topic);
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: './api/node',
      data: data
    }).then(function() {
      context.load();
    }, function(error){
      console.log('Error on GraphStore.onCreate');
      console.error(error);
    });
  },

  onEdit: function(job) {
    // console.log("from onEdit in jobStore.jsx");
    // for (var i = 0; i < _jobs.length; i++) {
    //   if(_jobs[i]._id === job._id) {
    //     _jobs[i].mutable = job.mutable;
    //     this.trigger(_jobs);
    //     break;
    //   }
    // }
    // this.pushChanges();
  },

  getJobs: function() {
    // this.load(); //req to /api/listings
    // return _jobs;
  },

  getJob: function(id) {
    // for (var i = 0; i < _jobs.length; i++) {
    //   if(_jobs._id === id) {
    //     return jobs[i];
    //   }
    // }
  }
});

module.exports = GraphStore;
