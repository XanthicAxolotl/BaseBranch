var React = require('react');
var mui = require('material-ui');
var Progress = require('react-progressbar');
var Reactable = require('reactable');
var Table = Reactable.Table;
var Tr = Reactable.Tr;

var resources =[
 {
  'name':'Awesome Blog', 
  'author': 'Tyler McGinnis',
  'rating': 37,
  'description':'Best blog ever, kids',
  'url':<a href='http://tmz.com'>View Resource</a>,
  },
  {
  'name':'Better Blog', 
  'author': 'Fred Zirdung',
  'rating': 12,
  'description':'Okay now',
  'url':<a href='http://perezhilton.com'>View Resource</a>,
  },
  {
  'name':'Okay Blog', 
  'author': 'Scotch.io',
  'rating': 89,
  'description':'Well okay',
  'url':<a href='http://popsugar.com'>View Resource</a>,
  }
];

var UserProfileView = React.createClass({
  render: function() {
    return(
      <div className="full">
        <div className="avatar">
          <img src='../../golden-retriever-2.jpg' height="150" width="150"/>
        </div>
        <div className="userInfo">
          <h2>Fred Zirdung</h2>
          <p>Username: fredify</p>
          <p>Email: fredify@hackreactor.com</p>
          <p>Reputation: 1000 points</p>
        </div>
        <div className="myCurricula" float="right">
          <h3>My Curricula</h3>
          <h4>JavaScript: Introduction to JavaScript</h4>
          <Progress completed={50} color="#00FFFF" />
          <h4>JavaScript: Recursion</h4>
          <Progress completed={90} color="#8B008B" />
          <h4>JavaScript: For Loops</h4>
          <Progress completed={20} color="#FF1493" />
        </div>
        <div className="myResources">
          <h3>My Resources</h3>
          <Table 
            className="myresource-table" 
            data={resources}
            sortable={true} 
            filterable={['name', 'rating', 'description']}
            columns={[
              {key: 'name', label: 'Name'},
              {key: 'author', label: 'Author'},
              {key: 'rating', label: 'Rating'},
              {key: 'description', label: 'Description'},
              {key: 'url', label: 'View Resource'},
            ]} />
        </div>
      </div>
    );
  }
});

module.exports = UserProfileView;

