var mui = require('material-ui');
var React = require('react');
var Cookies = require('cookies-js');

//NavBar Components
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var DropDownMenu = mui.DropDownMenu;
var FontIcon = mui.FontIcon;
var FlatButton = mui.FlatButton;
var DropDownIcon = mui.DropDownIcon;
var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();


var filterOptions = [
  {payload: '1', text:'Home'},
  {payload: '2', text:'About'},
  {payload: '3', text:'Contact'}
];

var NavBar = React.createClass({
  logout: function(){
    console.log('getting here');
    var http = new XMLHttpRequest();
    var url = "./api/user/logout";
    var context = this;

    http.open("GET", url, true);
    http.onreadystatechange = function(){
      if (http.readyState === 4){
        if (http.status === 200){
          // set the signedInUser property to the User object returned in the login response
          Cookies.expire('basebranchuser');
          window.location.replace('./login.html');
        }
      }
    }
    http.send();
  },
  render: function() {
    var userid = Cookies.get('basebranchuser');
    var hasUser = userid ? true : false;
    if (hasUser){
      return (
        <Toolbar className="blue">
          <ToolbarGroup key={0} float="left" className="nav-bar-title">
            <a className ="hidden-link" href="./"><h3 className="mui-app-bar-title"> BaseBranch</h3></a>
          </ToolbarGroup>
          <ToolbarGroup key={1} float="left" className="nav-bar-dropdown">
            <DropDownMenu menuItems={filterOptions} />
          </ToolbarGroup>
          <ToolbarGroup className="logout" key={2} float="right">
            <FlatButton className="nav-bar-button signup-button" secondary={true} label="Logout" linkButton={true} href="#" onClick={this.logout}/>
          </ToolbarGroup>
        </Toolbar>      
      );
    } else {
      return (
        <Toolbar className="blue">
          <ToolbarGroup key={0} float="left" className="nav-bar-title">
            <a className ="hidden-link" href="./"><h3 className="mui-app-bar-title"> BaseBranch</h3></a>
          </ToolbarGroup>
          <ToolbarGroup key={1} float="left" className="nav-bar-dropdown">
            <DropDownMenu menuItems={filterOptions} />
          </ToolbarGroup>
          <ToolbarGroup className="signup" key={2} float="right">
            <FlatButton className="nav-bar-button signup-button" secondary={true} label="Sign Up" linkButton={true} href="./signup.html"/>
          </ToolbarGroup>
          <ToolbarGroup className="login" key={3} float="right">
            <FlatButton className="nav-bar-button login-button" secondary={true} label="Log In" linkButton={true} href="./login.html"/>
          </ToolbarGroup>
        </Toolbar>      
      );
    }
  }
});

module.exports = NavBar;
