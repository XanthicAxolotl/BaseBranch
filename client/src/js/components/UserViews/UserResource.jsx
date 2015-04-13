var React = require('react');


var UserResource = React.createClass({
  handleEdit: function(id, event) {
    event.preventDefault();
    this.props.onEdit(id);
    this.props.onSelect(id);
  },

  render: function() {
    var userResource = this.props.userResource;
    var name = userResource.name;
    var author = userResource.author;
    var url = userResource.url;
    var type = userResource.type;
    var description = userResource.description;
    var className = this.props.active ? 'active' : null;
    return (
      <div>
        We are in Resource
      </div>
    )
  }
});

module.exports=UserResource;