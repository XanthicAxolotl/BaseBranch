var React = require('react');
var mui = require('material-ui');

//NavBar Components
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var DropDownMenu = mui.DropDownMenu;
var FontIcon = mui.FontIcon;
var RaisedButton = mui.RaisedButton;
var DropDownIcon = mui.DropDownIcon;
var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();


var filterOptions = [
  {payload: '1', text:'About'},
  {payload: '2', text:'Contact'}
];


var NavBar = React.createClass({

  render: function() {
    return (
      <Toolbar>
        <ToolbarGroup key={0} float="left">
          <a className ="hidden-link" href="/"><h2 className="mui-app-bar-title">BaseBranch</h2></a>
        </ToolbarGroup>
        <ToolbarGroup key={1} float="left">
          <DropDownMenu menuItems={filterOptions} />
        </ToolbarGroup>
        <ToolbarGroup className="signup" key={2} float="right">
          <RaisedButton label="Sign Up" linkButton={true} primary={true}/>
        </ToolbarGroup>
        <ToolbarGroup className="login" key={3} float="right">
          <RaisedButton label="Log In" linkButton={true} primary={true}/>
        </ToolbarGroup>
      </Toolbar>

    );
  }
});

module.exports = NavBar;



