var React = require('react');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var GraphStore = require('../stores/GraphStore.jsx');

var NewTopicForm = React.createClass({
  getInitialState: function() {
    return {addedTopic: ''}
  },

  handleTopic: function(event) {
   this.setState({addedTopic: event.target.value});
  },

  // handleSave: function() {
  //   this.props.onSave(this.state.addedTopic, this.props.id);
  //   if (!this.props.id) {
  //     this.refs.newTopicForm.getDOMNode().value = '';
  //     this.setState({addedTopic: ''});
  //   }
  // },

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
          ref="newTopicForm"
          value={this.props.addedTopic} 
          floatingLabelText="i.e. Backbone, Angular, React" 
          onChange={this.props.handleTopic.bind(null, this)} /> <br />
      </div>
    );
  }
});

module.exports = NewTopicForm;

