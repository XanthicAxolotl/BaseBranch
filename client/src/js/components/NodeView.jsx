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
  'author': 'Tyler McGinnis',
  'rating': 37,
  'description':'Best blog ever, kids',
  'url':<a href='http://tmz.com'>TMZ</a>,
  'addresource':<a href="/">Add Resource</a>
  },
  {
  'name':'Better Blog', 
  'author': 'Fred Zirdung',
  'rating': 12,
  'description':'Okay now',
  'url':<a href='http://perezhilton.com'>Perez</a>,
  'addresource':<a href="/">Add Resource</a>
  },
  {
  'name':'Okay Blog', 
  'author': 'Scotch.io',
  'rating': 89,
  'description':'Well okay',
  'url':<a href='http://popsugar.com'>PopSugar</a>,
  'addresource':<a href="/">Add Resource</a>
  }
];

var NodeView = React.createClass({
  
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
              {key: 'author', label: 'Author'},
              {key: 'rating', label: 'Rating'},
              {key: 'description', label: 'Description'},
              {key: 'url', label: 'View Resource'},
              {key: 'addresource'}
            ]} />
        </div>
      </div>
    );
  }
});

module.exports = NodeView;