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
      username: ['', false],
      email: ['', false],
      password: ['', false],
      cPassword: ['', false],
      errorEmail: '',
      errorUser: '',
      errorPass: '',
      errorCPass: '',
      disable: true
    };
  },
  newUser: function(){
    SignUpActions.signup({
      name: this.state.username[0],
      email: this.state.email[0],
      password: this.state.password[0]
    });
  },
  userInput: function(e){
    var inputUser = e.target.value;
    var status;
    var context = this;
    //if name exists, set status to true
    if (inputUser.length > 0){
      status = true;
    } else {
      status = false;
    }
    var errorMsg = status === false ? 'Please enter a valid username' : '';
    //update the state usernamename
    this.setState({
      username: [inputUser, status],
      errorUser: errorMsg
    }, context.buttonEnable());
  },
  emailInput: function(e){
    //get current error status
    var status;
    var context = this;
    //find ampersand and following period
    var amper = this.state.email[0].indexOf('@');
    var dot = this.state.email[0].slice(amper).indexOf('.');
    //if there is an amper & following dot, set status to true
    if (amper > 0 && dot > 0){
      status = true;
    //otherwise set status to false
    } else {
      status = false;
    }
    var errorMsg = status === false ? 'Please enter a valid e-mail' : '';
    //update the state email
    this.setState({
      email: [e.target.value, status],
      errorEmail: errorMsg
    }, context.buttonEnable());
  },
  passInput: function(e){
    var pass = e.target.value;
    var status;
    var context = this;
    //only set status to true if password is at least 8 char long
    if (pass.length > 7){
      status = true;
    } else {
      status = false;
    }
    //update the state password
    var errorMsg = status === false ? 'Please enter a password with at least 8 characters' : '';
    this.setState({
      password: [pass, status],
      errorPass: errorMsg
    }, context.buttonEnable());
  },
  cPassInput: function(e){
    var status;
    var context = this;

    var cPass = e.target.value;
    if (cPass === this.state.password[0]){
      status = true;
    } else {
      status = false;
    }
    var errorMsg = status === false ? 'Both password fields must match' : '';
    this.setState({
      cPassword: [e.target.value, status],
      errorCPass: errorMsg
    }, context.buttonEnable());
  },
  buttonEnable: function(){
    var context = this;
    setTimeout(function(){
      var username = context.state.username[1];
      var email = context.state.email[1];
      var password = context.state.password[1];
      var cPassword = context.state.cPassword[1];
      var disable;

      if (username && email && password && cPassword){
        disable = false;
      } else {
        disable = true;
      }
      context.setState({
        disable: disable
      });
    }, 100);
  },
  render: function(){ 
    return (
      <div className="signup-main">
        <div>
          <h1>Sign Up</h1>
          <TextField
            hintText="Username" value={this.state.username[0]} errorText={this.state.errorUser} onChange={this.userInput}/> <br />
          <TextField
            hintText="Email" value={this.state.email[0]} errorText={this.state.errorEmail} onChange={this.emailInput}/> <br />
          <TextField
            hintText="Password" value={this.state.password[0]} errorText={this.state.errorPass} onChange={this.passInput} type="password"/> <br />
          <TextField
            hintText="Confirm Password" value={this.state.cPassword[0]} errorText={this.state.errorCPass} onChange={this.cPassInput} type="password"/> <br />
          <RaisedButton label="Sign Up" secondary={true} onClick={this.newUser} disabled={this.state.disable}/>
          <RaisedButton label="Sign Up with GitHub" secondary={true} />
          <p><a href="./login.html">Already have an account? Log in here.</a></p>
        </div>
      </div>
    );
  }
});

module.exports = SignUpView;