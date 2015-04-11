var React = require('react');


var Resource = React.createClass({
  handleEdit: function(id, event) {
    event.preventDefault();
    this.props.onEdit(id);
    this.props.onSelect(id);
  },

  render: function() {
    var resource = this.props.resource;
    var name = resource.name.length >=20 ? resource.name.substring(0,20) : resource.name;
    var author = resource.author;
    var url = resource.url;
    var description = resource.description;
    var className = this.props.active ? 'active' : null;
    return (
      <div>
    
      <a href="#" className={'list-group-item' + className} onClick={this.handleEdit.bind(null, resource._id)}>{name}{author}{url}{description}</a><br/>


      </div>
    )
  }
});

module.exports=Resource;