var React = require('react');
var UserInfo = require('./UserInfo.jsx');
var UserCurricula = require('./UserCurricula.jsx');
var UserResources = require('./UserResources.jsx');
var UserStore = require('../../stores/UserStore.js');

var UserProfileBox = React.createClass({
  getInitialState: function() {
    return { 
      userInfo: UserStore.getInfo(),
      userCurricula: UserStore.getCurricula(),
      userResources: UserStore.getResources()
    };
  },

  onChange: function(userInfo, userCurricula, userResources) {
    this.setState({
      userInfo: userInfo,
      userCurricula: userCurricula,
      userResources: userResources
    });
  },

  componentDidMount: function() {
    this.unsubscribe = UserStore.listen(this.onChange);
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  onAdd: function(event) {
    event.preventDefault();
    this.props.onAdd();
    this.refs.userInfo.setActiveUser(null);
  },

  render: function() {
    return (
      <div className="col-md-4">
        <div className="centered"><a href="" onClick={this.onAdd}>Add New</a></div>
        <UserInfo ref="userInfo" userInfo={this.state.userInfo} onEdit={this.props.onEdit} />
        <UserCurricula ref="userCurricula" userCurricula={this.state.userCurricula} onEdit={this.props.onEdit} />
        <UserResources ref="userResources" userResources={this.state.userResources} onEdit={this.props.onEdit} />
      </div>
    )
  }
});

module.exports = UserProfileBox;