var React = require('react');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;

var LoginView = React.createClass({
  render: function(){ 
    return (
      <div className="full">
        <h1>Log In</h1>
        <TextField
          hintText="Username" /> <br />
        <TextField
          hintText="Password"/> <br />
        <RaisedButton label="Log In" secondary={true} />
        <RaisedButton label="Log In with GitHub" secondary={true} />
        <p><a href="/">Don't have an account? Sign up here.</a></p>
      </div>
    );
  }
});

module.exports = LoginView;