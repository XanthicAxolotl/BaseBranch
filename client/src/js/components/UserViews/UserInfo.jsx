var React = require('react');
var mui = require('material-ui');

var UserInfo = React.createClass({
  getInitialState: function() {
    return{activeUserId: null}
  },

  setActiveResource: function(id) {
    this.setState({activeUserId: id});
  },

  render: function() {
    return (
      <div className="full">
        <div className="avatar">
          <img src='../../golden-retriever-2.jpg' height="150" width="150"/>
        </div>
        <div className="userInfo">
          <h2>{this.props.userName}</h2>
          <p>Username: {this.props.userUsername}</p>
          <p>Email: {this.props.userEmail}</p>
          <p>Reputation: 1000 points</p>
        </div>
      </div>
    );
  }

});

module.exports=UserInfo;