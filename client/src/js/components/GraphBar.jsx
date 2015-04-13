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
var GraphStore = require('../stores/GraphStore.jsx');
var NewTopicForm = require('./NewTopicForm.jsx');

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
      modalIsOpen: false
    };
  },

  openModal: function(){
    this.setState({modalIsOpen: true});
  },

  closeModal: function(){
    this.setState({modalIsOpen: false});
  },

  render: function() {
    return (
      <div className="full">
        <div className="button-nav-container">
          <RaisedButton linkButton={true} href="https://pbs.twimg.com/profile_images/458794430200152064/XdQULww6_400x400.png">
            <span className="mui-raised-button-label">(Store) Topics</span>
          </RaisedButton>
          <RaisedButton linkButton={true} href="http://images4.fanpop.com/image/quiz/689000/689423_1315079585116_350_300.jpg">
            <span className="mui-raised-button-label">(Store) Curricula</span>
          </RaisedButton>
          <DropDownMenu menuItems={menuItems} />

        <RaisedButton linkButton={true} onClick={this.openModal}<span className="mui-raised-button-label">Add New Topic</span></RaisedButton>
        <Modal isOpen={this.state.modalIsOpen}>
          <button onClick={this.closeModal} className="waves-effect waves-light btn">Close</button>
          <NewTopicForm />
        </Modal>

        </div>
      </div>
    );
  }
});

module.exports = GraphBar;
