var React = require('react');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var LoginStyles = require('../styles/LoginStyles.js');

var LoginView = React.createClass({
  render: function() { 
    return (
      <div className="login-main" styles={LoginStyles.main}>
        <div>
          <h1>Log In</h1>
          <TextField
            hintText="Username" /> <br />
          <TextField
            hintText="Password"/> <br />
          <RaisedButton label="Log In" secondary={true} />
          <RaisedButton label="Log In with GitHub" secondary={true} />
          <p><a href="./">Dont have an account? Sign up here.</a></p>
        </div>
      </div>
    );
  }
});

module.exports = LoginView;