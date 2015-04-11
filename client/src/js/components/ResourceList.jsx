var React = require('react');
var Resource = require('./Resource.jsx');

var ResourceList = React.createClass({
  getInitialState: function() {
    return{activeResourceId: null}
  },

  setActiveResource: function(id) {
    this.setState({activeResourceId: id});
  },

  render: function() {
    var self = this;
    var resources = this.props.resources.concat();
    var resourceNodes = resources.map(function(resource) {
      return (
        <Resource key={resource._id} active={self.state.activeResourceId===resource._id} resource={resource} onEdit={self.props.onEdit} onSelect={self.setActiveResource}/>
      );
    });
    return (
      <div className="list-group">
        {resourceNodes}
      </div>
    )
  }

});

module.exports=ResourceList;