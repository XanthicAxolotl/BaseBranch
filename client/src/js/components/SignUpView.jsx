var React = require('react');
var Reflux = require('reflux');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var SignUpActions = require('../actions/SignUpActions.js');
var SignUpStore = require('../stores/SignUpStore.js');

var SignUpView = React.createClass({
  mixins: [Reflux.connect(SignUpStore, 'error')],
  getInitialState: function(){
    return {
      username: '',
      name: '',
      email: '',
      password: '',
      cPassword: '',
      error: false
    };
  },
  newUser: function(){
    SignUpActions.signup({
      username: this.state.username,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      cPassword: this.state.cPassword
    });
  },
  userInput: function(e){
    this.setState({
      username: e.target.value
    });
  },
  nameInput: function(e){
    this.setState({
      name: e.target.value
    });
  },
  emailInput: function(e){
    this.setState({
      email: e.target.value
    });
  },
  passInput: function(e){
    this.setState({
      password: e.target.value
    });
  },
  cPassInput: function(e){
    this.setState({
      cPassword: e.target.value
    });
  },
  render: function(){ 
    return (
      <div className="signup-main">
        <div>
          <h1>Sign Up</h1>
          <TextField
            hintText="Username" value={this.state.username} onChange={this.userInput}/> <br />
          <TextField
            hintText="Name" value={this.state.name} onChange={this.nameInput}/> <br />
          <TextField
            hintText="Email" value={this.state.email} onChange={this.emailInput}/> <br />
          <TextField
            hintText="Password" value={this.state.password} onChange={this.passInput}/> <br />
          <TextField
            hintText="Confirm Password" value={this.state.cPassword} onChange={this.cPassInput}/> <br />
          <RaisedButton label="Sign Up" secondary={true} onClick={this.newUser} />
          <RaisedButton label="Sign Up with GitHub" secondary={true} />
          <p><a href="/">Already have an account? Log in here.</a></p>
        </div>
      </div>
    );
  }
});

module.exports = SignUpView;