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
    console.log('list box data', data);
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

  render: function() {
    return (
      <div className="col-md-4">
        <ResourceList ref="resourceList" resources={this.state.resources} onEdit={this.props.onEdit} />
      </div>
    )
  }
});

module.exports = ResourceListBox;