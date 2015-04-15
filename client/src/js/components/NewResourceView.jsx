var React = require('react');
var NewResourceForm = require('./NewResourceForm.jsx');
var NodeResourceActions = require('../actions/NodeResourceActions.js');
var ResourceStore = require('../stores/ResourceStore.jsx');

var NewResourceView = React.createClass({
  handleSave: function(resourceName, resourceAuthor, resourceType, resourceURL, resourceDesc, id) {
    if(id) {
      NodeResourceActions.editResource({_id: id, name:resourceName, author:resourceAuthor, type:resourceType, url:resourceURL, description:resourceDesc});
    } else {
      NodeResourceActions.createResource({_id:Date.now(), name:resourceName, author:resourceAuthor, type:resourceType, url:resourceURL, description:resourceDesc});
    }
  },

  render: function() {
    var resource;
    if (this.props.id) {
      resource=ResourceStore.getResource(this.props.id);
    }

    return(
      <div className="col-mid-8">
        <NewResourceForm onSave={this.handleSave} id={this.props.id} resourceName={resource ? resource.name : ''} resourceAuthor={resource ? resource.author : ''} resourceRating={resource ? resourceRating: '0'} resourceType={resource ? resource.type : ''} resourceURL={resource ? resource.url : ''} resourceDesc={resource ? resource.description : ''}/>
      </div>
    )
  }

});

module.exports = NewResourceView;
