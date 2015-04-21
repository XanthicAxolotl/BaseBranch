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
      profileInfo: [{},[{}],[{}],[{}]]
    }
  },
  render: function(){
    var profileInfo = this.state.profileInfo;
    return (
      <div>
      <div className="pictureContainer">
        <img className="picture" src={'https://s-media-cache-ak0.pinimg.com/originals/fb/cd/97/fbcd9760780dceec903649fd75ef7016.jpg'} />
        <div className="name">{profileInfo[0].name}</div>
      </div>
      <div className="userInfo">
      <Tabs className="tabs">
        <Tab label="My Curricula" className="tab">
          <ul className="list">
            { profileInfo[1].length === 0 ? null : profileInfo[1].map(function(curriculum){
              var url = "./course.html#" + curriculum.id;
              return <li className="item resource"> 
                <div className="item-rating">
                { curriculum.rating }
                </div>
                <div className="item-left test-left">
                  { curriculum.name } <br />
                  <span className="item-left-details">
                    <a href={url}>View Curriculum</a>
                  </span>
                </div>
                <div className="item-right test-right">
                  { curriculum.description }
                </div>
              </li> 
            })}
          </ul>
        </Tab>
        <Tab label="Created Curricula" className="tab">
          <ul className="list">
            { profileInfo[2].length === 0 ? null :profileInfo[2].map(function(curriculum){
              var url = "./course.html#" + curriculum.id;
              return <li className="item resource"> 
                <div className="item-rating">
                { curriculum.rating }
                </div>
                <div className="item-left">
                  { curriculum.name } <br />
                  <span className="item-left-details">
                    <a href={url}>View Curriculum</a>
                  </span>
                </div>
                <div className="item-right">
                  { curriculum.description }
                </div>
              </li>
            })}
          </ul>  
        </Tab>
        <Tab label="Created Resources" className="tab">
          <ul createClass="list">
            { profileInfo[3].length === 0 ? null:profileInfo[3].map(function(resource){
              return <li className="item resource"> 
                <div className="item-rating">
                { resource.rating }
                </div>
                <div className="item-left">
                  { resource.name } <br />
                  <span className="item-left-details">
                    <a href={resource.url}>View Resource</a>
                  </span>
                </div>
                <div className="item-right">
                  { resource.description }
                </div>
              </li>
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