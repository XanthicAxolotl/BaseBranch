var mui = require('material-ui');
var React = require('react');
var Reflux = require('reflux');
var GraphSideBarStore = require('../stores/GraphSideBarStore.jsx');
var GraphActions = require('../actions/GraphActions.js');
var RaisedButton = mui.RaisedButton;


//Set Material-UI Vars
var Menu = mui.Menu;

var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

// these should be populated by the database

var numberMenuItems = [
   { payload: '1', text: 'Build Curriculum'},
   { payload: '2', text: 'Example Node 1', data: 'jQuery'},
   { payload: '3', text: 'Example Node 2', data: 'Backbone' }
];





var GraphSideBar = React.createClass({
  mixins: [Reflux.connect(GraphSideBarStore, 'curriculum')],
  
  getInitialState: function() {
    return {
      curriculum: []
    }
  },

  saveNewCurriculum: function() {
    var resources = [];
    for (var i = 0; i<this.state.curriculum.length; i++) {
      resources.push(this.state.curriculum[i].id); 
    }
    GraphActions.saveCurriculum(resources, this.props.channelId);
  },

  render: function() {
    var index = 0;
    var resources = this.state.curriculum.map(function(resource) {
      index++;
      return {payload: index, text: resource.name, data: 'test'};
    });

    return (
      <div className="right">
        <Menu menuItems={resources} />
        <RaisedButton label="Add" secondary={true} onClick={this.saveNewCurriculum} />
      </div>
    );
  }
});

module.exports = GraphSideBar;
