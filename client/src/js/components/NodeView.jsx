var React = require('react');
var Reactable = require('reactable');
var mui = require('material-ui');
var LeftNav = mui.LeftNav;
var Table = Reactable.Table;
var Tr = Reactable.Tr;
var TextField = mui.TextField;
var Checkbox = mui.Checkbox;
var NewResourceView = require('./components/NewResourceView.jsx');



var NodeView = React.createClass({
  getInitialState: function() {
    console.log('in initial state');
    return {
      resources: [
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
      ]
    }
  },

  addResource: function(resource) {
    this.setState({
      resources: this.state.resources.concat([resource])
    });
  },

  render: function(){
    return (
      <div className="full">
        <Table 
          className="node-table" 
          data={this.state.resources}
          sortable={true} 
          filterable={['name', 'author', 'rating', 'description']}
          columns={[
            {key: 'name', label: 'Name'},
            {key: 'author', label: 'Author'},
            {key: 'rating', label: 'Rating'},
            {key: 'description', label: 'Description'},
            {key: 'url', label: 'View Resource'},
            {key: 'addresource'}
          ]} />
        <NewResourceView addResource={this.addResource} />
      </div>
    );
  }
});

module.exports = NodeView;
