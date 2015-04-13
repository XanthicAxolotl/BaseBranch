var React = require('react');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;

var LoginView = React.createClass({

  getInitialState: function() {
    return {userName: '', userUsername: '', userEmail: ''}
  },

  handleChangeUsername: function(event) {
    this.setState({userUsername: event.target.value});
  },
  
  handleChangeName: function(event) {
    this.setState({userName: event.target.value});
  },
  
  handleChangeEmail: function(event) {
    this.setState({userEmail: event.target.value});
  },

  handleSave: function() {
    this.props.onSave(this.state.userUsername, this.state.userName, this.state.userEmail, this.props.id);
    if (!this.props.id) {
      this.refs.newSignupForm.getDOMNode().value = '';
      this.setState({userName: '', userUsername: '', userEmail: ''});
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      userName: nextProps.userName,
      userUsername: nextProps.userUsername,
      userEmail: nextProps.userEmail
    });

    if(!nextProps.id) {
      this.refs.newSignupForm.getDOMNode().focus();
    }
  },
  
  
  render: function(){ 
    return (
      <div className="full">
        <h1>Sign Up</h1>
        <TextField
          hintText="Username" 
          value={this.state.userUsername}
          onChange={this.state.handleChangeUsername} /> <br />
        <TextField
          hintText="Name" 
          value={this.state.userName}
          onChange={this.state.handleChangeName} /> <br />
        <TextField
          hintText="Email" 
          value={this.state.userEmail} 
          onChange={this.state.handleChangeEmail} /> <br />
        <TextField
          hintText="Password" /> <br />
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