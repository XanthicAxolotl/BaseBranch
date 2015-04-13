var React = require('react');
var Resource = require('./UserResource.jsx');
var Reactable = require('reactable');
var mui = require('material-ui');
var Table = Reactable.Table;
var Tr = Reactable.Tr;

var ResourceList = React.createClass({
  getInitialState: function() {
    return{activeUserId: null}
  },

  setActiveResource: function(id) {
    this.setState({activeUserId: id});
  },

  render: function() {
    var self = this;
    var resources = this.props.resources.concat();
    var resourceNodes = resources.map(function(resource) {
      resource.rating = '0';
      resource.url = <a href={resource.url}>View Resource</a>;
      return (
        <Resource key={resource._id} active={self.state.activeResourceId===resource._id} resource={resource} onEdit={self.props.onEdit} onSelect={self.setActiveResource}/>
      );
    });
    return (
      <div className="list-group">
        {resourceNodes}

      <div className="myCurricula" float="right">
          <h3>My Curricula</h3>
          <h4>JavaScript: Introduction to JavaScript</h4>
          <Progress completed={50} color="#00FFFF" />
          <h4>JavaScript: Recursion</h4>
          <Progress completed={90} color="#8B008B" />
          <h4>JavaScript: For Loops</h4>
          <Progress completed={20} color="#FF1493" />
        </div>
      </div>
    )
  }

});

module.exports=ResourceList;