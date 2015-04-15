var React = require('react');
var Resource = require('./Resource.jsx');
var Reactable = require('reactable');
var mui = require('material-ui');
var Table = Reactable.Table;
var Tr = Reactable.Tr;
var RaisedButton = mui.RaisedButton;
var GraphActions = require('../actions/GraphActions.js');

var ResourceList = React.createClass({
  getInitialState: function() {
    return{activeResourceId: null}
  },

  setActiveResource: function(id) {
    this.setState({activeResourceId: id});
  },

  addResource: function(info) {
    //console.log('inaddResource', this.props.resources.concat());
    console.log('inadd', info);
    GraphActions.resourceToSide(info);
  },

  render: function() {
    var self = this;
    var resources = this.props.resources.concat();
    var resourceNodes = resources.map(function(resource) {
      console.log('resource', resource);
      resource.addResource = function(){
        var info = {
          name: resource.name,
          id: resource.id
        }
        self.addResource(info);
      };
      
      resource.rating = '0';
      resource.url = <a href={resource.url}>View Resource</a>;
      resource.addresource = <RaisedButton label="Add" secondary={true} onClick={resource.addResource} />
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
          filterable={['name', 'author', 'rating', 'type', 'description']}
          columns={[
            {key: 'name', label: 'Name'},
            {key: 'author', label: 'Author'},
            {key: 'rating', label: 'Rating'},
            {key: 'type', label: 'Type'},
            {key: 'description', label: 'Description'},
            {key: 'url', label: 'View Resource'},
            {key: 'addresource', label: 'Add to Curriculum'}
          ]} />
      </div>
    )
  }

});

module.exports=ResourceList;