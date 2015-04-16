var React = require('react');
var Reflux = require('reflux');
var ProfileStore = require('../stores/ProfileStore.js')
var mui = require('material-ui');
var Tabs = mui.Tabs;
var Tab = mui.Tab;


var ProfileView = React.createClass({
  mixins: [Reflux.connect(ProfileStore, 'profileInfo')],
  getInitialState: function(){
    return { 
      profileInfo: [{name:''},[{name:''}],[{}]]
    }
  },
  componentDidMount: function(){
    ProfileStore.getProfile();
  },
  render: function(){
    var profileInfo = this.state.profileInfo;
    console.log(profileInfo[1][0].name)
    return (
      <div>
      <div className="pictureContainer">
        <img className="picture" src={'https://s-media-cache-ak0.pinimg.com/originals/fb/cd/97/fbcd9760780dceec903649fd75ef7016.jpg'} />
        <div className="name">{profileInfo[0].name}</div>
      </div>
      <div className="userInfo">
      <Tabs>
        <Tab label="My Curricula">
          <ul className="list">
            {profileInfo[1].map(function(curriculum){
              var url = "./course.html#" + curriculum.id;
              return <a href={url}><li className="item">{ curriculum.name }</li></a>
            })}
          </ul>
        </Tab>
        <Tab label="Created Curricula">
          <ul className="list">
            {profileInfo[2].map(function(curriculum){
              var url = "./course.html#" + curriculum.id;
              return <a href={url}><li className="item">{ curriculum.name }</li></a>
            })}
          </ul>
        </Tab>
      </Tabs>
      </div>
      </div>
    )
  }
});

module.exports = ProfileView;