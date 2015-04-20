/*==================== REQUIRE MODULES ====================*/
var React = require('react');
window.React = React;
var injectTapEventPlugin = require("react-tap-event-plugin");
var mui = require('material-ui');

/*============== DECLARE MATERIAL COMPONENTS ==============*/
var RaisedButton = mui.RaisedButton;
var NavBar = require('./components/NavBar.jsx');
var LoginView = require('./components/LoginView.jsx');
var Paper = mui.Paper;

injectTapEventPlugin();

/*============ CREATE MAIN CONTAINER COMPONENT ============*/
var Main = React.createClass({
  render: function(){
    return (
      <div className="full">
        <NavBar />
        <LoginView />
      </div>
    );
  }
});

/*============== RENDER MAIN CONTAINER IN DOM ==============*/
React.render(<Main />, document.getElementById('app'));