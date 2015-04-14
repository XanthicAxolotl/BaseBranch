var React = require('react');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;

var NewTopicForm = React.createClass({
  getInitialState: function() {
    return {addedTopic: ''}
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      addedTopic: nextProps.addedTopic
    });

    if(!nextProps.id) {
      this.refs.newTopicForm.getDOMNode().focus();
    }
  },

  render: function(){ 
    return (
      <div className="full">
        <h1>Add New Topic</h1>
        <TextField
          hintText="i.e. Backbone, Angular, React" 
          value={this.props.addedTopic} 
          onChange={this.props.handleTopic.bind(null, this)} /> <br />
      </div>
    );
  }
});

module.exports = NewTopicForm;

