var React = require('react');
var ResourceStore = require('../stores/ResourceStore.jsx');
var mui = require('material-ui');
var TextField = mui.TextField;
var Checkbox = mui.Checkbox;
var RaisedButton = mui.RaisedButton;


var NewResourceForm = React.createClass({
  getInitialState: function() {
    return {resourceName: '', resourceAuthor: '', resourceRating: '0', resourceURL: '', resourceDesc: ''}
  },

  handleChangeName: function(event) {
    this.setState({resourceName: event.target.value});
  },

  handleChangeAuthor: function(event) {
    this.setState({resourceAuthor: event.target.value});
  },

  handleChangeURL: function(event) {
    this.setState({resourceURL: event.target.value });
  },

  handleChangeDesc: function(event) {
    this.setState({resourceDesc: event.target.value});
  },

  handleSave: function() {
    this.props.onSave(this.state.resourceName, this.state.resourceAuthor, this.state.resourceURL, this.state.resourceDesc, this.props.id);
    if (!this.props.id) {
      this.refs.newResourceForm.getDOMNode().value = '';
      this.setState({resourceName: '', resourceAuthor: '', resourceURL: '', resourceDesc: ''});
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      resourceName: nextProps.resourceName,
      resourceAuthor: nextProps.resourceAuthor,
      resourceRating: nextProps.resourceRating,
      resourceURL: nextProps.resourceURL,
      resourceDesc: nextProps.resourceDesc
    });

    if(!nextProps.id) {
      this.refs.newResourceForm.getDOMNode().focus();
    }
  },

  render: function() {
    return (
      <div>
        <div className="addResource">
          <h2>New Resource</h2>
          <div className="full">
            <h3>Name:</h3>
            <TextField
              hintText="Name" 
              value={this.state.resourceName} 
              onChange={this.handleChangeName} />
            <h3>Author:</h3>
            <TextField
              hintText="Author"
              value={this.state.resourceAuthor} 
              onChange={this.handleChangeAuthor} />
            <h3>URL:</h3>
            <TextField
              hintText="URL"
              value={this.state.resourceURL} 
              onChange={this.handleChangeURL} />
            <div className="resourceType">
              <h3>Type:</h3>
              <Checkbox 
                name="typeName1"
                value={this.state.resourceCheckTutorial}
                label="Tutorial"/>
              <Checkbox 
                name="typeName2"
                value={this.state.resourceCheckOtherText}
                label="Other Text (i.e. Blog)"/>
              <Checkbox 
                name="typeName3"
                value={this.state.resourceCheckVideo}
                label="Video"/>
              <Checkbox 
                name="typeName4"
                value={this.state.resourceCheckAudio}
                label="Audio (i.e. Podcast)"/>
              <Checkbox 
                name="typeName5"
                value={this.state.resourceCheckProblems}
                label="Practice Problems"/>
              <Checkbox 
                name="typeName6"
                value={this.state.resourceCheckGitHub}
                label="GitHub Repository"/>
              <Checkbox 
                name="typeName7"
                value={this.state.resourceCheckNPM}
                label="NPM Module"/>
              <Checkbox 
                name="typeName8"
                value={this.state.resourceCheckOther}
                label="Other"/>
            </div>
            <div className="description">
              <h3>Description:</h3>
              <TextField
                hintText="Description"
                multiLine={true} 
                value={this.state.resourceDesc} 
              onChange={this.handleChangeDesc} />
            </div>
          </div>
        </div>
        <input type="button" className="btn btn-success btn-lg" value="Save" onClick={this.handleSave}/>
      </div>
    )
  }

});

module.exports = NewResourceForm;