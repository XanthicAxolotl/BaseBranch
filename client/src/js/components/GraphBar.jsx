var mui = require('material-ui');
var React = require('react');

//NavBar Components
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var DropDownMenu = mui.DropDownMenu;
var FontIcon = mui.FontIcon;
var RaisedButton = mui.RaisedButton;
var DropDownIcon = mui.DropDownIcon;
//Set Material-UI Vars
var LeftNav = mui.LeftNav;
var Modal = require('react-modal');
var Tabs = mui.Tabs;
var Tab = mui.Tab;
var TextField = mui.TextField;
var Paper = mui.Paper;
var injectTapEventPlugin = require("react-tap-event-plugin");
var GraphActions = require('../actions/GraphActions.js');
var GraphStore = require('../stores/GraphStore.jsx');
var NewTopicForm = require('./NewTopicForm.jsx');
var Reflux = require('reflux');

injectTapEventPlugin();

// these should be populated by the database
var menuItems = [
  {payload: '1', text:'Example Framework 1'},
  {payload: '2', text:'Example Framework 2'},
];

var appElement = document.getElementById('app');
Modal.setAppElement(appElement);
Modal.injectCSS();



var GraphBar = React.createClass({
 
  getInitialState: function() {
    return {
      addedTopic: '',
      modalIsOpen: false
    };
  },

  handleSave: function() {
    console.log('handleSave', this.state.addedTopic);
    GraphActions.addNode(this.state.addedTopic);
    this.closeModal();
  },

  handleTopic: function(component, event) {
    this.setState({addedTopic: event.target.value});
  },

  openModal: function(){
    this.setState({modalIsOpen: true});
  },

  closeModal: function(){
    this.setState({modalIsOpen: false});
  },

  render: function() {
    var curriculumLink = "./curriculum.html#" + GraphStore.channelName;
    return (
      <div className="full">
        <div className="button-nav-container">
          <RaisedButton linkButton={true} href="https://pbs.twimg.com/profile_images/458794430200152064/XdQULww6_400x400.png">
            <span className="mui-raised-button-label">(Store) Topics</span>
          </RaisedButton>
          <RaisedButton linkButton={true} href={curriculumLink}>
            <span className="mui-raised-button-label">{GraphStore.channelName} Curricula</span>
          </RaisedButton>
          <DropDownMenu menuItems={menuItems} />

        <RaisedButton linkButton={true} onClick={this.openModal}><span className="mui-raised-button-label">Add New Topic</span></RaisedButton>
        <Modal isOpen={this.state.modalIsOpen}>
          <NewTopicForm handleTopic={this.handleTopic} /> <br /> <br />
          <button onClick={this.handleSave} className="waves-effect waves-light btn">Add Topic</button>
          <button onClick={this.closeModal} className="waves-effect waves-light btn">Cancel</button>
        </Modal>

        </div>
      </div>
    );
  }
});

module.exports = GraphBar;
