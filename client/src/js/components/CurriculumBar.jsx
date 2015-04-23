var mui = require('material-ui');
var React = require('react');

//NavBar Components
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var DropDownMenu = mui.DropDownMenu;
var FontIcon = mui.FontIcon;
var FlatButton = mui.FlatButton;
var DropDownIcon = mui.DropDownIcon;
//Set Material-UI Vars
var LeftNav = mui.LeftNav;
var Tabs = mui.Tabs;
var Tab = mui.Tab;
var TextField = mui.TextField;
var Paper = mui.Paper;
var injectTapEventPlugin = require("react-tap-event-plugin");
var Reflux = require('reflux');

injectTapEventPlugin();

// these should be populated by the database
var menuItems = [
  {payload: '1', text:'Example Framework 1'},
  {payload: '2', text:'Example Framework 2'},
];

var CurriculumBar = React.createClass({
  render: function() {
    var language = window.location.href.split('#')[1];
    var graphLink = "./graph.html#" + language;
    return (
      <Toolbar className="indigo">
        <ToolbarGroup key={0} float="left" className="nav-bar-title">
          <FlatButton linkButton={true} href={graphLink} className="topic-button">
            <span className="mui-flat-button-label">Topic View</span>
          </FlatButton>
        </ToolbarGroup>
        <ToolbarGroup key={1} float="left" className="nav-bar-dropdown">
          <DropDownMenu menuItems={menuItems} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
});

module.exports = CurriculumBar;
