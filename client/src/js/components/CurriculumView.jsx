/*==================== REQUIRE MODULES ====================*/
var mui               = require('material-ui');
var React             = require('react');
var Reflux            = require('reflux');
var CurriculumActions = require('../actions/CurriculumActions.js');
var CurriculumStore   = require('../stores/CurriculumStore.js');

/*============== DECLARE MATERIAL COMPONENTS ==============*/
//NavBar Components
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var DropDownMenu = mui.DropDownMenu;
var FontIcon = mui.FontIcon;
var RaisedButton = mui.RaisedButton;
var DropDownIcon = mui.DropDownIcon;
//Set Material-UI Vars
var Tabs = mui.Tabs;
var Tab = mui.Tab;
var TextField = mui.TextField;
var Paper = mui.Paper;
var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

/*================ CREATE CURRICULUM COMPONENTS ================*/
//Create Individual Curriculum View
var ItemView = React.createClass({
  voteUp: function(){
    this.props.editRating(this.props.curriculum.id, 'up');
  },
  voteDown: function(){
    this.props.editRating(this.props.curriculum.id, 'down');
  },
  render: function() {
    var resourceItems;
    if (Array.isArray(this.props.resources)){
      resourceItems = this.props.resources.map(function(resource){
        return <div className="single-resource" key={resource.id}>{resource.name}</div>
      });      
    } else {
      resourceItems = [{id:0, name:'a'}];
    }
    var curriculumUrl = "./course.html#" + this.props.curriculumId;
    return(
      <li className="curriculum-item">
        <Paper className="curriculum-paper" zDepth={1} rounded={false}>
          <div className="curriculum-item-left">
            <div className="rating-arrows">
              <div className="vote-up" onClick={this.voteUp}><i className="fa fa-chevron-up"></i></div>
              <div className="vote-down" onClick={this.voteDown}><i className="fa fa-chevron-down"></i></div>
            </div>
            <div className="rating">{this.props.curriculum.rating}</div>
          </div>
          <a className="curriculum-info-container" href={curriculumUrl}>
            <div className="curriculum-item-center">
              <ul className="curriculum-props-list">
                <li className="title-line"><h4>{this.props.curriculum.name}</h4></li>
                <li>Created By: {(this.props.curriculum.user === undefined || this.props.curriculum.user === null)? 'Admin' : this.props.curriculum.user.name}</li>
                <li><strong>{this.props.curriculum.description}</strong></li>
              </ul>
            </div>
            <div className="curriculum-item-right">
              <h4>Resources</h4>
              <div className="curriculum-resource-list">
                {resourceItems}
              </div>
            </div>
          </a>
        </Paper>
      </li>
    )
  }
});

//Create Container View
var CurriculumView = React.createClass({
  mixins: [Reflux.connect(CurriculumStore, 'curricula')],
  getInitialState: function(){
    return {
      windowWidth: window.innerWidth,
      isMobile: window.innerWidth < 1024,
      curricula: [{id: 0, resources:[{id: 0, name:'a'}]}]
    };
  },
  handleRating: function(itemId, dir){
    if (dir === 'up'){
      CurriculumActions.upVote(itemId);
    } else if (dir === 'down'){
      CurriculumActions.downVote(itemId);
    }
  },
  handleResize: function(e) {
    this.setState({
      windowWidth: window.innerWidth,
      isMobile: window.innerWidth < 1024
    });
  },
  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
    CurriculumStore.triggerMe();
  },
  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },
  render: function() {
    console.log(this.state.curricula);
    var context = this;
    var curricular = this.state.curricula.map(function(result) {
      return <ItemView key={result.id} curriculum={result} curriculumId={result.id} resources={result.resources} editRating={context.handleRating}/>
    });
    return (
      <div className="curricula-container">
        <ul className="curricula-list">
          {curricular}
        </ul>
      </div>
    );
  }
});

/*============== EXPORT CURRICULUM COMPONENT ==============*/
module.exports = CurriculumView;
