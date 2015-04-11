var React = require('react');
var ResourceStore = require('../stores/ResourceStore.jsx');

var NewResourceForm = React.createClass({
  getInitialState: function() {
    return {resourceInfo: ''}
  },

  handleChange: function(event) {
    this.setState({resourceInfo: event.target.value});
  },

  handleSave: function() {
    this.props.onSave(this.state.resourceInfo, this.props.id);
    if (!this.props.id) {
      this.refs.newResourceForm.getDOMNode().value = '';
      this.setState({resourceInfo: ''});
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      resourceInfo: nextProps.resourceInfo
    });

    if(!nextProps.id) {
      this.refs.newResourceForm.getDOMNode().focus();
    }
  },

  render: function() {
    return (
      <div>
        <textarea className="form-control" ref="newResourceForm" cols="100" rows="20" value={this.state.resourceInfo} onChange={this.handleChange}></textarea><br/>
        <input type="button" className="btn btn-success btn-lg" value="Save" onClick={this.handleSave}/>
      </div>
    )
  }

});

module.exports = NewResourceForm;