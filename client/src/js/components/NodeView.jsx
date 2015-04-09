var React = require('react');
var Reactable = require('reactable');
var mui = require('material-ui');
var LeftNav = mui.LeftNav;
var Table = Reactable.Table;
var Tr = Reactable.Tr;
var TextField = mui.TextField;
var Checkbox = mui.Checkbox;

var resources =[
 {
  'name':'Awesome Blog', 
  'rating': 37,
  'description':'Best blog ever, kids',
  'url':<a href='http://tmz.com'>TMZ</a>,
  'addresource':<a href="/">Add Resource</a>
  },
  {
  'name':'Better Blog', 
  'rating': 12,
  'description':'Okay now',
  'url':<a href='http://perezhilton.com'>Perez</a>,
  'addresource':<a href="/">Add Resource</a>
  },
  {
  'name':'Okay Blog', 
  'rating': 89,
  'description':'Well okay',
  'url':<a href='http://popsugar.com'>PopSugar</a>,
  'addresource':<a href="/">Add Resource</a>
  }
];

var menuItems = [
  {payload: '1', text: 'Tutorial'},
  {payload: '2', text: 'Other Text'},
  {payload: '3', text: 'Video'},
  {payload: '4', text: 'Practice Problems'},
  {payload: '5', text: 'Audio (Podcast)'},
  {payload: '6', text: 'GitHub Repository'},
  {payload: '7', text: 'NPM Module'},
  {payload: '8', text: 'Other'}
];

var NodeView = React.createClass({
  // getInitialState: function() {
  //   return {
  //     jobs: this.props.jobs
  //   }
  // },
  // handleClick: function() {
      
  // },
  render: function(){
  
    return (
      <div className="full">
        <div className="resourceTable">
          <Table 
            className="node-table" 
            data={resources}
            sortable={true} 
            filterable={['name', 'rating', 'description']}
            columns={[
              {key: 'name', label: 'Name'},
              {key: 'rating', label: 'Rating'},
              {key: 'description', label: 'Description'},
              {key: 'url', label: 'View Resource'},
              {key: 'addresource'}
            ]} />
        </div>
        <div className="addResource">
          <h2>Name:</h2>
          <TextField
            hintText="Name" />
          <h2>URL:</h2>
          <TextField
            hintText="Hint Text"/>
          <div className="resourceType">
            <h2>Type:</h2>
            <Checkbox 
              name="typeName1"
              value="typeValue1"
              label="Tutorial"/>
            <Checkbox 
              name="typeName2"
              value="typeValue2"
              label="Other Text (i.e. Blog)"/>
            <Checkbox 
              name="typeName3"
              value="typeValue3"
              label="Video"/>
            <Checkbox 
              name="typeName4"
              value="typeValue4"
              label="Audio (i.e. Podcast)"/>
            <Checkbox 
              name="typeName5"
              value="typeValue5"
              label="Practice Problems"/>
            <Checkbox 
              name="typeName6"
              value="typeValue6"
              label="GitHub Repository"/>
            <Checkbox 
              name="typeName7"
              value="typeValue7"
              label="NPM Module"/>
            <Checkbox 
              name="typeName8"
              value="typeValue8"
              label="Other"/>
          </div>
          <div className="description">
            <h2>Description:</h2>
            <TextField
              hintText="Description"
              multiLine={true} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = NodeView;