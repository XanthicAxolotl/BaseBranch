var React = require('react');
var Resource = require('./Resource.jsx');
var Reactable = require('reactable');
var mui = require('material-ui');
var Table = Reactable.Table;
var Tr = Reactable.Tr;

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
      console.log('resource', resource);
      resource.url = <a href={resource.url}>View Resource</a>;
      console.log('url', resource.url);
      return (
        <Resource key={resource._id} active={self.state.activeResourceId===resource._id} resource={resource} onEdit={self.props.onEdit} onSelect={self.setActiveResource}/>
      );
    });
    return (
      <div className="list-group">
        {resourceNodes}

      <Table 
          className="node-table" 
          data={resources}
          sortable={true} 
          filterable={['name', 'author', 'rating', 'description']}
          columns={[
            {key: 'name', label: 'Name'},
            {key: 'author', label: 'Author'},
            {key: 'rating', label: 'Rating'},
            {key: 'description', label: 'Description'},
            {key: 'url', label: 'View Resource'},
            {key: 'addresource'}
          ]} />
      </div>
    )
  }

});

module.exports=ResourceList;