var React = require('react');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;

var LoginView = React.createClass({
  render: function(){ 
    return (
      <div className="full">
        <h1>Sign Up</h1>
        <TextField
          hintText="Username" /> <br />
        <TextField
          hintText="Email"/> <br />
        <TextField
          hintText="Password"/> <br />
        <TextField
          hintText="Confirm Password"/> <br />
        <RaisedButton label="Sign Up" secondary={true} />
        <RaisedButton label="Sign Up with GitHub" secondary={true} />
        <p><a href="/">Already have an account? Log in here.</a></p>
      </div>
    );
  }
});

module.exports = LoginView;