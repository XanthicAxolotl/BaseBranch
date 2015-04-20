/*==================== REQUIRE MODULES ====================*/
var mui             = require('material-ui');
var React           = require('react');
var Reflux          = require('reflux');
var CourseStore     = require('../stores/CourseStore.js');
var CourseActions   = require('../actions/CourseActions.js');

/*============== DECLARE MATERIAL COMPONENTS ==============*/
//NavBar Components
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var DropDownMenu = mui.DropDownMenu;
var FontIcon = mui.FontIcon;
var RaisedButton = mui.RaisedButton;
var DropDownIcon = mui.DropDownIcon;
//Set Material-UI Vars
var Menu = mui.Menu;
var Tabs = mui.Tabs;
var Tab = mui.Tab;
var TextField = mui.TextField;
var Paper = mui.Paper;
var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

/*======================== MOCK DATA ========================*/
// these should be populated by the database

/*================ CREATE CURRICULUM COMPONENTS ================*/
//Create Header View
var Header = React.createClass({
  back: function(){
    this.props.goBack();
  },
  render: function() {
    return(
      <div className="header">
        <div className="back-button" onClick={this.back}>
          <i className="fa fa-chevron-left fa-2x"></i>
        </div>
        <div className="header-left">
          <div><h3 className="reset">{this.props.name}</h3></div>
          <div>{this.props.desc}</div>
        </div>
        <div className="header-right">
          <ul>
            <li>Created By: {this.props.creator}</li>
            <li>Last Updated: {this.props.update}</li>
            <li>Rating: {this.props.rating}</li>
          </ul>
        </div>
      </div>
    )
  }
});

//Create Checklist View
var CheckList = React.createClass({
  render: function(){
    var context = this;
    var index = 1;
    var checkListResource = this.props.resources.map(function(result){
      index++;
      result.changeResource = function(){
        context.props.changeResource(result.id);
      };
      return { payload: index, text: result.name, onItemClick: result.changeResource};
    });
    var filterMenuItems = [{ payload: '1', text: 'CheckList'}];
    var filterMenuItems = filterMenuItems.concat(checkListResource);
    return(
      <div>
        <Menu menuItems={filterMenuItems} onItemClick={this.props.changeResource}/>
      </div>
    )
  }
});

//Create Individual Resource View
var ResourceView = React.createClass({
  voteUp: function(){
    this.props.handleVote(this.props.resource.id, 'up');
  },
  voteDown: function(){
    this.props.handleVote(this.props.resource.id, 'down');
  },
  render: function() {
    return(
      <div className="single-resource">
        <div><span className="bold">{this.props.resource.name}</span><span> - Rating: {this.props.resource.rating}</span><span onClick={this.voteUp}> up</span><span onClick={this.voteDown}> down</span></div>
        <div>{this.props.resource.description}</div>
        <div><a href={this.props.resource.url} target="_blank">View Resource</a></div>
      </div>
    )
  }
});

//Create Course View
var CourseView = React.createClass({
  mixins: [Reflux.listenTo(CourseStore, 'updateCourse')],
  getInitialState: function(){
    return {
      windowWidth: window.innerWidth,
      isMobile: window.innerWidth < 1024,
      course:{resources:[]},
      selected: {}
    };
  },
  goBack: function(){
    var url = "./curriculum.html#" + this.state.course.id;
    window.location.href = url;
  },
  updateCourse: function(course){
    var context = this;
    this.setState({
      course: course
    }, function(){
      if (!context.state.selected.hasOwnProperty('id')){
        context.setState({
          selected: course.resources[0]
        });
      } else {
        var resources = context.state.course.resources;
        for (var i = 0; i < resources.length; i++){
          if (context.state.selected.id === resources[i].id && context.state.selected.rating !== resources[i].rating){
            context.setState({
              selected: resources[i]
            });
          return;
          }
        }
      }
    });
  },
  changeResource: function(e, resourceId, menuItem){
    var resources = this.state.course.resources;
    for (var i = 0; i < resources.length; i++){
      if (resourceId === resources[i].id){
        this.setState({
          selected: resources[i]
        });
        return;
      }
    }
  },
  handleVote: function(id, dir){
    if (dir === 'up'){
      CourseActions.upVote(id);
    } else if (dir === 'down'){
      CourseActions.downVote(id);
    }
  },
  render: function() {
    var context = this;
    return (
      <div>
        <Header name={this.state.course.name} goBack={this.goBack} desc={this.state.course.description} creator={this.state.course.creator} updated={this.state.course.createdAt} rating={this.state.course.rating}/>
        <div className="resource-container">
          <div className="check-list">
            <CheckList resources={this.state.course.resources} changeResource={this.changeResource} />
          </div>
          <div className="resources">
            <ResourceView resource={this.state.selected} handleVote={this.handleVote}/>
          </div>
        </div>
      </div>
    );
  }
});

/*============== EXPORT CURRICULUM COMPONENT ==============*/
module.exports = CourseView;
