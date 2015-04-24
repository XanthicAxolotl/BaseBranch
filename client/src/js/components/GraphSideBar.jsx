var mui = require('material-ui');
var React = require('react');
var Reflux = require('reflux');
var GraphSideBarStore = require('../stores/GraphSideBarStore.jsx');
var GraphStore = require('../stores/GraphStore.jsx');
var GraphActions = require('../actions/GraphActions.js');
var FlatButton = mui.FlatButton;
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;
var Cookies = require('cookies-js');


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
  mixins: [Reflux.connect(GraphSideBarStore, 'curriculum'), Reflux.listenTo(GraphStore, 'updateId')],
  
  getInitialState: function() {
    return {
      curriculum: [],
      curricName: '',
      curricDesc: '',
      channelId: 0,
      channelName: '',
      userId: Cookies.get('basebranchuser') || null
    }
  },

  updateId: function(data){
    this.setState({
      channelId: data.channelId,
      channelName: data.channelName
    });
  },

  handleChangeName: function(event) {
    this.setState({
      curricName: event.target.value
    });
  },

  handleChangeDesc: function(event) {
    this.setState({
      curricDesc: event.target.value
    });
  },

  saveNewCurriculum: function() {
    var resources = [];
    for (var i = 0; i<this.state.curriculum.length; i++) {
      resources.push(this.state.curriculum[i].id); 
    }
    GraphActions.saveCurriculum(resources, this.state.channelId, this.state.curricName, this.state.curricDesc);
    window.location.href = "./curriculum.html#" + this.state.channelName;
  },

  deleteFromBar: function(event, index, item) {
    GraphActions.deleteFromSide(item, this.state.curriculum);
  },

  render: function() {
    var index = 0;
    var resources = this.state.curriculum.map(function(resource) {
      index++;
      return {payload: index, text: resource.name, iconClassName: 'fa fa-times'};
    });
    return (
      <div className="right">
        <h3 className="center">My Curriculum</h3>
        <Menu 
          menuItems={resources} 
          onItemClick={this.deleteFromBar} />
        <TextField
          floatingLabelText="Name"
          value={this.state.curricName} 
          onChange={this.handleChangeName} />
        <TextField
          floatingLabelText="Description"
          multiLine={true} 
          value={this.state.curricDesc} 
          onChange={this.handleChangeDesc} />
        <FlatButton disabled={this.state.userId === null} label={this.state.userId === null ? 'Login to Create' : 'Create Curriculum'} className="center full-button" secondary={true} onClick={this.saveNewCurriculum} />
      </div>
    );
  }
});

module.exports = GraphSideBar;
