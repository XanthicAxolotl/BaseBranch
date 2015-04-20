/*==================== REQUIRE MODULES ====================*/
var React = require('react');
window.React = React;
var injectTapEventPlugin = require("react-tap-event-plugin");
var mui = require('material-ui');

/*============== DECLARE MATERIAL COMPONENTS ==============*/
var RaisedButton = mui.RaisedButton;
var NavBar = require('./components/NavBar.jsx');
var SignUpView = require('./components/SignUpView.jsx');
var Paper = mui.Paper;

injectTapEventPlugin();

/*============ CREATE MAIN CONTAINER COMPONENT ============*/
var Main = React.createClass({
  render: function(){
    return (
      <div className="full">
        <NavBar />
        <SignUpView />
      </div>
    );
  }
});

/*============== RENDER MAIN CONTAINER IN DOM ==============*/
React.render(<Main />, document.getElementById('app'));