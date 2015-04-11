var React = require('react');
var NewResourceForm = require('./NewResourceForm.jsx');
var NodeResourceActions = require('../actions/NodeResourceActions.jsx');
var ResourceStore = require('../stores/ResourceStore.jsx');

var NewResourceView = React.createClass({
  handleSave: function(resourceInfo, id) {
    if(id) {
      NodeResourceActions.editResource({_id: id, name:resourceInfo});
    } else {
      NodeResourceActions.createResource({_id:Date.now(), name:resourceInfo});
    }
  },

  render: function() {
    var resource;
    if (this.props.id) {
      resource=ResourceStore.getResource(this.props.id);
    }

    return(
      <div className="col-mid-8">
        <NewResourceForm onSave={this.handleSave} id={this.props.id} resourceInfo={resource ? resource.name : ''} />
      </div>
    )
  }

});

module.exports = NewResourceView;


// var React = require('react');
// var mui = require('material-ui');
// var TextField = mui.TextField;
// var Checkbox = mui.Checkbox;
// var RaisedButton = mui.RaisedButton;

// var NewResourceView = React.createClass({
//   getInitialState: function() {
//     console.log('in newresourceview getinitialstate');
//     return {
//       newResource: ''
//     }
//   },

//   render: function(){ 
//     return (
//       <div className="addResource">
//         <h2>New Resource</h2>
//         <div className="full">
//           <h3>Name:</h3>
//           <TextField
//             hintText="Name" />
//           <h3>Author:</h3>
//           <TextField
//             hintText="Author"/>
//           <h3>URL:</h3>
//           <TextField
//             hintText="URL"/>
//           <div className="resourceType">
//             <h3>Type:</h3>
//             <Checkbox 
//               name="typeName1"
//               value="typeValue1"
//               label="Tutorial"/>
//             <Checkbox 
//               name="typeName2"
//               value="typeValue2"
//               label="Other Text (i.e. Blog)"/>
//             <Checkbox 
//               name="typeName3"
//               value="typeValue3"
//               label="Video"/>
//             <Checkbox 
//               name="typeName4"
//               value="typeValue4"
//               label="Audio (i.e. Podcast)"/>
//             <Checkbox 
//               name="typeName5"
//               value="typeValue5"
//               label="Practice Problems"/>
//             <Checkbox 
//               name="typeName6"
//               value="typeValue6"
//               label="GitHub Repository"/>
//             <Checkbox 
//               name="typeName7"
//               value="typeValue7"
//               label="NPM Module"/>
//             <Checkbox 
//               name="typeName8"
//               value="typeValue8"
//               label="Other"/>
//           </div>
//           <div className="description">
//             <h3>Description:</h3>
//             <TextField
//               hintText="Description"
//               multiLine={true} />
//           </div>
//           <RaisedButton label="Create New" secondary={true} />
//         </div>
//       </div>
//     );
//   }
// });

// module.exports = NewResourceView;