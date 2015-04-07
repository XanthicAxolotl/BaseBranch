var Reflux = require('reflux');
var mui = require('material-ui');
var cuid = require('cuid');
var GraphActions = require('../actions/GraphActions.js');


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

  nodeData: [
    {
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
    }
  ],

  init: function(){
    this.load();
    this.listenTo(GraphActions.loadNodes, this.load)
    // this.listenTo(GraphActions.addNode, this.XXXX);
    // this.listenTo(GraphActions.editNode, this.XXXX);
    // this.listenTo(GraphActions.updateNodes, this.XXXX);
  // 'addNode',
  // 'editNode',
  // 'updateNodes',
  // 'loadNodes'
  },
  load: function(){
    console.log('load function');
    // use this to get the graph data from the database
    var context = this;
    $.ajax({
      type: "GET",
      dataType: 'json',
      url: 'http://localhost:8000/api/channel/nodes/1', //+ this.channelName, // localhost for local testing
    }).then(function(data){
        this.nodeData = data; //push data to store
        for (var i = 0; i < this.nodeData.length; i++) {
          this.nodeData[i].x = 10 * ( i + 1 );
          this.nodeData[i].y = 10 * ( i + 1 );
          this.nodeData[i].z = 10;
        }
        context.trigger(data);
    },function(error){
      console.log('Error on load\'s GET request');
      console.log('error console.log:', error);
      console.error(error);
    });
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
  onCreate: function(job) {
    // _jobs.push(job);
    // this.trigger(_jobs);
    // this.pushChanges();
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
