var React = require('react');
var Reflux = require('reflux');
var ResourceList = require('./ResourceList.jsx');
var ResourceStore = require('../stores/ResourceStore.jsx');

var ResourceListBox = React.createClass({
  mixins: [Reflux.listenTo(ResourceStore, 'updateState')],

  getInitialState: function() {
    return { resources: ResourceStore.getResources() };
  },

  onChange: function(resources) {
    this.setState({
      resources: resources
    });
  },

  updateState: function(data) {
    this.setState({
      resources: data
    });
  },

  componentDidMount: function() {
    this.unsubscribe = ResourceStore.listen(this.onChange);
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  onAdd: function(event) {
    event.preventDefault();
    this.props.onAdd();
    this.refs.resourceList.setActiveResource(null);
  },

  render: function() {
    return (
      <div className="col-md-4">
        <div className="centered"><a href="" onClick={this.onAdd}>Add New</a></div>
        <ResourceList ref="resourceListView" resources={this.state.resources} onEdit={this.props.onEdit} />
      </div>
    )
  }
});

module.exports = ResourceListBox;