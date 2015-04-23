/*==================== REQUIRE MODULES ====================*/
var mui             = require('material-ui');
var React           = require('react');
var Reflux          = require('reflux');
var CourseStore     = require('../stores/CourseStore.js');
var CourseActions   = require('../actions/CourseActions.js');
var CommentStore    = require('../stores/CourseCommentStore.js');
var Cookies         = require('cookies-js');

/*============== DECLARE MATERIAL COMPONENTS ==============*/
//NavBar Components
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var DropDownMenu = mui.DropDownMenu;
var FontIcon = mui.FontIcon;
var RaisedButton = mui.RaisedButton;
var FlatButton = mui.FlatButton;
var DropDownIcon = mui.DropDownIcon;
//Set Material-UI Vars
var Menu = mui.Menu;
var Tabs = mui.Tabs;
var Tab = mui.Tab;
var TextField = mui.TextField;
var Paper = mui.Paper;
var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

/*================ CREATE CURRICULUM COMPONENTS ================*/
//Create Header View
var Header = React.createClass({
  back: function(){
    this.props.goBack();
  },
  render: function() {
    return(
      <Paper className="header" zDepth={1} rounded={false}>
        <div className="back-button" onClick={this.back}>
          <i className="fa fa-chevron-left fa-2x"></i>
        </div>
        <div className="header-left">
          <div><h3 className="reset">{this.props.name}</h3></div>
        </div>
        <div className="header-right">
          <div>{this.props.desc}</div>
        </div>
      </Paper>
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
    var filterMenuItems = [{ payload: '1', text: 'Resources'}];
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
  getInitialState: function(){
    return {
      newComment: '',
      userId: Cookies.get('basebranchuser') || null
    };
  },
  handleText: function(e){
    this.setState({
      newComment: e.target.value
    });
  },
  voteUp: function(){
    this.props.handleVote(this.props.resource.id, 'up');
  },
  voteDown: function(){
    this.props.handleVote(this.props.resource.id, 'down');
  },
  addComment: function(){
    var comment = {
      userId: this.state.userId,
      text: this.state.newComment,
      resourceId: this.props.resource.id 
    };
    this.setState({
      newComment: ''
    });
    CourseActions.newComment(comment);
  },
  render: function() {
    console.log(this.props.comments);
    var comments = this.props.comments.map(function(comment){
      return (
        <li className="single-comment">
          <Paper zDepth={1} rounded={false} className="comment-paper">
            <div><span className="user-name">{comment.userId} - </span>{comment.createdAt.split('T')[0]}</div>
            <div className="comment-text">{comment.text}</div>
          </Paper>
        </li>
      );
    });
    return(
      <div className="single-resource">
        <Paper className="resource-info" zDepth={1} rounded={false}>
          <div className="rating">
            <div className="rating-number">{this.props.resource.rating}</div>
            <div className="plus-minus"><span className="plus" onClick={this.voteUp}><i className="fa fa-chevron-up"></i></span><span className="minus" onClick={this.voteDown}><i className="fa fa-chevron-down"></i></span></div>
          </div>
          <div className="resource-name-desc">
            <div className="bold">{this.props.resource.name}</div>
            <div>{this.props.resource.description}</div>
          </div>
          <div className="resource-link"><a href={this.props.resource.url} target="_blank"><div className="view-button">View Resource</div></a></div>
        </Paper>
        <div className="resource-comments">
          <h5>Comments</h5>
          <ul className="comment-list">
            {comments}
          </ul>
          <div className="comment-form">
            <textarea onChange={this.handleText} value={this.state.newComment} className="comment-box"> </textarea>
            <FlatButton disabled={this.state.userId === null} onClick={this.addComment} className="comment-button">Add a New Comment</FlatButton>
          </div>
        </div>
      </div>
    )
  }
});

//Create Course View
var CourseView = React.createClass({
  mixins: [Reflux.listenTo(CourseStore, 'updateCourse'), Reflux.connect(CommentStore, 'comments')],
  getInitialState: function(){
    return {
      windowWidth: window.innerWidth,
      isMobile: window.innerWidth < 1024,
      course:{resources:[]},
      selected: {},
      comments: []
    };
  },
  goBack: function(){
    var url = "./curriculum.html#" + this.state.course.channelName;
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
        CourseActions.getComments(course.resources[0].id);
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
        CourseActions.getComments(resources[i].id);
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
            <ResourceView resource={this.state.selected} handleVote={this.handleVote} comments={this.state.comments}/>
          </div>
        </div>
      </div>
    );
  }
});

/*============== EXPORT CURRICULUM COMPONENT ==============*/
module.exports = CourseView;
