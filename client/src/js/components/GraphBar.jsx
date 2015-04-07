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
var Tabs = mui.Tabs;
var Tab = mui.Tab;
var TextField = mui.TextField;
var Paper = mui.Paper;
var injectTapEventPlugin = require("react-tap-event-plugin");
var GraphStore = require('../stores/GraphStore.jsx');

injectTapEventPlugin();

// these should be populated by the database
var menuItems = [
  {payload: '1', text:'Example Framework 1'},
  {payload: '2', text:'Example Framework 2'},
];




var GraphBar = React.createClass({

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
          <RaisedButton linkButton={true} href="http://walmart.com">
            <span className="mui-raised-button-label">Add New Topic</span>
          </RaisedButton>
        </div>
      </div>
    );
  }
});

module.exports = GraphBar;
