var React = require('react');
var mui = require('material-ui');
var FlatButton = mui.FlatButton;

var NewUserBannerView = React.createClass({

  render: function(){
    return (
      <div className="banner-container">
        <h2>Welcome to BaseBranch!</h2>
        <p>BaseBranch is a community-sourced learning tool. <br />
           Users can add new resources or upvote/downvote current resources.<br />
           Resources can be combined into curricula, which are suggested path progessions of resources to accomplish specific learning goals.</p>
        <FlatButton secondary={true} label="Close" onClick={this.props.closeBanner}/>
      </div>
    )
  }
});

module.exports = NewUserBannerView;