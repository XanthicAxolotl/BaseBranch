var React = require('react');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;

var NewTopicForm = React.createClass({
  render: function(){ 
    return (
      <div className="full">
        <h1>Add New Topic</h1>
        <TextField
          hintText="i.e. Backbone, Angular, React" /> <br /> <br />
        <RaisedButton linkButton={true} href="http://images4.fanpop.com/image/quiz/689000/689423_1315079585116_350_300.jpg">
            <span className="mui-raised-button-label">Add Topic</span>
        </RaisedButton>
        <RaisedButton linkButton={true} href="http://images4.fanpop.com/image/quiz/689000/689423_1315079585116_350_300.jpg">
            <span className="mui-raised-button-label">Cancel</span>
        </RaisedButton>
      </div>
    );
  }
});

module.exports = NewTopicForm;