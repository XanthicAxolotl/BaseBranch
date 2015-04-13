var React = require('react');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;

var SignUpView = React.createClass({
  render: function(){ 
    return (
      <div className="signup-main">
        <div>
          <h1>Sign Up</h1>
          <TextField
            hintText="Username" /> <br />
          <TextField
            hintText="Name" /> <br />
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
      </div>
    );
  }
});

module.exports = SignUpView;