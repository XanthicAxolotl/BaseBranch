var Reflux = require('reflux');
var mui = require('material-ui');
var cuid = require('cuid');
var GraphActions = require('../actions/GraphActions.js');
var NodeResourceActions = require('../actions/NodeResourceActions.js');

var GraphStore = Reflux.createStore({
  width: 900,
  height: 560,
  color: "Azure",
  channelName: 'asdf',
  channelId: 1,
  nodeData: {nodes:[]},

  listenables: [NodeResourceActions, GraphActions],

  init: function(){
    this.load();
    this.listenTo(GraphActions.loadNodes, this.load);
    this.listenTo(GraphActions.addNode, this.onCreate);
  },

  load: function(){
    var language = window.location.href.split('#')[1];
    console.log('lan out', language);
    // use this to get the graph data from the database
    if (language !== undefined && language.length > 0) {
      var context = this;
      $.ajax({
        type: "GET",
        dataType: 'json',
        url: './api/channel/nodes/' + language,
      }).then(function(data){
          context.nodeData.nodes = data; //push data to store

          // set the channelId
          if (data.length > 0) {
            context.nodeData.channelId = data[0].channelId;
          }
          for (var i = 0; i < context.nodeData.length; i++) {
            context.nodeData.nodes[i].x = (8 * ( i + 1 )) % 25;
            context.nodeData.nodes[i].y = 8 * ( i + 1 );
            context.nodeData.nodes[i].z = 10;
          }
          console.log('lan in', language);
          context.nodeData.channelName = language;
          console.log('con chan name', context.channelName);
          context.trigger(context.nodeData);
      },function(error){
        console.log('Error on GraphStore.load\'s GET request');
        console.error(error);
      });
    } else {
      window.location.replace('./');
    }
  },
  
  onCreate: function(topic) {
    var context = this;
    var data = {name: topic, channelId: context.nodeData.channelId};
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

});

module.exports = GraphStore;
