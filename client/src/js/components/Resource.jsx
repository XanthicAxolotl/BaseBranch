var React = require('react');
var Resource = React.createClass({
  handleEdit: function(id, event) {
    event.preventDefault();
    this.props.onEdit(id);
    this.props.onSelect(id);
  },

  render: function() {
    var resource = this.props.resource;
    var title = resource.name;
    var className = this.props.active ? 'active' : null;
    return (
      <div>
      <a href="#" className={'list-group-item' + className} onClick={this.handleEdit.bind(null, resource._id)}>{title}</a><br/>
      </div>
    )
  }
});

module.exports=Resource;